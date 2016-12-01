var FilterHeader = React.createClass({
	componentDidMount:function(){
		var _this=this;
		//console.log(arguments);
		mui(".sort-way").on("tap","span",function(){
			if(this.className!="active"){
				if(this.innerText=="最新"){
					//console.log(_this.props.data);
					_this.props.data.sortChange("newest");	
				}else if(this.innerText=="最热"){
					//console.log(_this.props.data);
					_this.props.data.sortChange("hotest");
				}
			}
		});
	},
	componentWillReceiveProps:function(props){
	},
	render:function(){
		//console.log(this.props);
		let newest="",hotest="";
		if(this.props.data.sortby=="hotest"){
			hotest="active";
			newest="";
		}else{
			newest="active";
			hotest="";							
		}		
		return (
			<div className="nav-filter">
				<div className="position">
					<a href="">{this.props.data.city}</a>
					<i className="icon-down"></i>
				</div>
				<div className="sort-way">
					<span className={newest}>最新</span>
					<span className={hotest}>最热</span>
				</div>							
			</div>			
		);
	}
});
module.exports= FilterHeader;