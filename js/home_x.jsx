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

	var LoadingState = __webpack_require__(3);
	var EmptyList = __webpack_require__(1);
	var ContentList = __webpack_require__(7);
	var FilterHeader = __webpack_require__(10);
	var FootEvent = __webpack_require__(11);
	var HeadEvent = __webpack_require__(12);
	var Home = React.createClass({
		displayName: "Home",

		getInitialState: function getInitialState() {
			return {
				condition: {
					city: "全国",
					sortby: "newest",
					sortChange: this.sortChange,
					areaChange: this.areaChange,
					startTime: "",
					endTime: "",
					type: ""
				},
				data: [],
				state: "loading",
				ajaxState: "complete"
			};
		},
		sortChange: function sortChange(sortby) {
			//console.log(sortby);
			this.state.condition.sortby = sortby;
			if (sortby == "hotest") {
				this.getData({ orderby: 1, page: 1 }, true);
			} else if (sortby == "newest") {
				this.getData({ orderby: 0, page: 1 }, true);
			}
			this.setState();
		},
		areaChange: function areaChange() {},
		componentDidMount: function componentDidMount() {
			var _this = this;
			FootEvent();
			HeadEvent();
			this.getData({}, true);
			this.myScroll = new IScroll('.mui-scroll-wrapper', {
				probeType: 3,
				mouseWheel: true,
				scrollbars: true,
				mouseWheelSpeed: 50,
				deceleration: 0.001
			});
			this.myScroll.on("scroll", function () {
				var y = this.y;
				//	maxY = this.maxScrollY - y;
				// 	console.log(maxY);
				// 	console.log(this.maxScrollY);
				// console.log(y);
				if (y > 100) {
					_this.getData({ page: 1 }, true);
				}
				if (y < this.maxScrollY - 100) {
					_this.getData({ page: _this.filter.page + 1 }, false);
				}
			});
			console.log("filter");
			console.log(JSON.stringify(_this.filter));
			mui(".header").on("tap", ".right-filter-icon", function () {
				mui.openWindow({
					url: "../view/filter_top.html",
					id: "filter_top",
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...' },
					extras: _this.filter
				});
			});
			window.addEventListener("newFilter", function (ev) {
				console.log(JSON.stringify(ev.detail));
				_this.getData({
					startTime: ev.detail.startTime,
					endTime: ev.detail.endTime,
					type: ev.detail.type,
					area: ev.detail.area,
					orderby: 0, //0:最新1：最热
					page: 1
				}, true);
				_this.setState({
					condition: {
						city: ev.detail.area,
						sortby: "newest",
						sortChange: _this.sortChange,
						areaChange: _this.areaChange,
						startTime: ev.detail.startTime,
						endTime: ev.detail.endTime,
						type: ev.detail.type
					}
				});
			});
		},
		filter: {
			startTime: "",
			endTime: "",
			type: "",
			area: "",
			orderby: 0, //0:最新1：最热
			page: 1
		},
		getData: function getData(condition, is_new) {
			var _this2 = this;

			console.log(this.state.ajaxState);
			if (this.state.ajaxState == "complete") {
				(function () {
					var _this = _this2;
					for (var item in condition) {
						if (_this.filter.hasOwnProperty(item)) {
							_this.filter[item] = condition[item];
						} else {
							console.log("filter don't has this condition " + item);
						}
					}
					if (is_new) {
						_this2.state.state = "loading";
						_this2.state.data = [];
						_this2.setState();
					}
					mui.ajax(config.urls.home, {
						data: _this.filter,
						dataType: 'json',
						type: 'post',
						timeout: 10000,
						headers: { 'Content-Type': 'application/json' },
						beforeSend: function beforeSend() {
							_this.state.ajaxState = "getting";
						},
						success: function success(res) {
							console.log(JSON.stringify(res));
							//callback(res.data);				
							if (is_new) {
								_this.state.data = res.data;
							} else {
								for (var _item in res.data) {
									_this.state.data.push(res.data[_item]);
								}
							}
							_this.state.state = "complete";
							_this.setState();
						},
						error: function error(err) {
							console.log(err);
						},
						complete: function complete() {
							_this.state.ajaxState = "complete";
						}
					});
				})();
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			this.myScroll.refresh();
			console.log("Home componentDidUpdate");
		},
		render: function render() {
			var centerListDom = null;
			//console.log(this.state.is_init);
			if (this.state.state == "loading") {
				centerListDom = React.createElement(LoadingState, null);
			} else {
				if (this.state.data.length == 0) {
					centerListDom = React.createElement(EmptyList, null);
				} else {
					centerListDom = React.createElement(ContentList, { data: this.state.data });
				}
			}
			return React.createElement(
				"div",
				{ className: "mui-scroll" },
				React.createElement(FilterHeader, { data: this.state.condition }),
				centerListDom
			);
		}
	});
	ReactDOM.render(React.createElement(Home, null), document.querySelector('.mui-scroll-wrapper'));

/***/ },
/* 1 */
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

