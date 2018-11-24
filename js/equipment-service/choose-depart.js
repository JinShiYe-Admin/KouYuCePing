Vue.component("choose-depart", {
	template: "#choose-depart",
	data: function() {
		return {
			rootDeparts: [],
			choosePerson: [],
			activeDepart: {}
		}
	},
	mounted: function() {
		this.getAllDeparts();
	},
	watch: {
		rootDeparts: function(newVal, oldVal) {
			if(newVal.length > 0 && oldVal.length == 0) {
				this.activeDepart = newVal[0];
				this.$emit('active-depart', this.activeDepart);
			}
		}
	},
	methods: {
		/**
		 * 获取响应的部门
		 * @param {Object} depart
		 */
		getActiveDepart: function(depart) {
			this.activeDepart = depart;
			console.log("当前选中的depart:" + JSON.stringify(depart))
			this.$emit('active-depart', depart);
		},
		/**
		 * 选择已选人员
		 * @param {Object} persons
		 */
		getChoosePerson: function(persons) {
			console.log("已选人员：" + JSON.stringify(persons))
			this.choosePerson = persons;

		},
		/**
		 * 获取所有部门
		 * @param {Object} callback
		 */
		getAllDeparts: function(callback) {
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			request.getDepartList(function(data) {
				console.log("getAllListData获取的部门列表：" + JSON.stringify(data));
				com.rootDeparts = com.getNodeTree(data);
				com.isLoading = false;
			});
		},
		/**
		 * 重新排序
		 * @param {Object} nodes
		 */
		getNodeTree: function(nodes) {
			console.log('****choose-depart***getChildrenTree***')
			if(typeof(nodes) === 'undefined' || nodes.length === 0) {
				return []
			}
			nodes.sort(function(a, b) {
				return a.value - b.value
			})
			var map = {},
				node, roots = [];
			for(var i = 0; i < nodes.length; i++) {
				node = nodes[i]
				node.departList = []
				node.personList = []
				map[node.value] = i // use map to look-up the parents
				if(typeof(map[node.parentvalue]) !== 'undefined') {
					nodes[map[node.parentvalue]].departList.push(node)
				} else {
					if(node.value >= 0) {
						roots.push(node);
					}
				}
			}
			console.log('getChildrenTree获取的数据：' + JSON.stringify(roots))
			return roots
		}
	}
})