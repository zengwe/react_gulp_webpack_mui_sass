/*
* 数据格式 ChooseListData [{name:"",sub:"",active:0 or 1}]
*          callback function return choose{name,sub}
*/
//let EmptyList    = require("./EmptyList.jsx");
let ChooseList=React.createClass({
	componentDidMount:function(){
		let _this=this;
		let thisNode=this.getDOMNode();
		mui(thisNode).on("tap","li",function(){
			console.log(this.childNodes[0].getAttribute("class"))
			let name=this.childNodes[0].childNodes[0].innerText;
			let sub=this.childNodes[0].childNodes[1].innerText;
			//console.log(this.getAttribute("class"));
			_this.props.callback({
				name:name,
				sub:sub
			});
		});
	},
	render:function(){
		var _this=this;
		let contentList=Array();
		for(let i=0;i<_this.props.ChooseListData.length;i++){
			contentList.push(
				<li>
					<span className={_this.props.ChooseListData[i].active?'diqu_icon-choosed lefticon':'diqu_icon lefticon'}>
						<span>{_this.props.ChooseListData[i].name}</span>							
						<i>{_this.props.ChooseListData[i].sub?"("+_this.props.ChooseListData[i].sub+")":""}</i>
					</span>
				</li>					
			);
		}
		return (
			<ul className="filter">
				{contentList}																					
			</ul>			
		);
	}
});
module.exports= ChooseList;
