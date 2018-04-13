'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var MagicString = _interopDefault(require('magic-string'));
var rollupPluginutils = require('rollup-pluginutils');

function escape(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function functor(thing) {
	if (typeof thing === 'function') { return thing; }
	return function () { return thing; };
}

function longest(a, b) {
	return b.length - a.length;
}

function replace(options) {
	if ( options === void 0 ) options = {};

	var filter = rollupPluginutils.createFilter(options.include, options.exclude);
	var delimiters = options.delimiters;

	var values;

	if (options.values) {
		values = options.values;
	} else {
		values = Object.assign({}, options);
		delete values.delimiters;
		delete values.include;
		delete values.exclude;
	}

	var keys = Object.keys(values).sort(longest).map(escape);

	var pattern = delimiters ?
		new RegExp(
			((escape(delimiters[0])) + "(" + (keys.join('|')) + ")" + (escape(delimiters[1]))),
			'g'
		) :
		new RegExp(
			("\\b(" + (keys.join('|')) + ")\\b"),
			'g'
		);

	// convert all values to functions
	Object.keys(values).forEach(function (key) {
		values[key] = functor(values[key]);
	});

	return {
		name: 'replace',

		transform: function transform(code, id) {
			if (!filter(id)) { return null; }

			var magicString = new MagicString(code);

			var hasReplacements = false;
			var match;
			var start, end, replacement;

			while ((match = pattern.exec(code))) {
				hasReplacements = true;

				start = match.index;
				end = start + match[0].length;
				replacement = String(values[match[1]](id));

				magicString.overwrite(start, end, replacement);
			}

			if (!hasReplacements) { return null; }

			var result = { code: magicString.toString() };
			if (options.sourceMap !== false && options.sourcemap !== false)
				{ result.map = magicString.generateMap({ hires: true }); }

			return result;
		}
	};
}

module.exports = replace;
