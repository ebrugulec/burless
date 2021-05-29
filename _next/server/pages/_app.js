module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Head.js":
/*!****************************!*\
  !*** ./components/Head.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/ebru.gulec/Desktop/burless/components/Head.js\";\n\n\nfunction HeadComponent() {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"title\", {\n      children: \"Burless | URL Shortener\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 6,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"viewport\",\n      content: \"width=device-width, initial-scale=1.0\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 5,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HeadComponent);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlYWQuanM/ZGE5YyJdLCJuYW1lcyI6WyJIZWFkQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsYUFBVCxHQUF5QjtBQUN2QixzQkFDRSxxRUFBQyxnREFBRDtBQUFBLDRCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFHRTtBQUFNLFVBQUksRUFBQyxVQUFYO0FBQXNCLGFBQU8sRUFBQztBQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFPRDs7QUFFY0EsNEVBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmZ1bmN0aW9uIEhlYWRDb21wb25lbnQoKSB7XG4gIHJldHVybiAoXG4gICAgPEhlYWQ+XG4gICAgICA8dGl0bGU+QnVybGVzcyB8IFVSTCBTaG9ydGVuZXI8L3RpdGxlPlxuICAgICAgey8qPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIGhyZWY9XCIuLi9wdWJsaWMvZmF2aWNvbi5pY29cIiAvPiovfVxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIiAvPlxuICAgIDwvSGVhZD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkQ29tcG9uZW50XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Head.js\n");

/***/ }),

/***/ "./context/index.js":
/*!**************************!*\
  !*** ./context/index.js ***!
  \**************************/
/*! exports provided: Context, combineReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Context\", function() { return Context; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineReducers\", function() { return combineReducers; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Context = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"])({});\n\nconst combineReducers = (...reducers) => (state, action) => {\n  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);\n\n  return state;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L2luZGV4LmpzPzAyNjUiXSwibmFtZXMiOlsiQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJjb21iaW5lUmVkdWNlcnMiLCJyZWR1Y2VycyIsInN0YXRlIiwiYWN0aW9uIiwiaSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsTUFBTUEsT0FBTyxnQkFBR0MsMkRBQWEsQ0FBQyxFQUFELENBQTdCOztBQUVBLE1BQU1DLGVBQWUsR0FBRyxDQUFDLEdBQUdDLFFBQUosS0FBaUIsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEtBQW1CO0FBQzFELE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsUUFBUSxDQUFDSSxNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QyxFQUEwQ0YsS0FBSyxHQUFHRCxRQUFRLENBQUNHLENBQUQsQ0FBUixDQUFZRixLQUFaLEVBQW1CQyxNQUFuQixDQUFSOztBQUMxQyxTQUFPRCxLQUFQO0FBQ0QsQ0FIRCIsImZpbGUiOiIuL2NvbnRleHQvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyLCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IENvbnRleHQgPSBjcmVhdGVDb250ZXh0KHt9KTtcblxuY29uc3QgY29tYmluZVJlZHVjZXJzID0gKC4uLnJlZHVjZXJzKSA9PiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZHVjZXJzLmxlbmd0aDsgaSsrKSBzdGF0ZSA9IHJlZHVjZXJzW2ldKHN0YXRlLCBhY3Rpb24pO1xuICByZXR1cm4gc3RhdGU7XG59O1xuXG5leHBvcnQgeyBDb250ZXh0LCBjb21iaW5lUmVkdWNlcnMgfTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/index.js\n");

/***/ }),

/***/ "./context/reducers/user.js":
/*!**********************************!*\
  !*** ./context/reducers/user.js ***!
  \**********************************/
