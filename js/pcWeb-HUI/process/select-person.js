Vue.component("choose-person", {
	template: "#person-list",
	props: {
		//选择的人员
		choosePerson: {
			type: Array,
			default: function() {
				return []
			}
		},
		checkPersons: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	mounted: function() {},
	data: function() {
		return {
			personList: this.checkPersons,
			selectPerson: this.choosePerson
		}
	},
	watch: {
		checkPersons: function(newVal, oldVal) {
			console.log("*****checkPersons*******")
			console.log("newVal:" + JSON.stringify(newVal));
			this.personList = this.checkPersons;
		},
		/**
		 * 选择
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		choosePerson: function(newVal, oldVal) {
			console.log("choosePerson新值:" + JSON.stringify(newVal));
			console.log("choosePerson旧值:" + JSON.stringify(oldVal));
			this.selectPerson = newVal;

		},
		/**
		 * 
		 * @param {Object} newVal
		 */
		selectPerson: function(newVal) {
			console.log("selectPerson的新值：" + JSON.stringify(this.selectPerson))
			this.setChooseStatus();
		},
		/**
		 * 人員列表
		 */
		personList: function(newVal) {
			console.log("*******watch:personList********");
			console.log("personList:" + JSON.stringify(newVal));
			this.setChooseStatus();
		}
	},
	methods: {
		/**
		 * 设置选中状态
		 */
		setChooseStatus: function() {
			console.log("****设置状态：setChooseStatus*****");
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isCheck", com.isPersonSelected(person));
			})
			console.log("更改状态后的数据：" + JSON.stringify(com.personList));
		},
		/**
		 * 设置选中状态
		 * @param {Object} person
		 */
		isPersonSelected: function(person) {
			console.log("******isPersonSelected******");
			return this.selectPerson.some(function(sPerson) {
				return sPerson.ApprMan == person.ApprMan;
			})
		},
		/**
		 * 更新已选人员
		 */
		updateSelectPerson: function() {
			console.log("***updateSelectPerson***");
			this.$emit("select-person", this.selectPerson);
		},
		/**
		 * 
		 * @param {Object} person 人員
		 * @param {Object} index 人員index
		 */
		toggleChoosePerson: function(person, index) {
			console.log("toggleChoosePerson:" + JSON.stringify(person))
			Vue.set(this.personList[index], "isCheck", !person.isCheck);
			if(person.isCheck) {
				this.selectPerson.push(person);
			} else {
				this.delItemInArray(person);
			}
			this.updateSelectPerson();
		},
		/**
		 * 删除
		 * @param {Object} person
		 */
		delItemInArray: function(person) {
			console.log("******delItemInArray*******");
			var index = this.getIndexInArray(person)
			if(index >= 0) {
				this.selectPerson.splice(index, 1);
			}

		},
		/**
		 * 获取顺序
		 * @param {Object} person
		 */
		getIndexInArray: function(person) {
			console.log("*****getIndexInArray******");
			for(var i in this.selectPerson) {
				if(this.selectPerson[i].ApprMan == person.ApprMan) {
					return parseInt(i);
				}
			}
			return -1;
		}
	}
})