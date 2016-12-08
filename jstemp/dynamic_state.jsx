let MediaList = require("./modules/MediaList.jsx");
let LoadingState = require("./modules/LoadingState.jsx");
let EmptyList    = require("./modules/EmptyList.jsx");
let DynamicList=React.createClass({
	componentDidMount:function(){
		let _this=this;
		let thisNode=this.getDOMNode();
		mui(thisNode).on("tap",".remove",function(){
			_this.props.removeItem(_this.props.data);
		});
	},
	render:function(){
		let _this=this;
		return (
			<div className="main-list">
				<MediaList media={_this.props.data.media} eType={_this.props.data.eType}/>
				<div className="pub-positon">{_this.props.data.area}</div>
				<div className="article_info">
					<div className="time">{new Date(_this.props.data.time).Format("yyyy-MM-dd hh:mm")}</div>
					<div className="respone">
						<div className="comments">{_this.props.data.commentCount}</div>
						<div className="liked">{_this.props.data.likeCount}</div>
					</div>
					<div className="handle">
						<a className="share"></a>
						<a className="remove"></a>
					</div>
				</div>					
			</div>				
		);
	}
});
let DomContent=React.createClass({
	getInitialState:function(){
		return {
			data:[],
			init:true,
			ajaxState:"complete"
		}
	},
	componentDidMount:function(){
		let _this=this;
		_this.getData({},true);
		_this.myScroll = new IScroll('.mui-scroll-wrapper', { 
			probeType: 3, 
			mouseWheel: true,
			scrollbars:true,
			mouseWheelSpeed:50,
			deceleration:0.001
		});
		_this.myScroll.on("scroll",function(){
			var y = this.y;
			if(y>100){
				_this.getData({page:1},true);
			}
			if(y<this.maxScrollY-100){
				_this.getData({page:_this.filter.page+1},false);
			}
		});		
	},
	componentDidUpdate:function(){
		this.myScroll.refresh();
	},
	filter:{
		startTime:"",
		endTime:"",
		type:"",area:"",
		orderby:0,//0:最新1：最热
		page:1		
	},
	getData:function(filter,isNew){
		let _this=this;
		if(_this.state.ajaxState=="complete"){
			for(let item in filter){
				if(_this.filter.hasOwnProperty(item)){
					_this.filter[item]=filter[item];
				}
			}
			if(isNew){
				_this.setState({
					data:[],
					init:true
				});
			}
			mui.ajax(config.urls.home,{
				data:_this.filter,
				dataType:"JSON",
				type:"post",
				timeout:10000,
				headers:{'Content-Type':'application/json'},
				beforeSend:function(){
					_this.state.ajaxState="getting"
				},
				success:function(res){
					if(Object.prototype.toString.call(res)=="[object String]"){
						res=JSON.parse(res);
					}					
					for(let i=0;i<res.data.length;i++){
						_this.state.data.push(res.data[i]);
					}
					_this.setState();
				},
				error:function(err){
					console.log(err);
				},
				complete:function(){
					_this.setState({
						ajaxState:"complete",
						init:false
					});
				}
			});
		}
	},
//	parseData:function(data){
//		if(Object.prototype.toString.call(res)=="[object Array]"){
//			
//		}
//	},
	removeItem:function(item){
		for(let i=0;i<this.state.data.length;i++){
			if(this.state.data[i].contentId==item.contentId){
				this.state.data.splice(i,1);
				this.setState();
				break;
			}
		}
	},
	render:function(){
		let _this=this;
		let content=Array();
		if(this.state.init){
			content=<LoadingState/>;
		}else{
			if(this.state.data.length==0){
				content=<EmptyList/>;
			}else{
				for(let i=0;i<this.state.data.length;i++){
					content.push(<DynamicList removeItem={_this.removeItem} data={_this.state.data[i]}/>);
				}
			}
		}
		return (
			<div className="mui-dscroll">
				<div className="main-content">
				{content}
				</div>
			</div>
		);
	}
});
ReactDOM.render(
	<DomContent/>,
	document.querySelector('.mui-scroll-wrapper')
);
mui.ready(function(){
	mui(".header").on("tap",".left-map-icon",function(){
		mui.back();
	});	
});