/*! exports provided: user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user\", function() { return user; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction user(state, action) {\n  switch (action.type) {\n    case \"LOGGED_IN_USER\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        user: action.payload,\n        loggedIn: true\n      });\n\n    case \"SET_LOGGED_IN_INFO\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        loggedIn: true\n      });\n\n    default:\n      return state;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L3JlZHVjZXJzL3VzZXIuanM/ZTkzNCJdLCJuYW1lcyI6WyJ1c2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImxvZ2dlZEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFPLFNBQVNBLElBQVQsQ0FBY0MsS0FBZCxFQUFxQkMsTUFBckIsRUFBNkI7QUFDbEMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0UsU0FBSyxnQkFBTDtBQUNFLDZDQUNLRixLQURMO0FBRUVELFlBQUksRUFBRUUsTUFBTSxDQUFDRSxPQUZmO0FBR0VDLGdCQUFRLEVBQUU7QUFIWjs7QUFLRixTQUFLLG9CQUFMO0FBQ0UsNkNBQ0tKLEtBREw7QUFFRUksZ0JBQVEsRUFBRTtBQUZaOztBQUlGO0FBQ0UsYUFBT0osS0FBUDtBQWJKO0FBZUQiLCJmaWxlIjoiLi9jb250ZXh0L3JlZHVjZXJzL3VzZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdXNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFwiTE9HR0VEX0lOX1VTRVJcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2VyOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgbG9nZ2VkSW46IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBcIlNFVF9MT0dHRURfSU5fSU5GT1wiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvZ2dlZEluOiB0cnVlXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/reducers/user.js\n");

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/styles.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUvc3R5bGVzLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@fortawesome/fontawesome-svg-core/styles.css\n");

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.css":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/bootstrap/dist/css/bootstrap.css\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MyApp; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ \"./context/index.js\");\n/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-cookies */ \"next-cookies\");\n/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_cookies__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _context_reducers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/reducers/user */ \"./context/reducers/user.js\");\n/* harmony import */ var _styles_reset_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/reset.scss */ \"./styles/reset.scss\");\n/* harmony import */ var _styles_reset_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_reset_scss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_Head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Head */ \"./components/Head.js\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/app.scss */ \"./styles/app.scss\");\n/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_app_scss__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ \"./node_modules/@fortawesome/fontawesome-svg-core/styles.css\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"@fortawesome/fontawesome-svg-core\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10__);\n\nvar _jsxFileName = \"/Users/ebru.gulec/Desktop/burless/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n // import Font Awesome CSS\n\n\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10__[\"config\"].autoAddCss = false;\nif (typeof process.versions === 'undefined') process.versions = {};\nconst initialState = {\n  user: {},\n  loggedIn: false\n};\nconst loggedInInitialState = {\n  user: {},\n  loggedIn: true\n};\nfunction MyApp({\n  Component,\n  pageProps,\n  props\n}) {\n  const {\n    0: state,\n    1: dispatch\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useReducer\"])(Object(_context__WEBPACK_IMPORTED_MODULE_2__[\"combineReducers\"])(_context_reducers_user__WEBPACK_IMPORTED_MODULE_4__[\"user\"]), props.token ? loggedInInitialState : initialState);\n  const value = {\n    state,\n    dispatch\n  }; //TODO: res.writeHead(307, { Location: '/api/login' }); res.end();\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_context__WEBPACK_IMPORTED_MODULE_2__[\"Context\"].Provider, {\n    value: value,\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_Head__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 30,\n    columnNumber: 5\n  }, this);\n}\n\nMyApp.getInitialProps = async ({\n  ctx\n}) => {\n  const token = next_cookies__WEBPACK_IMPORTED_MODULE_3___default()(ctx).burless;\n  return {\n    props: {\n      token\n    }\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsiY29uZmlnIiwiYXV0b0FkZENzcyIsInByb2Nlc3MiLCJ2ZXJzaW9ucyIsImluaXRpYWxTdGF0ZSIsInVzZXIiLCJsb2dnZWRJbiIsImxvZ2dlZEluSW5pdGlhbFN0YXRlIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJwcm9wcyIsInN0YXRlIiwiZGlzcGF0Y2giLCJ1c2VSZWR1Y2VyIiwiY29tYmluZVJlZHVjZXJzIiwidG9rZW4iLCJ2YWx1ZSIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImNvb2tpZXMiLCJidXJsZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBQ3VEOztBQUN2RDtBQUNBQSx5RUFBTSxDQUFDQyxVQUFQLEdBQW9CLEtBQXBCO0FBRUEsSUFBSSxPQUFPQyxPQUFPLENBQUNDLFFBQWYsS0FBNEIsV0FBaEMsRUFBNkNELE9BQU8sQ0FBQ0MsUUFBUixHQUFtQixFQUFuQjtBQUM3QyxNQUFNQyxZQUFZLEdBQUc7QUFDbkJDLE1BQUksRUFBRSxFQURhO0FBRW5CQyxVQUFRLEVBQUU7QUFGUyxDQUFyQjtBQUtBLE1BQU1DLG9CQUFvQixHQUFHO0FBQzNCRixNQUFJLEVBQUUsRUFEcUI7QUFFM0JDLFVBQVEsRUFBRTtBQUZpQixDQUE3QjtBQUtlLFNBQVNFLEtBQVQsQ0FBZ0I7QUFBQ0MsV0FBRDtBQUFZQyxXQUFaO0FBQXVCQztBQUF2QixDQUFoQixFQUErQztBQUM1RCxRQUFNO0FBQUEsT0FBQ0MsS0FBRDtBQUFBLE9BQVFDO0FBQVIsTUFBb0JDLHdEQUFVLENBQUNDLGdFQUFlLENBQUNWLDJEQUFELENBQWhCLEVBQXdCTSxLQUFLLENBQUNLLEtBQU4sR0FBY1Qsb0JBQWQsR0FBcUNILFlBQTdELENBQXBDO0FBQ0EsUUFBTWEsS0FBSyxHQUFHO0FBQUVMLFNBQUY7QUFBU0M7QUFBVCxHQUFkLENBRjRELENBSTlEOztBQUNFLHNCQUNFLHFFQUFDLGdEQUFELENBQVMsUUFBVDtBQUFrQixTQUFLLEVBQUVJLEtBQXpCO0FBQUEsNEJBQ0UscUVBQUMsd0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBRUUscUVBQUMsU0FBRCxvQkFBZVAsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFFREYsS0FBSyxDQUFDVSxlQUFOLEdBQXdCLE9BQU87QUFBQ0M7QUFBRCxDQUFQLEtBQWlCO0FBQ3ZDLFFBQU1ILEtBQUssR0FBR0ksbURBQU8sQ0FBQ0QsR0FBRCxDQUFQLENBQWFFLE9BQTNCO0FBQ0EsU0FBTztBQUFFVixTQUFLLEVBQUU7QUFBRUs7QUFBRjtBQUFULEdBQVA7QUFDRCxDQUhEIiwiZmlsZSI6Ii4vcGFnZXMvX2FwcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVJlZHVjZXJ9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDb250ZXh0LCBjb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuLi9jb250ZXh0XCI7XG5pbXBvcnQgY29va2llcyBmcm9tICduZXh0LWNvb2tpZXMnXG5pbXBvcnQge3VzZXJ9IGZyb20gXCIuLi9jb250ZXh0L3JlZHVjZXJzL3VzZXJcIjtcbmltcG9ydCAnLi4vc3R5bGVzL3Jlc2V0LnNjc3MnO1xuaW1wb3J0IEhlYWRDb21wb25lbnQgZnJvbSBcIi4uL2NvbXBvbmVudHMvSGVhZFwiO1xuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcydcbmltcG9ydCAnLi4vc3R5bGVzL2FwcC5zY3NzJ1xuaW1wb3J0IFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlL3N0eWxlcy5jc3NcIjsgLy8gaW1wb3J0IEZvbnQgQXdlc29tZSBDU1NcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIjtcbmNvbmZpZy5hdXRvQWRkQ3NzID0gZmFsc2U7XG5cbmlmICh0eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHByb2Nlc3MudmVyc2lvbnMgPSB7fTtcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgdXNlcjoge30sXG4gIGxvZ2dlZEluOiBmYWxzZVxufTtcblxuY29uc3QgbG9nZ2VkSW5Jbml0aWFsU3RhdGUgPSB7XG4gIHVzZXI6IHt9LFxuICBsb2dnZWRJbjogdHJ1ZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAgKHtDb21wb25lbnQsIHBhZ2VQcm9wcywgcHJvcHN9KSB7XG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihjb21iaW5lUmVkdWNlcnModXNlciksIHByb3BzLnRva2VuID8gbG9nZ2VkSW5Jbml0aWFsU3RhdGUgOiBpbml0aWFsU3RhdGUpO1xuICBjb25zdCB2YWx1ZSA9IHsgc3RhdGUsIGRpc3BhdGNoIH07XG5cbi8vVE9ETzogcmVzLndyaXRlSGVhZCgzMDcsIHsgTG9jYXRpb246ICcvYXBpL2xvZ2luJyB9KTsgcmVzLmVuZCgpO1xuICByZXR1cm4gKFxuICAgIDxDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XG4gICAgICA8SGVhZENvbXBvbmVudC8+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Db250ZXh0LlByb3ZpZGVyPlxuICApXG59XG5cbk15QXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jICh7Y3R4fSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IGNvb2tpZXMoY3R4KS5idXJsZXNzO1xuICByZXR1cm4geyBwcm9wczogeyB0b2tlbiB9IH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/app.scss":
/*!*************************!*\
  !*** ./styles/app.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy9hcHAuc2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/app.scss\n");

/***/ }),

/***/ "./styles/reset.scss":
/*!***************************!*\
  !*** ./styles/reset.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy9yZXNldC5zY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./styles/reset.scss\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@fortawesome/fontawesome-svg-core\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIj9iOWY4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@fortawesome/fontawesome-svg-core\n");

/***/ }),

/***/ "next-cookies":
/*!*******************************!*\
  !*** external "next-cookies" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-cookies\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWNvb2tpZXNcIj82ZGI4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtY29va2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtY29va2llc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-cookies\n");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/head\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIj81ZWYyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQvaGVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/head\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });