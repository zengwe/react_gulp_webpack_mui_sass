/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	mui(".header").on("tap",".left-map-icon",function(){
		mui.back();
	});
	myScroll = new IScroll('.main', {
		probeType: 3, 
		mouseWheel: true,
		scrollbars:true,
		mouseWheelSpeed:50,
		deceleration:0.001
	});	
	//我要评论
	mui(".pull-mystatuse").on("tap",".comment_btn",function(){
		mui.openWindow({
		    url:"../view/comment_top.html",
		    id:"comment_top",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		})
	});
});