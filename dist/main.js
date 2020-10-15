/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./week16/5_carouselWithLifecycle/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Wrapper, TextNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TextNode\", function() { return TextNode; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(comp, attributes) {\n  // console.log(arguments);\n  // // debugger;\n  var ele;\n\n  if (typeof comp === 'string') {\n    ele = new Wrapper(comp);\n  } else {\n    ele = new comp({\n      initData: {}\n    });\n  }\n\n  for (var name in attributes) {\n    // ele[name] = attributes[name];   // attribute 和 property 是同一个\n    ele.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new TextNode(child);\n        }\n\n        ele.appendChild(child); // 添加 children 的方法一\n        // ele.children.push(child)  // 方法二\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return ele;\n}\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      // console.log('MyComponent::setAttribute', name, value);\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // 添加children 的方法一\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\nvar TextNode = /*#__PURE__*/function () {\n  function TextNode(text) {\n    _classCallCheck(this, TextNode);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(TextNode, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return TextNode;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./week16/5_carouselWithLifecycle/Carousel.js":
/*!****************************************************!*\
  !*** ./week16/5_carouselWithLifecycle/Carousel.js ***!
  \****************************************************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../createElement */ \"./createElement.js\");\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation */ \"./week16/5_carouselWithLifecycle/animation.js\");\n/* harmony import */ var _cubicBezier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubicBezier */ \"./week16/5_carouselWithLifecycle/cubicBezier.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel() {\n    _classCallCheck(this, Carousel);\n\n    this.children = [];\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      // console.log('MyComponent::setAttribute', name, value);\n      this[name] = value;\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // 添加children 的方法一\n      this.children.push(child);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var position = 0;\n      var timeline = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"]();\n      timeline.start();\n      var timer = null;\n      var offset = 0;\n      var children = this.data.map(function (url, currentPosition) {\n        var lastPosition = (currentPosition - 1 + _this.data.length) % _this.data.length;\n        var nextPosition = (currentPosition + 1) % _this.data.length;\n        var offset = 0;\n\n        var onStart = function onStart() {\n          timeline.pause();\n          timer && clearTimeout(timer);\n          var current = children[currentPosition];\n          var currentTransformValue = Number(current.style.transform.match(/translateX\\(([\\s\\S]+)px\\)/)[1]);\n          offset = currentTransformValue + 500 * currentPosition;\n        };\n\n        var onPanmove = function onPanmove(event) {\n          var last = children[lastPosition];\n          var current = children[currentPosition];\n          var next = children[nextPosition];\n          var lastTransformValue = -500 - 500 * lastPosition + offset;\n          var currentTransformValue = -500 * currentPosition + offset;\n          var nextTransformValue = 500 - 500 * nextPosition + offset;\n          var dx = event.pointX - event.startX;\n          last.style.transform = \"translateX(\".concat(lastTransformValue + dx, \"px)\");\n          current.style.transform = \"translateX(\".concat(currentTransformValue + dx, \"px)\");\n          next.style.transform = \"translateX(\".concat(nextTransformValue + dx, \"px)\"); // console.log(lastTransformValue, currentTransformValue, nextTransformValue)\n        };\n\n        var onPanend = function onPanend(event) {\n          var direction = 0;\n          var dx = event.pointX - event.startX;\n\n          if (dx + offset > 250) {\n            direction = 1;\n          }\n\n          if (dx + offset < -250) {\n            direction = -1;\n          }\n\n          timeline.reset();\n          timeline.start();\n          var last = children[lastPosition];\n          var current = children[currentPosition];\n          var next = children[nextPosition];\n          var lastAnimation = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](last.style, 'transform', -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 1000, 0, _cubicBezier__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          var currentAnimation = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](current.style, 'transform', -500 * currentPosition + offset + dx, -500 * currentPosition + direction * 500, 1000, 0, _cubicBezier__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          var nextAnimation = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](next.style, 'transform', 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 1000, 0, _cubicBezier__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          timeline.add(lastAnimation);\n          timeline.add(currentAnimation);\n          timeline.add(nextAnimation);\n          position = (position - direction + _this.data.length) % _this.data.length;\n          timer = setTimeout(nextPic, 3000);\n        };\n\n        var element = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\n          src: url,\n          alt: '轮播图',\n          enableGesture: true,\n          onStart: onStart,\n          onPanmove: onPanmove,\n          onPanend: onPanend\n        });\n        element.style.transform = 'translateX(0px)';\n        element.addEventListener('dragstart', function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      });\n      var root = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n        \"class\": \"carousel\"\n      }, children);\n\n      var nextPic = function nextPic() {\n        var nextPosition = (position + 1) % _this.data.length; // timeline = new Timeline();\n\n        window.xtimeline = timeline;\n        var current = children[position];\n        var next = children[nextPosition];\n        var currentAnimation = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](current.style, 'transform', -100 * position, -100 - 100 * position, 1000, 1000, _cubicBezier__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n          return \"translateX(\".concat(5 * v, \"px)\");\n        });\n        var nextAnimation = new _animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 1000, 1000, _cubicBezier__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n          return \"translateX(\".concat(5 * v, \"px)\");\n        });\n        timeline.add(currentAnimation);\n        timeline.add(nextAnimation);\n        console.log('+++++++++++++++++++++++++++');\n        position = nextPosition;\n        window.timeout = timer = setTimeout(nextPic, 3000);\n      };\n\n      timer = setTimeout(nextPic, 3000); // 记录刚开始的定时器ID，以便销毁，防止在刚进入页面时在函数执行之前 鼠标滑动图片，导致又开启一个 定时器\n\n      return root;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}();\n\n//# sourceURL=webpack:///./week16/5_carouselWithLifecycle/Carousel.js?");

/***/ }),

