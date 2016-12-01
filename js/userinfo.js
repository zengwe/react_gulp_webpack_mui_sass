/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	$(".userinfocontent ul li").on("tap",function(){
		var type=$(this).attr("class");
		var newwindow_param={
		    url:"../view/.html",
		    id:type,
		    createNew:false,
		    waiting:{
		      autoShow:true,
		      title:'正在加载...',
		    }
		}			
		switch (type) {
			case "nickname":
				newwindow_param.url="../view/nickname_edite.html";
				break;
			case "department":
				newwindow_param.url="../view/department_edite.html";
				break;
			case "motto":
				newwindow_param.url="../view/motto_edite.html";
				break;									
			default:
				// statements_def
				break;
		}
		if($.inArray(type,["nickname","department","motto"])!=-1){
			mui.openWindow(newwindow_param);
		}		
	});
	
});
document.addEventListener( "plusready",function(){
	$(".userinfocontent ul .special").on("tap",function(){
		console.log("plus");
		plus.gallery.pick( function(path){
			console.log(path)
		}, function(e){
			console.log(e);
		}, {
			filter:"image"
			//,multiple:true
		});
	});
}, false );