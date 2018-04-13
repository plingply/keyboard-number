# keyboardnumber

### 使用方法：
```javascript
//安装
npm install keyboard-number --save
//在项目中引入
import 'keyboard-number/dist/style.css';
import keyboardnumber from "keyboard-number";
Vue.use(keyboardnumber)

//在项目中适用
<keyboard-number @callback="keyboardcallbak" @paycallbakc="paycallbakc"></keyboard-number>

```

 #### props:
 ```javascript
  //type默认pay，pay表示金额 phone 表示电话
	type: {
		type: String,
		default: 'pay'
	},
	// text 右下角大按钮文字
	text: {
		type: String,
		default: "支付"
	},
	// bgcolor 右下角大按钮 背景颜色
	bgcolor: {
		type: String,
		default: "#1AAD19"
	},
	// textcolor 右下角大按钮文字颜色
	textcolor: {
		type: String,
		default: "#fff"
	},
	//限制整数位的位数
	len: {
		type: Number,
		default: 5
	}
 ```

 ### methods
 ```javascript
	 @callback
	 按下数字键 回调
	 @paycallbakc
	 右下角按钮回调
 ```