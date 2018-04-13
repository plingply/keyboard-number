!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):t.keyboardnumber=s()}(this,function(){"use strict";var t={props:{type:{type:String,default:"pay"},disabled:{type:Boolean,default:!1},value:{type:String,default:""},text:{type:String,default:"支付"},bgcolor:{type:String,default:"#1AAD19"},textcolor:{type:String,default:"#fff"},len:{type:Number,default:5}},template:'<div class="keyboard"> <div class="left"> <div class="row"> <span class="textstyle" @touchstart="clicknumberfun($event,\'1\')">1</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'2\')">2</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'3\')">3</span> </div> <div class="row"> <span class="textstyle" @touchstart="clicknumberfun($event,\'4\')">4</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'5\')">5</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'6\')">6</span> </div> <div class="row"> <span class="textstyle" @touchstart="clicknumberfun($event,\'7\')">7</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'8\')">8</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'9\')">9</span> </div> <div class="row"> <span class="textstyle" @touchstart="clicknumberfun($event,\'.\')" v-if="type != \'sfz\'">.</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'x\')" v-if="type == \'sfz\'">x</span> <span class="textstyle" @touchstart="clicknumberfun($event,\'0\')">0</span> <span class="textstyle" @touchstart="delall($event)">清空</span> </div> </div> <div class="right"> <span class="textstyle clearbtn" @touchstart="delonestart($event)" @touchend="deloneend($event)"> <i>×</i> </span> <s class="textstyle" @click="pay" :style="{backgroundColor:bgcolors,color:textcolor}">{{ text }}</s> </div> </div>',watch:{disabled:function(t){this.bgcolors=t?"#ddd":this.bgcolor}},data:function(){return{str:"",delinterval:"",onebyoneInterval:"",bgcolors:""}},methods:{clicknumberfun:function(t,s){t.preventDefault(),navigator.vibrate?navigator.vibrate(50):navigator.webkitVibrate&&navigator.webkitVibrate(50),"pay"==this.type?"."===s?(0===this.str.length?this.str="0":-1!=this.str.indexOf(".")&&(s=""),this.str+=s,this.str=Number(this.str.split(".")[0])+"."+(this.str.split(".")[1]?this.str.split(".")[1]:"")):(-1===this.str.indexOf(".")?this.str="0"==Number(this.str).toString()?"":Number(this.str).toString():this.str.split(".")[0].length>=1&&(this.str=Number(this.str.split(".")[0])+"."+(this.str.split(".")[1]?this.str.split(".")[1]:"")),-1==this.str.indexOf(".")&&this.str.length>=this.len&&(s=""),this.str.split(".")[1]&&this.str.split(".")[1].length>=2&&(s=""),this.str+=s):"phone"==this.type?(("."==s||this.str.length>=this.len)&&(s=""),this.str+=s):"sfz"==this.type&&(this.str.length>=this.len&&(s=""),this.str+=s),this.$emit("callback",this.str)},delall:function(t){this.str="",t.preventDefault(),navigator.vibrate?navigator.vibrate(50):navigator.webkitVibrate&&navigator.webkitVibrate(50),this.$emit("callback",this.str)},delonestart:function(t){var s=this;t.preventDefault(),navigator.vibrate?navigator.vibrate(50):navigator.webkitVibrate&&navigator.webkitVibrate(50),this.str.length>0&&(this.str=this.str.substr(0,this.str.length-1),this.$emit("callback",this.str),this.delinterval=setTimeout(function(){s.delonebyone()},500))},deloneend:function(){clearTimeout(this.delinterval),clearInterval(this.onebyoneInterval)},delonebyone:function(){var t=this;this.str.length>0&&(this.onebyoneInterval=setInterval(function(){0!=t.str.length?(t.str=t.str.substr(0,t.str.length-1),t.$emit("callback",t.str)):clearInterval(t.onebyoneInterval)},100))},pay:function(){this.disabled||(this.type&&this.str.length>0&&(-1!=this.str.indexOf(".")?this.str.split(".")[1]?1===this.str.split(".")[1].length&&(this.str+="0"):this.str+="00":this.str+=".00"),this.$emit("callback",this.str),this.$emit("paycallbakc"))}},created:function(){document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px",this.str=this.value,this.bgcolors=this.disabled?"#ddd":this.bgcolor},install:function(s,e){void 0===e&&(e="keyboardNumber"),s.component(e,t)}};return t});
