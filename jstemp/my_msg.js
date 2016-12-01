mui.ready(function(){
	myScroll = new IScroll('.mui-scroll-wrapper', { 
		probeType: 3, 
		mouseWheel: true,
		scrollbars:true,
		mouseWheelSpeed:50,
		deceleration:0.001
	});
	$(".header .left-map-icon").on("tap",function(){
		mui.back();
	});	
});