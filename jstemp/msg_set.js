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