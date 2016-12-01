var FilterList=React.createClass({
	getInitialState:function(){
		let now=new Date().getTime();		
		let sevenAgo=now-7*24*60*60*1000;
		return {
			area:"全国",
			startTime:new Date(sevenAgo).Format("yyyy-MM-dd"),
			endTime:new Date(now).Format("yyyy-MM-dd"),
			type:"全部"
		}
	},
	componentDidMount:function(){
		let _this=this;
		let thisNode=_this.getDOMNode();
		//修改地址后的webview触发
		window.addEventListener("newArea",function(ev){
			_this.setState({area:ev.detail.name});
		});
		window.addEventListener("newStartTime",function(ev){
			_this.setState({startTime:ev.detail.time});
		});
		window.addEventListener("newEndTime",function(ev){
			_this.setState({endTime:ev.detail.time});
		});
		window.addEventListener("newType",function(ev){
			_this.setState({type:ev.detail.name});
		});						
		mui.plusReady(function(){
			var self = plus.webview.currentWebview(); 
			console.log(JSON.stringify(self));	
			console.log(self.page);
			if(self.startTime!=""){
				_this.state.startTime=new Date(self.startTime).Format("yyyy-MM-dd");
			}
			if(self.endTime!=""){
				_this.state.endTime=new Date(self.endTime).Format("yyyy-MM-dd");
			}
			if(self.type!=""){
				_this.state.type=self.type;
			}
			if(self.area!=""){
				_this.state.area=self.area;
			}
			_this.setState();
			mui(thisNode).on("tap","li",function(){
				let target=this.getAttribute("data-type");
				console.log(Object.prototype.toString.call(target));
				console.log(target);
				switch (target) {
					case "area":
						mui.openWindow({
						    url:"../view/filter_area_top.html",
						    id:"filter_area_top",
						    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
						    waiting:{
						      autoShow:true,//自动显示等待框，默认为true
						      title:'正在加载...',//等待对话框上显示的提示内容
						    },
						    extras:{
						    	area:_this.state.area,
						    	callEventWebviewId:self.id
						    }
						});
						break;
					case "startTime":
						mui.openWindow({
						    url:"../view/filter_time_top.html",
						    id:"filter_time_top",
						    waiting:{
						      autoShow:true,//自动显示等待框，默认为true
						      title:'正在加载...',//等待对话框上显示的提示内容
						    },
						    extras:{
						    	time:_this.state.startTime,
						    	callEventWebviewId:self.id,
						    	eventName:"newStartTime"
						    }
						});				
						break;
					case "endTime":
						mui.openWindow({
						    url:"../view/filter_time_top.html",
						    id:"filter_time_top",
						    waiting:{
						      autoShow:true,//自动显示等待框，默认为true
						      title:'正在加载...',//等待对话框上显示的提示内容
						    },
						    extras:{
						    	time:_this.state.endTime,
						    	callEventWebviewId:self.id,
						    	eventName:"newEndTime",
						    }
						});					
						break;
					case "type":
						mui.openWindow({
						    url:"../view/filter_type_top.html",
						    id:"filter_type_top",
						    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
						    waiting:{
						      autoShow:true,//自动显示等待框，默认为true
						      title:'正在加载...',//等待对话框上显示的提示内容
						    },
						    extras:{
						    	type:_this.state.type,
						    	callEventWebviewId:self.id
						    }
						});			
						break;
					default:
						// statements_def
						break;
				}
			});
			mui(".header").on("tap",".text_queren",function(){
				mui.fire(plus.webview.getWebviewById("home"),"newFilter",_this.state);
				mui.back();				
			});						
		});
	},
	render:function(){
		let _this=this;
		return (
			<ul className="filter">
				<li data-type="area">
					<span className="area_icon lefticon">地区</span>
					<span className="right_icon righticon">{_this.state.area}</span>
				</li>
				<li data-type="startTime">
					<span className="time_icon lefticon">起始时间</span>
					<span className="right_icon righticon">{_this.state.startTime}</span>
				</li>
				<li data-type="endTime">
					<span className="time_icon lefticon">结束时间</span>
					<span className="right_icon righticon">{_this.state.endTime}</span>
				</li>					
				<li data-type="type">
					<span className="type_icon lefticon">类型</span>
					<span className="right_icon righticon">{_this.state.type}</span>
				</li>									
			</ul>			
		);
	}
});
ReactDOM.render(
	<FilterList/>,
	document.querySelector('.user')
);