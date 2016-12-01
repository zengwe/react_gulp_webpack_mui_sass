let EmptyList    = require("./modules/EmptyList.jsx");
let ChooseList    = require("./modules/ChooseList.jsx");
let LoadingState = require("./modules/LoadingState.jsx");
var Promise = require('es6-promise').Promise;
let MainCenter=React.createClass({
	getInitialState:function(){
		return {
			data:[],
			changeFunc:this.changeActive,
			ajaxState:"loading"
		}		
	},
	changeActive:function(data){
		console.log(data);
		for(let i=0;i<this.state.data.length;i++){
			if(this.state.data[i].name==data.name){
				this.state.data[i].active=1;
			}else{
				this.state.data[i].active=0;
			}
		}
		this.setState();
	},
	componentDidMount:function(){
		let _this=this;
		var getdata = new Promise((resolve, reject) => {
  			_this.getData(resolve);
		});
		var active =new Promise((resolve,reject)=>{
			mui.plusReady(function(){
				var self = plus.webview.currentWebview(); 
				console.log(JSON.stringify(self));
				resolve(self.area);
			});
			setTimeout(function(){
				resolve("全国");
			},1000);		
		});
		Promise.all([getdata,active]).then(values=>{
			console.log(values);
			_this.parseData(values[0],values[1]);
		});
		this.myScroll = new IScroll('.inputcommentsarea', { 
			probeType: 3, 
			mouseWheel: true,
			scrollbars:true,
			mouseWheelSpeed:50,
			deceleration:0.001
		});
		mui.plusReady(function(){
			mui(".header").on("tap",".text_queren",function(){
				var self = plus.webview.currentWebview();
				console.log(JSON.stringify(self));
				for(let i=0;i<_this.state.data.length;i++){
					console.log(JSON.stringify(_this.state.data[i]));
					if(_this.state.data[i].active==1){
						console.log(JSON.stringify(_this.state.data[i]));
						//plus.webview.getWebviewById(webviewId)
						mui.fire(plus.webview.getWebviewById(self.callEventWebviewId),"newArea",_this.state.data[i]);
						mui.back();
						break;
					}
				}
				
			});				
		});

	},
	componentDidUpdate:function(){
		this.myScroll.refresh();
		console.log("Home componentDidUpdate");
		return true;
	},	
	parseData:function(data,active){
		let areaList=Array();
		if(active=="全国"){
			areaList.push({
				name:"全国",
				sub:"",
				active:1
			});
		}else{
			areaList.push({
				name:"全国",
				sub:"",
				active:0
			});			
		}
		for(let i=0;i<data.length;i++){
			if(data[i].area==active){
				areaList.unshift({
					name:data[i].area,
					sub:"",
					active:1
				});
			}else{
				areaList.push({
					name:data[i].area,
					sub:"",
					active:0
				});
			}
		}
		this.setState({
			data:areaList,
			ajaxState:"complete"
		});
	},
	getData:function(callback){
		var _this=this;
		mui.ajax(config.urls.getarea,{
			data:_this.filter,
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{'Content-Type':'application/json'},
			success:function(res){
				if(res.errcode==200){
					//_this.parseData(res.data);
					callback(res.data);
				}
			},
			error:function(err){
				console.log(err);
			},
			complete:function(){
				
			}		
		});			
	},
	render:function(){
		let _this=this;
		let content=null;
		if(_this.state.ajaxState=="complete"){
			if(_this.state.data.length!=0){
				content=<ChooseList ChooseListData={_this.state.data} callback={this.state.changeFunc}/>	
			}else{
				content=<EmptyList/>
			}			
		}else{
			content=<LoadingState/>
		}
		return (
			<div className="user">
				{content}
			</div>
		);
	}
});
ReactDOM.render(
	<MainCenter/>,
	document.querySelector('.inputcommentsarea')
);