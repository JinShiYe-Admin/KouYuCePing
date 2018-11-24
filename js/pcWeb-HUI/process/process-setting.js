Vue.component("process-setting", {
	template: "#process-list",
	data: function() {
		return {
			processList: [],
			activeProcess: {
				ProcessTypeId: 0, //流程Id
				ProcTypeName: "流程4", //流程名称
				ProcTypeNote: "流程4备注", //流程备注
				Stat: 1
			},
			tablebases: null,
			changeType: 0, //0 新建流程 1修改流程
			corpId: 0,
			pageIndex: 1,
			totalPage: 1,
			name: "",
			note: "",
			stat: 1,
			curPage: 0,
			showEdit:false
		}
	},
	mounted: function() {
		this.getCorpId();
	},
	watch: {
		processList: function(newVal, oldVal) {
			console.log("******watch:processList******");
			if(this.tablebases != null) {
				this.tablebases.destroy();
			}
			this.$nextTick(this.newTablebases);
		}
	},
	methods: {
		/**
		 * 获取单位Id
		 */
		getCorpId: function() {
			var com = this;
			request.requestPersonalInfo(function(response) {
				console.log("获取的corpId数据：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.corpId = JSON.parse(response.RspData).corpid;
					com.requireProcess();
				}
			},1)
		},
		/**
		 * 表格
		 */
		newTablebases: function() {
			console.log("****newTablebases****")
			this.tablebases = $('.table-sort').DataTable({
				pageLength: 10,
				lengthChange: false,
				ordering: false,
				searching: false
			});
			this.tablebases.table(0).page(this.curPage).draw(false);
		},
		getCurPage: function() {
			this.curPage = this.tablebases.page.info().page;
		},
		/**
		 * 更改显示状态
		 * @param {Object} process
		 */
		changeState: function(process) {
			console.log("*****changeState******");
			processRequest.postProcessData("setProcessType", {
				corpId: this.corpId,
				procTypeId: process.ProcessTypeId,
				procTypeName: process.ProcTypeName,
				procTypeNote: process.ProcTypeNote,
				stat: (process.Stat + 1) % 2
			}, function(response) {
				if(response.RspCode == 0) {
					process.Stat = (process.Stat + 1) % 2;
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},
		/**
		 * 添加流程
		 */
		addProcess: function() {
			console.log("*****添加流程*******");
			this.changeType = 0;
			this.name = "";
			this.note = "";
			this.toggleLayer(true, "添加流程");
		},
		/**
		 * 开关
		 * @param {Object} isOpen
		 * @param {Object} title
		 */
		toggleLayer: function(isOpen, title) {
			console.log("****显示/关闭对话框****");
			if(isOpen) {
				layer.open({
					type: 1,
					title: title,
					area: '500px',
					zIndex: 999,
					content: $('#edit-pocessInfo')
				});
			} else {
				layer.closeAll("page");
			}

		},
		/**
		 * 更改流程链
		 * @param {Object} process 要更改流程链的流程
		 */
		changeProcessList: function(process) {
			console.log("****changeProcessList****")
			this.activeProcess = process;
			console.log("更改流程链：" + JSON.stringify(process))
			this.$emit("process-info", this.activeProcess);
			router.push({
				name: 'multi-choose'
			})
		},
		/**
		 * 更改流程信息
		 * @param {Object} process
		 */
		changeProcessInfo: function(process) {
			console.log("******更改流程信息changeProcessInfo******")
			this.changeType = 1;
			this.name = process.ProcTypeName;
			this.note = process.ProcTypeNote;
			this.activeProcess = process;
			this.toggleLayer(true, "更改流程信息");
		},
		/**
		 * 提交流程
		 */
		submitProcess: function() {
			console.log("*****submitProcess*****");
			if(this.name.length == 0) {
				layerPlus.alert("请输入流程类型");
				return;
			}
			if(this.changeType === 0) {
				this.addProcessType();
			} else {
				this.setProcessType();
			}
		},
		/**
		 * 添加流程類型信息
		 */
		addProcessType: function() {
			console.log("*****addProcessType******");
			var com = this;
			processRequest.postProcessData("addProcessType", {
				corpId: this.corpId,
				procTypeName: this.name,
				procTypeNote: this.note
			}, function(response) {
				console.log("添加流程类型信息的结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.addDataToList(response.RspData.Result);
					com.toggleLayer(false);
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},
		/**
		 * 增加数据类型后，添加数据
		 * @param {Object} processId
		 */
		addDataToList: function(processId) {
			console.log("*****addDataToList*****");
			var process = {
				ProcessTypeId: processId,
				ProcTypeName: this.name,
				ProcTypeNote: this.note,
				Stat: 1,
				ApprManList: []
			}
			this.processList.splice(0, 0, process);
		},
		/**
		 * 更改流程类型说明
		 */
		setProcessType: function() {
			console.log("*****更改流程类型说明setProcessType*****")
			var com = this;
			processRequest.postProcessData("setProcessType", {
				procTypeId: this.activeProcess.ProcessTypeId,
				corpId: this.corpId,
				procTypeName: this.name,
				procTypeNote: this.note,
				stat: this.stat
			}, function(response) {
				console.log("更改流程类型结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.activeProcess.ProcTypeName = com.name;
					com.activeProcess.ProcTypeNote = com.note;
					com.toggleLayer(false);
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},

		/**
		 * 分页获取流程
		 */
		requireProcess: function() {
			console.log("****requireProcess****")
			var com = this;
			processRequest.postProcessData("getProcessList", {
				corpId: this.corpId,
				stat: 0,
				pageIndex: 1,
				pageSize: 0
			}, function(response) {
				console.log("获取流程信息结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.processList = response.RspData.Data
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},
		//array to obj
		changeArrayToObj: function(arrays) {
			console.log("*****changeArrayToObj*****");
			var obj = {};
			for(var i in arrays) {
				obj[arrays[i].ApprMan] = arrays[i].ApprManName;
			}
			return obj;
		},
		/**
		 * 删除Process
		 * @param {Object} process
		 */
		delProcess: function(process) {
			var com = this;
			layerPlus.confirm({
				title: "删除流程",
				content: "确认删除此流程？"
			}, function() {
				com.delTheProcess(process);
			})
		},
		delTheProcess: function(process) {
			console.log("*****delProcess*****");
			var com = this;
			com.getCurPage();
			processRequest.postProcessData("delProcessType", {
				procTypeId: process.ProcessTypeId
			}, function(response) {
				console.log("删除流程结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.requireProcess();
				} else {
					layer.alert(response.RspTxt);
				}
			})
		}
	}
})