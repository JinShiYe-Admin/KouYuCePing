Vue.component("leave-setting", {
	template: "#leave-list",
	data: function() {
		return {
			leaveList: [],
			activeLeave: {
				LeaveTypeId: 0, //流程Id
				LeaveTypeName: "请假类型4", //流程名称
				LeaveTypeNote: "请假类型4备注", //流程备注
				Stat: 1,
				Isleader: 2
			},
			tablebases: null,
			changeType: 0, //0 新建流程 1修改流程
			checkedTea: false,
			checkedPar: false,
			name: "",
			note: "",
			pageIndex: 1,
			totalPage: 1,
			corpId: 0,
			curPage: 0
		}
	},
	filters: {
		getLeaveRelation: function(isLeader) {
			switch(isLeader) {
				case 0:
					return "老师和家长请假";
				case 1:
					return "老师请假";
				case 2:
					return "家长请假";
				default:
					return ""
			}
		}
	},
	mounted: function() {
		this.getCorpId();
	},
	watch: {
		leaveList: function(newVal, oldVal) {
			console.log("watch:leaveList:" + JSON.stringify(newVal))
			if(this.tablebases != null) {
				this.tablebases.destroy();
			}
			this.$nextTick(this.newTablebases);
		}
	},
	methods: {
		getCorpId: function() {
			console.log("******getCorpId*********")
			var com = this;
			request.requestPersonalInfo(function(response) {
				console.log("获取的corpId数据：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.corpId = JSON.parse(response.RspData).corpid;
					com.requireLeave();
				}
			}, 1)
		},
		newTablebases: function() {
			console.log("*****newTablebases******");
			var com = this;
			this.tablebases = $('.table-sort').DataTable({
				pageLength: 10,
				lengthChange: false,
				ordering: false,
				searching: false
			});
			com.tablebases.table(0).page(com.curPage).draw(false);
		},
		getCurPage: function() {
			this.curPage = this.tablebases.page.info().page;
		},
		/**
		 * 更改请假流程状态
		 * @param {Object} leave
		 * @param {Object} index
		 */
		changeState: function(leave, index) {
			console.log("*****Leave-changeState*****");
			processRequest.postProcessData("setLeaveType", {
				corpId: this.corpId,
				leaveTypeId: leave.LeaveTypeId,
				leaveTypeName: leave.LeaveTypeName,
				leaveTypeNote: leave.LeaveTypeNote,
				isLeader: leave.IsLeader,
				stat: (leave.Stat + 1) % 2
			}, function(response) {
				console.log("获取的显示/屏蔽状态结果：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					leave.Stat = (leave.Stat + 1) % 2;
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},
		/**
		 * 添加leave类型
		 */
		addLeave: function() {
			console.log("****addLeave*****")
			//todo 添加流程
			this.changeType = 0;
			this.name = "";
			this.note = "";
			this.checkedTea = false;
			this.checkedPar = false;
			this.toggleLayer(true, "添加请假类型");
		},
		/**
		 * 開關對話框
		 * @param {Object} isOpen
		 * @param {Object} title
		 */
		toggleLayer: function(isOpen, title) {
			console.log("****toggleLayer****");
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
		 * 更改请假类型信息
		 * @param {Object} leave
		 */
		changeLeaveInfo: function(leave) {
			console.log("*****changeLeaveInfo*****");
			this.changeType = 1;
			this.activeLeave = leave;
			this.name = leave.LeaveTypeName;
			this.note = leave.LeaveTypeNote;
			this.setCheckCon(leave.IsLeader);
			this.toggleLayer(true, "更改请假类型信息");
		},
		/**
		 * 編輯請假信息
		 */
		editLeave: function() {
			console.log("****editLeave****");
			if(this.name.length == 0) {
				layerPlus.alert("请输入请假类型名称！");
				return;
			}
			if(!this.checkedTea && !this.checkedPar) {
				layerPlus.alert("请选择请假类型关系！");
				return;
			}
			if(this.changeType == 0) {
				this.addLeaveType();
			} else {
				this.setLeave();
			}
		},
		/**
		 * 添加請假類型
		 */
		addLeaveType: function() {
			console.log("*****addLeaveType*****");
			var com = this;
			processRequest.postProcessData("addLeaveType", {
				corpId: this.corpId,
				leaveTypeName: this.name,
				leaveTypeNote: this.note,
				isLeader: this.getIsLeader()
			}, function(response) {
				console.log("添加流程类型的结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.toggleLayer(false);
					com.requireLeave(); //刷新数据
				} else {
					layer.alert(response.RspTxt)
				}
			})
		},
		/**
		 * 獲取關聯類型
		 */
		getIsLeader: function() {
			console.log("*****getIsLeader*****");
			if(this.checkedTea && this.checkedPar) {
				return 0;
			}
			if(this.checkedTea) {
				return 1;
			}
			if(this.checkedPar) {
				return 2;
			}
			return -1;
		},
		/**
		 * 修改請假信息
		 */
		setLeave: function() {
			console.log("****setLeave****");
			var com = this;
			processRequest.postProcessData("setLeaveType", {
				corpId: this.corpId,
				leaveTypeId: this.activeLeave.LeaveTypeId,
				leaveTypeName: this.name,
				leaveTypeNote: this.note,
				isLeader: this.getIsLeader(),
				stat: this.activeLeave.Stat
			}, function(response) {
				console.log("修改请假信息的结果:" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.activeLeave.LeaveTypeName = com.name;
					com.activeLeave.LeaveTypeNote = com.note;
					com.activeLeave.IsLeader = com.getIsLeader();
					com.toggleLayer(false);
				} else {
					layer.alert(response.RspTxt)
				}
			})
		},
		/**
		 * 设置选择状况
		 */
		setCheckCon: function(isLeader) {
			console.log("****setCheckCon****");
			switch(isLeader) {
				case 0:
					this.checkedTea = true;
					this.checkedPar = true;
					break;
				case 1:
					this.checkedTea = true;
					this.checkedPar = false;
					break;
				case 2:
					this.checkedTea = false;
					this.checkedPar = true;
					break;
				default:
					this.checkedTea = false;
					this.checkedPar = false;
					break;
			}
		},
		/**
		 * 獲取全部請假類型信息
		 */
		requireLeave: function() {
			console.log("*****requireLeave*****");
			var com = this;
			processRequest.postProcessData("getLeaveType", {
				corpId: this.corpId,
				stat: 0,
				pageIndex: this.pageIndex,
				pageSize: 0
			}, function(response) {
				console.log("获取的请假类型数据：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.leaveList = response.RspData.Data;
				} else {
					layer.alert(response.RspTxt)
				}
			})
		},
		/**
		 * 删除请假类型
		 * @param {Object} leave
		 */
		delLeave: function(leave) {
			var com = this;
			layerPlus.confirm({
				title: "删除请假类型",
				content: "确定删除此请假类型？"
			}, function() {
				com.delCurLeave(leave);
			})
		},
		delCurLeave: function(leave) {
			console.log("****delLeave*****");
			var com = this;
			com.getCurPage();
			processRequest.postProcessData("delLeaveType", {
				leaveTypeId: leave.LeaveTypeId
			}, function(response) {
				if(response.RspCode == 0) {
					com.requireLeave();
				} else {
					layer.alert(response.RspTxt);
				}
			})
		}
	}
})