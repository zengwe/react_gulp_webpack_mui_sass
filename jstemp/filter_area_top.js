mui.ready(function(){
	var nav_height=$(".header").height();
// 	mui.init({
// 		swipeBack: false,
// 		statusBarBackground: '#f7f7f7',
// 		gestureConfig: {
// 			doubletap: true
// 		},
// 		subpages: [{
// 			id: 'filter_area_center',
// 			url: "/view/filter_area_center.html",
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
	mui.plusReady(function(){
		var self = plus.webview.currentWebview(); 
		console.log(JSON.stringify(self));
	});
});