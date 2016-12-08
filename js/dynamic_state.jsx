/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var MediaList = __webpack_require__(1);
	var LoadingState = __webpack_require__(3);
	var EmptyList = __webpack_require__(4);
	var DynamicList = React.createClass({
		displayName: "DynamicList",

		componentDidMount: function componentDidMount() {
			var _this = this;
			var thisNode = this.getDOMNode();
			mui(thisNode).on("tap", ".remove", function () {
				_this.props.removeItem(_this.props.data);
			});
		},
		render: function render() {
			var _this = this;
			return React.createElement(
				"div",
				{ className: "main-list" },
				React.createElement(MediaList, { media: _this.props.data.media, eType: _this.props.data.eType }),
				React.createElement(
					"div",
					{ className: "pub-positon" },
					_this.props.data.area
				),
				React.createElement(
					"div",
					{ className: "article_info" },
					React.createElement(
						"div",
						{ className: "time" },
						new Date(_this.props.data.time).Format("yyyy-MM-dd hh:mm")
					),
					React.createElement(
						"div",
						{ className: "respone" },
						React.createElement(
							"div",
							{ className: "comments" },
							_this.props.data.commentCount
						),
						React.createElement(
							"div",
							{ className: "liked" },
							_this.props.data.likeCount
						)
					),
					React.createElement(
						"div",
						{ className: "handle" },
						React.createElement("a", { className: "share" }),
						React.createElement("a", { className: "remove" })
					)
				)
			);
		}
	});
	var DomContent = React.createClass({
		displayName: "DomContent",

		getInitialState: function getInitialState() {
			return {
				data: [],
				init: true,
				ajaxState: "complete"
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;
			_this.getData({}, true);
			_this.myScroll = new IScroll('.mui-scroll-wrapper', {
				probeType: 3,
				mouseWheel: true,
				scrollbars: true,
				mouseWheelSpeed: 50,
				deceleration: 0.001
			});
			_this.myScroll.on("scroll", function () {
				var y = this.y;
				if (y > 100) {
					_this.getData({ page: 1 }, true);
				}
				if (y < this.maxScrollY - 100) {
					_this.getData({ page: _this.filter.page + 1 }, false);
				}
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			this.myScroll.refresh();
		},
		filter: {
			startTime: "",
			endTime: "",
			type: "", area: "",
			orderby: 0, //0:最新1：最热
			page: 1
		},
		getData: function getData(filter, isNew) {
			var _this = this;
			if (_this.state.ajaxState == "complete") {
				for (var item in filter) {
					if (_this.filter.hasOwnProperty(item)) {
						_this.filter[item] = filter[item];
					}
				}
				if (isNew) {
					_this.setState({
						data: [],
						init: true
					});
				}
				mui.ajax(config.urls.home, {
					data: _this.filter,
					dataType: "JSON",
					type: "post",
					timeout: 10000,
					headers: { 'Content-Type': 'application/json' },
					beforeSend: function beforeSend() {
						_this.state.ajaxState = "getting";
					},
					success: function success(res) {
						if (Object.prototype.toString.call(res) == "[object String]") {
							res = JSON.parse(res);
						}
						for (var i = 0; i < res.data.length; i++) {
							_this.state.data.push(res.data[i]);
						}
						_this.setState();
					},
					error: function error(err) {
						console.log(err);
					},
					complete: function complete() {
						_this.setState({
							ajaxState: "complete",
							init: false
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
		removeItem: function removeItem(item) {
			for (var i = 0; i < this.state.data.length; i++) {
				if (this.state.data[i].contentId == item.contentId) {
					this.state.data.splice(i, 1);
					this.setState();
					break;
				}
			}
		},
		render: function render() {
			var _this = this;
			var content = Array();
			if (this.state.init) {
				content = React.createElement(LoadingState, null);
			} else {
				if (this.state.data.length == 0) {
					content = React.createElement(EmptyList, null);
				} else {
					for (var i = 0; i < this.state.data.length; i++) {
						content.push(React.createElement(DynamicList, { removeItem: _this.removeItem, data: _this.state.data[i] }));
					}
				}
			}
			return React.createElement(
				"div",
				{ className: "mui-dscroll" },
				React.createElement(
					"div",
					{ className: "main-content" },
					content
				)
			);
		}
	});
	ReactDOM.render(React.createElement(DomContent, null), document.querySelector('.mui-scroll-wrapper'));
	mui.ready(function () {
		mui(".header").on("tap", ".left-map-icon", function () {
			mui.back();
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Textdescript = __webpack_require__(2);
	var MediaList = React.createClass({
		displayName: "MediaList",
		getInitialState: function getInitialState() {
			return {
				imgs: [],
				time: "00:00"
			};
		},

		componentWillMount: function componentWillMount() {},
		componentDidMount: function componentDidMount() {
			var _this = this;
			// console.log(this);
			// console.log(this.getDOMNode());
			//图片查看
			var thisNode = this.getDOMNode();
			mui(thisNode).on("tap", "img", function () {
				mui.openWindow({
					url: "../view/filter_top.html",
					id: "img_fullScreen_show",
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...' },
					extras: {
						imgs: _this.state.imgs,
						page: 1
					}
				});
			});
			//视频播放
			mui(thisNode).on("tap", "video", function () {
				var thisObj = this;
				if (thisObj.paused) {
					var allTime = thisObj.duration;
					var m = parseInt(allTime / 60);
					var s = parseInt(allTime % 60);
					_this.setState({ time: m + ":" + s });
					thisObj.play();
				} else {
					thisObj.pause();
				}
			});
			for (var i = 0; i < thisNode.childNodes.length; i++) {
				if (thisNode.childNodes[i].className == "relation-imgs") {
					for (var j = 0; j < thisNode.childNodes[i].childNodes.length; j++) {
						if (thisNode.childNodes[i].childNodes[j].nodeName == "SPAN") {
							(function () {
								var stop = function stop() {
									clearInterval(timer);
								};

								var target = thisNode.childNodes[i].childNodes[j].childNodes;
								var timer = 0;

								target[0].addEventListener("playing", function () {
									target[1].style.display = "block";
									var vedioObj = this;
									timer = setInterval(function () {
										var percent = vedioObj.currentTime / vedioObj.duration;
										var progress = target[1].childNodes[1].clientWidth * percent;
										target[1].childNodes[1].childNodes[0].style.width = progress + "px";
										var cha = vedioObj.duration - vedioObj.currentTime;
										_this.setState({
											time: parseInt(cha / 60) + ":" + parseInt(cha % 60)
										});
									}, 1000);
								});
								target[0].addEventListener("ended", stop);
								target[0].addEventListener("pause", stop);
								target[1].childNodes[0].addEventListener("tap", function () {
									if (target[0].paused) {
										target[0].play();
									} else {
										target[0].pause();
									}
								});
								var startVal = 0;
								target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("dragstart", function (ev) {
									startVal = parseFloat(target[1].childNodes[1].childNodes[0].style.width);
									clearInterval(timer);
								});
								target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("drag", function (ev) {
									var finaly = startVal + ev.detail.deltaX;
									target[1].childNodes[1].childNodes[0].style.width = finaly + "px";
								});
								target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("dragend", function () {
									var percent = parseFloat(target[1].childNodes[1].childNodes[0].style.width) / parseFloat(target[1].childNodes[1].clientWidth);
									var willTime = target[0].duration * percent;
									target[0].currentTime = willTime;
									//mui.trigger(target[0],"playing");
								});
							})();
						}
					}
				}
			}
		},
		parseData: function parseData(props) {
			//console.log(props);
			var pic = [];
			var audio = [];
			var vedio = [];
			for (var i = 0; i < props.length; i++) {
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
				pic: pic,
				audio: audio,
				vedio: vedio
			};
		},
		render: function render() {
			var pic = [];
			var audio = [];
			var vedio = [];
			var text = "";
			for (var i = 0; i < this.props.media.length; i++) {
				switch (this.props.media[i].mType) {
					case 1:
						//文字
						text = this.props.media[i].name;
						break;
					case 2:
						//地图
						break;
					case 3:
						//视频文件
						vedio.push(this.props.media[i].name);
						// statements_1
						break;
					case 4:
						//图片文件
						pic.push(this.props.media[i].name);
						break;
					case 5:
						//音频
						audio.push(this.props.media[i].name);
						break;
					default:
						// statements_def
						break;
				}
			}
			//图片处理方式
			var picLength = pic.length;
			this.state.imgs = pic;
			var className = "";
			if (picLength == 1) {
				className = "img-col1-mar";
			} else if (picLength == 2) {
				className = "img-col2-mar";
			} else if (picLength > 2) {
				className = "img-col3-mar";
			}
			var picDom = [];
			for (var _i = 0; _i < picLength; _i++) {
				if (_i > 8) {
					break;
				}
				picDom.push(React.createElement("img", { className: className, src: config.imgurl + pic[_i], alt: "" }));
			}
			//视频处理方式
			var vedioDom = [];
			if (vedio.length != 0) {
				vedioDom.push(React.createElement(
					"span",
					null,
					React.createElement(
						"video",
						{ className: "video", preload: "preload" },
						React.createElement("source", { src: "../img/video/1.mp4", type: "video/mp4" }),
						"Your browser does not support the video tag."
					),
					React.createElement(
						"ul",
						{ className: "controls" },
						React.createElement("li", { className: "controlBtn play" }),
						React.createElement(
							"li",
							{ className: "progress" },
							React.createElement(
								"span",
								{ className: "line" },
								React.createElement("span", { className: "point" })
							)
						),
						React.createElement(
							"li",
							{ className: "time" },
							this.state.time
						)
					)
				));
			}

			return React.createElement(
				"div",
				{ className: "article" },
				React.createElement(Textdescript, { eType: this.props.eType, audio: audio, text: text }),
				React.createElement(
					"div",
					{ className: "relation-imgs" },
					picDom,
					vedioDom
				)
			);
		}
	});
	module.exports = MediaList;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var Textdescript = React.createClass({
		displayName: "Textdescript",

		render: function render() {
			//console.log(this.props);
			var audio = [];
			if (this.props.audio.length != 0) {
				audio.push(React.createElement(
					"div",
					{ className: "sounds" },
					React.createElement(
						"div",
						{ className: "status" },
						React.createElement("img", { src: "../img/icon/yuyintiao.png", alt: "" })
					),
					React.createElement(
						"div",
						{ className: "sounds-time" },
						"04'35'"
					)
				));
			}
			return React.createElement(
				"div",
				{ className: "text-desc" },
				React.createElement(
					"p",
					{ className: "contenttext" },
					React.createElement(
						"a",
						{ className: "theme-title" },
						"#",
						this.props.eType ? this.props.eType : '为空',
						"#\xA0"
					),
					React.createElement(
						"span",
						null,
						this.props.text
					)
				),
				audio
			);
		}
	});
	module.exports = Textdescript;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var LoadingState = React.createClass({
		displayName: "LoadingState",

		render: function render() {
			return React.createElement(
				"div",
				{ className: "loadingBox" },
				React.createElement(
					"div",
					null,
					"\u52A0\u8F7D\u4E2D\u2026\u2026"
				)
			);
		}
	});
	module.exports = LoadingState;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var EmptyList = React.createClass({
		displayName: "EmptyList",

		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					"\u6CA1\u6709\u76F8\u5173\u6570\u636E\uFF01"
				)
			);
		}
	});
	//export {EmptyList};
	module.exports = EmptyList;

/***/ }
/******/ ]);