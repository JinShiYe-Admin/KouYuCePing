/**
			 * 初始化上传
			 */
			function initUploader(priid, Priimgname) {
                 
				var bannerOption = {
					disable_statistics_report: true, // 禁止自动发送上传统计信息到七牛，默认允许发送
					runtimes: 'html5,flash,html4', // 上传模式,依次退化
					browse_button: priid, // 上传选择的点选按钮，**必需** 
					uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用 
						console.log("uptoken_func:" + JSON.stringify(file));
						uptokenData = null;
						uptokenData = getQNUpToken(file);
						console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
						if(uptokenData && uptokenData.code) { //成功   
							return uptokenData.data.Data[0].Token;
						} else {
							bannerUploader.stop();
							var dialog = weui.dialog({
								title: "上传失败",
								content: uptokenData.message,
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						}
					},
					unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
					save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
					get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
					domain: storageutil.QNPBDOMAIN, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
					max_file_size: '10mb', // 最大文件体积限制
					flash_swf_url: '../../js/lib/plupload/Moxie.swf', //引入 flash,相对路径
					max_retries: 0, // 上传失败最大重试次数
					dragdrop: false, // 开启可拖曳上传
					chunk_size: '4mb', // 分块上传时，每块的体积
					auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
					filters: {
						mime_types: [ //只允许上传图片和zip文件
							{
								title: "Image files",
								extensions: "jpg,png,jpeg,gif,bmp"
							}
						]
					},
					init: {
						'FilesAdded': function(up, files) {
							plupload.each(files, function(file) {
								// 文件添加进队列后,处理相关的事情
								imgName = JSON.stringify(file.name)
								var img = imgName.substring(-1, (imgName - 1));
								//document.getElementById('Priimgname0').value = imgName;
								console.log("FilesAdded:" + JSON.stringify(file));
							});
						},
						'UploadProgress': function(up, file) {
							// 每个文件上传时,处理相关的事情  
							$.Huimodalalert("上传中 " + file.percent + "%",3000) 
						},
						'FileUploaded': function(up, file, info) {
							// 每个文件上传成功后,处理相关的事情 
							console.log("文件:info:" + JSON.stringify(info));
							if(info.status == 200) {
								var cc = eval("(" + info.response + ")"); 
								imgurl = storageutil.QNPBDOMAIN + cc.key;  
								document.getElementById(Priimgname).value = imgurl; 
								if(Priimgname != undefined) { 
									var person = new Object();
									person.encid = priid; //控件id
									person.saveurl = imgurl; //图片地址
									person.imgurl = imgurl;
									person.oldname = file.name;
									person.newname = cc.key;
									person.filesize = file.size;
									//循环附件数组，判断id是否有重复
									for(var i = 0; i < FileDataArray.length; i++) {
										if(FileDataArray[i].id == priid) {
											//如果有重复则移除原来的
											FileDataArray.splice(i, 1);
										}
									}
									//添加新的附件 
									FileDataArray.push(person);  
								}   
							} else {
								var dialog = weui.dialog({
									title: "上传失败",
									content: JSON.stringify(info),
									className: "custom-classname",
									buttons: [{
										label: "确定",
										type: "primary",
										onClick: function() {
											dialog.hide();
										}
									}]
								});
							}
						},
						'Error': function(up, err, errTip) {
							var dialog = weui.dialog({
								title: "操作失败",
								content: pluploadutil.errMes(err.code, errTip),
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						},
						'UploadComplete': function() {
							//队列文件处理完毕后,处理相关的事情
							//console.log("UploadComplete");
						},
						'Key': function(up, file) {
							// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
							// 该配置必须要在 unique_names: false , save_key: false 时才生效
							if(uptokenData && uptokenData.code) { //成功
								return uptokenData.data.Data[0].Key;
							}
						}
					}
				}
				bannerUploader = Qiniu.uploader(bannerOption);
			}

			/**
			 * 初始化上传
			 */
			function initUploaderfj() { 
				var bannerOption = {
					disable_statistics_report: true, // 禁止自动发送上传统计信息到七牛，默认允许发送
					runtimes: 'html5,flash,html4', // 上传模式,依次退化
					browse_button: 'upload', // 上传选择的点选按钮，**必需** 
					uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用 
						console.log("uptoken_func:" + JSON.stringify(file));
						uptokenData = null;
						uptokenData = getQNUpToken(file);
						console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
						if(uptokenData && uptokenData.code) { //成功   
							return uptokenData.data.Data[0].Token;
						} else {
							bannerUploader.stop();
							var dialog = weui.dialog({
								title: "上传失败",
								content: uptokenData.message,
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						}
					},
					unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
					save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
					get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
					domain: storageutil.QNPBDOMAIN, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
					max_file_size: '10mb', // 最大文件体积限制
					flash_swf_url: '../../js/lib/plupload/Moxie.swf', //引入 flash,相对路径
					max_retries: 0, // 上传失败最大重试次数
					dragdrop: false, // 开启可拖曳上传
					chunk_size: '4mb', // 分块上传时，每块的体积
					auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
					filters: {
						mime_types: [ //只允许上传图片和zip文件
							{
								title: "Image files",
								extensions: "jpg,png,jpeg,gif,bmp"
							}
						]
					},
					init: {
						'FilesAdded': function(up, files) {
							plupload.each(files, function(file) {
								// 文件添加进队列后,处理相关的事情
								imgName = JSON.stringify(file.name)
								var img = imgName.substring(-1, (imgName - 1));
								//document.getElementById('Priimgname0').value = imgName;
								console.log("FilesAdded:" + JSON.stringify(file));
							});
						},
						'UploadProgress': function(up, file) {
							// 每个文件上传时,处理相关的事情  
							 $.Huimodalalert("上传中 " + file.percent + "%",3000)
							  
						},
						'FileUploaded': function(up, file, info) {
							// 每个文件上传成功后,处理相关的事情 
						 
							//alert("文件:info:" + JSON.stringify(info));
							if(info.status == 200) { 
								var cc = eval("(" + info.response + ")");
								imgurl = storageutil.QNPBDOMAIN + cc.key;
								//alert("imgurl:" + imgurl);
								var imgLink = Qiniu.imageView2({
									mode: 3, // 缩略模式，共6种[0-5]
									w: 100, // 具体含义由缩略模式决定 
									h: 100, // 具体含义由缩略模式决定
									q: 100, // 新图的图像质量，取值范围：1-100
									format: 'png' // 新图的输出格式，取值范围：jpg，gif，png，webp等
								}, cc.key);
								//Pridl=Priimgname.substring(9,10)
                              document.getElementById('filename').value = imgLink; 
								var sltfile = new Object();
								sltfile.encid = 'upload'; //控件id
								sltfile.saveurl = imgurl; //图片地址
								sltfile.imgurl = imgLink;
								sltfile.oldname = file.name;
								sltfile.newname = cc.key;
								sltfile.filesize = file.size; 
								//循环附件数组，判断id是否有重复 
									for(var i = 0; i < FileDataArray.length; i++) {
									alert(FileDataArray[i].encid)
										if(FileDataArray[i].encid == 'upload') {
											//如果有重复则移除原来的
											FileDataArray.splice(i, 1);
										}
									}
								//添加新的附件
                                FileDataArray.push(sltfile);   
							} else {
								var dialog = weui.dialog({
									title: "上传失败",
									content: JSON.stringify(info),
									className: "custom-classname",
									buttons: [{
										label: "确定",
										type: "primary",
										onClick: function() {
											dialog.hide();
										}
									}]
								});
							}
						},
						'Error': function(up, err, errTip) {
							var dialog = weui.dialog({
								title: "操作失败",
								content: pluploadutil.errMes(err.code, errTip),
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						},
						'UploadComplete': function() {
							//队列文件处理完毕后,处理相关的事情
							//console.log("UploadComplete");
						},
						'Key': function(up, file) {
							// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
							// 该配置必须要在 unique_names: false , save_key: false 时才生效
							if(uptokenData && uptokenData.code) { //成功
								return uptokenData.data.Data[0].Key;
							}
						}
					}
				}
				bannerUploader = Qiniu.uploader(bannerOption);
				
			}

			/**
			 * 获取七牛上传token
			 */
			function getQNUpToken(file) {
				var myDate = new Date();
				var fileName = myDate.getTime() + "" + parseInt(Math.random() * 1000);
				var types = file.name.split(".");
				fileName = fileName + "." + types[types.length - 1];
				var getTokenData = {
					appId: storageutil.QNQYWXKID,
					mainSpace: storageutil.QNPUBSPACE,
					saveSpace: storageutil.QNSSPACEWEBCON,
					fileArray: [{
						qnFileName: fileName,
					}]
				}
				var upToken;
				cloudutil.getFileUpTokens(getTokenData, function(data) {
					upToken = data;
				});
				console.log("gettokendata" + JSON.stringify(getTokenData))
				return upToken;
			}