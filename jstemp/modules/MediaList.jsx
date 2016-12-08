let Textdescript = require("./Textdescript.jsx");
var MediaList=React.createClass({
	getInitialState() {
	    return {
	        imgs:[],
	        time:"00:00"
	    };
	},
	componentWillMount:function(){
	},
	componentDidMount:function(){
		var _this=this;
		// console.log(this);
		// console.log(this.getDOMNode());
		//图片查看
		var thisNode=this.getDOMNode();
		mui(thisNode).on("tap","img",function(){
			mui.openWindow({
			    url:"../view/filter_top.html",
			    id:"img_fullScreen_show",
			    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			    waiting:{
			      autoShow:true,//自动显示等待框，默认为true
			      title:'正在加载...',//等待对话框上显示的提示内容
			    },
			    extras:{
			    	imgs:_this.state.imgs,
			    	page:1
			    }
			});			
		});
		//视频播放
		mui(thisNode).on("tap","video",function(){
			var thisObj=this;
			if(thisObj.paused){	
				let allTime=thisObj.duration;
				let m=parseInt(allTime/60);
				let s=parseInt(allTime%60);
				_this.setState({time:m+":"+s});
				thisObj.play();
			}else{
				thisObj.pause();
			}
		});
		for(let i=0;i<thisNode.childNodes.length;i++){
			if(thisNode.childNodes[i].className=="relation-imgs"){
				for(let j=0;j<thisNode.childNodes[i].childNodes.length;j++){
					if(thisNode.childNodes[i].childNodes[j].nodeName=="SPAN"){
						let target=thisNode.childNodes[i].childNodes[j].childNodes;
						let timer=0;
						function stop(){
							clearInterval(timer);
						}
						target[0].addEventListener("playing",function(){
							target[1].style.display="block";
							let vedioObj=this;
							timer=setInterval(function(){
								let percent=vedioObj.currentTime/vedioObj.duration;
								let progress=target[1].childNodes[1].clientWidth*percent;
								target[1].childNodes[1].childNodes[0].style.width=progress+"px";
								let cha=vedioObj.duration-vedioObj.currentTime;
								_this.setState({
									time:parseInt(cha/60)+":"+parseInt(cha%60)
								});
							},1000);
						});
						target[0].addEventListener("ended",stop);
						target[0].addEventListener("pause",stop);
						target[1].childNodes[0].addEventListener("tap",function(){
							if(target[0].paused){
								target[0].play();
							}else{
								target[0].pause();
							}
						});
						let startVal=0;
						target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("dragstart",function(ev){
							startVal=parseFloat(target[1].childNodes[1].childNodes[0].style.width);
							clearInterval(timer);
						});						
						target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("drag",function(ev){
							let finaly=startVal+ev.detail.deltaX;
							target[1].childNodes[1].childNodes[0].style.width=finaly+"px";
						});
						target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("dragend",function(){
							let percent=parseFloat(target[1].childNodes[1].childNodes[0].style.width)/parseFloat(target[1].childNodes[1].clientWidth);
							let willTime=target[0].duration*percent;
							target[0].currentTime=willTime;
							//mui.trigger(target[0],"playing");
						});
					}
				}
			}
		}
	},
	parseData:function(props){
		//console.log(props);
		let pic=[];
		let audio=[];
		let vedio=[];
		for(let i=0;i<props.length;i++){
			switch (props[i].mType) {
				case 1:
					// statements_1
					break;
				case 2:
					// statements_1
					break;
				case 3:
					// statements_1
					break;
				case 4:
					pic.push(props[i].name);
					break;															
				default:
					// statements_def
					break;
			}
		}
		return {
			pic:pic,
			audio:audio,
			vedio:vedio			
		}
	},
	render:function(){
		let pic=[];
		let audio=[];
		let vedio=[];
		let text="";
		for(let i=0;i<this.props.media.length;i++){
			switch (this.props.media[i].mType) {
				case 1://文字
					text=this.props.media[i].name;
					break;
				case 2://地图
					break;
				case 3://视频文件
					vedio.push(this.props.media[i].name);
					// statements_1
					break;
				case 4://图片文件
					pic.push(this.props.media[i].name);
					break;
				case 5://音频
					audio.push(this.props.media[i].name);
					break;																				
				default:
					// statements_def
					break;
			}
		}
		//图片处理方式
		let picLength=pic.length;
		this.state.imgs=pic;
		let className="";
		if(picLength==1){
			className="img-col1-mar";
		}else if(picLength==2){
			className="img-col2-mar";
		}else if(picLength>2){
			className="img-col3-mar";
		}
		let picDom=[];
		for(let i=0;i<picLength;i++){
			if(i>8){
				break;
			}
			picDom.push(<img className={className} src={config.imgurl+pic[i]} alt=""/>);
		}
		//视频处理方式
		let vedioDom=[];
		if(vedio.length!=0){
			vedioDom.push(	
				<span>
					<video className="video"  preload="preload">
						<source src="../img/video/1.mp4"type="video/mp4"/>
						Your browser does not support the video tag.							
					</video>
					<ul className="controls">
							<li className="controlBtn play"></li>
							<li className="progress">
								<span className="line">
									<span className="point">										
									</span>									
								</span>
							</li>
							<li className="time">{this.state.time}</li>
					</ul>
				</span>
			);			
		}

		return (
			<div className="article">
				<Textdescript eType={this.props.eType} audio={audio} text={text}/>
				<div className="relation-imgs">
					{picDom}
					{vedioDom}
				</div>
			</div>			
		);
	}
});
module.exports= MediaList;