Vue.component("depart-tree-node", {
	props: {
		departInfo: {
			default: function() {
				return {
					departList: [],
					personList: []
				}
			},
			type: Object
		},
		activeDepart: {
			type:Object
		}
	},
	template: '<li>' +
		'<p  v-on:click.stop="toggleDepart()" v-bind:class="[{\'selected-style\':departInfo.value==activeDepart.value}]"><span v-bind:class="[\'Hui-iconfont\',{\'Hui-iconfont-arrow3-bottom\':isShow},{\'Hui-iconfont-arrow3-right\':!isShow}]"></span>{{departInfo.title}}</p>' +
		'<ul style="padding-left:15px" v-show="isShow">' +
		'<li v-for="person in departInfo.personList">' +
		'</li>' +
		'<depart-tree-node v-bind:active-depart="activeDepart" v-on:active-depart="getActiveDepart" v-for="depart in departInfo.departList"  v-bind:depart-info="depart" v-on:choosePseron="getPersons(persons)"></depart-tree-node>' +
		'</ul>' +
		'</li>',
	data: function() {
		return {
			choosePersons: [],
			isShow: false
		}
	},
	mounted: function() {
		if(this.activeDepart.value==this.departInfo.value){
			this.isShow=true
		}
	},
	methods: {
		getPersons: function(persons) {
			this.choosePersons = this.choosePersons.concat(persons);
			this.$emit("choosePerson", this.choosePersons);
		},
		toggleDepart: function() {
			this.$emit("active-depart",this.departInfo);
			console.log("向上传递的事件activeDepart")
			if(this.isShow) {
				this.isShow = false;
			} else {
				if(this.departInfo.personList.length > 0) {
					this.isShow = true;
				} else {
					this.isShow = true
				}
			}
		},
		getActiveDepart:function(depart){
			this.$emit("active-depart",depart)
		},
		requirePersons: function() {
			var com = this;
			request.getDepartPersons(com.departId, 0, 1, function(data) {
				console.log("获取的本部门人员:" + JSON.stringify(data));
				com.departInfo.personList = data; //获取老师列表数据
				//如果此部门没有子部门和老师，弹出提示框
				com.isShow = true;
			})
		}
	}
})