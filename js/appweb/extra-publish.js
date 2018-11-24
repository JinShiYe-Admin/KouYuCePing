Vue.component('extra-pub', {
	props: {
		msgType: {
			type: Number,
			default: 3
		},
		fileInfo: {
			type: Object,
			default: {}
		}
	},
	template: '<div v-bind:class="[\'weui-cells\',\'weui-cells_form\']">' +
		'<div v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<input v-bind:class="[\'weui-input\']" v-model.trim="title" type="text" placeholder="在此输入标题"/>' +
		'</div>' +
		'</div>' +
		'<div v v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell_bd\']">' +
		'<textarea rows="10" v-model.trim="description" v-bind:class="[\'weui-textarea\']" placeholder="在此输入正文"></textarea>' +
		'</div>' +
		'</div>' +
		//		'<div v-bind:class="[\'weui-cell\']">' +
		//		'<div v-bind:class="[\'weui-cell_bd\']">' +
		//		'<textarea rows="3" v-model="" v-bind:class="[\'weui-textarea\']" placeholder="在此输入摘要"></textarea>' +
		//		'</div>' +
		//		'</div>' +
		//		'<div v-if="msgType==2" v-bind:class="[\'weui-cell\']">' +
		//		'<div v-bind:class="[\'weui-cell__bd\']">' +
		//		'<input v-bind:class="[\'weui-input\']" v-model="title" type="text" placeholder="作者"/>' +
		//		'</div>' +
		//		'</div>' +
		'<slot></slot>' +
		'<a v-bind:class="[\'weui-btn\',\'weui-btn_mini\',\'weui-btn_primary\']" v-on:click="finishMethod()">完成</a>' +
		'<a v-bind:class="[\'weui-btn\',\'weui-btn_mini\',\'weui-btn_default\']" v-on:click="cancelMethod()">取消</a>' +
		'</div>',
	data: function() {
		return {
			title: '',
			description: '',
			picurl: '',
			btntxt: '阅读全文'
		}
	},
	computed: {

	},
	methods: {
		finishMethod: function() {
			console.log("点击完成按钮");
			this.isLegalFinish();
		},
		cancelMethod: function() {
			console.log("点击取消按钮")
			router.go(-1);
		},
		emitEvents: function() {
			var realData;
			switch(this.msgType) {
				case 1:
					realData = {
						textcard: {
							title: this.title,
							description: this.description
						}
					}
					break;
				case 2:
					var extraData = jQuery.extend({
						title: this.title,
						description: this.description,
						picurl: this.fileInfo.fileurl
					}, this.fileInfo);
					realData = {
						news: {
							articles: [extraData]
						}
					};
					break;
				default:
					break;
			}
			console.log("要传递的realData:" + JSON.stringify(realData))
			this.$emit("extraData", realData);
			router.go(-1);
		},
		isLegalFinish: function() {
			if(this.title.length === 0) {
				console.log("请输入标题！")
				return;
			}
			if(this.description.length === 0) {
				console.log("请输入描述");
				return;
			}
			if(typeof(this.fileInfo.fileurl) === "undefined" && this.msgType !== 1) {
				console.log("请上传附件！" + this.msgType);
				return;
			}
			this.emitEvents();
		}
	}
})