/***/ },
/* 2 */,
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var EmptyList = __webpack_require__(1);
	var LoadingState = __webpack_require__(3);
	var MediaList = __webpack_require__(8);
	var ContentList = React.createClass({
		displayName: "ContentList",

		getInitialState: function getInitialState() {
			return {
				state: "loading",
				contentList: [React.createElement(LoadingState, null)]
			};
		},
		componentWillMount: function componentWillMount() {
			console.log("ContentList componentWillMount");
		},
		componentDidMount: function componentDidMount() {
			//console.log(this);
			console.log("ContentList componentDidMount");
			var thisNode = this.getDOMNode();
			mui(thisNode).on("tap", ".contenttext", function () {
				mui.openWindow({
					url: "../view/main_body.html",
					id: "main_body",
					createNew: false,
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...' }
				});
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(revProps) {},
		shouldComponentUpdate: function shouldComponentUpdate() {
			//console.log("ContentList shouldComponentUpdate");		
			return true;
		},
		componentWillUpdate: function componentWillUpdate() {
			//console.log("ContentList componentWillUpdate");	
		},
		componentDidUpdate: function componentDidUpdate() {
			//console.log("ContentList componentDidUpdate");	
		},
		componentWillUnmount: function componentWillUnmount() {
			//console.log("ContentList componentWillUnmount");			
		},
		render: function render() {
			var html = [];
			var list = this.props.data;
			//let list=this.state.contentList;
			//let texttype=<Textdescript />;
			if (list.length == 0) {
				html[0] = React.createElement(EmptyList, null);
			} else {
				for (var i = 0; i < list.length; i++) {
					html.push(React.createElement(
						"div",
						{ className: "main-list", "data-contentid": list[i].contentId },
						React.createElement(
							"div",
							{ className: "content-info" },
							React.createElement(
								"a",
								{ className: "userinfo" },
								React.createElement("img", { className: "user-photo", src: config.imgurl + list[i].userHead, alt: "" }),
								React.createElement(
									"div",
									{ className: "text-info" },
									React.createElement(
										"span",
										{ className: "nike-name" },
										list[i].username
									),
									React.createElement(
										"span",
										{ className: "pub-time" },
										new Date(list[i].time).Format("yyyy-MM-dd")
									)
								)
							),
							React.createElement(
								"div",
								{ className: "response" },
								React.createElement(
									"a",
									{ className: "comments" },
									list[i].commentCount
								),
								React.createElement(
									"a",
									{ className: "likes" },
									list[i].likeCount
								)
							)
						),
						React.createElement(MediaList, { media: list[i].media, eType: list[i].eType }),
						React.createElement(
							"div",
							{ className: "pub-positon", "data-lon": list[i].gis_lon, "data-lat": list[i].lat, "data-height": list[i].height },
							list[i].area
						)
					));
				}
			}
			return React.createElement(
				"div",
				{ className: "main-content" },
				html
			);
		}
	});
	module.exports = ContentList;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Textdescript = __webpack_require__(9);
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
			console.log(thisNode.childNodes);
			for (var i = 0; i < thisNode.childNodes.length; i++) {
				console.log(thisNode.childNodes[i].className);
				if (thisNode.childNodes[i].className == "relation-imgs") {
					console.log("bangding");
					for (var j = 0; j < thisNode.childNodes[i].childNodes.length; j++) {
						console.log(thisNode.childNodes[i].childNodes[j]);
						if (thisNode.childNodes[i].childNodes[j].nodeName == "SPAN") {
							(function () {
								var stop = function stop() {
									clearInterval(timer);
								};

								var target = thisNode.childNodes[i].childNodes[j].childNodes;
								var timer = 0;

								target[0].addEventListener("playing", function () {
									console.log("for playing");
									target[1].style.display = "block";
									var vedioObj = this;
									timer = setInterval(function () {
										var percent = vedioObj.currentTime / vedioObj.duration;
										var progress = target[1].childNodes[1].clientWidth * percent;
										console.log(target[1].childNodes[1].childNodes[0]);
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
									console.log("start drag");
									console.log(startVal);
									startVal = parseFloat(target[1].childNodes[1].childNodes[0].style.width);
									console.log(startVal);
									clearInterval(timer);
								});
								target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("drag", function (ev) {
									console.log("drag");
									var finaly = startVal + ev.detail.deltaX;
									console.log(finaly);
									target[1].childNodes[1].childNodes[0].style.width = finaly + "px";
								});
								target[1].childNodes[1].childNodes[0].childNodes[0].addEventListener("dragend", function () {
									console.log("end drag");
									var percent = parseFloat(target[1].childNodes[1].childNodes[0].style.width) / parseFloat(target[1].childNodes[1].clientWidth);
									var willTime = target[0].duration * percent;
									console.log(willTime);
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
				//console.log(this.props.media[i].mType);
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var FilterHeader = React.createClass({
		displayName: "FilterHeader",

		componentDidMount: function componentDidMount() {
			var _this = this;
			//console.log(arguments);
			mui(".sort-way").on("tap", "span", function () {
				if (this.className != "active") {
					if (this.innerText == "最新") {
						//console.log(_this.props.data);
						_this.props.data.sortChange("newest");
					} else if (this.innerText == "最热") {
						//console.log(_this.props.data);
						_this.props.data.sortChange("hotest");
					}
				}
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {},
		render: function render() {
			//console.log(this.props);
			var newest = "",
			    hotest = "";
			if (this.props.data.sortby == "hotest") {
				hotest = "active";
				newest = "";
			} else {
				newest = "active";
				hotest = "";
			}
			return React.createElement(
				"div",
				{ className: "nav-filter" },
				React.createElement(
					"div",
					{ className: "position" },
					React.createElement(
						"a",
						{ href: "" },
						this.props.data.city
					),
					React.createElement("i", { className: "icon-down" })
				),
				React.createElement(
					"div",
					{ className: "sort-way" },
					React.createElement(
						"span",
						{ className: newest },
						"\u6700\u65B0"
					),
					React.createElement(
						"span",
						{ className: hotest },
						"\u6700\u70ED"
					)
				)
			);
		}
	});
	module.exports = FilterHeader;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	function FootEvent() {
		$(".footclass .personal").on("tap", function () {
			mui.openWindow({
				url: "../view/usercenter.html",
				id: "usercenter",
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...' }
			});
		});
	};
	module.exports = FootEvent;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	function HeadEvent() {

		mui.back = function () {};
	}
	module.exports = HeadEvent;

/***/ }
/******/ ]);