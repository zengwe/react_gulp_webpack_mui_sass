mui.ready(function(){
	var nav_height=$(".header").height();
	var url='/view/comment_center.html';
	mui.init({
		swipeBack: false,
		statusBarBackground: '#f7f7f7',
		gestureConfig: {
			doubletap: true
		},
		subpages: [{
			id: 'comment_center',
			url: url,
			styles: {
				top: nav_height+'px',
				// bottom: foot_height+"px",
				bounce: 'vertical'
			}
		}]
	});
	mui(".header").on("tap",".left-map-icon",function(){
		mui.back();
		// homepage = plus.webview.getWebviewById('home');
		// mui.fire(homepage,'test',{
  		//   		id:"id"
  		// 		});
	});		
});