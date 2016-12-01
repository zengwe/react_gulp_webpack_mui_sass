mui.ready(function(){
	console.log(localStorage);
	if(localStorage.username){
		document.querySelector("#username").value=localStorage.username;
		document.querySelector("#password").value=localStorage.password;
	}
	mui(".remmenber").on("tap",".button-icon",function(){
		var target=document.querySelector(".remmenber .button-icon");
		var result=target.classList.contains("selected");
		if(result){
			target.className=target.className.replace(' selected', '');
		}else{
			target.className=target.className+" selected";
		}
	});
	mui(".input_group").on("tap",".submit_btn",function(){
		var data={
			username:document.querySelector("#username").value,
			password:document.querySelector("#password").value
		}
		if(data.username!=""&&data.password!=""){
			mui.ajax(config.urls.login,{
				data:data,
				dataType:'json',
				type:'post',
				timeout:10000,
				headers:{'Content-Type':'application/json'},	              
				success:function(res){
					console.log(res);
					if(res.errcode==4){
						var target=document.querySelector(".remmenber .button-icon");
						if(target.classList.contains("selected")){
							localStorage.username=data.username;
							localStorage.password=data.password;
						}else{
							localStorage.clear();
						}
						setTimeout(function(){
							mui.openWindow({
							    url:"/view/home.html",
							    id:"home",
							    createNew:false,
							    waiting:{
							      autoShow:true,
							      title:'正在加载...',
							    }
							});		
						}, 100);						
					}else{
						//错误提示
					}
				},
				error:function(xhr,type,errorThrown){
					console.log("mui ajax error");
					console.log(type);
				}
			});
		}	
	});
	mui(".regist_link").on("tap","a",function(){
		setTimeout(function(){
			mui.openWindow({
			    url:"/view/rejister.html",
			    id:"rejister",
			    createNew:false,
			    waiting:{
			      autoShow:true,
			      title:'正在加载...',
			    }
			});		
		}, 100);		
	});
});