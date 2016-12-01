/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	$(".left-map-icon").on("tap",function(){
		mui.back();
	});
	$(".set_list .newmsg").on("tap",function(){
		mui.openWindow({
		    url:"../view/msg_set.html",
		    id:"newmsg",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});		
	});
	$(".set_list .feedback").on("tap",function(){
		mui.openWindow({
		    url:"../view/feedback.html",
		    id:"feedback",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});		
	});	
});