import template from "./index.html"

let keyboard = {

    props: {
        type: {
            type: String,
            default: 'pay'
        },
        show: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
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
    watch: {
        disabled(val) {
            this.bgcolors = val ? '#ddd' : this.bgcolor
        },
        show() {
            this.setkeyboardtop()
        }
    },
    data() {
        return {
            str: "",
            delinterval: '',
            onebyoneInterval: "",
            bgcolors: '',
            wh: 0,
            target: ''
        };
    },
    methods: {
        // 按下效果
        numberstart(e) {
            this.target = e.target.tagName == 'I' ? e.target.parentNode : e.target
            this.target.className = this.target.className + ' active'
            setTimeout(() => {
                let classname = this.target.className
                if (classname.indexOf('active') != -1) {
                    this.target.className = classname.substr(0, classname.length - 6)
                }
            }, 100)
        },
        clicknumberfun(e, val) {
            e.preventDefault()
            this.numberstart(e)
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            if (this.type == 'pay') {
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
                    this.str = Number(this.str.split('.')[0]) + '.' + (this.str.split('.')[1] ? this.str.split('.')[1] : '')
                } else {
                    if (this.str.indexOf('.') === -1) {
                        this.str = Number(this.str).toString() == '0' ? '' : Number(this.str).toString()
                    } else {
                        if (this.str.split('.')[0].length >= 1) {
                            this.str = Number(this.str.split('.')[0]) + '.' + (this.str.split('.')[1] ? this.str.split('.')[1] : '')
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
            } else if (this.type == 'phone') {
                if (val == '.' || this.str.length >= this.len) {
                    val = ''
                }
                this.str += val;
            } else if (this.type == 'sfz') {
                if (this.str.length >= this.len) {
                    val = ''
                }
                this.str += val;
            }

            this.$emit("callback", this.str);
        },
        delall(e) {
            this.str = "";
            this.numberstart(e)
            e.preventDefault()
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            this.$emit("callback", this.str);
        },
        delonestart(e) {
            this.numberstart(e)
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
            if (this.disabled) return
            navigator.vibrate ? navigator.vibrate(50) : (navigator.webkitVibrate ? navigator.webkitVibrate(50) : '')
            if (this.type == 'pay' && this.str.length > 0) {
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
        },
        setkeyboardtop() {
            let keyboard = this.$refs.keyboard_id
            let kh = this.show ? keyboard.offsetHeight : 0
            keyboard.style.top = this.wh - kh + 'px'
        }
    },
    created() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
        this.str = this.value
        this.bgcolors = this.disabled ? '#ddd' : this.bgcolor
    },
    mounted() {
        this.wh = document.documentElement.clientHeight
        this.$nextTick(() => {
            this.setkeyboardtop()
        })
        window.addEventListener("onresize", () => {
            this.wh = document.documentElement.clientHeight
            this.setkeyboardtop()
        })
    }
}

keyboard.install = function (Vue, name = 'keyboardNumber') {
    Vue.component(name, keyboard);
}

export default keyboard;