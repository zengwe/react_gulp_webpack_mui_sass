var Textdescript=React.createClass({
	render:function(){
		//console.log(this.props);
		let audio=[]
		if(this.props.audio.length!=0){
			audio.push(
				<div className="sounds">
					<div className="status">
						<img src="../img/icon/yuyintiao.png" alt=""/>
					</div>
					<div className="sounds-time">04'35'</div>
				</div>				
			);
		}
		return (
			<div className="text-desc">					
				<p className="contenttext">
					<a className="theme-title">#{this.props.eType?this.props.eType:'为空'}#&nbsp;</a>
					<span>{this.props.text}</span>
				</p>
				{audio}
			</div>
		);
	}
});
module.exports= Textdescript;