/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Interstitial Demo
	 * @author Eiji Kuroda
	 * @license Apache-2.0
	 */
	
	var Cage = __webpack_require__(1);
	
	window.cage = function(targetId){
	  'use strict';
	  var target = document.querySelector('#' + targetId);
	  var ce = new Cage(target);
	};
	
	document.addEventListener('DOMContentLoaded', function(){
	  'use strict';
	  window.cage('target');
	}, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Cage Element Module
	 * @author Eiji Kuroda
	 * @license Apache-2.0
	 */
	/* globals __DEVELOP__ */
	var Cage = function Cage(_target, _offsetTop, _offsetBottom){
	  'use strict';
	  var __ = this;
	
	  /* */
	  __.setObservers = function(){
	    __.log('setObservers');
	    window.addEventListener('scroll', __.caging, false);
	    window.addEventListener('wheel', __.caging, false);
	    window.addEventListener('touchmove', __.caging, false);
	    window.addEventListener('touchstart', __.caging, false);
	    __.interval = window.setInterval(__.caging, 500);
	  };
	
	  /* */
	  __.removeObservers = function(){
	    __.log('removeObservers');
	    window.removeEventListener('scroll', __.caging, false);
	    window.removeEventListener('wheel', __.caging, false);
	    window.removeEventListener('touchmove', __.caging, false);
	    window.removeEventListener('touchstart', __.caging, false);
	    window.clearInterval(__.interval);
	  };
	
	  /* */
	  __.caging = function(){
	    var bounds, stageHeight;
	
	    stageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    if(__.status === 'cageTop'){
	      bounds = __.filler.getBoundingClientRect();
	      if(bounds.top > __.offsetTop){
	        __.cageInside();
	      }
	      return;
	    }
	
	    if(__.status === 'cageBottom'){
	      bounds = __.filler.getBoundingClientRect();
	      if(bounds.top + bounds.height < stageHeight - __.offsetBottom){
	        __.cageInside();
	      }
	      return;
	    }
	
	    bounds = __.target.getBoundingClientRect();
	    if(bounds.top < __.offsetTop){
	      __.cageTop();
	      return;
	    }
	
	    if(bounds.top + bounds.height > stageHeight - __.offsetBottom){
	      __.cageBottom();
	      return;
	    }
	  };
	
	  /* */
	  __.cageTop = function(){
	    if(__.filler){
	      return;
	    }
	    __.log('cageTop');
	    __.status = 'cageTop';
	    __.target.dispatchEvent(new Event('cageTop', {bubbles: true}));
	    __.filler = document.createElement(__.target.tagName);
	    __.target.parentNode.insertBefore(__.filler, __.target);
	    __.copyStyle(__.filler, __.target);
	    __.fixedPosition(__.target);
	    __.target.style.top = '0px';
	  };
	
	  /* */
	  __.cageBottom = function(){
	    if(__.filler){
	      return;
	    }
	    __.log('cageBottom');
	    __.status = 'cageBottom';
	    __.target.dispatchEvent(new Event('cageBottom', {bubbles: true}));
	    __.filler = document.createElement(__.target.tagName);
	    __.target.parentNode.insertBefore(__.filler, __.target);
	    __.copyStyle(__.filler, __.target);
	    __.fixedPosition(__.target);
	    __.target.style.bottom = '0px';
	  };
	
	  /* */
	  __.cageInside = function(){
	    if(!__.filler){
	      return;
	    }
	    __.log('cageInside');
	    __.status = 'cageInside';
	    __.target.dispatchEvent(new Event('cageInside', {bubbles: true}));
	    __.copyStyle(__.target, __.filler);
	    __.target.parentNode.removeChild(__.filler);
	    __.filler = null;
	  };
	
	  /* */
	  __.copyStyle = function(dest, src){
	    var cs = window.getComputedStyle(src, null);
	    for(var i = 0; i < cs.length; i++){
	      var style = cs[i];
	      dest.style[style] = cs.getPropertyValue(style);
	    }
	  };
	
	  /* */
	  __.fixedPosition = function(dest){
	    var bounds = __.target.getBoundingClientRect();
	    dest.style.position = 'fixed';
	    dest.style.top = null;
	    dest.style.bottom = null;
	    dest.style.left = bounds.left + 'px';
	    dest.style.width = bounds.width + 'px';
	    dest.style.zIndex = 5000000;
	  };
	
	  /* */
	  (function init(){
	    if(false){
	      __.log = function(msg){return;};
	    }else{
	      __.log = function(msg){window.console.log(msg);};
	    }
	    __.offsetTop = _offsetTop || 0;
	    __.offsetBottom = _offsetBottom || 0;
	    __.target = _target;
	    __.status = 'cageInside';
	    __.setObservers();
	  })();
	
	  return __;
	};
	
	module.exports = Cage;


/***/ }
/******/ ]);
//# sourceMappingURL=index.compiled.js.map