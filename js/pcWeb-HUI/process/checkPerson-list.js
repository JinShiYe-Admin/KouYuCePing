Vue.component("check-person-list", {
	template: "#checkPerson-list",
	data: function() {
		return {
			checkPersonList: [],
			tablebases: null,
			checkedPerson: {},
			changeType: 0, //0 新建流程 1修改流程
			corpId: 0,
			name: "",
			note: "",
			selectedInputPerson: {},
			isAllSelect: false,
			curPage: 0
		}
	},
	watch: {
		/**
		 * 
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		checkedPerson: function(newVal, oldVal) {
			console.log("*****chosedPerson******")
			this.$emit("person-info", newVal);

		},
		/**
		 * 审核人员列表
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		checkPersonList: function(newVal, oldVal) {
			console.log("*****checkPersonList******");
			console.log("newVal:" + JSON.stringify(newVal));
			if(this.tablebases != null) {
				this.tablebases.destroy();
			}
			this.$nextTick(this.newTablebases);
		}
	},
	mounted: function() {
		this.getCorpId();
	},
	methods: {
		getCorpId: function() {
			var com = this;
			request.requestPersonalInfo(function(response) {
				console.log("获取的corpId数据：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.corpId = JSON.parse(response.RspData).corpid;
					com.getAllCheckPerson();
				}
			}, 1)
		},
		/**
		 * 数据结构
		 */
		newTablebases: function() {
			console.log("******newTablebases******");
			var com = this;
			com.tablebases = $('.table-sort').DataTable({
				pageLength: 10,
				lengthChange: false,
				ordering: false,
				searching: false
			});
			$('.table-sort').on('page.dt', function() {
				var info = com.tablebases.page.info();
				$('#pageInfo').html('Showing page: ' + info.page + ' of ' + info.pages);
				com.isAllSelect = false;
				com.setAllUnselect();
			});
			com.tablebases.table(0).page(com.curPage).draw(false);
		},
		/**
		 * 获取状态
		 * @param {Object} e
		 * @param {Object} person
		 */
		getStatus: function(e, person) {
			console.log("****getStatus*****");
			var isAdd = e.target.checked;
			if(isAdd) {
				this.selectedInputPerson[person.TabId] = person.ApprManName;
			} else {
				delete this.selectedInputPerson[person.TabId];
				this.isAllSelect = false;
			}
		},
		/**
		 * 全选状态解控
		 */
		getAllCheckStatus: function(e) {
			console.log("*****getAllCheckSatus*****")
			this.getCurPage();
			this.inputToggleAll();
		},
		/**
		 * 获取当前页
		 */
		getCurPage: function() {
			this.curPage = this.tablebases.page.info().page;
		},
		/**
		 * 设置全取消选择
		 */
		setAllUnselect: function() {
			var com = this;
			com.checkPersonList.forEach(function(checkPerson, index) {
				com.$set(com.checkPersonList[index], "isSelect", com.isAllSelect);
			})
			com.selectedInputPerson = {};
		},
		/**
		 * 全选逻辑
		 */
		inputToggleAll: function() {
			console.log("****inputToggleAll****");
			var com = this;
			com.checkPersonList.forEach(function(checkPerson, index) {
				if(index >= com.curPage * 10 && index < (com.curPage + 1) * 10) {
					com.$set(com.checkPersonList[index], "isSelect", com.isAllSelect);
					if(com.isAllSelect) {
						com.selectedInputPerson[checkPerson.TabId] = checkPerson.ApprManName;
					}
				}
			})
			if(!com.isAllSelect) {
				com.selectedInputPerson = {}
			}
		},
		/**
		 * 所有具有审核权限的人员信息
		 */
		getAllCheckPerson: function() {
			console.log("****getAllCheckPerson*****");
			this.isAllSelect = false;
			this.getCheckPerson(1, 0);
		},
		/**
		 * 获取审核人员
		 * @param {Object} pageIndex
		 * @param {Object} pageSize
		 */
		getCheckPerson: function(pageIndex, pageSize) {
			console.log("****getCheckPerson****");
			var com = this;
			processRequest.postProcessData("getApprMan", {
				corpId: this.corpId,
				pageIndex: 1,
				pageSize: 0
			}, function(response) {
				if(response.RspCode == 0) {
					response.RspData.Data.forEach(function(person) {
						person.isSelect = false;
					}); //设置默认值
					com.checkPersonList = response.RspData.Data;
					com.checkedPerson = com.changeArrToObj(response.RspData.Data);
				} else {
					layer.alert(response.RspTxt);
				}
			})
		},
		/**
		 * 删除人员
		 */
		delPersons: function() {
			console.log("****批量删除人员****");
			if(Object.keys(this.selectedInputPerson).length == 0) {
				layer.alert("请选择人员！");
			} else {
				layerPlus.confirm({
					title: "删除审核人员",
					content: "确定要删除这些审核人员？"
				}, this.delSelectedPersons);
			}
		},
		/**
		 * 删除选择人员
		 */
		delSelectedPersons: function() {
			console.log("****delSelectedPersons****");
			var com = this;
			var keys = Object.keys(com.selectedInputPerson);
			console.log("selectedInputPerson:" + JSON.stringify(com.selectedInputPerson))
			console.log("theKeys:" + JSON.stringify(keys));
			var count = 0;
			for(var theKey in com.selectedInputPerson) {
				com.delPerson(theKey, function() {
					count++;
					console.log("数据数量：" + count);
					console.log("keys:" + keys.length);
					if(count == keys.length) {
						com.getAllCheckPerson();
					}
				})
			}
		},
		/**
		 * 删除当前审核人员
		 * @param {Object} person
		 */
		delCurPerson: function(person) {
			var com = this;
			layerPlus.confirm({
				title: "删除人员",
				content: "确定要删除此人？"
			}, function() {
				console.log("****delCurPerson*****");
				com.getCurPage();
				com.delPerson(person.TabId, function() {
					delete com.checkedPerson[person.ApprMan];
					com.getAllCheckPerson();
				});
			})
		},
		/**
		 * 刪除人員
		 * @param {Object} personId
		 * @param {Object} callback
		 */
		delPerson: function(personId, callback) {
			console.log("****delPerson****");
			var com = this;
			processRequest.postProcessData("delApprMan", {
				apprManId: personId
			}, function(response) {
				callback();
				if(response.RspCode != 0) {
					layer.alert(response.RspTxt);
				}
			})
		},
		/**
		 * 将数组转换成object
		 * @param {Object} arr
		 */
		changeArrToObj: function(arr) {
			console.log("****changeArrToObj****");
			var obj = {};
			arr.forEach(function(item, index, arr) {
				obj[item.ApprMan] = item.ApprManName;
			});
			console.log("checkedPerson:" + JSON.stringify(obj));
			return obj;
		},
		/**
		 * 添加人员
		 */
		addPersons: function() {
			router.push({
				name: "chooseDepart"
			})
		}
	}
})