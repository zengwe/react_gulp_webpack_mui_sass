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
/***/ function(module, exports) {

	"use strict";

	var FilterList = React.createClass({
		displayName: "FilterList",

		getInitialState: function getInitialState() {
			var now = new Date().getTime();
			var sevenAgo = now - 7 * 24 * 60 * 60 * 1000;
			return {
				area: "全国",
				startTime: new Date(sevenAgo).Format("yyyy-MM-dd"),
				endTime: new Date(now).Format("yyyy-MM-dd"),
				type: "全部"
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;
			var thisNode = _this.getDOMNode();
			//修改地址后的webview触发
			window.addEventListener("newArea", function (ev) {
				_this.setState({ area: ev.detail.name });
			});
			window.addEventListener("newStartTime", function (ev) {
				_this.setState({ startTime: ev.detail.time });
			});
			window.addEventListener("newEndTime", function (ev) {
				_this.setState({ endTime: ev.detail.time });
			});
			window.addEventListener("newType", function (ev) {
				_this.setState({ type: ev.detail.name });
			});
			mui.plusReady(function () {
				var self = plus.webview.currentWebview();
				console.log(JSON.stringify(self));
				console.log(self.page);
				if (self.startTime != "") {
					_this.state.startTime = new Date(self.startTime).Format("yyyy-MM-dd");
				}
				if (self.endTime != "") {
					_this.state.endTime = new Date(self.endTime).Format("yyyy-MM-dd");
				}
				if (self.type != "") {
					_this.state.type = self.type;
				}
				if (self.area != "") {
					_this.state.area = self.area;
				}
				_this.setState();
				mui(thisNode).on("tap", "li", function () {
					var target = this.getAttribute("data-type");
					console.log(Object.prototype.toString.call(target));
					console.log(target);
					switch (target) {
						case "area":
							mui.openWindow({
								url: "../view/filter_area_top.html",
								id: "filter_area_top",
								createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
								waiting: {
									autoShow: true, //自动显示等待框，默认为true
									title: '正在加载...' },
								extras: {
									area: _this.state.area,
									callEventWebviewId: self.id
								}
							});
							break;
						case "startTime":
							mui.openWindow({
								url: "../view/filter_time_top.html",
								id: "filter_time_top",
								waiting: {
									autoShow: true, //自动显示等待框，默认为true
									title: '正在加载...' },
								extras: {
									time: _this.state.startTime,
									callEventWebviewId: self.id,
									eventName: "newStartTime"
								}
							});
							break;
						case "endTime":
							mui.openWindow({
								url: "../view/filter_time_top.html",
								id: "filter_time_top",
								waiting: {
									autoShow: true, //自动显示等待框，默认为true
									title: '正在加载...' },
								extras: {
									time: _this.state.endTime,
									callEventWebviewId: self.id,
									eventName: "newEndTime"
								}
							});
							break;
						case "type":
							mui.openWindow({
								url: "../view/filter_type_top.html",
								id: "filter_type_top",
								createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
								waiting: {
									autoShow: true, //自动显示等待框，默认为true
									title: '正在加载...' },
								extras: {
									type: _this.state.type,
									callEventWebviewId: self.id
								}
							});
							break;
						default:
							// statements_def
							break;
					}
				});
				mui(".header").on("tap", ".text_queren", function () {
					mui.fire(plus.webview.getWebviewById("home"), "newFilter", _this.state);
					mui.back();
				});
			});
		},
		render: function render() {
			var _this = this;
			return React.createElement(
				"ul",
				{ className: "filter" },
				React.createElement(
					"li",
					{ "data-type": "area" },
					React.createElement(
						"span",
						{ className: "area_icon lefticon" },
						"\u5730\u533A"
					),
					React.createElement(
						"span",
						{ className: "right_icon righticon" },
						_this.state.area
					)
				),
				React.createElement(
					"li",
					{ "data-type": "startTime" },
					React.createElement(
						"span",
						{ className: "time_icon lefticon" },
						"\u8D77\u59CB\u65F6\u95F4"
					),
					React.createElement(
						"span",
						{ className: "right_icon righticon" },
						_this.state.startTime
					)
				),
				React.createElement(
					"li",
					{ "data-type": "endTime" },
					React.createElement(
						"span",
						{ className: "time_icon lefticon" },
						"\u7ED3\u675F\u65F6\u95F4"
					),
					React.createElement(
						"span",
						{ className: "right_icon righticon" },
						_this.state.endTime
					)
				),
				React.createElement(
					"li",
					{ "data-type": "type" },
					React.createElement(
						"span",
						{ className: "type_icon lefticon" },
						"\u7C7B\u578B"
					),
					React.createElement(
						"span",
						{ className: "right_icon righticon" },
						_this.state.type
					)
				)
			);
		}
	});
	ReactDOM.render(React.createElement(FilterList, null), document.querySelector('.user'));

/***/ }
/******/ ]);