Vue.component("com-publish", {
	props: {
		chosePersen: {
			type: Array,
			default: function() {
				return []
			}
		},
		msgType: {
			type: Number,
			default: 0
		},
		exData: {
			type: Object,
			default: function() {
				return {}
			}
		},
		fileInfo: {
			type: Object,
			default: function() {
				return {}
			}
		},
		initialCon: {
			type: String,
			default: ''
		}
	},
	template: '<div>' +
		'<input placeholder="请输入标题" v-model="title">' +
		'<textarea  v-model.trim.lazy="description" v-bind:rows=10 v-bind:style="{width:\'100%\'}"></textarea>' +
		'<slot name="choose-file"></slot>' +
		'<slot></slot>' +
		'<a v-bind:class="[\'weui-btn\', \'weui-btn_primary\']" v-on:click="publishMethod">发布</a></div>',
	watch: {
		'$route' (to, from) {
			// 对路由变化作出响应...
			console.log("@@@@@com-persen@@@@@路由变化" + this.$route.params.id);
			console.log(to);
		},
		content: function(newVal, oldVal) {
			console.log("输入内容的newVal：" + newVal + ",oldVal:" + oldVal);
			this.$emit("putContent", newVal);
		}
	},
	data: function() {
		return {
			fileType: 0,
			content: this.initialCon,
			extraData: this.exData
		}
	},
	methods: {
		publishMethod: function() {
			console.log("&&&&&com-publish&&&&&发布按钮的点击事件");
			if(this.chosePersen.length == 0) {
				console.log("请选择人员！");
				return;
			}
			this.judageIsLegal();
		},
		judageIsLegal: function() {
			switch(this.msgType) {
				case 0:
					if(this.content.length == 0) {
						console.log("请填写内容！");
						return;
					}
					this.extraData = {
						content: this.content
					}
					break;
				case 1:
					if(typeof(this.extraData.textcard) === "undefined") {
						console.log("文字卡片未填写内容！！！");
						return;
					}
					break;
				case 2:
				case 5:
					if(typeof(this.extraData.news) === "undefined") {
						console.log("请填写内容和选择文件！！！");
						return;
					}
					break;
				case 3:
				case 4:
				case 6:
					if(typeof(this.fileInfo.fileurl) === "undefined") {
						console.log("请选择文件");
						return;
					}
					this.extraData = this.fileInfo;
					break;
				default:
					break;
			}
			this.publish();
		},
		publish: function() { //发布
			var tStyle = this.getPubStyle();
			this.extraData.msgtype = tStyle.msgtype;
			this.extraData.type = tStyle.type;
			console.log("&&&&&com-publish&&&&&发布事件！" + JSON.stringify(this.extraData));
			request.postMessage(this.chosePersen, this.extraData, function(data) {
				console.log("发送消息，返回的值：" + JSON.stringify(data));
				console.log(data);
				if(data.RspCode == 0) {
					sessionStorage.clear();
					window.close(); //关闭当前页面
				} else {
					console.log("发布通知失败：" + data.RspTxt);
				}
			})

		},
		getPubStyle: function() { //發佈的類型
			for(var i in consts.MESSAGE_STYLES) {
				var msgStyle = consts.MESSAGE_STYLES[i];
				if(msgStyle.typeNo == this.msgType) {
					return msgStyle;
				}
			}
		}
	}
})