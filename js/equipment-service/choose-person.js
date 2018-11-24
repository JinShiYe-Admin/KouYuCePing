Vue.component("choose-person", {
	template: "#person-list",
	props: {
		choseDepart: {
			type: Object,
			default: function() {
				return {}
			}
		},
		choosePerson: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	mounted: function() {},
	data: function() {
		return {
			isAllCheck: false,
			personList: [],
			selectPerson: this.choosePerson
		}
	},
	watch: {
		choseDepart: function(newVal, oldVal) {
			this.personList = [];
			this.isAllCheck = false;
			this.requireDepartPerson();
		},
		choosePerson: function(newVal, oldVal) {
			console.log("choosePerson新值:" + JSON.stringify(newVal));
			console.log("choosePerson旧值:" + JSON.stringify(oldVal));
			this.selectPerson = newVal;

		},
		selectPerson: function(newVal) {
			console.log("selectPerson的新值：" + JSON.stringify(this.selectPerson))
			this.setChooseStatus();
		}
	},
	methods: {
		setChooseStatus: function() {
			console.log("****设置状态：setChooseStatus*****");
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isCheck", !!com.selectPerson[person.userid])
			})
			console.log("更改状态后的数据：" + JSON.stringify(com.personList));
		},
		updateSelectPerson: function() {
			console.log("***updateSelectPerson***");
			this.$emit("select-person", this.selectPerson);
		},
		toggleChoosePerson: function(person, index) {
			if(Object.keys(this.choosePerson).length >= 20) {
			 	layer.alert("最多选择20人！");
				return;
			}
			console.log("toggleChoosePerson:" + JSON.stringify(person))
			Vue.set(this.personList[index], "isCheck", !person.isCheck);
			if(person.isCheck) {
				this.selectPerson[person.userid] = person.name;
			} else {
				delete this.selectPerson[person.userid];
			}
			this.updateSelectPerson();
		},
		requireDepartPerson: function() {
			var com = this;
			request.getDepartPersons(this.choseDepart, 1, 0, function(data) {
				com.personList = data;
				com.setChooseStatus();
			})
		}
	}
})