/***/ "./week16/5_carouselWithLifecycle/animation.js":
/*!*****************************************************!*\
  !*** ./week16/5_carouselWithLifecycle/animation.js ***!
  \*****************************************************/
/*! exports provided: Timeline, Animation, ColorAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorAnimation\", function() { return ColorAnimation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    this.animations = new Set(); // 用于存放所有的动画\n\n    this.requestId = null; // 动画id\n\n    this.status = 'inited'; // 动画的状态\n\n    this.startTime = Date.now(); // 记录开始时间\n\n    this.addTimes = new Map();\n    this.finishedAnimations = new Set();\n  }\n\n  _createClass(Timeline, [{\n    key: \"tick\",\n    value: function tick() {\n      var _this = this;\n\n      var t = Date.now() - this.startTime; // 当前时间和动画开始时间的时间差\n      // console.log(t)\n\n      var addTime; // 遍历所有的动画，计算相关值，并赋值到 属性上\n\n      var _iterator = _createForOfIteratorHelper(this.animations),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n          // 结构动画组件属性\n          var object = animation.object,\n              property = animation.property,\n              start = animation.start,\n              end = animation.end,\n              timingFunction = animation.timingFunction,\n              delay = animation.delay,\n              template = animation.template,\n              duration = animation.duration; // console.log(addTime, t - delay - addTime)\n\n          addTime = this.addTimes.get(animation);\n          if (t < addTime + delay) continue; // 按照时间比例、运动函数 计算进程\n\n          var progression = timingFunction((t - delay - addTime) / duration); // 0-1 之间的数\n          // 由于(t - delay - addTime)/duration 不会每次都得到1， 导致计算的值小于审定的值，\n          // 所有t > duration + delay + addTime 时，要将 progression制成 1，使用完整的值\n\n          if (t > duration + delay + addTime) {\n            progression = 1;\n            this.finishedAnimations.add(animation);\n            this.animations[\"delete\"](animation); // 状态完成\n          } // 计算动画的相关属性的值\n          // let value = start + progression * (end - start);\n\n\n          var value = animation.valueFromProgression(progression); // 给 元素的 style 添加上 动画属性\n          // object[property] = template(timingFunction(start, end)(t - delay));\n\n          object[property] = template(value);\n        } // 如果动画池中存在动画，就执行动画\n\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (this.animations.size) {\n        this.requestId = requestAnimationFrame(function () {\n          return _this.tick();\n        });\n      } else {\n        this.requestId = null;\n      }\n    } // 动画开始方法\n\n  }, {\n    key: \"start\",\n    value: function start() {\n      // 必须要时 inited 状态时，才会执行开始动画\n      if (this.status !== 'inited') return;\n      this.status = 'playing'; // 开始执行后更改状态\n\n      this.startTime = Date.now(); // 记录开始时间\n\n      this.tick();\n    } // 重新开始i方法\n\n  }, {\n    key: \"restart\",\n    value: function restart() {\n      // 如果正在执行，则先暂停动画\n      if (this.status === 'playing') this.pause(); // this.animations = new Set();\n\n      var _iterator2 = _createForOfIteratorHelper(this.finishedAnimations),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var animation = _step2.value;\n          this.animations.add(animation);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      this.finishedAnimations = new Set();\n      this.requestId = null; // 将动画id清空\n\n      this.status = 'playing'; // 改状态\n\n      this.startTime = Date.now(); // 记录开始时间\n\n      this.pauseTime = null;\n      this.tick();\n    } // 重置\n\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      // 如果正在执行，则先暂停动画\n      if (this.status === 'playing') this.pause();\n      this.animations = new Set(); // 用于存放所有的动画\n\n      this.requestId = null; // 动画id\n\n      this.status = 'inited'; // 动画的状态\n\n      this.startTime = Date.now(); // 记录开始时间\n\n      this.addTimes = new Map();\n      this.pauseTime = null;\n      this.finishedAnimations = new Set();\n    } // 暂停方法\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      // 动画执行过程中才能只能暂停动作\n      if (this.status !== 'playing') return;\n      this.status = 'pause';\n      this.pauseTime = Date.now(); // 记录暂停时的时间，便于继续的时候计算时间差值\n\n      if (this.requestId != null) {\n        // 清楚动画 id\n        cancelAnimationFrame(this.requestId);\n        this.requestId = null;\n      }\n    } // 继续动画方法\n\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.status !== 'pause') return;\n      this.status = 'playing';\n      this.startTime += Date.now() - this.pauseTime; // 开始时间要加上暂停的这段时间\n\n      this.tick();\n    } // 动画池中添加动画， addTime 表示动画开始的时间时的时间要向前加多少\n\n  }, {\n    key: \"add\",\n    value: function add(animation, addTime, canAdd) {\n      this.animations.add(animation);\n\n      if (this.status === 'playing' && this.requestId === null) {\n        this.tick();\n      }\n\n      if (this.status === 'playing') {\n        this.addTimes.set(animation, addTime !== undefined ? addTime : Date.now() - this.startTime);\n      } else {\n        this.addTimes.set(animation, addTime !== undefined ? addTime : 0);\n      }\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n\n    this.template = template || function (v) {\n      return \"rgba(\".concat(v.r, \", \").concat(v.g, \",\").concat(v.b, \",\").concat(v.a, \")\");\n    };\n\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n\n    this.timingFunction = timingFunction || function (start, end) {\n      return function (t) {\n        return start + t / duration * (end - start);\n      };\n    };\n  } // 计算进程值\n\n\n  _createClass(Animation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return this.start + progression * (this.end - this.start);\n    }\n  }]);\n\n  return Animation;\n}();\nvar ColorAnimation = /*#__PURE__*/function () {\n  function ColorAnimation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, ColorAnimation);\n\n    this.object = object;\n    this.property = property;\n\n    this.template = template || function (v) {\n      return \"rgba(\".concat(v.r, \", \").concat(v.g, \",\").concat(v.b, \",\").concat(v.a, \")\");\n    };\n\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n\n    this.timingFunction = timingFunction || function (start, end) {\n      return function (t) {\n        return start + t / duration * (end - start);\n      };\n    };\n  } // 计算 颜色值\n\n\n  _createClass(ColorAnimation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return {\n        r: this.start.r + progression * (this.end.r - this.start.r),\n        g: this.start.g + progression * (this.end.g - this.start.g),\n        b: this.start.b + progression * (this.end.b - this.start.b),\n        a: this.start.a + progression * (this.end.a - this.start.a)\n      };\n    }\n  }]);\n\n  return ColorAnimation;\n}();\n/*\nlet animation = new Animation(object, property, start, end, duration, delay, timingFunction)\nlet animation2 = new Animation(object, property, start, end, duration, delay, timingFunction)\n------ 1-----\nanimation.start()\nanimation2.start()\nanimation.pause()\nanimation.resume()\nanimation.stop()\n\n----- 2 -----\nlet timeline = new Timeline;\ntimeline.add(animation)\ntimeline.add(animation2)\n\ntimeline.start()\ntimeline.pause()\ntimeline.resume()\ntimeline.stop()\n\nsetTimeout\nsetInterval\nrequestAnimationFrame\n */\n\n//# sourceURL=webpack:///./week16/5_carouselWithLifecycle/animation.js?");

