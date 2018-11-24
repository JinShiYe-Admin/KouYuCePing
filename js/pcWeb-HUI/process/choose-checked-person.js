/**
 * 选取审核人员
 */
Vue.component("choose-person", {
	template: "#person-list",
	props: {
		choosePerson: { //已选人员
			type: Object,
			default: function() {
				return {}
			}
		},
		checkedPerson: { //當前审核人员数据
			type: Object,
			default: function() {
				return {}
			}
		},
		choseDepart: { //选择的部门
			type: Object,
			default: function() {
				return {}
			}
		},
	},
	mounted: function() {},
	data: function() {
		return {
			personList: [],
			selectPerson: this.choosePerson
		}
	},
	watch: {
		choseDepart: function(newVal, oldVal) {
			console.log("****choseDepart****");
			this.personList = [];
			this.requireDepartPerson();
		},
		/**
		 * 所有具有審核權限的人員
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		checkedPerson: function(newVal, oldVal) {
			console.log("*****checkedPerson*****");
			console.log("所有已选人员：" + JSON.stringify(newVal));
		},
		/**
		 * 选择人员
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		choosePerson: function(newVal, oldVal) {
			console.log("choosePerson新值:" + JSON.stringify(newVal));
			console.log("choosePerson旧值:" + JSON.stringify(oldVal));
			this.selectPerson = newVal;
		},
		/**
		 * 监听已选人员
		 * @param {Object} newVal
		 */
		selectPerson: function(newVal) {
			console.log("selectPerson的新值：" + JSON.stringify(this.selectPerson))
			this.setChooseStatus();
		}
	},
	methods: {
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
		 * 请求部门人员
		 */
		requireDepartPerson: function() {
			console.log("*****requireDepartPerson*****");
			var com = this;
			request.getDepartPersons(com.choseDepart, 1, 0, function(data) {
				com.personList = data;
				com.setCheckedStatus();
				com.setChooseStatus();
			})
		},
		setCheckedStatus: function() {
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isChecked", !!com.checkedPerson[person.userid])
			})
		},
		/**
		 * 设置审核状态
		 */
		setChooseStatus: function() {
			console.log("****设置状态：setChooseStatus*****");
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isCheck", !!com.selectPerson[person.userid])
			})
			console.log("更改状态后的数据：" + JSON.stringify(com.personList));
		},
		/**
		 * 更新已选人员
		 */
		updateSelectPerson: function() {
			console.log("***updateSelectPerson***");
			this.$emit("select-person", this.selectPerson);
		},
		/**
		 * 选择或删除人员
		 * @param {Object} person
		 * @param {Object} index
		 */
		toggleChoosePerson: function(person, index) {
			console.log("toggleChoosePerson:" + JSON.stringify(person))
			if(person.isChecked) {
				return;
			}
			Vue.set(this.personList[index], "isCheck", !person.isCheck);
			if(person.isCheck) {
				this.selectPerson[person.userid] = person.name;
			} else {
				delete this.selectPerson[person.userid];
			}
			this.updateSelectPerson();
		}
	}
})