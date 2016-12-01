/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
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