function FootEvent(){
	$(".footclass .personal").on("tap",function(){
		mui.openWindow({
		    url:"../view/usercenter.html",
		    id:"usercenter",
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		});		
	});	
};
module.exports= FootEvent;