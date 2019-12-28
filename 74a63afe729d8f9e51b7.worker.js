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
/******/ 	__webpack_require__.p = "/algorifun/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/workerize-loader/dist/rpc-worker-loader.js!./src/workers/sorting/bubble-sort.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/workerize-loader/dist/rpc-worker-loader.js!./src/workers/sorting/bubble-sort.worker.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/workerize-loader/dist/rpc-worker-loader.js!./src/workers/sorting/bubble-sort.worker.js ***!
  \*************************************************************************************************************/
/*! exports provided: init, run */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony import */ var algorithms_sorting_bubble_sort_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algorithms/sorting/bubble-sort-algorithm */ "./src/algorithms/sorting/bubble-sort-algorithm.ts");
/* harmony import */ var configs_sorting_bubble_sort_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! configs/sorting/bubble-sort-config */ "./src/configs/sorting/bubble-sort-config.ts");
/**
  * Automatically generated with `node ./generate-page.js`
  * Please do not edit this file directly
  * Last updated: 2019-12-28T06:06:05.071Z
  */




let algorithm;

async function init(data) {
    algorithm = new algorithms_sorting_bubble_sort_algorithm__WEBPACK_IMPORTED_MODULE_0__["default"](data, ...configs_sorting_bubble_sort_config__WEBPACK_IMPORTED_MODULE_1__["default"].params);
}

async function run() {
    return algorithm.run();
}
    
addEventListener('message', function (e) {var ref = e.data;var type = ref.type;var method = ref.method;var id = ref.id;var params = ref.params;var f,p;if (type === 'RPC' && method) {if (f = __webpack_exports__[method]) {p = Promise.resolve().then(function () { return f.apply(__webpack_exports__, params); });} else {p = Promise.reject('No such method');}p.then(function (result) {postMessage({type: 'RPC',id: id,result: result});}).catch(function (e) {var error = {message: e};if (e.stack) {error.message = e.message;error.stack = e.stack;error.name = e.name;}postMessage({type: 'RPC',id: id,error: error});});}});postMessage({type: 'RPC',method: 'ready'});

/***/ }),

/***/ "./src/algorithms/sorting/bubble-sort-algorithm.ts":
/*!*********************************************************!*\
  !*** ./src/algorithms/sorting/bubble-sort-algorithm.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BubbleSort; });
class InitialState {
  constructor(arr, compare) {
    this.arr = arr;
    this.compare = compare;
  }

  run() {
    const step = {
      done: false,
      type: 'init',
      payload: {
        data: this.arr.slice()
      }
    };
    let next;

    if (this.arr.length < 2) {
      next = new DoneState();
    } else {
      next = new CompareState(this.arr, this.compare, 0, this.arr.length - 1);
    }

    return {
      step,
      next
    };
  }

}

class DoneState {
  run() {
    const step = {
      done: true,
      type: 'done',
      payload: null
    };
    const next = this;
    return {
      step,
      next
    };
  }

}

class CompareState {
  constructor(arr, compare, pos, end, lastSwapped = -1) {
    this.arr = arr;
    this.compare = compare;
    this.pos = pos;
    this.end = end;
    this.lastSwapped = lastSwapped;
  }

  run() {
    const step = {
      done: false,
      type: 'comp',
      payload: {
        pos: this.pos
      }
    };
    const next = new SwapState(this.arr, this.compare, this.pos, this.end, this.lastSwapped);
    return {
      step,
      next
    };
  }

}

class SwapState {
  constructor(arr, compare, pos, end, lastSwapped) {
    this.arr = arr;
    this.compare = compare;
    this.pos = pos;
    this.end = end;
    this.lastSwapped = lastSwapped;
  }

  run() {
    const i = this.pos;
    const j = i + 1;
    let step;

    if (!this.compare(this.arr[i], this.arr[j])) {
      [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
      this.lastSwapped = this.pos;
      step = {
        done: false,
        type: 'swap',
        payload: {
          pos: this.pos,
          end: this.end,
          lastSwapped: this.lastSwapped
        }
      };
    } else {
      step = {
        done: false,
        type: 'noswap',
        payload: {
          pos: this.pos,
          end: this.end,
          lastSwapped: this.lastSwapped
        }
      };
    }

    const next = this.advance();
    return {
      step,
      next
    };
  }

  advance() {
    ++this.pos;

    if (this.pos === this.end) {
      if (this.lastSwapped < 1) {
        return new DoneState();
      }

      this.end = this.lastSwapped;
      this.pos = 0;
      this.lastSwapped = -1;
    }

    return new CompareState(this.arr, this.compare, this.pos, this.end, this.lastSwapped);
  }

}

class BubbleSort {
  constructor(arr, compare) {
    this.arr = arr;
    this.compare = compare;
    this.state = new InitialState(this.arr, this.compare);
  }

  run() {
    const {
      step,
      next
    } = this.state.run();
    this.state = next;
    return step;
  }

  getResult() {
    return this.arr;
  }

}

/***/ }),

/***/ "./src/configs/sorting/bubble-sort-config.ts":
/*!***************************************************!*\
  !*** ./src/configs/sorting/bubble-sort-config.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  params: [(x, y) => x <= y],
  data: () => Array(8).fill(null).map(() => Math.floor(Math.random() * 100)),
  validator: data => {
    if (!Array.isArray(data)) {
      return 'Data must be an array';
    }

    if (data.length < 2) {
      return 'Data must contain at least 2 elements';
    }

    if (!data.every(num => typeof num === 'number')) {
      return 'Data must contain numbers only';
    }

    return '';
  }
});

/***/ })

/******/ });
//# sourceMappingURL=74a63afe729d8f9e51b7.worker.js.map