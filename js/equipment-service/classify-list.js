Vue.component("classify-list", {
	template: '#classify-list',
	data: function() {
		return {
			classifyList: [],
			serviceGroupName: '',
			changeType: 0, //0新增组 1更改组名
			activeClassify: {}
		}
	},
	mounted: function() {
		this.getAllGroups();
	},
	watch: {
		'$route' (to, from) {
			console.log("******页面导航监听******")
			console.log("to.path:" + to.path);
			console.log("from path:" + from.path);
			this.getAllGroups();
		},
		classifyList: function(newVal, oldVal) {
			console.log("classifyList改变后的值:" + JSON.stringify(newVal))
		}
	},
	filters: {
		formatTime: function(timeStr) {
			var timeArr = timeStr.split("T");
			var hourArr = timeArr[1].split(".");
			return timeArr[0] + " " + hourArr[0]
		}
	},
	methods: {
		changeState: function(classify, index) {
			var com = this;
			var stat = classify.stat ? 0 : 1;
			request.editSeviceGroup({
				colid: classify.kindsid,
				callcol: 'stat',
				colv: stat
			}, function(response) {
				if(response.RspCode == 0) {
					com.classifyList[index].stat = stat
				}
			})
		},
		changeGroupName: function(classify) {
			console.log("****changeGroupName****");
			this.changeType = 1;
			this.serviceGroupName = classify.cname;
			this.activeClassify = classify;
			this.toggleNameDialog(true);
		},
		addService: function() {
			console.log("****addService****");
			this.changeType = 0;
			this.serviceGroupName = '';
			this.toggleNameDialog(true);
		},
		changeClick: function() {
			console.log("****changeClick****");
			if(this.changeType) {
				this.changeServiceGroupName();
			} else {
				this.addServiceGroup();
			}
		},
		changeServiceGroupName: function() {
			console.log("****changeServiceGroupName****");
			var com = this;
			if(com.serviceGroupName.length > 20) {
				layer.alert("组名最多20字！");
				return;
			}
			request.editSeviceGroup({
				callcol: "cname",
				colid: this.activeClassify.kindsid,
				colv: this.serviceGroupName
			}, function(response) {
				if(response.RspCode == 0) {
					com.activeClassify.cname = com.serviceGroupName
				}
				com.toggleNameDialog(false);
			})
		},
		addServiceGroup: function() {
			console.log("****addServiceGroup****");
			
			request.addServiceGroup(this.serviceGroupName, function(response) {
				if(response.RspCode == 0) {
					com.getAllGroups();
				}
				com.toggleNameDialog(false);
				com.serviceGroupName = '';
			})
		},
		toggleNameDialog: function(isOpen) {
			console.log("****toggleNameDialog****");
			if(isOpen) {
				$("#modal-demo").modal("show");
			} else {
				$("#modal-demo").modal("hide");
			}
		},
		getAllGroups: function() {
			var com = this;
			console.log("****getAllGroups****");
			request.getServiceGroups(function(data) {
				console.log("获取所有值：" + JSON.stringify(data));
				if(data.RspCode == 0) {
					com.manageGroupsData(data.RspData.dt)
				}
			})
		},
		manageGroupsData: function(listData) {
			console.log("****manageGroupsData****")
			var com = this;
			com.classifyList = listData.map(function(item, index, list) {
				item.gusers = com.manageGusersToObject(item.gusers);
				item.isShow = false;
				return item;
			})
			console.log("获取的全部组信息:" + JSON.stringify(com.classifyList))
		},
		manageGusersToObject: function(str) {
			console.log("****manageGusersToObject****");
			var perStrArr = str.split("|");
			var reObj = {};
			if(perStrArr.length > 0) {
				perStrArr.forEach(function(perStr) {
					if(perStr != "") {
						var personArr = perStr.split(",")
						reObj[personArr[0]] = personArr[1];
					}
				})
			}
			console.log("获取的成员信息：" + JSON.stringify(reObj));
			return reObj;
		},
		changePerson: function(classify) {
			console.log("****changePerson****");
			console.log("要传递的classify:" + JSON.stringify(classify));
			this.$emit("group-info", classify);
			router.push({
				name: 'chooseDepart'
			})
		},
		addPersons:function(){
			if(this.serviceGroupName.length > 20) {
				layer.alert("组名最多20字！");
				return;
			}
			var classify={
				cname:this.serviceGroupName,
				gusers:{}
			}
			this.changePerson(classify)
		},
		delClassify: function(classify, index) {
			console.log("*****delClassify*****")
			var com = this;
			request.delServiceGroup(classify.kindsid, function(response) {
				if(response.RspCode == 0) {
					com.classifyList.splice(index, 1);
					console.log("删除组后的数组:" + JSON.stringify(com.classifyList))
				}
			})
		}
	}
})