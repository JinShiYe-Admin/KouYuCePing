Vue.component("select-load-pic", {
	props: {
		index: {
			type: Number
		},
		files: {
			default: function() {
				return []
			},
			type: Array
		},
		originalName: {
			default: '',
			type: String
		}
	}, //0 原图 最大2M 1缩略图
	template: '#temp_select_load_pic',
	data: function() {
		return {

		}
	},
	mounted: function() {
		console.log("当前pic类型:" + this.index)
		console.log("*******isDel" + this.isdel)
		this.uploadFile();
	},
	filters: {
		placeHolder: function(val) {
			//		    if(val==-1 && detail.type == 'edit' ){
			//		    alert('jinlai')
			////		    return  bjimgurl;
			//		    }
			console.log("要选择的类型：" + val)
			if(val >= 0) {
				console.log("0")
				return "请选择内容图片";
			}
			return "请选择标题图片";
		},
		idFilter: function(val) {
			return "upload" + val
		}
	},
	methods: {
		selectFile: function(e) {
			console.log("e.target.value:" + e.target.value);
			console.log(e.target.files);
			if(e.target.files.length > 0) {
				var theFile = e.target.files[0];
				if(this.isInType(theFile.type)) { //上传文件
					//					this.upLoadFile();
				} else {
					this.emitUndefinedFile(); //清空上传文件
					e.target.value = "";
					$.Huimodalalert('所选文件类型错误，请重新选择', 3000) //提示错误
				}
			} else {
				this.emitUndefinedFile(); //清空上传文件
			}
		},
		emitUndefinedFile: function() { //清空上传文件
			this.$emit("uploadedFile", null);
		},
		uploadFile: function() { //上传文件方法
			var com = this;
			var thumbOption = {
				type: 0
			};
			if(com.index == -1) {
				thumbOption = {
					type: 3,
					width: 300,
					height: 200
				}
			}
			cloudutil.uploadQnSingleImg("upload" + com.index, thumbOption, function(response) {
				console.log("获取的上传七牛图片信息：" + JSON.stringify(response));
				com.$emit("uploadedfile", response, com.index); //通知父组件 上传的图片
			})
		},
		isInType: function(type) {
			switch(type) {
				case "image/png":
				case "image/jpeg":
					return true;
				default:
					return false;
			}
		},
		/**
		 * 点击删除图片
		 */
		delBtn: function() {
			console.log("*********************删除图片********************");
			var self = this;
			layer.confirm('确定删除', function(num) {
				layer.close(num);
				self.$emit("delete-file");
			});
		}
	}
})