let LoadingState = require("./modules/LoadingState.jsx");
let EmptyList    = require("./modules/EmptyList.jsx");
let ContentList  = require("./modules/ContentList.jsx");
let FilterHeader = require("./modules/FilterHeader.jsx");
let FootEvent 	 = require("./modules/FootEvent.js");
let HeadEvent 	 = require("./modules/HeadEvent.js");
var Home = React.createClass({
	getInitialState:function(){
		return {
			condition:{
				city:"全国",
				sortby:"newest",
				sortChange:this.sortChange,
				areaChange:this.areaChange,
				startTime:"",
				endTime:"",
				type:"",
			},
			data:[],
			state:"loading",
			ajaxState:"complete"
		};
	},
	sortChange:function(sortby){
		//console.log(sortby);
		this.state.condition.sortby=sortby;
		if(sortby=="hotest"){
			this.getData({orderby:1,page:1},true);
		}else if(sortby=="newest"){
			this.getData({orderby:0,page:1},true);
		}
		this.setState();
	},
	areaChange:function(){

	},
	componentDidMount:function(){
		var _this=this;
		FootEvent();
		HeadEvent();
		this.getData({},true);	
		this.myScroll = new IScroll('.mui-scroll-wrapper', { 
			probeType: 3, 
			mouseWheel: true,
			scrollbars:true,
			mouseWheelSpeed:50,
			deceleration:0.001
		});	
		this.myScroll.on("scroll",function(){
			var y = this.y;
			//	maxY = this.maxScrollY - y;
			// 	console.log(maxY);
			// 	console.log(this.maxScrollY);
			// console.log(y);
			if(y>100){
				_this.getData({page:1},true);
			}
			if(y<this.maxScrollY-100){
				_this.getData({page:_this.filter.page+1},false);
			}
		});
		console.log("filter");
		console.log(JSON.stringify(_this.filter));
		mui(".header").on("tap",".right-filter-icon",function(){
			mui.openWindow({
			    url:"../view/filter_top.html",
			    id:"filter_top",
			    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			    waiting:{
			      autoShow:true,//自动显示等待框，默认为true
			      title:'正在加载...',//等待对话框上显示的提示内容
			    },
			    extras:_this.filter
			});
		});
		window.addEventListener("newFilter",function(ev){
			console.log(JSON.stringify(ev.detail));
			_this.getData({
				startTime:ev.detail.startTime,
				endTime:ev.detail.endTime,
				type:ev.detail.type,
				area:ev.detail.area,
				orderby:0,//0:最新1：最热
				page:1
			},true);
			_this.setState({
			condition:{
				city:ev.detail.area,
				sortby:"newest",
				sortChange:_this.sortChange,
				areaChange:_this.areaChange,
				startTime:ev.detail.startTime,
				endTime:ev.detail.endTime,
				type:ev.detail.type,
			},				
			});
		});					
	},
	filter:{
		startTime:"",
		endTime:"",
		type:"",
		area:"",
		orderby:0,//0:最新1：最热
		page:1
	},
	getData:function(condition,is_new){
		console.log(this.state.ajaxState);
		if(this.state.ajaxState=="complete"){
			let _this=this;
			for(let item in condition){
				if(_this.filter.hasOwnProperty(item)){
					_this.filter[item]=condition[item];
				}else{
					console.log("filter don't has this condition "+item);
				}
			}	
			if(is_new){
				this.state.state="loading";
				this.state.data=[];
				this.setState();
			}		
			mui.ajax(config.urls.home,{
				data:_this.filter,
				dataType:'json',
				type:'post',
				timeout:10000,
				headers:{'Content-Type':'application/json'},
				beforeSend:function(){
					_this.state.ajaxState="getting";
				},
				success:function(res){
					console.log(JSON.stringify(res));
					//callback(res.data);				
					if(is_new){
						_this.state.data=res.data;
					}else{
						for(let item in res.data){
							_this.state.data.push(res.data[item]);
						}
					}
					_this.state.state="complete";
					_this.setState();
				},
				error:function(err){
					console.log(err);
				},
				complete:function(){
					_this.state.ajaxState="complete";
				}		
			});						
		}

	},
	componentDidUpdate:function(){
		this.myScroll.refresh();
		console.log("Home componentDidUpdate");
	},			
	render:function(){
		let centerListDom=null;
		//console.log(this.state.is_init);
		if(this.state.state=="loading"){
			centerListDom=<LoadingState/>
		}else{
			if(this.state.data.length==0){
				centerListDom=<EmptyList/>;
			}else{
				centerListDom=<ContentList data={this.state.data}/>;
			}
		}
		return (
			<div className="mui-scroll">		
				<FilterHeader data={this.state.condition}/>
				{centerListDom}		
			</div>
		);
	}
});
ReactDOM.render(
	<Home/>,
	document.querySelector('.mui-scroll-wrapper')
);