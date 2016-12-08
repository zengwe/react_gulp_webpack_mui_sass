/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 08 2016 09:42:05 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	var target=document.querySelectorAll(".input_box");
	for(var i=0;i<target.length;i++){
		target[i].addEventListener("focus",function(){
			this.nextElementSibling.style.display="none";
		});		
	}
	mui(".input_group").on("tap",".getcode-btn",function(){
		var _this=this;	
		var phone=document.getElementById("phone").value;
		if(!validata_phone(phone)){
			document.getElementById("phone").blur();
			document.getElementById("phone").nextElementSibling.style.display="block";
			return true;
		}
		_this.disabled=true;
		mui.ajax(config.urls.getcode,{
			data:{},
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				console.log(res);
				if(res.errcode==200){
					_this.innerText="60s";
					var i=60;
					var timmer=setInterval(function(){
						i--;
						if(i<0){
							clearInterval(timmer);
							_this.innerText="重新获取";
							_this.disabled=false;
						}else{
							_this.innerText=i+"s";
						}						
					},1000);
				}else{
					_this.innerText="获取失败";
					_this.disabled=false;
				}
			},
			error:function(xhr,type,errorThrown){
				console.log("mui ajax error");
				console.log(type);
				_this.disabled=false;
			},
			complete:function(){
				console.log("complete");
			}
		});		
	});
	mui(".input_group").on("tap",".submit_btn",function(){
		var _this=this;
		for(var i=0;i<target.length;i++){
			target[i].blur();					
		}
		var data={
			phone:document.querySelector("#phone").value,
			code:document.querySelector("#code").value,
			password:document.querySelector("#password").value,
			repassword:document.querySelector("#repassword").value
		}
		console.log(data);
		var is_pass=true;
		if(!validata_phone(data.phone)){
			document.querySelector("#phone").nextElementSibling.style.display="block";
			is_pass=false;
		}
		if(data.code==""){
			document.querySelector("#code").nextElementSibling.style.display="block";
			is_pass=false;
		}

		if(data.password.length<5){
			document.querySelector("#password").nextElementSibling.style.display="block";
			is_pass=false;
		}
		if(data.password!=data.repassword){
			document.querySelector("#repassword").nextElementSibling.style.display="block";
			is_pass=false;
		}
		if(!is_pass){
			console.log("验证不通过");
			return false;
		}
		_this.disabled=true;
		_this.innerText="提交中…";
		mui.ajax(config.urls.rejister,{
			data:data,
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				console.log(res);
				if(res.errcode==200){
					setTimeout(function(){
						mui.openWindow({
						    url:"/view/home.html",
						    id:"home",
						    createNew:false,
						    waiting:{
						      autoShow:true,
						      title:'正在加载...'
						    }
						});		
					}, 100);					
				}else{
					console.log(res);
				}
			},
			error:function(xhr,type,errorThrown){
				console.log("mui ajax error");
				console.log(type);
				_this.disabled=false;
			},
			complete:function(){
				_this.innerText="提交";
				_this.disabled=false;
			}
		});		
	});
});