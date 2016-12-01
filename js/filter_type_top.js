/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	var nav_height=$(".header").height();
// 	mui.init({
// 		swipeBack: false,
// 		statusBarBackground: '#f7f7f7',
// 		gestureConfig: {
// 			doubletap: true
// 		},
// 		subpages: [{
// 			id: 'filter_type_center',
// 			url: "/view/filter_type_center.html",
// 			styles: {
// 				top: nav_height+'px',
// //				bottom: foot_height+"px",
// 				bounce: 'vertical'
// 			}
// 		}]
// 	});
	$(".left-map-icon").on("tap",function(){
		mui.back();
	});	
});