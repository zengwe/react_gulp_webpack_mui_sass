/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	$(".userinfo .userimg").on("tap",function(){
		mui.openWindow({
		    url:"../view/userinfo.html",
		    id:"main_body",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});
	});	
	myScroll = new IScroll('.mui-scroll-wrapper', { 
		probeType: 3, 
		mouseWheel: true,
		scrollbars:true,
		mouseWheelSpeed:50,
		deceleration:0.001
	});
	$(".list .dongtai").on("tap",function(){
		mui.openWindow({
		    url:"../view/dynamic_state.html",
		    id:"my_dongtai",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});
	});
	$(".list .mymsg").on("tap",function(){
		mui.openWindow({
		    url:"../view/my_msg.html",
		    id:"my_msg",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});
	});
	$(".list .sys_setting").on("tap",function(){
		mui.openWindow({
		    url:"../view/setting.html",
		    id:"my_msg",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});
	});					
});