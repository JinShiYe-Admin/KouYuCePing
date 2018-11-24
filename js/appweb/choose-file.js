Vue.component('choose-file', {
	props: {
		msgType: {
			type: Number,
			default: 2
		},
		uploadReal: {
			type: Boolean,
			default: false
		},
		fileInfo: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	template: '<div v-bind:class="[\'weui-uploader\']">' +
		'<div v-bind:class="[\'weui-uploader__hd\']">' +
		'<p v-bind:class="[\'weui-uploader__title\']">{{getHintInfo()}}</p>' +
		'<div v-bind:class="[\'weui-uploader__info\']">{{uploadedFiles.length}}\/1</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-uploader__bd\']">' +
		'<ul v-bind:class="[\'weui-uploader__files\']" id="uploaderFiles">' +
		'<li v-for="file of uploadedFiles" v-bind:class="[\'weui-uploader__file\']" v-bind:style="{\'background-image\':\'url(\'+file.fileurl+\')\'}"></li>' +
		'</ul>' +
		'<div v-bind:class="[\'weui-uploader__input-box\']" v-on:click="toExtra()">' +
		'<input v-if="((msgType!==2&&msgType!==5)||uploadReal)&&msgType!==1" id="uploaderInput" v-bind:class="[\'weui-uploader__input\']" type="file" v-bind:accept="getAcceptType()" v-on:change="selectFile($event)">' +
		'</div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			uploadedFiles: this.fileInfo.fileurl ? [this.fileInfo] : []
		}
	},
	created: function() {

	},
	watch: {
		msgType: function(newVal, oldVal) {
			console.log("文件选择的消息类型变化：" + newVal + ",旧值：" + oldVal);
			this.uploadedFiles = [];
		}
	},
	computed: {

	},
	methods: {
		toExtra: function() {
			if((this.msgType == 1 || this.msgType == 2 || this.msgType == 5) && !this.uploadReal) {
				router.push({
					name: "extra-pub"
				})
			}
		},
		getHintInfo: function() {
			console.log("选择文件时的文件类型：" + this.msgType);
			var hintInfo;
			switch(this.msgType) {
				case 0:
					hintInfo = "添加文字";
					break;
				case 1:
					hintInfo = "添加文本";
					break;
				case 2:
					hintInfo = "添加图文";
					break;
				case 3:
					hintInfo = "添加图片";
					break;
				case 4:
					hintInfo = "添加语音";
					break;
				case 5:
					hintInfo = "添加视频";
					break;
				case 6:
					hintInfo = "添加文件";
					break;
				default:
					break;
			}
			return hintInfo;
		},
		getAcceptType: function() {
			var acceptType;
			switch(this.msgType) {
				case 0:
					acceptType = "添加文字";
					break;
				case 1:
					acceptType = "添加文本";
					break;
				case 2:
					acceptType = "image/jpeg,image/png";
					break;
				case 3:
					acceptType = "image/jpeg,image/png";
					break;
				case 4:
					acceptType = "audio/AMR";
					break;
				case 5:
					acceptType = "video/mp4";
					break;
				case 6:
					acceptType = "*";
					break;
				default:
					break;
			}
			return acceptType;
		},
		selectFile: function(event) {
			var com = this;
			if(event.target.value) {
				console.log("选中的文件路径：" + event.target.value);
				console.log(event.target.files);
				var file = event.target.files[0];
				compress.uploadImg(file, 2, function(response) {
					console.log("已上傳的文件！" + JSON.stringify(response))
					if(response.RspCode == 0) {
						com.uploadedFiles = [response.RspData];

						com.$emit('uploadFile', response.RspData);
					} else {
						console.log("发生错误！" + JSON.stringify(response));
					}
				});
			}
		}
	}
})