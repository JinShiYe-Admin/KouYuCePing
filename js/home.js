/**
 * @author an
 * 轮播图  加载图片
 * @param {Object} imgUrls
 */
/* 
 * @param {Object} gride 九宫格父控件
 * @param {Object} array 元素数组，包括图标和标题
 */
var createGirde = function(gride, array) {

	//数组遍历
	array.forEach(
		/**
		 * 创建子元素
		 * @param {Object} map 数组元素
		 * @param {Object} index 数组序号
		 * @param {Object} array 数组<span style="background-color:red;width:10px;height:10px;border-radius: 50%;text-align: center;margin-top:50px' +
				';">1 </span>
		 */
		function(map, index, array) {
			var li = document.createElement('li'); //子元素
			li.id = index;
			//			var bgColor = getRandomColor(); //获取背景色
			if(array.length <= 3) { //数组小于等于3，每行3个图标
				li.className = "mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4";
			} else { //数组大于3，每行四个图标
				li.className = "mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3";
			}
			//子控件的innerHTML
			if (map.grideShow == 0) {
				li.style.display = 'none';
			} else{
				
			}
			li.innerHTML = '<a href="#">' +
				'<img class="mui-icon circular-square" src="' + map.imgUrl +
				'" style="background-color:' +
				';"><span id="noRead_' + index + '" class="mui-badge mui-hidden">1</span></img>' +
				'<small class="mui-media-body">' + map.description + '</small>' +
				'</a>';
			/**
			 * 子控件加载点击监听事件
			 */

			//父控件加载子控件
			gride.appendChild(li)
		})
}

/**
 * 创建子控件数组
 * @param {Object} chars 底部标题 数组
 * @param {Object} imgUrls 图片Url 数组
 * @param {Object} urls 跳转页面Url数组
 */
var createArray = function(chars, imgUrls, urls) {
	var array = new Array();
	//遍历
	for(i = 0; i < chars.length; i++) {
		var value = {
			grideShow:chars[i].grideShow,
			description: chars[i].grideName,
			imgUrl: imgUrls[i],
			tarUrl: urls[i]
		}
		array.push(value)
	}
	console.log(JSON.stringify(array))
	return array;
}

/**
 * 九宫格
 *  圆形按钮
 * @param {Object} id 父控件id
 */
var getHomeCircle = function(id) {
	//九宫格底部标题数组
//	var chars = ["基础信息", "通知公告", "事务审批", "班级管理", "课堂管理", "访客", "签到考勤", "敬请期待"];
	var chars = [{
		grideName: '基础信息',
		grideShow: 0
	}, {
		grideName: '通知公告',
		grideShow: 1
	}, {
		grideName: '事务审批',
		grideShow: 1
	}, {
		grideName: '班级管理',
		grideShow: 0
	}, {
		grideName: '课堂管理',
		grideShow: 0
	}, {
		grideName: '访客',
		grideShow: 0
	}, {
		grideName: '签到考勤',
		grideShow: 1
	}, {
		grideName: '敬请期待',
		grideShow: 0
	}];
	//九宫格图片地址数组
	var imgUrls = ["../../img/firstPage/firstPage0.png",
		"../../img/firstPage/firstPage1.png",
		"../../img/firstPage/firstPage2.png",
		"../../img/firstPage/firstPage3.png",
		"../../img/firstPage/firstPage4.png",
		"../../img/firstPage/firstPage5.png",
		"../../img/firstPage/firstPage6.png",
		"../../img/firstPage/firstPage7.png"
	];
	//点击跳转的html地址数组
	var urls = ['all.html', 'all.html', 'all.html', 'all.html', 'all.html', 'all.html', 'all.html', 'all.html'];
	var gride = document.getElementById(id); //九宫格父控件
	createGirde(gride, createArray(chars, imgUrls, urls)); //创建九宫格
}
/**
 * 创建随机颜色
 */
var getRandomColor = function() {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
/**
 * 打开新页面
 */
var openTarWindow = function(tarUrl, map, index, array) {
	mui.openWindow({
		url: tarUrl,
		id: tarUrl,
		styles: {
			top: localStorage.getItem('$Statusbar') //设置距离顶部的距离
		},
		extras: { //界面传值
			name0: map.description,
			name1: map.imgUrl,
			index: index
		}
	});
	console.log('打开新界面：' + index);
}

var addImg = function(imgUrls, titles) {
	var group = document.body.querySelector(".mui-slider-group,.mui-slider-loop")
	addDiv(imgUrls[imgUrls.length - 1], titles[titles.length - 1], group)
	imgUrls.forEach(function(imgUrl, index, imgUrls) {
		var div = document.createElement('div');
		div.className = "mui-slider-item"
		div.innerHTML = '<a href="#">' +
			'<img src="' + imgUrl + '">' +
			'<p class="mui-slider-title" style="background-color: #BFEBB2;">' + titles[index] + '</p>' +
			'</a>'
		group.appendChild(div);
	})
	addDiv(imgUrls[0], titles[0], group)
}
/**
 * 加载底部条状物
 * @param {Object} imgUrls
 */
var addStrip = function(imgUrls) {
	var strip = document.body.querySelector(".mui-slider-indicator");
	for(i = 0; i < imgUrls.length; i++) {
		var div = document.createElement('div');
		if(i == 0) {
			div.className = "mui-indicator mui-active"
		} else {
			div.className = "mui-indicator"
		}
		strip.appendChild(div);
	}
}
/**
 * 加载第一条和最后一条数据
 * @param {Object} imgUrl
 * @param {Object} group
 */
var addDiv = function(imgUrl, title, group) {
	var div = document.createElement('div');
	div.className = "mui-slider-item mui-slider-item-duplicate"
	div.innerHTML = '<a href="#">' +
		'<img src="' + imgUrl + '">' +
		'<p class="mui-slider-title"  style="background-color: #BFEBB2;">' + title + '</p>' +
		'</a>';
	group.appendChild(div);
}
/**
 * 这个其实没啥用
 */
var getImgArray = function() {
	var imgArray = new Array();
	imgArray.push("../../img/firstPage/u292.png")
	imgArray.push("../../img/firstPage/u296.png")
	imgArray.push("../../img/firstPage/u298.png")
	return imgArray;
}