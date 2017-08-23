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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(10)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(13),
  /* scopeId */
  "data-v-c85bb5a2",
  /* cssModules */
  null
)
Component.options.__file = "/home/java/Proyectos/masterDetailConjunto/cliente/loginvuejs/components/detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c85bb5a2", Component.options)
  } else {
    hotAPI.reload("data-v-c85bb5a2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("40f4ad72", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c85bb5a2&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c85bb5a2&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* CSS here\n * by including `scoped`, we ensure that all CSS\n * is scoped to this component!\n */\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var baseURL = "http://localhost:62270/api/";
/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['menuChoice'],
	name: "Detail",
	data: function () {
		return {
			currentObject: {
				index: "",
				property1: "",
				property2: "",
				property3: ""
			},
			previousObject: {
				index: "",
				property1: "",
				property2: "",
				property3: ""
			},
			read: true
		};
	},
	methods: {
		// all code for my component goes here
		makeGetRequest: function (id) {
			$.ajax(url = "http://localhost:62270/api/" + this.menuChoice + "/" + id, method = "GET").done(this.submitDetailValues);
		},
		readDetail: function (index) {
			this.makeGetRequest(index);
			this.read = true;
		},
		makePostRequest: function (item) {
			var datos;
			if (this.menuChoice == 'Usuarios') {
				datos = {
					Nombre: this.currentObject.property1,
					Apellido: this.currentObject.property2,
					Edad: this.currentObject.property3
				};
			} else if (this.menuChoice == 'CuentaBancarias') {
				datos = {
					Credito: this.currentObject.property1,
					Numero: this.currentObject.property2,
					Saldo: this.currentObject.property3
				};
			} else if (this.menuChoice == 'Domicilios') {
				datos = {
					Calle: this.currentObject.property1,
					Numero: this.currentObject.property2,
					Ciudad: this.currentObject.property3
				};
			}
			$.ajax({ url: baseURL + this.menuChoice,
				method: "POST",
				data: datos }).done(this.afterPostHandler).fail(function () {
				alert("ELEMENTO NO CREADO");
			});
		},
		updateDetail: function (index) {
			this.makeGetRequest(index);
			this.previousPerson.index = this.currentPerson.index;
			this.previousPerson.name = this.currentPerson.name;
			this.previousPerson.surname = this.currentPerson.surname;
			this.previousPerson.age = this.currentPerson.age;
			this.read = false;
		},
		newDetail: function (index) {
			this.read = false;
			this.currentPerson.index = "";
			this.currentPerson.name = "";
			this.currentPerson.surname = "";
			this.currentPerson.age = "";
		},
		deleteItem: function (index) {
			$.ajax({ url: "http://localhost:57470/api/ " + this.menuChoice + "/" + index,
				method: "DELETE" }).done(this.makeGetListRequest).fail(function () {
				alert("ELEMENTO NO BORRADO");
			});
		},
		buttonAccept: function () {
			if (this.currentObject.index == "") {
				this.makePostRequest(this.currentObject);
			} else {
				this.makePutRequest(this.currentObject);
			}
		},
		buttonClean: function () {
			this.currentObject.index = "";
			this.currentObject.property1 = "";
			this.currentObject.property2 = "";
			this.currentObject.property3 = "";
		},
		buttonReset: function () {
			this.currentObject = this.previousObject;
		}
	},
	mounted() {
		console.log('Component mounted.');
	}
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail-div",
    attrs: {
      "id": "Detail"
    }
  }, [(_vm.menuChoice === 'Usuarios') ? _c('div', [_c('div', {
    staticClass: "Formulario",
    attrs: {
      "id": "FormularioUsuarios"
    }
  }, [_c('label', [_vm._v("Nombre:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property1),
      expression: "currentObject.property1"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "nombreInput",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.currentObject.property1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property1 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Apellido:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property2),
      expression: "currentObject.property2"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "apellidoInput",
      "placeholder": "Apellido"
    },
    domProps: {
      "value": (_vm.currentObject.property2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property2 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Edad:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property3),
      expression: "currentObject.property3"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "edadInput",
      "placeholder": "Edad"
    },
    domProps: {
      "value": (_vm.currentObject.property3)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property3 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "buttonContainer"
  }, [_c('button', {
    attrs: {
      "id": "acceptButton"
    },
    on: {
      "click": _vm.buttonAccept
    }
  }, [_vm._v("ACEPTAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "limpiarButton"
    },
    on: {
      "click": _vm.buttonClean
    }
  }, [_vm._v("LIMPIAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "resetButton"
    },
    on: {
      "click": _vm.buttonReset
    }
  }, [_vm._v("RESET")])])])]) : _vm._e(), _vm._v(" "), (_vm.menuChoice === 'CuentaBancarias') ? _c('div', [_c('div', {
    staticClass: "Formulario",
    attrs: {
      "id": "FormularioCuentas"
    }
  }, [_c('label', [_vm._v("Credito:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property1),
      expression: "currentObject.property1"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "checkbox",
      "id": "nombreInput",
      "placeholder": "Credito"
    },
    domProps: {
      "checked": Array.isArray(_vm.currentObject.property1) ? _vm._i(_vm.currentObject.property1, null) > -1 : (_vm.currentObject.property1)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.currentObject.property1,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.currentObject.property1 = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.currentObject.property1 = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.currentObject.property1 = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Numero:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property2),
      expression: "currentObject.property2"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "apellidoInput",
      "placeholder": "Numero"
    },
    domProps: {
      "value": (_vm.currentObject.property2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property2 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Saldo:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property3),
      expression: "currentObject.property3"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "edadInput",
      "placeholder": "Saldo"
    },
    domProps: {
      "value": (_vm.currentObject.property3)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property3 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "buttonContainer"
  }, [_c('button', {
    attrs: {
      "id": "acceptButton"
    },
    on: {
      "click": _vm.buttonAccept
    }
  }, [_vm._v("ACEPTAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "limpiarButton"
    },
    on: {
      "click": _vm.buttonClean
    }
  }, [_vm._v("LIMPIAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "resetButton"
    },
    on: {
      "click": _vm.buttonReset
    }
  }, [_vm._v("RESET")])])])]) : _vm._e(), _vm._v(" "), (_vm.menuChoice === 'Domicilios') ? _c('div', [_c('div', {
    staticClass: "Formulario",
    attrs: {
      "id": "FormularioDomicilios"
    }
  }, [_c('label', [_vm._v("Calle:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property1),
      expression: "currentObject.property1"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "nombreInput",
      "placeholder": "Calle"
    },
    domProps: {
      "value": (_vm.currentObject.property1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property1 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Numero:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property2),
      expression: "currentObject.property2"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "apellidoInput",
      "placeholder": "Numero"
    },
    domProps: {
      "value": (_vm.currentObject.property2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property2 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Ciudad:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property3),
      expression: "currentObject.property3"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "edadInput",
      "placeholder": "Ciudad"
    },
    domProps: {
      "value": (_vm.currentObject.property3)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property3 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "buttonContainer"
  }, [_c('button', {
    attrs: {
      "id": "acceptButton"
    },
    on: {
      "click": _vm.buttonAccept
    }
  }, [_vm._v("ACEPTAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "limpiarButton"
    },
    on: {
      "click": _vm.buttonClean
    }
  }, [_vm._v("LIMPIAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "resetButton"
    },
    on: {
      "click": _vm.buttonReset
    }
  }, [_vm._v("RESET")])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c85bb5a2", module.exports)
  }
}

/***/ })
/******/ ]);