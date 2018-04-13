import template from "./index.html"

let keyboard = {

    props: {
        type: {
            type: Boolean,
            default: true
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
        }
    },
    template,
    data() {
        return {
            str: ""
        };
    },
    methods: {
        clicknumberfun(val) {
            if (this.type) {
                if (val === ".") {
                    if (this.str.length === 0) {
                        this.str = "0";
                    } else {
                        if (this.str.indexOf(".") != -1) {
                            val = "";
                        }
                    }
                } else {
                    if (this.str.split(".")[1] && this.str.split(".")[1].length >= 2) {
                        val = "";
                    }
                }
            }

            this.str += val;
            this.$emit("callback", this.str);
        },
        delall() {
            this.str = "";
            this.$emit("callback", this.str);
        },
        delone() {
            if (this.str.length > 0) {
                this.str = this.str.substr(0, this.str.length - 1);
                this.$emit("callback", this.str);
            }
        },
        pay() {
            if (this.type) {
                if (this.str.length > 0) {
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
            }
            this.$emit("callback", this.str);
            this.$emit("paycallbakc");
        }
    },
    created(){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
    }
}

keyboard.install = function (Vue, name = 'keyboardNumber') {
    Vue.component(name, keyboard);
}

export default keyboard;