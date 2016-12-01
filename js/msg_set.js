/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	$(".left-map-icon").on("tap",function(){
		mui.back();
	});
	$(".switch").on("tap",function(){
		if($(this).hasClass("switch_active")){
			
			$(this).removeClass("switch_active");
		}else{
			$(this).addClass("switch_active");
		}
	});
});