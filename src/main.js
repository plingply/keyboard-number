import template from "./index.html"

let keyboard = {

    props: {
        type: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: "支付"
        },
        bgcolor: {
            type: String,
            default: "#1AAD19"
        },
        textcolor: {
            type: String,
            default: "#fff"
        },
        len: {
            type: Number,
            default: 5
        }
    },
    template,
    data() {
        return {
            str: "",
            delinterval: '',
            onebyoneInterval: ""
        };
    },
    methods: {
        clicknumberfun(e, val) {
            e.preventDefault()
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            if (this.type) {
                // 判断有效数字 前置为去掉多余的0
                if (val === ".") {
                    if (this.str.length === 0) {
                        this.str = "0";
                    } else {
                        if (this.str.indexOf(".") != -1) {
                            val = "";
                        }
                    }
                    this.str += val;
                    this.str = Number(this.str.split('.')[0])+'.'+(this.str.split('.')[1]?this.str.split('.')[1]:'')
                } else {
                    if(this.str.indexOf('.') === -1){
                        this.str = Number(this.str).toString() == '0'?'':Number(this.str).toString()
                    }else{
                        if(this.str.split('.')[0].length >= 1){
                            this.str = Number(this.str.split('.')[0])+'.'+(this.str.split('.')[1]?this.str.split('.')[1]:'')
                        }
                    }
                    if (this.str.indexOf(".") == -1 && this.str.length >= this.len) {
                        val = "";
                    }
                    if (this.str.split(".")[1] && this.str.split(".")[1].length >= 2) {
                        val = "";
                    }
                    this.str += val;
                }
            }
            
            this.$emit("callback", this.str);
        },
        delall(e) {
            this.str = "";
            e.preventDefault()
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            this.$emit("callback", this.str);
        },
        delonestart(e) {
            e.preventDefault()
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            if (this.str.length > 0) {
                this.str = this.str.substr(0, this.str.length - 1);
                this.$emit("callback", this.str);
                this.delinterval = setTimeout(() => {
                    this.delonebyone()
                }, 500)
            }
        },
        deloneend() {
            clearTimeout(this.delinterval)
            clearInterval(this.onebyoneInterval)
        },
        delonebyone() {
            if (this.str.length > 0) {
                this.onebyoneInterval = setInterval(() => {
                    if (this.str.length == 0) {
                        clearInterval(this.onebyoneInterval)
                        return
                    }
                    this.str = this.str.substr(0, this.str.length - 1);
                    this.$emit("callback", this.str);
                }, 100)
            }
        },
        pay() {
            if (this.type && this.str.length > 0) {
                if (this.str.indexOf(".") != -1) {
                    if (!this.str.split(".")[1]) {
                        this.str += "00";
                    } else if (this.str.split(".")[1].length === 1) {
                        this.str += "0";
                    }
                } else {
                    this.str += ".00";
                }
            }
            this.$emit("callback", this.str);
            this.$emit("paycallbakc");
        }
    },
    created() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
        this.str = this.value
    }
}

keyboard.install = function (Vue, name = 'keyboardNumber') {
    Vue.component(name, keyboard);
}

export default keyboard;