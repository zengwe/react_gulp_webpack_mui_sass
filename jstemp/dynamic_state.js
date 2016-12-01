mui.ready(function(){
	$(".header .left-map-icon").on("tap",function(){
		mui.back();
	});	
	myScroll = new IScroll('.mui-scroll-wrapper', { 
		probeType: 3, 
		mouseWheel: true,
		scrollbars:true,
		mouseWheelSpeed:50,
		deceleration:0.001
	});	
});