/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	mui.init();

	// setTimeout(function(){
	// 	mui.openWindow({
	// 	    url:"view/home.html",
	// 	    id:"home",
	// 	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	// 	    waiting:{
	// 	      autoShow:true,//自动显示等待框，默认为true
	// 	      title:'正在加载...',//等待对话框上显示的提示内容
	// 	    }
	// 	});		
	// }, 500);
	var storage = window.localStorage;
	console.log(storage);
	$(".ajax").on("tap",function(){
		console.log("ajaxtap");
		console.log(storage.length);
		if(storage&&storage.length!=0){
			mui.ajax(config.urls.login,{
				data:{
					username:storage.username,
					password:storage.password
				},
				dataType:'json',
				type:'post',
				timeout:10000,
				//headers:{'Content-Type':'application/json'},	              
				success:function(data){
					console.log("mui ajax success");
					console.log(data);
					if(data.errcode=4){
						setTimeout(function(){
							mui.openWindow({
							    url:"view/home.html",
							    id:"home",
							    createNew:false,
							    waiting:{
							      autoShow:true,
							      title:'正在加载...'
							    }
							});		
						}, 100);						
					}else{
						setTimeout(function(){
							mui.openWindow({
							    url:"view/login.html",
							    id:"login",
							    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
							    waiting:{
							      autoShow:true,//自动显示等待框，默认为true
							      title:'正在加载...',//等待对话框上显示的提示内容
							    }
							});		
						}, 100);						
					}
				},
				error:function(xhr,type,errorThrown){
					console.log("mui ajax error");
					console.log(type);
				}
			});			
		}else{
			setTimeout(function(){
				mui.openWindow({
				    url:"view/login.html",
				    id:"login",
				    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				    waiting:{
				      autoShow:true,//自动显示等待框，默认为true
				      title:'正在加载...',//等待对话框上显示的提示内容
				    }
				});		
			}, 500);			
		}	
	});
});