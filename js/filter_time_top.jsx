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

	var TimeTable = React.createClass({
		displayName: "TimeTable",

		getInitialState: function getInitialState() {

			return {
				year: 2016,
				month: 12,
				day: 1
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;
			mui(".title").on("tap", ".lefticon", function () {
				if (_this.state.month > 1) {
					_this.setState({
						month: _this.state.month - 1
					});
				} else {
					_this.setState({
						year: _this.state.year - 1,
						month: 12
					});
				}
			});
			mui(".title").on("tap", ".righticon", function () {
				if (_this.state.month > 11) {
					_this.setState({
						year: _this.state.year + 1,
						month: 1
					});
				} else {
					_this.setState({
						month: _this.state.month + 1
					});
				}
			});
			mui(".time_table").on("swipeleft", "table", function () {
				mui.trigger(document.querySelector('.righticon'), 'tap');
			});
			mui(".time_table").on("swiperight", "table", function () {
				mui.trigger(document.querySelector('.lefticon'), 'tap');
			});
			mui(".time_table table tbody").on("tap", "td", function () {
				if (!isNaN(parseInt(this.innerText))) {
					_this.setState({
						day: parseInt(this.innerText)
					});
				}
			});
			console.log("plus ready");
			mui.plusReady(function () {
				var self = plus.webview.currentWebview();
				var timeArr = self.time.split("-");
				_this.setState({
					year: timeArr[0],
					month: timeArr[1],
					day: timeArr[2]
				});
				//点击确认后传递选择的时间
				mui(".header").on("tap", ".text_queren", function () {
					mui.fire(plus.webview.getWebviewById(self.callEventWebviewId), self.eventName, {
						time: _this.state.year + "-" + _this.state.month + "-" + _this.state.day
					});
					mui.back();
				});
			});
		},
		render: function render() {
			var _this = this;
			var timeObj = new Date(_this.state.year, parseInt(_this.state.month), 0);
			var time = new Date(_this.state.year, parseInt(_this.state.month) - 1, 1);
			var maxDate = timeObj.getDate();
			var fstDateOfweek = time.getDay();
			var row = Math.ceil((maxDate + fstDateOfweek) / 7);
			var start = 1 - fstDateOfweek;
			var trArr = Array();
			for (var i = 0; i < row; i++) {
				var tempArr = [];
				for (var j = 0; j < 7; j++) {
					if (start > 0 && start <= maxDate) {
						if (start == parseInt(_this.state.day)) {
							tempArr.push(React.createElement(
								"td",
								{ className: "active" },
								React.createElement(
									"span",
									null,
									start
								)
							));
						} else {
							tempArr.push(React.createElement(
								"td",
								null,
								start
							));
						}
					} else {
						tempArr.push(React.createElement("td", null));
					}
					start++;
				}
				trArr.push(React.createElement(
					"tr",
					null,
					tempArr
				));
			}
			return React.createElement(
				"div",
				{ className: "time_area" },
				React.createElement(
					"div",
					{ className: "title" },
					React.createElement("i", { className: "lefticon" }),
					React.createElement(
						"span",
						null,
						_this.state.year + "年" + _this.state.month + "月"
					),
					React.createElement("i", { className: "righticon" })
				),
				React.createElement(
					"div",
					{ className: "time_table" },
					React.createElement(
						"table",
						null,
						React.createElement(
							"thead",
							null,
							React.createElement(
								"tr",
								null,
								React.createElement(
									"th",
									null,
									"\u65E5"
								),
								React.createElement(
									"th",
									null,
									"\u4E00"
								),
								React.createElement(
									"th",
									null,
									"\u4E8C"
								),
								React.createElement(
									"th",
									null,
									"\u4E09"
								),
								React.createElement(
									"th",
									null,
									"\u56DB"
								),
								React.createElement(
									"th",
									null,
									"\u4E94"
								),
								React.createElement(
									"th",
									null,
									"\u516D"
								)
							)
						),
						React.createElement(
							"tbody",
							null,
							trArr
						)
					)
				)
			);
		}
	});
	ReactDOM.render(React.createElement(TimeTable, null), document.querySelector('.user'));

/***/ }
/******/ ]);