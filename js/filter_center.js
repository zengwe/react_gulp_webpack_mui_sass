/*
*@author zengw
*@contect 584778883@qq.com
*@time Thu Dec 01 2016 16:04:33 GMT+0800 (中国标准时间)
*/
mui.ready(function(){
	mui(".filter").on("tap","li",function(){
		//console.log($);
		// mui.openWindow({
		//     url:"../view/filter_top.html",
		//     id:"filter_top",
		//     // styles:{
		//     //   top:newpage-top-position,//新页面顶部位置
		//     //   bottom:newage-bottom-position,//新页面底部位置
		//     //   width:newpage-width,//新页面宽度，默认为100%
		//     //   height:newpage-height,//新页面高度，默认为100%
		//     //   ......
		//     // },
		//     // extras:{
		//     //   .....//自定义扩展参数，可以用来处理页面间传值
		//     // },
		//     createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		//     // show:{
		//     //   autoShow:true,//页面loaded事件发生后自动显示，默认为true
		//     //   aniShow:animationType,//页面显示动画，默认为”slide-in-right“；
		//     //   duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		//     // },
		//     waiting:{
		//       autoShow:true,//自动显示等待框，默认为true
		//       title:'正在加载...',//等待对话框上显示的提示内容
		//       // options:{
		//       //   width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
		//       //   height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
		//       //   ......
		//       // }
		//     }
		// });
	});
	var turn_param={
		    url:"../view/filter_top.html",
		    id:"filter_top",
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		}
	$(".filter").on("tap","li",function(ev){
		var target=$(this).attr("data-type");
		console.log(target);
		switch (target) {
			case "area":
				turn_param.url="../view/filter_area_top.html";
				turn_param.id="filter_area_top"
				break;
			case "time":
				turn_param.url="../view/filter_time_top.html";
				turn_param.id="filter_time_top-dfadsfadsf"
				break;
			case "type":
				turn_param.url="../view/filter_type_top.html";
				turn_param.id="filter_type_top-dfasdfad"
				break;								
			default:
				// statements_def
				break;
		}
		mui.openWindow(turn_param)
	});
		
});