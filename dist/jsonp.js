(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsonp"] = factory();
	else
		root["jsonp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	window.loadJsonp = {};
	window.loadJsonp.counter = 0;
	var jsnop = function jsnop(url, parameter) {
	    return new Promise(function (resolve, reject) {
	        //make callback
	        var callbackName = 'cb_' + window.loadJsonp.counter;
	        var fullCallbackName = 'window.loadJsonp.' + callbackName;
	        window.loadJsonp.counter++;
	        window.loadJsonp[callbackName] = function (res) {
	            resolve(res);
	            delete window.loadJsonp[callbackName];
	        };
	        //make url
	        var query = [];
	        if (parameter) {
	            for (var key in parameter) {
	                if (parameter.hasOwnProperty(key)) {
	                    query.push(key + '=' + encodeURIComponent(parameter[key]));
	                }
	            }
	        }
	        if (/callback=/.test(url)) {
	            url = url.replace(/callback=[^&]+/, 'callback=' + fullCallbackName);
	        } else {
	            query.push('callback=' + fullCallbackName);
	        }
	        if (!/\?/.test(url)) {
	            url += '?';
	        } else {
	            if (query.length) {
	                url += '&';
	            }
	        }
	        var fullUrl = url + query.join('&');
	        if (fullUrl.length > 2000) {
	            console.error('Jsonp request url too long. Request failed.');
	            delete window.loadJsonp[callbackName];
	            return;
	        }
	        //make request
	        var head = document.getElementsByTagName('head')[0];
	        var script = document.createElement('script');
	        script.addEventListener('load', function () {
	            script.parentElement.removeChild(script);
	        });
	        script.addEventListener('error', function () {
	            console.error('Server load error');
	            reject();
	            script.parentElement.removeChild(script);
	        });
	        script.setAttribute('src', fullUrl);
	        head.appendChild(script);
	    }).catch(function (error) {
	        console.error(error.stack);
	    });
	};
	module.exports = jsnop;

/***/ }
/******/ ])
});
;