 //此js用于保存本地存储时，用到的key值

var storageKeyName = (function(mod) {

	mod.key = 0;//0测试；1正式
	mod.pay=0;
	var exLog = console.log;
	console.log = function(hint, object) {
		if(mod.key === 0) {
			var argus = hint;
			if(typeof(object) !== 'undefined') {
				argus = hint + JSON.stringify(object);
			}
			exLog.apply(this, [argus]);
		}
	}
	switch(mod.key) {
		case 0: //测试
			mod.SCHOOLID = 0;
//			mod.SCHOOLID = 100102; //学校ID
			mod.USERTYPE = 2; //用户类型，0老师,1家长,2学生
			mod.INTERFACEGU = 'https://zhxy.jiaobaowang.net:8515/schadminwebapi/api/data/'; //用户信息接口
			mod.TEACHERIMG = 'https://zhxy.jiaobaowang.net:8515/schadminwebadmin/upuserimg.ashx?userid='; //老师上传头像
			mod.ANDROIDUPDATEURL='https://zhxy.jiaobaowang.net:8515/kouyuceping/versionCode.xml';//安卓升级地址
			
			mod.ALIPAYSERVER='http://192.168.1.121:8081/app/versionCode.xml';//支付宝支付地址
			if(mod.pay==0) {//单商家
				mod.WXPAYSERVER='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/AppServer.aspx';//微信支付地址
				mod.SEARCHPAYSESULT='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/PcQRCode.aspx';//获取支付结果的地址
			}else if(mod.pay==1){//多商家
				mod.WXPAYSERVER='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/AppServer.aspx';//微信支付地址
				mod.SEARCHPAYSESULT='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/PcQRCode.aspx';//获取支付结果的地址
			}

			//---七牛空间和接口---
//			mod.QNPB = 'https://qn-educds.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
//			mod.QNGETUPTOKENFILE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
//			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8004/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
//			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8004/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			
			//口语测评接口服务端地址
			//可用的地址：https://res.jiaobaowang.net; http://139.129.252.49:8080/res; http://192.168.0.122:801/res; http://139.129.252.49:8080/speeking
			mod.ORALSHOST = "http://139.129.252.49:8080/speeking";
			
			break;
			
			case 1:
				mod.SCHOOLID = 0;
//				mod.SCHOOLID = 100131; //学校ID
				mod.USERTYPE = 2; //用户类型，0老师,1家长,2学生
				mod.INTERFACEGU = "https://boss.zhuxue101.net:444/api/Data/";//用户信息接口
				mod.ORALSHOST = "https://zhxyx.jiaobaowang.net/speeking/";//口语测评接口
				
				mod.INTERFACEKONG = 'https://jbyj.jiaobaowang.net:8443/SchoolCommunicationService/';//孔工接口
				mod.TEACHERIMG = 'https://zhxy.jiaobaowang.net:8515/schadminwebadmin/upuserimg.ashx?userid='; //老师上传头像
				mod.QNGETUPLOADTOKEN = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen';
				mod.QNGETUPTOKENHEADIMGE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，
			break;
			
		default:
			break;
	}
	
	//套餐功能类型，多个之间用英文逗号隔开
	mod.FUNCTYPES = 'kycp'; 
	
	mod.BADGENUMBER = 'badgeNumber'//app角标
	mod.PUBLICPARAMETER = 'publicParameter'//共用参数
	mod.ISFIRST = 'isFitst'; //是否是第一次登陆
	mod.ICONNUM = 0; //角标数量
	mod.PERSONALINFO = 'personalInfo1111'; //个人信息，登录成功后返回值
	mod.SHAKEHAND = 'ShakeHand'; //公钥，登录时，返回的握手信息，
	mod.AUTOLOGIN = 'autoLogin'; //登录信息

	mod.WAITING = '加载中...'; //
	mod.UPLOADING = '上传中...';
	mod.SIGNKEY = 'jsy309'; //签名密钥
	//---七牛---start---
	//七牛上传空间key值
	//资源平台
	mod.QNPUBZYKEY = "jsy8004";
	//教宝云作业
	mod.QNPUBJBYZYKEY = "zy309309!";
	//教宝云盘
	mod.QNPUBJBYPKEY = "jbyp@2017";
	//教宝云用户管理
	mod.QUPUBJBMANKEY = "jbman456";
	//家校圈
	mod.QNPUBJXQKEY = "jxq789!@";
	//求知
	mod.QNPUBQZKEY = "qz123qwe";
	//校讯通
	mod.QNPUBXXT = "jsy@180526";

	//七牛存储子空间（文件二级文件名）
	mod.QNPUBSPACE = "pb"; //七牛公开空间
	mod.QNPRISPACE = "pv"; //七牛私有空间
	mod.XXTNOTICE = 'notice/'; //笔校讯通、通知
	//---七牛---end---
	
	/**
	 * 在本地存永久数据
	 * @param {Object} key
	 * @param {Object} value
	 */
	mod.setLocalStorage = function(key, value) {
		localStorage.setItem(key, value);
	}

	/**
	 * 取永久数据
	 * @param {Object} key
	 */
	mod.getLocalStorage = function(key) {
		return localStorage.getItem(key);
	}

	/**
	 * 删除单个永久数据
	 * @param {Object} key
	 */
	mod.removeLocalStorage = function(key) {
		localStorage.removeItem(key);
	}

	/**
	 * 删除所有的永久数据
	 */
	mod.clearLocalStorage = function() {
		localStorage.clear();
	}

	/**
	 * 在本地存临时数据
	 * @param {Object} key
	 * @param {Object} value
	 */
	mod.setSessionStorage = function(key, value) {
		sessionStorage.setItem(key, value);
	}

	/**
	 * 取临时数据
	 * @param {Object} key
	 */
	mod.getSessionStorage = function(key) {
		return sessionStorage.getItem(key);
	}

	/**
	 * 删除单个临时数据
	 * @param {Object} key
	 */
	mod.removeSessionStorage = function(key) {
		sessionStorage.removeItem(key);
	}

	/**
	 * 删除所有的临时数据
	 */
	mod.clearSessionStorage = function() {
		sessionStorage.clear();
	}

	return mod;

})(storageKeyName || {});