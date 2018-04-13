var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	cleanCSS = require('gulp-clean-css'),
	rollup = require('rollup').rollup;

var json = require('rollup-plugin-json');
var progress = require('rollup-plugin-progress')
var del = require('del');


//转es5
var buble = require('rollup-plugin-buble');
var html = require('rollup-plugin-html')
//
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var replace = require('rollup-plugin-replace')
var license = require('rollup-plugin-license')
var uglify = require('rollup-plugin-uglify')

var version = require('./package.json').version

var arr = require('./config')

gulp.task('less', async function () {
	var plugins = [
		autoprefixer({ browsers: ['last 5 version'] })
	];
	arr.forEach(item => {
		gulp.src(item.cssinput)
			.pipe(less())
			.pipe(postcss(plugins))
			.pipe(cleanCSS())
			.pipe(gulp.dest(item.cssoutput));
	})

});

gulp.task('js', async function () {
	arr.forEach(async function (item) {
		const bundle = await rollup({
			input: item.input,
			plugins: [
				license({
					banner: `ui-editor ${version}\n created at ${new Date()}`
				}),
				json(),
				progress({
					clearLine: false
				}),
				html({
					include: "**/*.html",
					htmlMinifierOptions: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true,
						conservativeCollapse: true
					}
				}),
				replace({
					VERSION: version
				}),
				resolve({
					jsnext: true
				}),
				commonjs({
					include: 'node_modules/lrz/**'
				}),
				buble({
					include: '**/*.js'
				}),
				uglify()
			]
		});

		await bundle.write({
			file: item.output,
			format: 'umd',
			name: 'keyboardnumber'
		});
	})
})

gulp.task('del', async function () {
	del(['dist/**/*'], function () {
		console.log('删除成功')
	})
})

gulp.task('default', ['del','js','less']);