/***/ }),

/***/ "./week16/5_carouselWithLifecycle/cubicBezier.js":
/*!*******************************************************!*\
  !*** ./week16/5_carouselWithLifecycle/cubicBezier.js ***!
  \*******************************************************/
/*! exports provided: cubicBezier, ease, linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar ease = cubicBezier(.25, .1, .25, 1);\nvar linear = cubicBezier(0, 0, 1, 1);\n\n//# sourceURL=webpack:///./week16/5_carouselWithLifecycle/cubicBezier.js?");

/***/ }),

/***/ "./week16/5_carouselWithLifecycle/main.js":
/*!************************************************!*\
  !*** ./week16/5_carouselWithLifecycle/main.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../createElement */ \"./createElement.js\");\n/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Carousel */ \"./week16/5_carouselWithLifecycle/Carousel.js\");\n\n\nvar component = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(_Carousel__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.mountTo(document.body); // jsx 的写法转义成 js 语法\n// var component = createElement(\n// \tMyComponent,\n// \t{\n// \t\tid: \"a\",\n// \t\t\"class\": \"b\"\n// \t},\n// \tcreateElement(Child, null),\n// \tcreateElement(Child, null),\n// \tcreateElement(Child, null)\n// );\n\n//# sourceURL=webpack:///./week16/5_carouselWithLifecycle/main.js?");

/***/ })

/******/ });