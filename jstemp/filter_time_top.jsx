let TimeTable=React.createClass({
	getInitialState:function(){

		return {
			year:2016,
			month:12,
			day:1
		}
	},
	componentDidMount:function(){
		let _this=this;
		mui(".title").on("tap",".lefticon",function(){
			if(_this.state.month>1){
				_this.setState({
					month:_this.state.month-1
				});
			}else{
				_this.setState({
					year:_this.state.year-1,
					month:12
				});
			}
		});
		mui(".title").on("tap",".righticon",function(){
			if(_this.state.month>11){
				_this.setState({
					year:_this.state.year+1,
					month:1
				});
			}else{
				_this.setState({
					month:_this.state.month+1
				});
			}
		});
		mui(".time_table").on("swipeleft","table",function(){
			mui.trigger(document.querySelector('.righticon'),'tap');
		});
		mui(".time_table").on("swiperight","table",function(){
			mui.trigger(document.querySelector('.lefticon'),'tap');
		});
		mui(".time_table table tbody").on("tap","td",function(){
			if(!isNaN(parseInt(this.innerText))){
				_this.setState({
					day:parseInt(this.innerText)
				});					
			}
		});
		console.log("plus ready");
		mui.plusReady(function(){
			let self = plus.webview.currentWebview();
			var timeArr=self.time.split("-");
			_this.setState({
				year:timeArr[0],
				month:timeArr[1],
				day:timeArr[2]
			});
			//点击确认后传递选择的时间
			mui(".header").on("tap",".text_queren",function(){
				mui.fire(plus.webview.getWebviewById(self.callEventWebviewId),self.eventName,{
					time:_this.state.year+"-"+_this.state.month+"-"+_this.state.day
				});
				mui.back();				
			});				
		});		
	},
	render:function(){
		let _this=this;
		let timeObj=new Date(_this.state.year,parseInt(_this.state.month),0);
		let time=new Date(_this.state.year,parseInt(_this.state.month)-1,1);
		let maxDate=timeObj.getDate();
		let fstDateOfweek=time.getDay();
		let row=Math.ceil((maxDate+fstDateOfweek)/7);
		let start=1-fstDateOfweek;
		let trArr=Array();
		for(let i=0;i<row;i++){
			let tempArr=[];
			for(let j=0;j<7;j++){
				if(start>0&&start<=maxDate){
					if(start==parseInt(_this.state.day)){
						tempArr.push(<td className="active"><span>{start}</span></td>)
					}else{
						tempArr.push(<td>{start}</td>)
					}
					
				}else{
					tempArr.push(<td></td>)
				}
				start++;
			}			
			trArr.push(<tr>{tempArr}</tr>);			
		}
		return (
			<div className="time_area">
				<div className="title">
					<i className="lefticon"></i>
					<span>{_this.state.year+"年"+_this.state.month+"月"}</span>
					<i className="righticon"></i>
				</div>
				<div className="time_table">
					<table>
						<thead>
							<tr>
								<th>日</th>
								<th>一</th>
								<th>二</th>
								<th>三</th>
								<th>四</th>
								<th>五</th>
								<th>六</th>
							</tr>
						</thead>
						<tbody>
							{trArr}																										
						</tbody>
					</table>					
				</div>
			</div>						
		);
	}
});
ReactDOM.render(
	<TimeTable/>,
	document.querySelector('.user')
);