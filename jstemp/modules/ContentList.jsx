let EmptyList    = require("./EmptyList.jsx");
let LoadingState = require("./LoadingState.jsx");
let MediaList    = require("./MediaList.jsx");
var ContentList = React.createClass({
	getInitialState: function() {
		return {
			state:"loading",
			contentList:[<LoadingState/>],
		}
	},
	componentWillMount:function(){
		console.log("ContentList componentWillMount");
	},	
	componentDidMount:function(){
		//console.log(this);
		console.log("ContentList componentDidMount");
		var thisNode=this.getDOMNode();
		mui(thisNode).on("tap",".contenttext",function(){
			mui.openWindow({
			    url:"../view/main_body.html",
			    id:"main_body",
			    createNew:false,
			    waiting:{
			      autoShow:true,//自动显示等待框，默认为true
			      title:'正在加载...',//等待对话框上显示的提示内容
			    }
			});
		});
	},
	componentWillReceiveProps:function(revProps){

	},	
	shouldComponentUpdate:function(){
		//console.log("ContentList shouldComponentUpdate");		
		return true;		
	},
	componentWillUpdate:function(){
		//console.log("ContentList componentWillUpdate");	
	},
	componentDidUpdate:function(){	
		//console.log("ContentList componentDidUpdate");	
	},
	componentWillUnmount:function(){
		//console.log("ContentList componentWillUnmount");			
	},
	render:function(){
		let html=[];
		let list=this.props.data;
		//let list=this.state.contentList;
		//let texttype=<Textdescript />;
		if(list.length==0){
			html[0]=<EmptyList />;		
		}else{
			for(let i=0;i<list.length;i++){
				html.push(
					<div className="main-list"  data-contentid={list[i].contentId}>
						<div className="content-info">
							<a className="userinfo">
								<img className="user-photo" src={config.imgurl+list[i].userHead} alt=""/>
								<div className="text-info">
									<span className="nike-name">{list[i].username}</span>
									<span className="pub-time">{new Date(list[i].time).Format("yyyy-MM-dd")}</span>
								</div>
							</a>
							<div className="response">
								<a className="comments">{list[i].commentCount}</a>
								<a className="likes">{list[i].likeCount}</a>
							</div>
						</div>
						<MediaList media={list[i].media} eType={list[i].eType}/>
						<div className="pub-positon" data-lon={list[i].gis_lon} data-lat={list[i].lat} data-height={list[i].height}>
							{list[i].area}
						</div>
					</div>				
				);
			}			
		}			
		return (
			<div className="main-content">
				{html}
			</div>
			);
	}
});
module.exports= ContentList;