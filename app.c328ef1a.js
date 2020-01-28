// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/core-js/internals/global.js":[function(require,module,exports) {
var global = arguments[3];
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

},{}],"node_modules/core-js/internals/fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"node_modules/core-js/internals/descriptors.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/object-property-is-enumerable.js":[function(require,module,exports) {
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],"node_modules/core-js/internals/create-property-descriptor.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/internals/classof-raw.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/internals/indexed-object.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"node_modules/core-js/internals/fails.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js"}],"node_modules/core-js/internals/require-object-coercible.js":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"node_modules/core-js/internals/to-indexed-object.js":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"node_modules/core-js/internals/indexed-object.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/internals/is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/internals/to-primitive.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/internals/has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/internals/document-create-element.js":[function(require,module,exports) {

var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/internals/ie8-dom-define.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/document-create-element":"node_modules/core-js/internals/document-create-element.js"}],"node_modules/core-js/internals/object-get-own-property-descriptor.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-property-is-enumerable":"node_modules/core-js/internals/object-property-is-enumerable.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/ie8-dom-define":"node_modules/core-js/internals/ie8-dom-define.js"}],"node_modules/core-js/internals/an-object.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/internals/object-define-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/ie8-dom-define":"node_modules/core-js/internals/ie8-dom-define.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js"}],"node_modules/core-js/internals/create-non-enumerable-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js"}],"node_modules/core-js/internals/set-global.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js"}],"node_modules/core-js/internals/shared-store.js":[function(require,module,exports) {

var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/set-global":"node_modules/core-js/internals/set-global.js"}],"node_modules/core-js/internals/inspect-source.js":[function(require,module,exports) {
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":"node_modules/core-js/internals/shared-store.js"}],"node_modules/core-js/internals/native-weak-map.js":[function(require,module,exports) {

var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/inspect-source":"node_modules/core-js/internals/inspect-source.js"}],"node_modules/core-js/internals/is-pure.js":[function(require,module,exports) {
module.exports = false;

},{}],"node_modules/core-js/internals/shared.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/shared-store":"node_modules/core-js/internals/shared-store.js"}],"node_modules/core-js/internals/uid.js":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"node_modules/core-js/internals/shared-key.js":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"node_modules/core-js/internals/shared.js","../internals/uid":"node_modules/core-js/internals/uid.js"}],"node_modules/core-js/internals/hidden-keys.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/internals/internal-state.js":[function(require,module,exports) {

var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/native-weak-map":"node_modules/core-js/internals/native-weak-map.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/shared-key":"node_modules/core-js/internals/shared-key.js","../internals/hidden-keys":"node_modules/core-js/internals/hidden-keys.js"}],"node_modules/core-js/internals/redefine.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/set-global":"node_modules/core-js/internals/set-global.js","../internals/inspect-source":"node_modules/core-js/internals/inspect-source.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/internals/path.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global;

},{"../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/internals/get-built-in.js":[function(require,module,exports) {

var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/path":"node_modules/core-js/internals/path.js","../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/internals/to-integer.js":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"node_modules/core-js/internals/to-length.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js"}],"node_modules/core-js/internals/to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js"}],"node_modules/core-js/internals/array-includes.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js"}],"node_modules/core-js/internals/object-keys-internal.js":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"node_modules/core-js/internals/has.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/array-includes":"node_modules/core-js/internals/array-includes.js","../internals/hidden-keys":"node_modules/core-js/internals/hidden-keys.js"}],"node_modules/core-js/internals/enum-bug-keys.js":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"node_modules/core-js/internals/object-get-own-property-names.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"node_modules/core-js/internals/enum-bug-keys.js"}],"node_modules/core-js/internals/object-get-own-property-symbols.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"node_modules/core-js/internals/own-keys.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-symbols":"node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/an-object":"node_modules/core-js/internals/an-object.js"}],"node_modules/core-js/internals/copy-constructor-properties.js":[function(require,module,exports) {
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":"node_modules/core-js/internals/has.js","../internals/own-keys":"node_modules/core-js/internals/own-keys.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/internals/is-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/export.js":[function(require,module,exports) {

var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/set-global":"node_modules/core-js/internals/set-global.js","../internals/copy-constructor-properties":"node_modules/core-js/internals/copy-constructor-properties.js","../internals/is-forced":"node_modules/core-js/internals/is-forced.js"}],"node_modules/core-js/internals/native-symbol.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/use-symbol-as-uid.js":[function(require,module,exports) {
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"node_modules/core-js/internals/native-symbol.js"}],"node_modules/core-js/internals/is-array.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js"}],"node_modules/core-js/internals/to-object.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/internals/object-keys.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"node_modules/core-js/internals/enum-bug-keys.js"}],"node_modules/core-js/internals/object-define-properties.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/object-keys":"node_modules/core-js/internals/object-keys.js"}],"node_modules/core-js/internals/html.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js"}],"node_modules/core-js/internals/object-create.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/object-define-properties":"node_modules/core-js/internals/object-define-properties.js","../internals/enum-bug-keys":"node_modules/core-js/internals/enum-bug-keys.js","../internals/hidden-keys":"node_modules/core-js/internals/hidden-keys.js","../internals/html":"node_modules/core-js/internals/html.js","../internals/document-create-element":"node_modules/core-js/internals/document-create-element.js","../internals/shared-key":"node_modules/core-js/internals/shared-key.js"}],"node_modules/core-js/internals/object-get-own-property-names-external.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js"}],"node_modules/core-js/internals/well-known-symbol.js":[function(require,module,exports) {

var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/shared":"node_modules/core-js/internals/shared.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/uid":"node_modules/core-js/internals/uid.js","../internals/native-symbol":"node_modules/core-js/internals/native-symbol.js","../internals/use-symbol-as-uid":"node_modules/core-js/internals/use-symbol-as-uid.js"}],"node_modules/core-js/internals/well-known-symbol-wrapped.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/define-well-known-symbol.js":[function(require,module,exports) {
var path = require('../internals/path');
var has = require('../internals/has');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/path":"node_modules/core-js/internals/path.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/well-known-symbol-wrapped":"node_modules/core-js/internals/well-known-symbol-wrapped.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/internals/set-to-string-tag.js":[function(require,module,exports) {
var defineProperty = require('../internals/object-define-property').f;
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"node_modules/core-js/internals/function-bind-context.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"node_modules/core-js/internals/a-function.js"}],"node_modules/core-js/internals/array-species-create.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/is-array":"node_modules/core-js/internals/is-array.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/array-iteration.js":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/indexed-object":"node_modules/core-js/internals/indexed-object.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/array-species-create":"node_modules/core-js/internals/array-species-create.js"}],"node_modules/core-js/modules/es.symbol.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var fails = require('../internals/fails');
var has = require('../internals/has');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/native-symbol":"node_modules/core-js/internals/native-symbol.js","../internals/use-symbol-as-uid":"node_modules/core-js/internals/use-symbol-as-uid.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/is-array":"node_modules/core-js/internals/is-array.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/object-keys":"node_modules/core-js/internals/object-keys.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-names-external":"node_modules/core-js/internals/object-get-own-property-names-external.js","../internals/object-get-own-property-symbols":"node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-property-is-enumerable":"node_modules/core-js/internals/object-property-is-enumerable.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/shared":"node_modules/core-js/internals/shared.js","../internals/shared-key":"node_modules/core-js/internals/shared-key.js","../internals/hidden-keys":"node_modules/core-js/internals/hidden-keys.js","../internals/uid":"node_modules/core-js/internals/uid.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/well-known-symbol-wrapped":"node_modules/core-js/internals/well-known-symbol-wrapped.js","../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.symbol.async-iterator.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.description.js":[function(require,module,exports) {

// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var has = require('../internals/has');
var isObject = require('../internals/is-object');
var defineProperty = require('../internals/object-define-property').f;
var copyConstructorProperties = require('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/copy-constructor-properties":"node_modules/core-js/internals/copy-constructor-properties.js"}],"node_modules/core-js/modules/es.symbol.has-instance.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.is-concat-spreadable.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.iterator.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.match.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.match-all.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.replace.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.search.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.species.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.split.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.to-primitive.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.to-string-tag.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/modules/es.symbol.unscopables.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":"node_modules/core-js/internals/define-well-known-symbol.js"}],"node_modules/core-js/internals/object-assign.js":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/object-keys":"node_modules/core-js/internals/object-keys.js","../internals/object-get-own-property-symbols":"node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/object-property-is-enumerable":"node_modules/core-js/internals/object-property-is-enumerable.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/indexed-object":"node_modules/core-js/internals/indexed-object.js"}],"node_modules/core-js/modules/es.object.assign.js":[function(require,module,exports) {
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-assign":"node_modules/core-js/internals/object-assign.js"}],"node_modules/core-js/modules/es.object.create.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-create":"node_modules/core-js/internals/object-create.js"}],"node_modules/core-js/modules/es.object.define-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/modules/es.object.define-properties.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperties = require('../internals/object-define-properties');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-properties":"node_modules/core-js/internals/object-define-properties.js"}],"node_modules/core-js/internals/object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-keys":"node_modules/core-js/internals/object-keys.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/object-property-is-enumerable":"node_modules/core-js/internals/object-property-is-enumerable.js"}],"node_modules/core-js/modules/es.object.entries.js":[function(require,module,exports) {
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-to-array":"node_modules/core-js/internals/object-to-array.js"}],"node_modules/core-js/internals/freezing.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/internal-metadata.js":[function(require,module,exports) {
var hiddenKeys = require('../internals/hidden-keys');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var defineProperty = require('../internals/object-define-property').f;
var uid = require('../internals/uid');
var FREEZING = require('../internals/freezing');

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

},{"../internals/hidden-keys":"node_modules/core-js/internals/hidden-keys.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/uid":"node_modules/core-js/internals/uid.js","../internals/freezing":"node_modules/core-js/internals/freezing.js"}],"node_modules/core-js/modules/es.object.freeze.js":[function(require,module,exports) {
var $ = require('../internals/export');
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/freezing":"node_modules/core-js/internals/freezing.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js"}],"node_modules/core-js/internals/iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/internals/is-array-iterator-method.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/iterators":"node_modules/core-js/internals/iterators.js"}],"node_modules/core-js/internals/to-string-tag-support.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/classof.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/to-string-tag-support":"node_modules/core-js/internals/to-string-tag-support.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/get-iterator-method.js":[function(require,module,exports) {
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":"node_modules/core-js/internals/classof.js","../internals/iterators":"node_modules/core-js/internals/iterators.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/call-with-safe-iteration-closing.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js"}],"node_modules/core-js/internals/iterate.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var bind = require('../internals/function-bind-context');
var getIteratorMethod = require('../internals/get-iterator-method');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-array-iterator-method":"node_modules/core-js/internals/is-array-iterator-method.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/get-iterator-method":"node_modules/core-js/internals/get-iterator-method.js","../internals/call-with-safe-iteration-closing":"node_modules/core-js/internals/call-with-safe-iteration-closing.js"}],"node_modules/core-js/internals/create-property.js":[function(require,module,exports) {
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js"}],"node_modules/core-js/modules/es.object.from-entries.js":[function(require,module,exports) {
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var createProperty = require('../internals/create-property');

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, undefined, true);
    return obj;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/iterate":"node_modules/core-js/internals/iterate.js","../internals/create-property":"node_modules/core-js/internals/create-property.js"}],"node_modules/core-js/modules/es.object.get-own-property-descriptor.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js"}],"node_modules/core-js/modules/es.object.get-own-property-descriptors.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var ownKeys = require('../internals/own-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var createProperty = require('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/own-keys":"node_modules/core-js/internals/own-keys.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/create-property":"node_modules/core-js/internals/create-property.js"}],"node_modules/core-js/modules/es.object.get-own-property-names.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names-external').f;

var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/object-get-own-property-names-external":"node_modules/core-js/internals/object-get-own-property-names-external.js"}],"node_modules/core-js/internals/correct-prototype-getter.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/object-get-prototype-of.js":[function(require,module,exports) {
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/has":"node_modules/core-js/internals/has.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/shared-key":"node_modules/core-js/internals/shared-key.js","../internals/correct-prototype-getter":"node_modules/core-js/internals/correct-prototype-getter.js"}],"node_modules/core-js/modules/es.object.get-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var nativeGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/correct-prototype-getter":"node_modules/core-js/internals/correct-prototype-getter.js"}],"node_modules/core-js/internals/same-value.js":[function(require,module,exports) {
// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"node_modules/core-js/modules/es.object.is.js":[function(require,module,exports) {
var $ = require('../internals/export');
var is = require('../internals/same-value');

// `Object.is` method
// https://tc39.github.io/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/same-value":"node_modules/core-js/internals/same-value.js"}],"node_modules/core-js/modules/es.object.is-extensible.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsExtensible(1); });

// `Object.isExtensible` method
// https://tc39.github.io/ecma262/#sec-object.isextensible
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isExtensible: function isExtensible(it) {
    return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.object.is-frozen.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsFrozen(1); });

// `Object.isFrozen` method
// https://tc39.github.io/ecma262/#sec-object.isfrozen
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isFrozen: function isFrozen(it) {
    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.object.is-sealed.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsSealed(1); });

// `Object.isSealed` method
// https://tc39.github.io/ecma262/#sec-object.issealed
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isSealed: function isSealed(it) {
    return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.object.keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/object-keys":"node_modules/core-js/internals/object-keys.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.object.prevent-extensions.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

var nativePreventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () { nativePreventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-object.preventextensions
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/freezing":"node_modules/core-js/internals/freezing.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.object.seal.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { nativeSeal(1); });

// `Object.seal` method
// https://tc39.github.io/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/freezing":"node_modules/core-js/internals/freezing.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/a-possible-prototype.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/internals/object-set-prototype-of.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/a-possible-prototype":"node_modules/core-js/internals/a-possible-prototype.js"}],"node_modules/core-js/modules/es.object.set-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js"}],"node_modules/core-js/modules/es.object.values.js":[function(require,module,exports) {
var $ = require('../internals/export');
var $values = require('../internals/object-to-array').values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-to-array":"node_modules/core-js/internals/object-to-array.js"}],"node_modules/core-js/internals/object-to-string.js":[function(require,module,exports) {
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/to-string-tag-support":"node_modules/core-js/internals/to-string-tag-support.js","../internals/classof":"node_modules/core-js/internals/classof.js"}],"node_modules/core-js/modules/es.object.to-string.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine = require('../internals/redefine');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/to-string-tag-support":"node_modules/core-js/internals/to-string-tag-support.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/object-to-string":"node_modules/core-js/internals/object-to-string.js"}],"node_modules/core-js/internals/object-prototype-accessors-forced.js":[function(require,module,exports) {

'use strict';
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var fails = require('../internals/fails');

// Forced replacement object prototype accessors methods
module.exports = IS_PURE || !fails(function () {
  var key = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete global[key];
});

},{"../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var aFunction = require('../internals/a-function');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-prototype-accessors-forced":"node_modules/core-js/internals/object-prototype-accessors-forced.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/modules/es.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var aFunction = require('../internals/a-function');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-prototype-accessors-forced":"node_modules/core-js/internals/object-prototype-accessors-forced.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/modules/es.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-prototype-accessors-forced":"node_modules/core-js/internals/object-prototype-accessors-forced.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"node_modules/core-js/modules/es.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-prototype-accessors-forced":"node_modules/core-js/internals/object-prototype-accessors-forced.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"node_modules/core-js/internals/function-bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('../internals/a-function');
var isObject = require('../internals/is-object');

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

},{"../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.function.bind.js":[function(require,module,exports) {
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/function-bind":"node_modules/core-js/internals/function-bind.js"}],"node_modules/core-js/modules/es.function.name.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/modules/es.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('../internals/is-object');
var definePropertyModule = require('../internals/object-define-property');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.github.io/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
    return false;
  } });
}

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.global-this.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');

// `globalThis` object
// https://github.com/tc39/proposal-global
$({ global: true }, {
  globalThis: global
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/internals/array-from.js":[function(require,module,exports) {
'use strict';
var bind = require('../internals/function-bind-context');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var getIteratorMethod = require('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/call-with-safe-iteration-closing":"node_modules/core-js/internals/call-with-safe-iteration-closing.js","../internals/is-array-iterator-method":"node_modules/core-js/internals/is-array-iterator-method.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/create-property":"node_modules/core-js/internals/create-property.js","../internals/get-iterator-method":"node_modules/core-js/internals/get-iterator-method.js"}],"node_modules/core-js/internals/check-correctness-of-iteration.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.array.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-from":"node_modules/core-js/internals/array-from.js","../internals/check-correctness-of-iteration":"node_modules/core-js/internals/check-correctness-of-iteration.js"}],"node_modules/core-js/modules/es.array.is-array.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-array":"node_modules/core-js/internals/is-array.js"}],"node_modules/core-js/modules/es.array.of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var createProperty = require('../internals/create-property');

var ISNT_GENERIC = fails(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.github.io/ecma262/#sec-array.of
// WebKit Array.of isn't generic
$({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(argumentsLength);
    while (argumentsLength > index) createProperty(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/create-property":"node_modules/core-js/internals/create-property.js"}],"node_modules/core-js/internals/engine-user-agent.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js"}],"node_modules/core-js/internals/engine-v8-version.js":[function(require,module,exports) {


var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/engine-user-agent":"node_modules/core-js/internals/engine-user-agent.js"}],"node_modules/core-js/internals/array-method-has-species-support.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":"node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/engine-v8-version":"node_modules/core-js/internals/engine-v8-version.js"}],"node_modules/core-js/modules/es.array.concat.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/is-array":"node_modules/core-js/internals/is-array.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/create-property":"node_modules/core-js/internals/create-property.js","../internals/array-species-create":"node_modules/core-js/internals/array-species-create.js","../internals/array-method-has-species-support":"node_modules/core-js/internals/array-method-has-species-support.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/engine-v8-version":"node_modules/core-js/internals/engine-v8-version.js"}],"node_modules/core-js/internals/array-copy-within.js":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"node_modules/core-js/internals/to-length.js"}],"node_modules/core-js/internals/add-to-unscopables.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var definePropertyModule = require('../internals/object-define-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js"}],"node_modules/core-js/modules/es.array.copy-within.js":[function(require,module,exports) {
var $ = require('../internals/export');
var copyWithin = require('../internals/array-copy-within');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-copy-within":"node_modules/core-js/internals/array-copy-within.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js"}],"node_modules/core-js/internals/array-method-is-strict.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/array-method-uses-to-length.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var has = require('../internals/has');

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/has":"node_modules/core-js/internals/has.js"}],"node_modules/core-js/modules/es.array.every.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $every = require('../internals/array-iteration').every;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/internals/array-fill.js":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"node_modules/core-js/internals/to-length.js"}],"node_modules/core-js/modules/es.array.fill.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fill = require('../internals/array-fill');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-fill":"node_modules/core-js/internals/array-fill.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js"}],"node_modules/core-js/modules/es.array.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/array-method-has-species-support":"node_modules/core-js/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.find.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $find = require('../internals/array-iteration').find;
var addToUnscopables = require('../internals/add-to-unscopables');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.find-index.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $findIndex = require('../internals/array-iteration').findIndex;
var addToUnscopables = require('../internals/add-to-unscopables');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/internals/flatten-into-array.js":[function(require,module,exports) {
'use strict';
var isArray = require('../internals/is-array');
var toLength = require('../internals/to-length');
var bind = require('../internals/function-bind-context');

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;

},{"../internals/is-array":"node_modules/core-js/internals/is-array.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js"}],"node_modules/core-js/modules/es.array.flat.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/flatten-into-array":"node_modules/core-js/internals/flatten-into-array.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/array-species-create":"node_modules/core-js/internals/array-species-create.js"}],"node_modules/core-js/modules/es.array.flat-map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var aFunction = require('../internals/a-function');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/flatten-into-array":"node_modules/core-js/internals/flatten-into-array.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/array-species-create":"node_modules/core-js/internals/array-species-create.js"}],"node_modules/core-js/internals/array-for-each.js":[function(require,module,exports) {
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.for-each.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-for-each":"node_modules/core-js/internals/array-for-each.js"}],"node_modules/core-js/modules/es.array.includes.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var addToUnscopables = require('../internals/add-to-unscopables');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-includes":"node_modules/core-js/internals/array-includes.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.index-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-includes":"node_modules/core-js/internals/array-includes.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.join.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/indexed-object":"node_modules/core-js/internals/indexed-object.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js"}],"node_modules/core-js/internals/array-last-index-of.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;

},{"../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.last-index-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var lastIndexOf = require('../internals/array-last-index-of');

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-last-index-of":"node_modules/core-js/internals/array-last-index-of.js"}],"node_modules/core-js/modules/es.array.map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/array-method-has-species-support":"node_modules/core-js/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/internals/array-reduce.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/indexed-object":"node_modules/core-js/internals/indexed-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js"}],"node_modules/core-js/modules/es.array.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-reduce":"node_modules/core-js/internals/array-reduce.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.reduce-right.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduceRight = require('../internals/array-reduce').right;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('reduceRight');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-reduce":"node_modules/core-js/internals/array-reduce.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.reverse.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-array":"node_modules/core-js/internals/is-array.js"}],"node_modules/core-js/modules/es.array.slice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/is-array":"node_modules/core-js/internals/is-array.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/create-property":"node_modules/core-js/internals/create-property.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/array-method-has-species-support":"node_modules/core-js/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.some.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $some = require('../internals/array-iteration').some;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/modules/es.array.sort.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/array-method-is-strict":"node_modules/core-js/internals/array-method-is-strict.js"}],"node_modules/core-js/modules/es.array.splice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toObject = require('../internals/to-object');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/array-species-create":"node_modules/core-js/internals/array-species-create.js","../internals/create-property":"node_modules/core-js/internals/create-property.js","../internals/array-method-has-species-support":"node_modules/core-js/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"node_modules/core-js/internals/array-method-uses-to-length.js"}],"node_modules/core-js/internals/set-species.js":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js"}],"node_modules/core-js/modules/es.array.species.js":[function(require,module,exports) {
var setSpecies = require('../internals/set-species');

// `Array[@@species]` getter
// https://tc39.github.io/ecma262/#sec-get-array-@@species
setSpecies('Array');

},{"../internals/set-species":"node_modules/core-js/internals/set-species.js"}],"node_modules/core-js/modules/es.array.unscopables.flat.js":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

addToUnscopables('flat');

},{"../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js"}],"node_modules/core-js/modules/es.array.unscopables.flat-map.js":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

addToUnscopables('flatMap');

},{"../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js"}],"node_modules/core-js/internals/iterators-core.js":[function(require,module,exports) {
'use strict';
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js"}],"node_modules/core-js/internals/create-iterator-constructor.js":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/iterators-core":"node_modules/core-js/internals/iterators-core.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/iterators":"node_modules/core-js/internals/iterators.js"}],"node_modules/core-js/internals/define-iterator.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"node_modules/core-js/internals/create-iterator-constructor.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/iterators":"node_modules/core-js/internals/iterators.js","../internals/iterators-core":"node_modules/core-js/internals/iterators-core.js"}],"node_modules/core-js/modules/es.array.iterator.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/add-to-unscopables":"node_modules/core-js/internals/add-to-unscopables.js","../internals/iterators":"node_modules/core-js/internals/iterators.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"node_modules/core-js/internals/define-iterator.js"}],"node_modules/core-js/modules/es.string.from-code-point.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toAbsoluteIndex = require('../internals/to-absolute-index');

var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;

// `String.fromCodePoint` method
// https://tc39.github.io/ecma262/#sec-string.fromcodepoint
$({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
      );
    } return elements.join('');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js"}],"node_modules/core-js/modules/es.string.raw.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');

// `String.raw` method
// https://tc39.github.io/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(template.raw);
    var literalSegments = toLength(rawTemplate.length);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      elements.push(String(rawTemplate[i++]));
      if (i < argumentsLength) elements.push(String(arguments[i]));
    } return elements.join('');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/to-indexed-object":"node_modules/core-js/internals/to-indexed-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js"}],"node_modules/core-js/internals/string-multibyte.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/modules/es.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var codeAt = require('../internals/string-multibyte').codeAt;

// `String.prototype.codePointAt` method
// https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
$({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-multibyte":"node_modules/core-js/internals/string-multibyte.js"}],"node_modules/core-js/internals/is-regexp.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/internals/not-a-regexp.js":[function(require,module,exports) {
var isRegExp = require('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":"node_modules/core-js/internals/is-regexp.js"}],"node_modules/core-js/internals/correct-is-regexp-logic.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.string.ends-with.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var nativeEndsWith = ''.endsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/not-a-regexp":"node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"node_modules/core-js/internals/correct-is-regexp-logic.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js"}],"node_modules/core-js/modules/es.string.includes.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/not-a-regexp":"node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"node_modules/core-js/internals/correct-is-regexp-logic.js"}],"node_modules/core-js/internals/regexp-flags.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js"}],"node_modules/core-js/internals/regexp-sticky-helpers.js":[function(require,module,exports) {
'use strict';

var fails = require('./fails');

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

},{"./fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/internals/regexp-exec.js":[function(require,module,exports) {
'use strict';
var regexpFlags = require('./regexp-flags');
var stickyHelpers = require('./regexp-sticky-helpers');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./regexp-flags":"node_modules/core-js/internals/regexp-flags.js","./regexp-sticky-helpers":"node_modules/core-js/internals/regexp-sticky-helpers.js"}],"node_modules/core-js/modules/es.regexp.exec.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/regexp-exec":"node_modules/core-js/internals/regexp-exec.js"}],"node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var regexpExec = require('../internals/regexp-exec');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

},{"../modules/es.regexp.exec":"node_modules/core-js/modules/es.regexp.exec.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/regexp-exec":"node_modules/core-js/internals/regexp-exec.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js"}],"node_modules/core-js/internals/advance-string-index.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":"node_modules/core-js/internals/string-multibyte.js"}],"node_modules/core-js/internals/regexp-exec-abstract.js":[function(require,module,exports) {
var classof = require('./classof-raw');
var regexpExec = require('./regexp-exec');

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};


},{"./classof-raw":"node_modules/core-js/internals/classof-raw.js","./regexp-exec":"node_modules/core-js/internals/regexp-exec.js"}],"node_modules/core-js/modules/es.string.match.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"node_modules/core-js/internals/advance-string-index.js","../internals/regexp-exec-abstract":"node_modules/core-js/internals/regexp-exec-abstract.js"}],"node_modules/core-js/internals/species-constructor.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.string.match-all.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toLength = require('../internals/to-length');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var classof = require('../internals/classof-raw');
var isRegExp = require('../internals/is-regexp');
var getRegExpFlags = require('../internals/regexp-flags');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var InternalStateModule = require('../internals/internal-state');
var IS_PURE = require('../internals/is-pure');

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var regExpBuiltinExec = RegExpPrototype.exec;
var nativeMatchAll = ''.matchAll;

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
  'a'.matchAll(/./);
});

var regExpExec = function (R, S) {
  var exec = R.exec;
  var result;
  if (typeof exec == 'function') {
    result = exec.call(R, S);
    if (typeof result != 'object') throw TypeError('Incorrect exec result');
    return result;
  } return regExpBuiltinExec.call(R, S);
};

// eslint-disable-next-line max-len
var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return { value: undefined, done: true };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) return { value: undefined, done: state.done = true };
  if (state.global) {
    if (String(match[0]) == '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return { value: match, done: false };
  }
  state.done = true;
  return { value: match, done: false };
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = String(string);
  var C, flagsValue, flags, matcher, global, fullUnicode;
  C = speciesConstructor(R, RegExp);
  flagsValue = R.flags;
  if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)) {
    flagsValue = getRegExpFlags.call(R);
  }
  flags = flagsValue === undefined ? '' : String(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  global = !!~flags.indexOf('g');
  fullUnicode = !!~flags.indexOf('u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://github.com/tc39/proposal-string-matchall
$({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;
    if (regexp != null) {
      if (isRegExp(regexp)) {
        flags = String(requireObjectCoercible('flags' in RegExpPrototype
          ? regexp.flags
          : getRegExpFlags.call(regexp)
        ));
        if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
      matcher = regexp[MATCH_ALL];
      if (matcher === undefined && IS_PURE && classof(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher != null) return aFunction(matcher).call(regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
    S = String(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? $matchAll.call(rx, S) : rx[MATCH_ALL](S);
  }
});

IS_PURE || MATCH_ALL in RegExpPrototype || createNonEnumerableProperty(RegExpPrototype, MATCH_ALL, $matchAll);

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"node_modules/core-js/internals/create-iterator-constructor.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/is-regexp":"node_modules/core-js/internals/is-regexp.js","../internals/regexp-flags":"node_modules/core-js/internals/regexp-flags.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js","../internals/advance-string-index":"node_modules/core-js/internals/advance-string-index.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js"}],"node_modules/core-js/internals/string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/internals/string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('../internals/to-length');
var repeat = require('../internals/string-repeat');
var requireObjectCoercible = require('../internals/require-object-coercible');

var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

},{"../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/string-repeat":"node_modules/core-js/internals/string-repeat.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/internals/string-pad-webkit-bug.js":[function(require,module,exports) {
// https://github.com/zloirock/core-js/issues/280
var userAgent = require('../internals/engine-user-agent');

// eslint-disable-next-line unicorn/no-unsafe-regex
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

},{"../internals/engine-user-agent":"node_modules/core-js/internals/engine-user-agent.js"}],"node_modules/core-js/modules/es.string.pad-end.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padEnd = require('../internals/string-pad').end;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padEnd` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padend
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-pad":"node_modules/core-js/internals/string-pad.js","../internals/string-pad-webkit-bug":"node_modules/core-js/internals/string-pad-webkit-bug.js"}],"node_modules/core-js/modules/es.string.pad-start.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padStart = require('../internals/string-pad').start;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-pad":"node_modules/core-js/internals/string-pad.js","../internals/string-pad-webkit-bug":"node_modules/core-js/internals/string-pad-webkit-bug.js"}],"node_modules/core-js/modules/es.string.repeat.js":[function(require,module,exports) {
var $ = require('../internals/export');
var repeat = require('../internals/string-repeat');

// `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-repeat":"node_modules/core-js/internals/string-repeat.js"}],"node_modules/core-js/modules/es.string.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"../internals/fix-regexp-well-known-symbol-logic":"node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"node_modules/core-js/internals/advance-string-index.js","../internals/regexp-exec-abstract":"node_modules/core-js/internals/regexp-exec-abstract.js"}],"node_modules/core-js/modules/es.string.search.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var sameValue = require('../internals/same-value');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/same-value":"node_modules/core-js/internals/same-value.js","../internals/regexp-exec-abstract":"node_modules/core-js/internals/regexp-exec-abstract.js"}],"node_modules/core-js/modules/es.string.split.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);

},{"../internals/fix-regexp-well-known-symbol-logic":"node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/is-regexp":"node_modules/core-js/internals/is-regexp.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js","../internals/advance-string-index":"node_modules/core-js/internals/advance-string-index.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/regexp-exec-abstract":"node_modules/core-js/internals/regexp-exec-abstract.js","../internals/regexp-exec":"node_modules/core-js/internals/regexp-exec.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.string.starts-with.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var nativeStartsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/not-a-regexp":"node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"node_modules/core-js/internals/correct-is-regexp-logic.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js"}],"node_modules/core-js/internals/whitespaces.js":[function(require,module,exports) {
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"node_modules/core-js/internals/string-trim.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');
var whitespaces = require('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js","../internals/whitespaces":"node_modules/core-js/internals/whitespaces.js"}],"node_modules/core-js/internals/string-trim-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

},{"../internals/fails":"node_modules/core-js/internals/fails.js","../internals/whitespaces":"node_modules/core-js/internals/whitespaces.js"}],"node_modules/core-js/modules/es.string.trim.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js","../internals/string-trim-forced":"node_modules/core-js/internals/string-trim-forced.js"}],"node_modules/core-js/modules/es.string.trim-start.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimStart = require('../internals/string-trim').start;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

var FORCED = forcedStringTrimMethod('trimStart');

var trimStart = FORCED ? function trimStart() {
  return $trimStart(this);
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js","../internals/string-trim-forced":"node_modules/core-js/internals/string-trim-forced.js"}],"node_modules/core-js/modules/es.string.trim-end.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimEnd = require('../internals/string-trim').end;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

var FORCED = forcedStringTrimMethod('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return $trimEnd(this);
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js","../internals/string-trim-forced":"node_modules/core-js/internals/string-trim-forced.js"}],"node_modules/core-js/modules/es.string.iterator.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/string-multibyte":"node_modules/core-js/internals/string-multibyte.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"node_modules/core-js/internals/define-iterator.js"}],"node_modules/core-js/internals/create-html.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

},{"../internals/require-object-coercible":"node_modules/core-js/internals/require-object-coercible.js"}],"node_modules/core-js/internals/string-html-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

},{"../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.string.anchor.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.anchor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.big.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.big` method
// https://tc39.github.io/ecma262/#sec-string.prototype.big
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.blink.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.blink` method
// https://tc39.github.io/ecma262/#sec-string.prototype.blink
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.bold.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.bold` method
// https://tc39.github.io/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.fixed.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fixed` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.fontcolor.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontcolor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontcolor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.fontsize.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontsize` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontsize
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.italics.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.italics` method
// https://tc39.github.io/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.link.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.link` method
// https://tc39.github.io/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.small.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.small` method
// https://tc39.github.io/ecma262/#sec-string.prototype.small
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.strike.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.strike` method
// https://tc39.github.io/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.sub.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/modules/es.string.sup.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sup` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sup
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/create-html":"node_modules/core-js/internals/create-html.js","../internals/string-html-forced":"node_modules/core-js/internals/string-html-forced.js"}],"node_modules/core-js/internals/inherit-if-required.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js"}],"node_modules/core-js/modules/es.regexp.constructor.js":[function(require,module,exports) {

var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var inheritIfRequired = require('../internals/inherit-if-required');
var defineProperty = require('../internals/object-define-property').f;
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var isRegExp = require('../internals/is-regexp');
var getFlags = require('../internals/regexp-flags');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var setInternalState = require('../internals/internal-state').set;
var setSpecies = require('../internals/set-species');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/is-forced":"node_modules/core-js/internals/is-forced.js","../internals/inherit-if-required":"node_modules/core-js/internals/inherit-if-required.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/is-regexp":"node_modules/core-js/internals/is-regexp.js","../internals/regexp-flags":"node_modules/core-js/internals/regexp-flags.js","../internals/regexp-sticky-helpers":"node_modules/core-js/internals/regexp-sticky-helpers.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/set-species":"node_modules/core-js/internals/set-species.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.regexp.flags.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModule = require('../internals/object-define-property');
var regExpFlags = require('../internals/regexp-flags');
var UNSUPPORTED_Y = require('../internals/regexp-sticky-helpers').UNSUPPORTED_Y;

// `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
if (DESCRIPTORS && (/./g.flags != 'g' || UNSUPPORTED_Y)) {
  objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });
}

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/regexp-flags":"node_modules/core-js/internals/regexp-flags.js","../internals/regexp-sticky-helpers":"node_modules/core-js/internals/regexp-sticky-helpers.js"}],"node_modules/core-js/modules/es.regexp.sticky.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var UNSUPPORTED_Y = require('../internals/regexp-sticky-helpers').UNSUPPORTED_Y;
var defineProperty = require('../internals/object-define-property').f;
var getInternalState = require('../internals/internal-state').get;
var RegExpPrototype = RegExp.prototype;

// `RegExp.prototype.sticky` getter
if (DESCRIPTORS && UNSUPPORTED_Y) {
  defineProperty(RegExp.prototype, 'sticky', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (this instanceof RegExp) {
        return !!getInternalState(this).sticky;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/regexp-sticky-helpers":"node_modules/core-js/internals/regexp-sticky-helpers.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/modules/es.regexp.test.js":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var $ = require('../internals/export');
var isObject = require('../internals/is-object');

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var nativeTest = /./.test;

$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    if (typeof this.exec !== 'function') {
      return nativeTest.call(this, str);
    }
    var result = this.exec(str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});

},{"../modules/es.regexp.exec":"node_modules/core-js/modules/es.regexp.exec.js","../internals/export":"node_modules/core-js/internals/export.js","../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.regexp.to-string.js":[function(require,module,exports) {
'use strict';
var redefine = require('../internals/redefine');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');
var flags = require('../internals/regexp-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

},{"../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/regexp-flags":"node_modules/core-js/internals/regexp-flags.js"}],"node_modules/core-js/internals/number-parse-int.js":[function(require,module,exports) {

var global = require('../internals/global');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js","../internals/whitespaces":"node_modules/core-js/internals/whitespaces.js"}],"node_modules/core-js/modules/es.parse-int.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseIntImplementation = require('../internals/number-parse-int');

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/number-parse-int":"node_modules/core-js/internals/number-parse-int.js"}],"node_modules/core-js/internals/number-parse-float.js":[function(require,module,exports) {

var global = require('../internals/global');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js","../internals/whitespaces":"node_modules/core-js/internals/whitespaces.js"}],"node_modules/core-js/modules/es.parse-float.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseFloatImplementation = require('../internals/number-parse-float');

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/number-parse-float":"node_modules/core-js/internals/number-parse-float.js"}],"node_modules/core-js/modules/es.number.constructor.js":[function(require,module,exports) {

'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var redefine = require('../internals/redefine');
var has = require('../internals/has');
var classof = require('../internals/classof-raw');
var inheritIfRequired = require('../internals/inherit-if-required');
var toPrimitive = require('../internals/to-primitive');
var fails = require('../internals/fails');
var create = require('../internals/object-create');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var defineProperty = require('../internals/object-define-property').f;
var trim = require('../internals/string-trim').trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}

},{"../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/is-forced":"node_modules/core-js/internals/is-forced.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/inherit-if-required":"node_modules/core-js/internals/inherit-if-required.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/string-trim":"node_modules/core-js/internals/string-trim.js"}],"node_modules/core-js/modules/es.number.epsilon.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.EPSILON` constant
// https://tc39.github.io/ecma262/#sec-number.epsilon
$({ target: 'Number', stat: true }, {
  EPSILON: Math.pow(2, -52)
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/internals/number-is-finite.js":[function(require,module,exports) {

var global = require('../internals/global');

var globalIsFinite = global.isFinite;

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};

},{"../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/modules/es.number.is-finite.js":[function(require,module,exports) {
var $ = require('../internals/export');
var numberIsFinite = require('../internals/number-is-finite');

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/number-is-finite":"node_modules/core-js/internals/number-is-finite.js"}],"node_modules/core-js/internals/is-integer.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"../internals/is-object":"node_modules/core-js/internals/is-object.js"}],"node_modules/core-js/modules/es.number.is-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isInteger = require('../internals/is-integer');

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-integer":"node_modules/core-js/internals/is-integer.js"}],"node_modules/core-js/modules/es.number.is-nan.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.isNaN` method
// https://tc39.github.io/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.number.is-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isInteger = require('../internals/is-integer');

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.github.io/ecma262/#sec-number.issafeinteger
$({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-integer":"node_modules/core-js/internals/is-integer.js"}],"node_modules/core-js/modules/es.number.max-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.max_safe_integer
$({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.number.min-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.min_safe_integer
$({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.number.parse-float.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseFloat = require('../internals/number-parse-float');

// `Number.parseFloat` method
// https://tc39.github.io/ecma262/#sec-number.parseFloat
$({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat }, {
  parseFloat: parseFloat
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/number-parse-float":"node_modules/core-js/internals/number-parse-float.js"}],"node_modules/core-js/modules/es.number.parse-int.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseInt = require('../internals/number-parse-int');

// `Number.parseInt` method
// https://tc39.github.io/ecma262/#sec-number.parseint
$({ target: 'Number', stat: true, forced: Number.parseInt != parseInt }, {
  parseInt: parseInt
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/number-parse-int":"node_modules/core-js/internals/number-parse-int.js"}],"node_modules/core-js/internals/this-number-value.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

},{"../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js"}],"node_modules/core-js/modules/es.number.to-fixed.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toInteger = require('../internals/to-integer');
var thisNumberValue = require('../internals/this-number-value');
var repeat = require('../internals/string-repeat');
var fails = require('../internals/fails');

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/this-number-value":"node_modules/core-js/internals/this-number-value.js","../internals/string-repeat":"node_modules/core-js/internals/string-repeat.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.number.to-precision.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var thisNumberValue = require('../internals/this-number-value');

var nativeToPrecision = 1.0.toPrecision;

var FORCED = fails(function () {
  // IE7-
  return nativeToPrecision.call(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToPrecision.call({});
});

// `Number.prototype.toPrecision` method
// https://tc39.github.io/ecma262/#sec-number.prototype.toprecision
$({ target: 'Number', proto: true, forced: FORCED }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? nativeToPrecision.call(thisNumberValue(this))
      : nativeToPrecision.call(thisNumberValue(this), precision);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/this-number-value":"node_modules/core-js/internals/this-number-value.js"}],"node_modules/core-js/internals/math-log1p.js":[function(require,module,exports) {
var log = Math.log;

// `Math.log1p` method implementation
// https://tc39.github.io/ecma262/#sec-math.log1p
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
};

},{}],"node_modules/core-js/modules/es.math.acosh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

var nativeAcosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !nativeAcosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || nativeAcosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.github.io/ecma262/#sec-math.acosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log(x) + LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-log1p":"node_modules/core-js/internals/math-log1p.js"}],"node_modules/core-js/modules/es.math.asinh.js":[function(require,module,exports) {
var $ = require('../internals/export');

var nativeAsinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}

// `Math.asinh` method
// https://tc39.github.io/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$({ target: 'Math', stat: true, forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0) }, {
  asinh: asinh
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.math.atanh.js":[function(require,module,exports) {
var $ = require('../internals/export');

var nativeAtanh = Math.atanh;
var log = Math.log;

// `Math.atanh` method
// https://tc39.github.io/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$({ target: 'Math', stat: true, forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/internals/math-sign.js":[function(require,module,exports) {
// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"node_modules/core-js/modules/es.math.cbrt.js":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.github.io/ecma262/#sec-math.cbrt
$({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign(x = +x) * pow(abs(x), 1 / 3);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-sign":"node_modules/core-js/internals/math-sign.js"}],"node_modules/core-js/modules/es.math.clz32.js":[function(require,module,exports) {
var $ = require('../internals/export');

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.github.io/ecma262/#sec-math.clz32
$({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/internals/math-expm1.js":[function(require,module,exports) {
var nativeExpm1 = Math.expm1;
var exp = Math.exp;

// `Math.expm1` method implementation
// https://tc39.github.io/ecma262/#sec-math.expm1
module.exports = (!nativeExpm1
  // Old FF bug
  || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || nativeExpm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
} : nativeExpm1;

},{}],"node_modules/core-js/modules/es.math.cosh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var nativeCosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

// `Math.cosh` method
// https://tc39.github.io/ecma262/#sec-math.cosh
$({ target: 'Math', stat: true, forced: !nativeCosh || nativeCosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-expm1":"node_modules/core-js/internals/math-expm1.js"}],"node_modules/core-js/modules/es.math.expm1.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// `Math.expm1` method
// https://tc39.github.io/ecma262/#sec-math.expm1
$({ target: 'Math', stat: true, forced: expm1 != Math.expm1 }, { expm1: expm1 });

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-expm1":"node_modules/core-js/internals/math-expm1.js"}],"node_modules/core-js/internals/math-fround.js":[function(require,module,exports) {
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.github.io/ecma262/#sec-math.fround
module.exports = Math.fround || function fround(x) {
  var $abs = abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"../internals/math-sign":"node_modules/core-js/internals/math-sign.js"}],"node_modules/core-js/modules/es.math.fround.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fround = require('../internals/math-fround');

// `Math.fround` method
// https://tc39.github.io/ecma262/#sec-math.fround
$({ target: 'Math', stat: true }, { fround: fround });

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-fround":"node_modules/core-js/internals/math-fround.js"}],"node_modules/core-js/modules/es.math.hypot.js":[function(require,module,exports) {
var $ = require('../internals/export');

var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, forced: BUGGY }, {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.math.imul.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');

var nativeImul = Math.imul;

var FORCED = fails(function () {
  return nativeImul(0xFFFFFFFF, 5) != -5 || nativeImul.length != 2;
});

// `Math.imul` method
// https://tc39.github.io/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.math.log10.js":[function(require,module,exports) {
var $ = require('../internals/export');

var log = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.github.io/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log(x) * LOG10E;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.math.log1p.js":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// `Math.log1p` method
// https://tc39.github.io/ecma262/#sec-math.log1p
$({ target: 'Math', stat: true }, { log1p: log1p });

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-log1p":"node_modules/core-js/internals/math-log1p.js"}],"node_modules/core-js/modules/es.math.log2.js":[function(require,module,exports) {
var $ = require('../internals/export');

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.github.io/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.math.sign.js":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

// `Math.sign` method
// https://tc39.github.io/ecma262/#sec-math.sign
$({ target: 'Math', stat: true }, {
  sign: sign
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-sign":"node_modules/core-js/internals/math-sign.js"}],"node_modules/core-js/modules/es.math.sinh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var expm1 = require('../internals/math-expm1');

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = fails(function () {
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.github.io/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/math-expm1":"node_modules/core-js/internals/math-expm1.js"}],"node_modules/core-js/modules/es.math.tanh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.github.io/ecma262/#sec-math.tanh
$({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/math-expm1":"node_modules/core-js/internals/math-expm1.js"}],"node_modules/core-js/modules/es.math.to-string-tag.js":[function(require,module,exports) {
var setToStringTag = require('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js"}],"node_modules/core-js/modules/es.math.trunc.js":[function(require,module,exports) {
var $ = require('../internals/export');

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.github.io/ecma262/#sec-math.trunc
$({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor : ceil)(it);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.date.now.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.date.to-json.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js"}],"node_modules/core-js/internals/date-to-iso-string.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var padStart = require('../internals/string-pad').start;

var abs = Math.abs;
var DatePrototype = Date.prototype;
var getTime = DatePrototype.getTime;
var nativeDateToISOString = DatePrototype.toISOString;

// `Date.prototype.toISOString` method implementation
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  nativeDateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = date.getUTCFullYear();
  var milliseconds = date.getUTCMilliseconds();
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(date.getUTCMonth() + 1, 2, 0) +
    '-' + padStart(date.getUTCDate(), 2, 0) +
    'T' + padStart(date.getUTCHours(), 2, 0) +
    ':' + padStart(date.getUTCMinutes(), 2, 0) +
    ':' + padStart(date.getUTCSeconds(), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : nativeDateToISOString;

},{"../internals/fails":"node_modules/core-js/internals/fails.js","../internals/string-pad":"node_modules/core-js/internals/string-pad.js"}],"node_modules/core-js/modules/es.date.to-iso-string.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toISOString = require('../internals/date-to-iso-string');

// `Date.prototype.toISOString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/date-to-iso-string":"node_modules/core-js/internals/date-to-iso-string.js"}],"node_modules/core-js/modules/es.date.to-string.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

},{"../internals/redefine":"node_modules/core-js/internals/redefine.js"}],"node_modules/core-js/internals/date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

module.exports = function (hint) {
  if (hint !== 'string' && hint !== 'number' && hint !== 'default') {
    throw TypeError('Incorrect hint');
  } return toPrimitive(anObject(this), hint !== 'number');
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js"}],"node_modules/core-js/modules/es.date.to-primitive.js":[function(require,module,exports) {
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var dateToPrimitive = require('../internals/date-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-date.prototype-@@toprimitive
if (!(TO_PRIMITIVE in DatePrototype)) {
  createNonEnumerableProperty(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}

},{"../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/date-to-primitive":"node_modules/core-js/internals/date-to-primitive.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.json.stringify.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var fails = require('../internals/fails');

var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.json.to-string-tag.js":[function(require,module,exports) {

var global = require('../internals/global');
var setToStringTag = require('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js"}],"node_modules/core-js/internals/native-promise-constructor.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/internals/redefine-all.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

},{"../internals/redefine":"node_modules/core-js/internals/redefine.js"}],"node_modules/core-js/internals/an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],"node_modules/core-js/internals/engine-is-ios.js":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"node_modules/core-js/internals/engine-user-agent.js"}],"node_modules/core-js/internals/task.js":[function(require,module,exports) {


var global = require('../internals/global');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');
var bind = require('../internals/function-bind-context');
var html = require('../internals/html');
var createElement = require('../internals/document-create-element');
var IS_IOS = require('../internals/engine-is-ios');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/html":"node_modules/core-js/internals/html.js","../internals/document-create-element":"node_modules/core-js/internals/document-create-element.js","../internals/engine-is-ios":"node_modules/core-js/internals/engine-is-ios.js"}],"node_modules/core-js/internals/microtask.js":[function(require,module,exports) {


var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var classof = require('../internals/classof-raw');
var macrotask = require('../internals/task').set;
var IS_IOS = require('../internals/engine-is-ios');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/task":"node_modules/core-js/internals/task.js","../internals/engine-is-ios":"node_modules/core-js/internals/engine-is-ios.js"}],"node_modules/core-js/internals/new-promise-capability.js":[function(require,module,exports) {
'use strict';
var aFunction = require('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":"node_modules/core-js/internals/a-function.js"}],"node_modules/core-js/internals/promise-resolve.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/new-promise-capability":"node_modules/core-js/internals/new-promise-capability.js"}],"node_modules/core-js/internals/host-report-errors.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/internals/perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],"node_modules/core-js/modules/es.promise.js":[function(require,module,exports) {


'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var isObject = require('../internals/is-object');
var aFunction = require('../internals/a-function');
var anInstance = require('../internals/an-instance');
var classof = require('../internals/classof-raw');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var InternalStateModule = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/native-promise-constructor":"node_modules/core-js/internals/native-promise-constructor.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/set-species":"node_modules/core-js/internals/set-species.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js","../internals/inspect-source":"node_modules/core-js/internals/inspect-source.js","../internals/iterate":"node_modules/core-js/internals/iterate.js","../internals/check-correctness-of-iteration":"node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js","../internals/task":"node_modules/core-js/internals/task.js","../internals/microtask":"node_modules/core-js/internals/microtask.js","../internals/promise-resolve":"node_modules/core-js/internals/promise-resolve.js","../internals/host-report-errors":"node_modules/core-js/internals/host-report-errors.js","../internals/new-promise-capability":"node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"node_modules/core-js/internals/perform.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/is-forced":"node_modules/core-js/internals/is-forced.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/engine-v8-version":"node_modules/core-js/internals/engine-v8-version.js"}],"node_modules/core-js/modules/es.promise.all-settled.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/new-promise-capability":"node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"node_modules/core-js/internals/perform.js","../internals/iterate":"node_modules/core-js/internals/iterate.js"}],"node_modules/core-js/modules/es.promise.finally.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromise = require('../internals/native-promise-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var redefine = require('../internals/redefine');

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js","../internals/native-promise-constructor":"node_modules/core-js/internals/native-promise-constructor.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js","../internals/promise-resolve":"node_modules/core-js/internals/promise-resolve.js","../internals/redefine":"node_modules/core-js/internals/redefine.js"}],"node_modules/core-js/internals/collection.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var redefine = require('../internals/redefine');
var InternalMetadataModule = require('../internals/internal-metadata');
var iterate = require('../internals/iterate');
var anInstance = require('../internals/an-instance');
var isObject = require('../internals/is-object');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var setToStringTag = require('../internals/set-to-string-tag');
var inheritIfRequired = require('../internals/inherit-if-required');

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/is-forced":"node_modules/core-js/internals/is-forced.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/iterate":"node_modules/core-js/internals/iterate.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/check-correctness-of-iteration":"node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/inherit-if-required":"node_modules/core-js/internals/inherit-if-required.js"}],"node_modules/core-js/internals/collection-strong.js":[function(require,module,exports) {
var define;
'use strict';
var defineProperty = require('../internals/object-define-property').f;
var create = require('../internals/object-create');
var redefineAll = require('../internals/redefine-all');
var bind = require('../internals/function-bind-context');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var defineIterator = require('../internals/define-iterator');
var setSpecies = require('../internals/set-species');
var DESCRIPTORS = require('../internals/descriptors');
var fastKey = require('../internals/internal-metadata').fastKey;
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

},{"../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/iterate":"node_modules/core-js/internals/iterate.js","../internals/define-iterator":"node_modules/core-js/internals/define-iterator.js","../internals/set-species":"node_modules/core-js/internals/set-species.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/modules/es.map.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"node_modules/core-js/internals/collection.js","../internals/collection-strong":"node_modules/core-js/internals/collection-strong.js"}],"node_modules/core-js/modules/es.set.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"node_modules/core-js/internals/collection.js","../internals/collection-strong":"node_modules/core-js/internals/collection-strong.js"}],"node_modules/core-js/internals/collection-weak.js":[function(require,module,exports) {
var define;
'use strict';
var redefineAll = require('../internals/redefine-all');
var getWeakData = require('../internals/internal-metadata').getWeakData;
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var ArrayIterationModule = require('../internals/array-iteration');
var $has = require('../internals/has');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

},{"../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/iterate":"node_modules/core-js/internals/iterate.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/modules/es.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var redefineAll = require('../internals/redefine-all');
var InternalMetadataModule = require('../internals/internal-metadata');
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');
var isObject = require('../internals/is-object');
var enforceIternalState = require('../internals/internal-state').enforce;
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"node_modules/core-js/internals/internal-metadata.js","../internals/collection":"node_modules/core-js/internals/collection.js","../internals/collection-weak":"node_modules/core-js/internals/collection-weak.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/native-weak-map":"node_modules/core-js/internals/native-weak-map.js"}],"node_modules/core-js/modules/es.weak-set.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');

// `WeakSet` constructor
// https://tc39.github.io/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);

},{"../internals/collection":"node_modules/core-js/internals/collection.js","../internals/collection-weak":"node_modules/core-js/internals/collection-weak.js"}],"node_modules/core-js/internals/array-buffer-native.js":[function(require,module,exports) {
module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

},{}],"node_modules/core-js/internals/to-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/to-length":"node_modules/core-js/internals/to-length.js"}],"node_modules/core-js/internals/ieee754.js":[function(require,module,exports) {
// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};

},{}],"node_modules/core-js/internals/array-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var fails = require('../internals/fails');
var anInstance = require('../internals/an-instance');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var IEEE754 = require('../internals/ieee754');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var defineProperty = require('../internals/object-define-property').f;
var arrayFill = require('../internals/array-fill');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/array-buffer-native":"node_modules/core-js/internals/array-buffer-native.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/to-integer":"node_modules/core-js/internals/to-integer.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-index":"node_modules/core-js/internals/to-index.js","../internals/ieee754":"node_modules/core-js/internals/ieee754.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/array-fill":"node_modules/core-js/internals/array-fill.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/modules/es.array-buffer.constructor.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var arrayBufferModule = require('../internals/array-buffer');
var setSpecies = require('../internals/set-species');

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/array-buffer":"node_modules/core-js/internals/array-buffer.js","../internals/set-species":"node_modules/core-js/internals/set-species.js"}],"node_modules/core-js/internals/array-buffer-view-core.js":[function(require,module,exports) {

'use strict';
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var defineProperty = require('../internals/object-define-property').f;
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');
var uid = require('../internals/uid');

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

},{"../internals/array-buffer-native":"node_modules/core-js/internals/array-buffer-native.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/classof":"node_modules/core-js/internals/classof.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/uid":"node_modules/core-js/internals/uid.js"}],"node_modules/core-js/modules/es.array-buffer.is-view.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.isview
$({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/modules/es.array-buffer.slice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var ArrayBufferModule = require('../internals/array-buffer');
var anObject = require('../internals/an-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var speciesConstructor = require('../internals/species-constructor');

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/array-buffer":"node_modules/core-js/internals/array-buffer.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js"}],"node_modules/core-js/modules/es.data-view.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferModule = require('../internals/array-buffer');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');

// `DataView` constructor
// https://tc39.github.io/ecma262/#sec-dataview-constructor
$({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule.DataView
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/array-buffer":"node_modules/core-js/internals/array-buffer.js","../internals/array-buffer-native":"node_modules/core-js/internals/array-buffer-native.js"}],"node_modules/core-js/internals/typed-array-constructors-require-wrappers.js":[function(require,module,exports) {

/* eslint-disable no-new */
var global = require('../internals/global');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var NATIVE_ARRAY_BUFFER_VIEWS = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/check-correctness-of-iteration":"node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/internals/to-positive-integer.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

},{"../internals/to-integer":"node_modules/core-js/internals/to-integer.js"}],"node_modules/core-js/internals/to-offset.js":[function(require,module,exports) {
var toPositiveInteger = require('../internals/to-positive-integer');

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

},{"../internals/to-positive-integer":"node_modules/core-js/internals/to-positive-integer.js"}],"node_modules/core-js/internals/typed-array-from.js":[function(require,module,exports) {
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var getIteratorMethod = require('../internals/get-iterator-method');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var bind = require('../internals/function-bind-context');
var aTypedArrayConstructor = require('../internals/array-buffer-view-core').aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

},{"../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/get-iterator-method":"node_modules/core-js/internals/get-iterator-method.js","../internals/is-array-iterator-method":"node_modules/core-js/internals/is-array-iterator-method.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/internals/typed-array-constructor.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayBufferModule = require('../internals/array-buffer');
var anInstance = require('../internals/an-instance');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var toOffset = require('../internals/to-offset');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var classof = require('../internals/classof');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var typedArrayFrom = require('../internals/typed-array-from');
var forEach = require('../internals/array-iteration').forEach;
var setSpecies = require('../internals/set-species');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var InternalStateModule = require('../internals/internal-state');
var inheritIfRequired = require('../internals/inherit-if-required');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/typed-array-constructors-require-wrappers":"node_modules/core-js/internals/typed-array-constructors-require-wrappers.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-buffer":"node_modules/core-js/internals/array-buffer.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-index":"node_modules/core-js/internals/to-index.js","../internals/to-offset":"node_modules/core-js/internals/to-offset.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/classof":"node_modules/core-js/internals/classof.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js","../internals/object-get-own-property-names":"node_modules/core-js/internals/object-get-own-property-names.js","../internals/typed-array-from":"node_modules/core-js/internals/typed-array-from.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/set-species":"node_modules/core-js/internals/set-species.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/inherit-if-required":"node_modules/core-js/internals/inherit-if-required.js"}],"node_modules/core-js/modules/es.typed-array.int8-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.uint8-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8ClampedArray` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.int16-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.uint16-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.int32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.uint32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.float32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.float64-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float64Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"node_modules/core-js/internals/typed-array-constructor.js"}],"node_modules/core-js/modules/es.typed-array.from.js":[function(require,module,exports) {
'use strict';
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');
var exportTypedArrayStaticMethod = require('../internals/array-buffer-view-core').exportTypedArrayStaticMethod;
var typedArrayFrom = require('../internals/typed-array-from');

// `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/typed-array-constructors-require-wrappers":"node_modules/core-js/internals/typed-array-constructors-require-wrappers.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/typed-array-from":"node_modules/core-js/internals/typed-array-from.js"}],"node_modules/core-js/modules/es.typed-array.of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/typed-array-constructors-require-wrappers":"node_modules/core-js/internals/typed-array-constructors-require-wrappers.js"}],"node_modules/core-js/modules/es.typed-array.copy-within.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $copyWithin = require('../internals/array-copy-within');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-copy-within":"node_modules/core-js/internals/array-copy-within.js"}],"node_modules/core-js/modules/es.typed-array.every.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $every = require('../internals/array-iteration').every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.typed-array.fill.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $fill = require('../internals/array-fill');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-fill":"node_modules/core-js/internals/array-fill.js"}],"node_modules/core-js/modules/es.typed-array.filter.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filter = require('../internals/array-iteration').filter;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js"}],"node_modules/core-js/modules/es.typed-array.find.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $find = require('../internals/array-iteration').find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.typed-array.find-index.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findIndex = require('../internals/array-iteration').findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.typed-array.for-each.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $forEach = require('../internals/array-iteration').forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.typed-array.includes.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $includes = require('../internals/array-includes').includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-includes":"node_modules/core-js/internals/array-includes.js"}],"node_modules/core-js/modules/es.typed-array.index-of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $indexOf = require('../internals/array-includes').indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-includes":"node_modules/core-js/internals/array-includes.js"}],"node_modules/core-js/modules/es.typed-array.iterator.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayIterators = require('../modules/es.array.iterator');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../modules/es.array.iterator":"node_modules/core-js/modules/es.array.iterator.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/es.typed-array.join.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/modules/es.typed-array.last-index-of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $lastIndexOf = require('../internals/array-last-index-of');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-last-index-of":"node_modules/core-js/internals/array-last-index-of.js"}],"node_modules/core-js/modules/es.typed-array.map.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $map = require('../internals/array-iteration').map;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js"}],"node_modules/core-js/modules/es.typed-array.reduce.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduce = require('../internals/array-reduce').left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-reduce":"node_modules/core-js/internals/array-reduce.js"}],"node_modules/core-js/modules/es.typed-array.reduce-right.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduceRight = require('../internals/array-reduce').right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-reduce":"node_modules/core-js/internals/array-reduce.js"}],"node_modules/core-js/modules/es.typed-array.reverse.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/modules/es.typed-array.set.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toOffset = require('../internals/to-offset');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-offset":"node_modules/core-js/internals/to-offset.js","../internals/to-object":"node_modules/core-js/internals/to-object.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.typed-array.slice.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var speciesConstructor = require('../internals/species-constructor');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.typed-array.some.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $some = require('../internals/array-iteration').some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"node_modules/core-js/internals/array-iteration.js"}],"node_modules/core-js/modules/es.typed-array.sort.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js"}],"node_modules/core-js/modules/es.typed-array.subarray.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/to-length":"node_modules/core-js/internals/to-length.js","../internals/to-absolute-index":"node_modules/core-js/internals/to-absolute-index.js","../internals/species-constructor":"node_modules/core-js/internals/species-constructor.js"}],"node_modules/core-js/modules/es.typed-array.to-locale-string.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var fails = require('../internals/fails');

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.typed-array.to-string.js":[function(require,module,exports) {

'use strict';
var exportTypedArrayMethod = require('../internals/array-buffer-view-core').exportTypedArrayMethod;
var fails = require('../internals/fails');
var global = require('../internals/global');

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

},{"../internals/array-buffer-view-core":"node_modules/core-js/internals/array-buffer-view-core.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/global":"node_modules/core-js/internals/global.js"}],"node_modules/core-js/modules/es.reflect.apply.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');

var nativeApply = getBuiltIn('Reflect', 'apply');
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply
$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction(target);
    anObject(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.reflect.construct.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var bind = require('../internals/function-bind');
var fails = require('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/a-function":"node_modules/core-js/internals/a-function.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/function-bind":"node_modules/core-js/internals/function-bind.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.reflect.define-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var fails = require('../internals/fails');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.defineproperty
$({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    var key = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      definePropertyModule.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/to-primitive":"node_modules/core-js/internals/to-primitive.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/fails":"node_modules/core-js/internals/fails.js"}],"node_modules/core-js/modules/es.reflect.delete-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Reflect.deleteProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.deleteproperty
$({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"node_modules/core-js/modules/es.reflect.get.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var has = require('../internals/has');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js"}],"node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
$({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"node_modules/core-js/modules/es.reflect.get-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var objectGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

// `Reflect.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
$({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/correct-prototype-getter":"node_modules/core-js/internals/correct-prototype-getter.js"}],"node_modules/core-js/modules/es.reflect.has.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Reflect.has` method
// https://tc39.github.io/ecma262/#sec-reflect.has
$({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/modules/es.reflect.is-extensible.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');

var objectIsExtensible = Object.isExtensible;

// `Reflect.isExtensible` method
// https://tc39.github.io/ecma262/#sec-reflect.isextensible
$({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return objectIsExtensible ? objectIsExtensible(target) : true;
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/an-object":"node_modules/core-js/internals/an-object.js"}],"node_modules/core-js/modules/es.reflect.own-keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ownKeys = require('../internals/own-keys');

// `Reflect.ownKeys` method
// https://tc39.github.io/ecma262/#sec-reflect.ownkeys
$({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/own-keys":"node_modules/core-js/internals/own-keys.js"}],"node_modules/core-js/modules/es.reflect.prevent-extensions.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var FREEZING = require('../internals/freezing');

// `Reflect.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-reflect.preventextensions
$({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/freezing":"node_modules/core-js/internals/freezing.js"}],"node_modules/core-js/modules/es.reflect.set.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var fails = require('../internals/fails');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

// `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails(function () {
  var object = definePropertyModule.f({}, 'a', { configurable: true });
  // eslint-disable-next-line no-undef
  return Reflect.set(getPrototypeOf(object), 'a', 1, object) !== false;
});

$({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/fails":"node_modules/core-js/internals/fails.js","../internals/object-define-property":"node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-descriptor":"node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-get-prototype-of":"node_modules/core-js/internals/object-get-prototype-of.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js"}],"node_modules/core-js/modules/es.reflect.set-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');
var objectSetPrototypeOf = require('../internals/object-set-prototype-of');

// `Reflect.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/a-possible-prototype":"node_modules/core-js/internals/a-possible-prototype.js","../internals/object-set-prototype-of":"node_modules/core-js/internals/object-set-prototype-of.js"}],"node_modules/core-js/es/index.js":[function(require,module,exports) {
require('../modules/es.symbol');
require('../modules/es.symbol.async-iterator');
require('../modules/es.symbol.description');
require('../modules/es.symbol.has-instance');
require('../modules/es.symbol.is-concat-spreadable');
require('../modules/es.symbol.iterator');
require('../modules/es.symbol.match');
require('../modules/es.symbol.match-all');
require('../modules/es.symbol.replace');
require('../modules/es.symbol.search');
require('../modules/es.symbol.species');
require('../modules/es.symbol.split');
require('../modules/es.symbol.to-primitive');
require('../modules/es.symbol.to-string-tag');
require('../modules/es.symbol.unscopables');
require('../modules/es.object.assign');
require('../modules/es.object.create');
require('../modules/es.object.define-property');
require('../modules/es.object.define-properties');
require('../modules/es.object.entries');
require('../modules/es.object.freeze');
require('../modules/es.object.from-entries');
require('../modules/es.object.get-own-property-descriptor');
require('../modules/es.object.get-own-property-descriptors');
require('../modules/es.object.get-own-property-names');
require('../modules/es.object.get-prototype-of');
require('../modules/es.object.is');
require('../modules/es.object.is-extensible');
require('../modules/es.object.is-frozen');
require('../modules/es.object.is-sealed');
require('../modules/es.object.keys');
require('../modules/es.object.prevent-extensions');
require('../modules/es.object.seal');
require('../modules/es.object.set-prototype-of');
require('../modules/es.object.values');
require('../modules/es.object.to-string');
require('../modules/es.object.define-getter');
require('../modules/es.object.define-setter');
require('../modules/es.object.lookup-getter');
require('../modules/es.object.lookup-setter');
require('../modules/es.function.bind');
require('../modules/es.function.name');
require('../modules/es.function.has-instance');
require('../modules/es.global-this');
require('../modules/es.array.from');
require('../modules/es.array.is-array');
require('../modules/es.array.of');
require('../modules/es.array.concat');
require('../modules/es.array.copy-within');
require('../modules/es.array.every');
require('../modules/es.array.fill');
require('../modules/es.array.filter');
require('../modules/es.array.find');
require('../modules/es.array.find-index');
require('../modules/es.array.flat');
require('../modules/es.array.flat-map');
require('../modules/es.array.for-each');
require('../modules/es.array.includes');
require('../modules/es.array.index-of');
require('../modules/es.array.join');
require('../modules/es.array.last-index-of');
require('../modules/es.array.map');
require('../modules/es.array.reduce');
require('../modules/es.array.reduce-right');
require('../modules/es.array.reverse');
require('../modules/es.array.slice');
require('../modules/es.array.some');
require('../modules/es.array.sort');
require('../modules/es.array.splice');
require('../modules/es.array.species');
require('../modules/es.array.unscopables.flat');
require('../modules/es.array.unscopables.flat-map');
require('../modules/es.array.iterator');
require('../modules/es.string.from-code-point');
require('../modules/es.string.raw');
require('../modules/es.string.code-point-at');
require('../modules/es.string.ends-with');
require('../modules/es.string.includes');
require('../modules/es.string.match');
require('../modules/es.string.match-all');
require('../modules/es.string.pad-end');
require('../modules/es.string.pad-start');
require('../modules/es.string.repeat');
require('../modules/es.string.replace');
require('../modules/es.string.search');
require('../modules/es.string.split');
require('../modules/es.string.starts-with');
require('../modules/es.string.trim');
require('../modules/es.string.trim-start');
require('../modules/es.string.trim-end');
require('../modules/es.string.iterator');
require('../modules/es.string.anchor');
require('../modules/es.string.big');
require('../modules/es.string.blink');
require('../modules/es.string.bold');
require('../modules/es.string.fixed');
require('../modules/es.string.fontcolor');
require('../modules/es.string.fontsize');
require('../modules/es.string.italics');
require('../modules/es.string.link');
require('../modules/es.string.small');
require('../modules/es.string.strike');
require('../modules/es.string.sub');
require('../modules/es.string.sup');
require('../modules/es.regexp.constructor');
require('../modules/es.regexp.exec');
require('../modules/es.regexp.flags');
require('../modules/es.regexp.sticky');
require('../modules/es.regexp.test');
require('../modules/es.regexp.to-string');
require('../modules/es.parse-int');
require('../modules/es.parse-float');
require('../modules/es.number.constructor');
require('../modules/es.number.epsilon');
require('../modules/es.number.is-finite');
require('../modules/es.number.is-integer');
require('../modules/es.number.is-nan');
require('../modules/es.number.is-safe-integer');
require('../modules/es.number.max-safe-integer');
require('../modules/es.number.min-safe-integer');
require('../modules/es.number.parse-float');
require('../modules/es.number.parse-int');
require('../modules/es.number.to-fixed');
require('../modules/es.number.to-precision');
require('../modules/es.math.acosh');
require('../modules/es.math.asinh');
require('../modules/es.math.atanh');
require('../modules/es.math.cbrt');
require('../modules/es.math.clz32');
require('../modules/es.math.cosh');
require('../modules/es.math.expm1');
require('../modules/es.math.fround');
require('../modules/es.math.hypot');
require('../modules/es.math.imul');
require('../modules/es.math.log10');
require('../modules/es.math.log1p');
require('../modules/es.math.log2');
require('../modules/es.math.sign');
require('../modules/es.math.sinh');
require('../modules/es.math.tanh');
require('../modules/es.math.to-string-tag');
require('../modules/es.math.trunc');
require('../modules/es.date.now');
require('../modules/es.date.to-json');
require('../modules/es.date.to-iso-string');
require('../modules/es.date.to-string');
require('../modules/es.date.to-primitive');
require('../modules/es.json.stringify');
require('../modules/es.json.to-string-tag');
require('../modules/es.promise');
require('../modules/es.promise.all-settled');
require('../modules/es.promise.finally');
require('../modules/es.map');
require('../modules/es.set');
require('../modules/es.weak-map');
require('../modules/es.weak-set');
require('../modules/es.array-buffer.constructor');
require('../modules/es.array-buffer.is-view');
require('../modules/es.array-buffer.slice');
require('../modules/es.data-view');
require('../modules/es.typed-array.int8-array');
require('../modules/es.typed-array.uint8-array');
require('../modules/es.typed-array.uint8-clamped-array');
require('../modules/es.typed-array.int16-array');
require('../modules/es.typed-array.uint16-array');
require('../modules/es.typed-array.int32-array');
require('../modules/es.typed-array.uint32-array');
require('../modules/es.typed-array.float32-array');
require('../modules/es.typed-array.float64-array');
require('../modules/es.typed-array.from');
require('../modules/es.typed-array.of');
require('../modules/es.typed-array.copy-within');
require('../modules/es.typed-array.every');
require('../modules/es.typed-array.fill');
require('../modules/es.typed-array.filter');
require('../modules/es.typed-array.find');
require('../modules/es.typed-array.find-index');
require('../modules/es.typed-array.for-each');
require('../modules/es.typed-array.includes');
require('../modules/es.typed-array.index-of');
require('../modules/es.typed-array.iterator');
require('../modules/es.typed-array.join');
require('../modules/es.typed-array.last-index-of');
require('../modules/es.typed-array.map');
require('../modules/es.typed-array.reduce');
require('../modules/es.typed-array.reduce-right');
require('../modules/es.typed-array.reverse');
require('../modules/es.typed-array.set');
require('../modules/es.typed-array.slice');
require('../modules/es.typed-array.some');
require('../modules/es.typed-array.sort');
require('../modules/es.typed-array.subarray');
require('../modules/es.typed-array.to-locale-string');
require('../modules/es.typed-array.to-string');
require('../modules/es.reflect.apply');
require('../modules/es.reflect.construct');
require('../modules/es.reflect.define-property');
require('../modules/es.reflect.delete-property');
require('../modules/es.reflect.get');
require('../modules/es.reflect.get-own-property-descriptor');
require('../modules/es.reflect.get-prototype-of');
require('../modules/es.reflect.has');
require('../modules/es.reflect.is-extensible');
require('../modules/es.reflect.own-keys');
require('../modules/es.reflect.prevent-extensions');
require('../modules/es.reflect.set');
require('../modules/es.reflect.set-prototype-of');
var path = require('../internals/path');

module.exports = path;

},{"../modules/es.symbol":"node_modules/core-js/modules/es.symbol.js","../modules/es.symbol.async-iterator":"node_modules/core-js/modules/es.symbol.async-iterator.js","../modules/es.symbol.description":"node_modules/core-js/modules/es.symbol.description.js","../modules/es.symbol.has-instance":"node_modules/core-js/modules/es.symbol.has-instance.js","../modules/es.symbol.is-concat-spreadable":"node_modules/core-js/modules/es.symbol.is-concat-spreadable.js","../modules/es.symbol.iterator":"node_modules/core-js/modules/es.symbol.iterator.js","../modules/es.symbol.match":"node_modules/core-js/modules/es.symbol.match.js","../modules/es.symbol.match-all":"node_modules/core-js/modules/es.symbol.match-all.js","../modules/es.symbol.replace":"node_modules/core-js/modules/es.symbol.replace.js","../modules/es.symbol.search":"node_modules/core-js/modules/es.symbol.search.js","../modules/es.symbol.species":"node_modules/core-js/modules/es.symbol.species.js","../modules/es.symbol.split":"node_modules/core-js/modules/es.symbol.split.js","../modules/es.symbol.to-primitive":"node_modules/core-js/modules/es.symbol.to-primitive.js","../modules/es.symbol.to-string-tag":"node_modules/core-js/modules/es.symbol.to-string-tag.js","../modules/es.symbol.unscopables":"node_modules/core-js/modules/es.symbol.unscopables.js","../modules/es.object.assign":"node_modules/core-js/modules/es.object.assign.js","../modules/es.object.create":"node_modules/core-js/modules/es.object.create.js","../modules/es.object.define-property":"node_modules/core-js/modules/es.object.define-property.js","../modules/es.object.define-properties":"node_modules/core-js/modules/es.object.define-properties.js","../modules/es.object.entries":"node_modules/core-js/modules/es.object.entries.js","../modules/es.object.freeze":"node_modules/core-js/modules/es.object.freeze.js","../modules/es.object.from-entries":"node_modules/core-js/modules/es.object.from-entries.js","../modules/es.object.get-own-property-descriptor":"node_modules/core-js/modules/es.object.get-own-property-descriptor.js","../modules/es.object.get-own-property-descriptors":"node_modules/core-js/modules/es.object.get-own-property-descriptors.js","../modules/es.object.get-own-property-names":"node_modules/core-js/modules/es.object.get-own-property-names.js","../modules/es.object.get-prototype-of":"node_modules/core-js/modules/es.object.get-prototype-of.js","../modules/es.object.is":"node_modules/core-js/modules/es.object.is.js","../modules/es.object.is-extensible":"node_modules/core-js/modules/es.object.is-extensible.js","../modules/es.object.is-frozen":"node_modules/core-js/modules/es.object.is-frozen.js","../modules/es.object.is-sealed":"node_modules/core-js/modules/es.object.is-sealed.js","../modules/es.object.keys":"node_modules/core-js/modules/es.object.keys.js","../modules/es.object.prevent-extensions":"node_modules/core-js/modules/es.object.prevent-extensions.js","../modules/es.object.seal":"node_modules/core-js/modules/es.object.seal.js","../modules/es.object.set-prototype-of":"node_modules/core-js/modules/es.object.set-prototype-of.js","../modules/es.object.values":"node_modules/core-js/modules/es.object.values.js","../modules/es.object.to-string":"node_modules/core-js/modules/es.object.to-string.js","../modules/es.object.define-getter":"node_modules/core-js/modules/es.object.define-getter.js","../modules/es.object.define-setter":"node_modules/core-js/modules/es.object.define-setter.js","../modules/es.object.lookup-getter":"node_modules/core-js/modules/es.object.lookup-getter.js","../modules/es.object.lookup-setter":"node_modules/core-js/modules/es.object.lookup-setter.js","../modules/es.function.bind":"node_modules/core-js/modules/es.function.bind.js","../modules/es.function.name":"node_modules/core-js/modules/es.function.name.js","../modules/es.function.has-instance":"node_modules/core-js/modules/es.function.has-instance.js","../modules/es.global-this":"node_modules/core-js/modules/es.global-this.js","../modules/es.array.from":"node_modules/core-js/modules/es.array.from.js","../modules/es.array.is-array":"node_modules/core-js/modules/es.array.is-array.js","../modules/es.array.of":"node_modules/core-js/modules/es.array.of.js","../modules/es.array.concat":"node_modules/core-js/modules/es.array.concat.js","../modules/es.array.copy-within":"node_modules/core-js/modules/es.array.copy-within.js","../modules/es.array.every":"node_modules/core-js/modules/es.array.every.js","../modules/es.array.fill":"node_modules/core-js/modules/es.array.fill.js","../modules/es.array.filter":"node_modules/core-js/modules/es.array.filter.js","../modules/es.array.find":"node_modules/core-js/modules/es.array.find.js","../modules/es.array.find-index":"node_modules/core-js/modules/es.array.find-index.js","../modules/es.array.flat":"node_modules/core-js/modules/es.array.flat.js","../modules/es.array.flat-map":"node_modules/core-js/modules/es.array.flat-map.js","../modules/es.array.for-each":"node_modules/core-js/modules/es.array.for-each.js","../modules/es.array.includes":"node_modules/core-js/modules/es.array.includes.js","../modules/es.array.index-of":"node_modules/core-js/modules/es.array.index-of.js","../modules/es.array.join":"node_modules/core-js/modules/es.array.join.js","../modules/es.array.last-index-of":"node_modules/core-js/modules/es.array.last-index-of.js","../modules/es.array.map":"node_modules/core-js/modules/es.array.map.js","../modules/es.array.reduce":"node_modules/core-js/modules/es.array.reduce.js","../modules/es.array.reduce-right":"node_modules/core-js/modules/es.array.reduce-right.js","../modules/es.array.reverse":"node_modules/core-js/modules/es.array.reverse.js","../modules/es.array.slice":"node_modules/core-js/modules/es.array.slice.js","../modules/es.array.some":"node_modules/core-js/modules/es.array.some.js","../modules/es.array.sort":"node_modules/core-js/modules/es.array.sort.js","../modules/es.array.splice":"node_modules/core-js/modules/es.array.splice.js","../modules/es.array.species":"node_modules/core-js/modules/es.array.species.js","../modules/es.array.unscopables.flat":"node_modules/core-js/modules/es.array.unscopables.flat.js","../modules/es.array.unscopables.flat-map":"node_modules/core-js/modules/es.array.unscopables.flat-map.js","../modules/es.array.iterator":"node_modules/core-js/modules/es.array.iterator.js","../modules/es.string.from-code-point":"node_modules/core-js/modules/es.string.from-code-point.js","../modules/es.string.raw":"node_modules/core-js/modules/es.string.raw.js","../modules/es.string.code-point-at":"node_modules/core-js/modules/es.string.code-point-at.js","../modules/es.string.ends-with":"node_modules/core-js/modules/es.string.ends-with.js","../modules/es.string.includes":"node_modules/core-js/modules/es.string.includes.js","../modules/es.string.match":"node_modules/core-js/modules/es.string.match.js","../modules/es.string.match-all":"node_modules/core-js/modules/es.string.match-all.js","../modules/es.string.pad-end":"node_modules/core-js/modules/es.string.pad-end.js","../modules/es.string.pad-start":"node_modules/core-js/modules/es.string.pad-start.js","../modules/es.string.repeat":"node_modules/core-js/modules/es.string.repeat.js","../modules/es.string.replace":"node_modules/core-js/modules/es.string.replace.js","../modules/es.string.search":"node_modules/core-js/modules/es.string.search.js","../modules/es.string.split":"node_modules/core-js/modules/es.string.split.js","../modules/es.string.starts-with":"node_modules/core-js/modules/es.string.starts-with.js","../modules/es.string.trim":"node_modules/core-js/modules/es.string.trim.js","../modules/es.string.trim-start":"node_modules/core-js/modules/es.string.trim-start.js","../modules/es.string.trim-end":"node_modules/core-js/modules/es.string.trim-end.js","../modules/es.string.iterator":"node_modules/core-js/modules/es.string.iterator.js","../modules/es.string.anchor":"node_modules/core-js/modules/es.string.anchor.js","../modules/es.string.big":"node_modules/core-js/modules/es.string.big.js","../modules/es.string.blink":"node_modules/core-js/modules/es.string.blink.js","../modules/es.string.bold":"node_modules/core-js/modules/es.string.bold.js","../modules/es.string.fixed":"node_modules/core-js/modules/es.string.fixed.js","../modules/es.string.fontcolor":"node_modules/core-js/modules/es.string.fontcolor.js","../modules/es.string.fontsize":"node_modules/core-js/modules/es.string.fontsize.js","../modules/es.string.italics":"node_modules/core-js/modules/es.string.italics.js","../modules/es.string.link":"node_modules/core-js/modules/es.string.link.js","../modules/es.string.small":"node_modules/core-js/modules/es.string.small.js","../modules/es.string.strike":"node_modules/core-js/modules/es.string.strike.js","../modules/es.string.sub":"node_modules/core-js/modules/es.string.sub.js","../modules/es.string.sup":"node_modules/core-js/modules/es.string.sup.js","../modules/es.regexp.constructor":"node_modules/core-js/modules/es.regexp.constructor.js","../modules/es.regexp.exec":"node_modules/core-js/modules/es.regexp.exec.js","../modules/es.regexp.flags":"node_modules/core-js/modules/es.regexp.flags.js","../modules/es.regexp.sticky":"node_modules/core-js/modules/es.regexp.sticky.js","../modules/es.regexp.test":"node_modules/core-js/modules/es.regexp.test.js","../modules/es.regexp.to-string":"node_modules/core-js/modules/es.regexp.to-string.js","../modules/es.parse-int":"node_modules/core-js/modules/es.parse-int.js","../modules/es.parse-float":"node_modules/core-js/modules/es.parse-float.js","../modules/es.number.constructor":"node_modules/core-js/modules/es.number.constructor.js","../modules/es.number.epsilon":"node_modules/core-js/modules/es.number.epsilon.js","../modules/es.number.is-finite":"node_modules/core-js/modules/es.number.is-finite.js","../modules/es.number.is-integer":"node_modules/core-js/modules/es.number.is-integer.js","../modules/es.number.is-nan":"node_modules/core-js/modules/es.number.is-nan.js","../modules/es.number.is-safe-integer":"node_modules/core-js/modules/es.number.is-safe-integer.js","../modules/es.number.max-safe-integer":"node_modules/core-js/modules/es.number.max-safe-integer.js","../modules/es.number.min-safe-integer":"node_modules/core-js/modules/es.number.min-safe-integer.js","../modules/es.number.parse-float":"node_modules/core-js/modules/es.number.parse-float.js","../modules/es.number.parse-int":"node_modules/core-js/modules/es.number.parse-int.js","../modules/es.number.to-fixed":"node_modules/core-js/modules/es.number.to-fixed.js","../modules/es.number.to-precision":"node_modules/core-js/modules/es.number.to-precision.js","../modules/es.math.acosh":"node_modules/core-js/modules/es.math.acosh.js","../modules/es.math.asinh":"node_modules/core-js/modules/es.math.asinh.js","../modules/es.math.atanh":"node_modules/core-js/modules/es.math.atanh.js","../modules/es.math.cbrt":"node_modules/core-js/modules/es.math.cbrt.js","../modules/es.math.clz32":"node_modules/core-js/modules/es.math.clz32.js","../modules/es.math.cosh":"node_modules/core-js/modules/es.math.cosh.js","../modules/es.math.expm1":"node_modules/core-js/modules/es.math.expm1.js","../modules/es.math.fround":"node_modules/core-js/modules/es.math.fround.js","../modules/es.math.hypot":"node_modules/core-js/modules/es.math.hypot.js","../modules/es.math.imul":"node_modules/core-js/modules/es.math.imul.js","../modules/es.math.log10":"node_modules/core-js/modules/es.math.log10.js","../modules/es.math.log1p":"node_modules/core-js/modules/es.math.log1p.js","../modules/es.math.log2":"node_modules/core-js/modules/es.math.log2.js","../modules/es.math.sign":"node_modules/core-js/modules/es.math.sign.js","../modules/es.math.sinh":"node_modules/core-js/modules/es.math.sinh.js","../modules/es.math.tanh":"node_modules/core-js/modules/es.math.tanh.js","../modules/es.math.to-string-tag":"node_modules/core-js/modules/es.math.to-string-tag.js","../modules/es.math.trunc":"node_modules/core-js/modules/es.math.trunc.js","../modules/es.date.now":"node_modules/core-js/modules/es.date.now.js","../modules/es.date.to-json":"node_modules/core-js/modules/es.date.to-json.js","../modules/es.date.to-iso-string":"node_modules/core-js/modules/es.date.to-iso-string.js","../modules/es.date.to-string":"node_modules/core-js/modules/es.date.to-string.js","../modules/es.date.to-primitive":"node_modules/core-js/modules/es.date.to-primitive.js","../modules/es.json.stringify":"node_modules/core-js/modules/es.json.stringify.js","../modules/es.json.to-string-tag":"node_modules/core-js/modules/es.json.to-string-tag.js","../modules/es.promise":"node_modules/core-js/modules/es.promise.js","../modules/es.promise.all-settled":"node_modules/core-js/modules/es.promise.all-settled.js","../modules/es.promise.finally":"node_modules/core-js/modules/es.promise.finally.js","../modules/es.map":"node_modules/core-js/modules/es.map.js","../modules/es.set":"node_modules/core-js/modules/es.set.js","../modules/es.weak-map":"node_modules/core-js/modules/es.weak-map.js","../modules/es.weak-set":"node_modules/core-js/modules/es.weak-set.js","../modules/es.array-buffer.constructor":"node_modules/core-js/modules/es.array-buffer.constructor.js","../modules/es.array-buffer.is-view":"node_modules/core-js/modules/es.array-buffer.is-view.js","../modules/es.array-buffer.slice":"node_modules/core-js/modules/es.array-buffer.slice.js","../modules/es.data-view":"node_modules/core-js/modules/es.data-view.js","../modules/es.typed-array.int8-array":"node_modules/core-js/modules/es.typed-array.int8-array.js","../modules/es.typed-array.uint8-array":"node_modules/core-js/modules/es.typed-array.uint8-array.js","../modules/es.typed-array.uint8-clamped-array":"node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js","../modules/es.typed-array.int16-array":"node_modules/core-js/modules/es.typed-array.int16-array.js","../modules/es.typed-array.uint16-array":"node_modules/core-js/modules/es.typed-array.uint16-array.js","../modules/es.typed-array.int32-array":"node_modules/core-js/modules/es.typed-array.int32-array.js","../modules/es.typed-array.uint32-array":"node_modules/core-js/modules/es.typed-array.uint32-array.js","../modules/es.typed-array.float32-array":"node_modules/core-js/modules/es.typed-array.float32-array.js","../modules/es.typed-array.float64-array":"node_modules/core-js/modules/es.typed-array.float64-array.js","../modules/es.typed-array.from":"node_modules/core-js/modules/es.typed-array.from.js","../modules/es.typed-array.of":"node_modules/core-js/modules/es.typed-array.of.js","../modules/es.typed-array.copy-within":"node_modules/core-js/modules/es.typed-array.copy-within.js","../modules/es.typed-array.every":"node_modules/core-js/modules/es.typed-array.every.js","../modules/es.typed-array.fill":"node_modules/core-js/modules/es.typed-array.fill.js","../modules/es.typed-array.filter":"node_modules/core-js/modules/es.typed-array.filter.js","../modules/es.typed-array.find":"node_modules/core-js/modules/es.typed-array.find.js","../modules/es.typed-array.find-index":"node_modules/core-js/modules/es.typed-array.find-index.js","../modules/es.typed-array.for-each":"node_modules/core-js/modules/es.typed-array.for-each.js","../modules/es.typed-array.includes":"node_modules/core-js/modules/es.typed-array.includes.js","../modules/es.typed-array.index-of":"node_modules/core-js/modules/es.typed-array.index-of.js","../modules/es.typed-array.iterator":"node_modules/core-js/modules/es.typed-array.iterator.js","../modules/es.typed-array.join":"node_modules/core-js/modules/es.typed-array.join.js","../modules/es.typed-array.last-index-of":"node_modules/core-js/modules/es.typed-array.last-index-of.js","../modules/es.typed-array.map":"node_modules/core-js/modules/es.typed-array.map.js","../modules/es.typed-array.reduce":"node_modules/core-js/modules/es.typed-array.reduce.js","../modules/es.typed-array.reduce-right":"node_modules/core-js/modules/es.typed-array.reduce-right.js","../modules/es.typed-array.reverse":"node_modules/core-js/modules/es.typed-array.reverse.js","../modules/es.typed-array.set":"node_modules/core-js/modules/es.typed-array.set.js","../modules/es.typed-array.slice":"node_modules/core-js/modules/es.typed-array.slice.js","../modules/es.typed-array.some":"node_modules/core-js/modules/es.typed-array.some.js","../modules/es.typed-array.sort":"node_modules/core-js/modules/es.typed-array.sort.js","../modules/es.typed-array.subarray":"node_modules/core-js/modules/es.typed-array.subarray.js","../modules/es.typed-array.to-locale-string":"node_modules/core-js/modules/es.typed-array.to-locale-string.js","../modules/es.typed-array.to-string":"node_modules/core-js/modules/es.typed-array.to-string.js","../modules/es.reflect.apply":"node_modules/core-js/modules/es.reflect.apply.js","../modules/es.reflect.construct":"node_modules/core-js/modules/es.reflect.construct.js","../modules/es.reflect.define-property":"node_modules/core-js/modules/es.reflect.define-property.js","../modules/es.reflect.delete-property":"node_modules/core-js/modules/es.reflect.delete-property.js","../modules/es.reflect.get":"node_modules/core-js/modules/es.reflect.get.js","../modules/es.reflect.get-own-property-descriptor":"node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js","../modules/es.reflect.get-prototype-of":"node_modules/core-js/modules/es.reflect.get-prototype-of.js","../modules/es.reflect.has":"node_modules/core-js/modules/es.reflect.has.js","../modules/es.reflect.is-extensible":"node_modules/core-js/modules/es.reflect.is-extensible.js","../modules/es.reflect.own-keys":"node_modules/core-js/modules/es.reflect.own-keys.js","../modules/es.reflect.prevent-extensions":"node_modules/core-js/modules/es.reflect.prevent-extensions.js","../modules/es.reflect.set":"node_modules/core-js/modules/es.reflect.set.js","../modules/es.reflect.set-prototype-of":"node_modules/core-js/modules/es.reflect.set-prototype-of.js","../internals/path":"node_modules/core-js/internals/path.js"}],"node_modules/core-js/internals/dom-iterables.js":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],"node_modules/core-js/modules/web.dom-collections.for-each.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/dom-iterables":"node_modules/core-js/internals/dom-iterables.js","../internals/array-for-each":"node_modules/core-js/internals/array-for-each.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js"}],"node_modules/core-js/modules/web.dom-collections.iterator.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

},{"../internals/global":"node_modules/core-js/internals/global.js","../internals/dom-iterables":"node_modules/core-js/internals/dom-iterables.js","../modules/es.array.iterator":"node_modules/core-js/modules/es.array.iterator.js","../internals/create-non-enumerable-property":"node_modules/core-js/internals/create-non-enumerable-property.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');
var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate;

// http://w3c.github.io/setImmediate/
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/task":"node_modules/core-js/internals/task.js"}],"node_modules/core-js/modules/web.queue-microtask.js":[function(require,module,exports) {


var $ = require('../internals/export');
var global = require('../internals/global');
var microtask = require('../internals/microtask');
var classof = require('../internals/classof-raw');

var process = global.process;
var isNode = classof(process) == 'process';

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$({ global: true, enumerable: true, noTargetGet: true }, {
  queueMicrotask: function queueMicrotask(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/microtask":"node_modules/core-js/internals/microtask.js","../internals/classof-raw":"node_modules/core-js/internals/classof-raw.js"}],"node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/export":"node_modules/core-js/internals/export.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/engine-user-agent":"node_modules/core-js/internals/engine-user-agent.js"}],"node_modules/core-js/internals/native-url.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

},{"../internals/fails":"node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"node_modules/core-js/internals/is-pure.js"}],"node_modules/core-js/internals/string-punycode-to-ascii.js":[function(require,module,exports) {
'use strict';
// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};

},{}],"node_modules/core-js/internals/get-iterator.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/get-iterator-method":"node_modules/core-js/internals/get-iterator-method.js"}],"node_modules/core-js/modules/web.url-search-params.js":[function(require,module,exports) {
'use strict';
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.array.iterator');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var USE_NATIVE_URL = require('../internals/native-url');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var InternalStateModule = require('../internals/internal-state');
var anInstance = require('../internals/an-instance');
var hasOwn = require('../internals/has');
var bind = require('../internals/function-bind-context');
var classof = require('../internals/classof');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

},{"../modules/es.array.iterator":"node_modules/core-js/modules/es.array.iterator.js","../internals/export":"node_modules/core-js/internals/export.js","../internals/get-built-in":"node_modules/core-js/internals/get-built-in.js","../internals/native-url":"node_modules/core-js/internals/native-url.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/redefine-all":"node_modules/core-js/internals/redefine-all.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../internals/create-iterator-constructor":"node_modules/core-js/internals/create-iterator-constructor.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/function-bind-context":"node_modules/core-js/internals/function-bind-context.js","../internals/classof":"node_modules/core-js/internals/classof.js","../internals/an-object":"node_modules/core-js/internals/an-object.js","../internals/is-object":"node_modules/core-js/internals/is-object.js","../internals/object-create":"node_modules/core-js/internals/object-create.js","../internals/create-property-descriptor":"node_modules/core-js/internals/create-property-descriptor.js","../internals/get-iterator":"node_modules/core-js/internals/get-iterator.js","../internals/get-iterator-method":"node_modules/core-js/internals/get-iterator-method.js","../internals/well-known-symbol":"node_modules/core-js/internals/well-known-symbol.js"}],"node_modules/core-js/modules/web.url.js":[function(require,module,exports) {

'use strict';
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.string.iterator');
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var USE_NATIVE_URL = require('../internals/native-url');
var global = require('../internals/global');
var defineProperties = require('../internals/object-define-properties');
var redefine = require('../internals/redefine');
var anInstance = require('../internals/an-instance');
var has = require('../internals/has');
var assign = require('../internals/object-assign');
var arrayFrom = require('../internals/array-from');
var codeAt = require('../internals/string-multibyte').codeAt;
var toASCII = require('../internals/string-punycode-to-ascii');
var setToStringTag = require('../internals/set-to-string-tag');
var URLSearchParamsModule = require('../modules/web.url-search-params');
var InternalStateModule = require('../internals/internal-state');

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

},{"../modules/es.string.iterator":"node_modules/core-js/modules/es.string.iterator.js","../internals/export":"node_modules/core-js/internals/export.js","../internals/descriptors":"node_modules/core-js/internals/descriptors.js","../internals/native-url":"node_modules/core-js/internals/native-url.js","../internals/global":"node_modules/core-js/internals/global.js","../internals/object-define-properties":"node_modules/core-js/internals/object-define-properties.js","../internals/redefine":"node_modules/core-js/internals/redefine.js","../internals/an-instance":"node_modules/core-js/internals/an-instance.js","../internals/has":"node_modules/core-js/internals/has.js","../internals/object-assign":"node_modules/core-js/internals/object-assign.js","../internals/array-from":"node_modules/core-js/internals/array-from.js","../internals/string-multibyte":"node_modules/core-js/internals/string-multibyte.js","../internals/string-punycode-to-ascii":"node_modules/core-js/internals/string-punycode-to-ascii.js","../internals/set-to-string-tag":"node_modules/core-js/internals/set-to-string-tag.js","../modules/web.url-search-params":"node_modules/core-js/modules/web.url-search-params.js","../internals/internal-state":"node_modules/core-js/internals/internal-state.js"}],"node_modules/core-js/modules/web.url.to-json.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
});

},{"../internals/export":"node_modules/core-js/internals/export.js"}],"node_modules/core-js/web/index.js":[function(require,module,exports) {
require('../modules/web.dom-collections.for-each');
require('../modules/web.dom-collections.iterator');
require('../modules/web.immediate');
require('../modules/web.queue-microtask');
require('../modules/web.timers');
require('../modules/web.url');
require('../modules/web.url.to-json');
require('../modules/web.url-search-params');
var path = require('../internals/path');

module.exports = path;

},{"../modules/web.dom-collections.for-each":"node_modules/core-js/modules/web.dom-collections.for-each.js","../modules/web.dom-collections.iterator":"node_modules/core-js/modules/web.dom-collections.iterator.js","../modules/web.immediate":"node_modules/core-js/modules/web.immediate.js","../modules/web.queue-microtask":"node_modules/core-js/modules/web.queue-microtask.js","../modules/web.timers":"node_modules/core-js/modules/web.timers.js","../modules/web.url":"node_modules/core-js/modules/web.url.js","../modules/web.url.to-json":"node_modules/core-js/modules/web.url.to-json.js","../modules/web.url-search-params":"node_modules/core-js/modules/web.url-search-params.js","../internals/path":"node_modules/core-js/internals/path.js"}],"node_modules/core-js/stable/index.js":[function(require,module,exports) {
require('../es');
require('../web');
var path = require('../internals/path');

module.exports = path;

},{"../es":"node_modules/core-js/es/index.js","../web":"node_modules/core-js/web/index.js","../internals/path":"node_modules/core-js/internals/path.js"}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"node_modules/whatwg-fetch/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.fetch = fetch;
exports.DOMException = void 0;
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob: 'FileReader' in self && 'Blob' in self && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
} // Build a destructive iterator for the value list


function iteratorFor(items) {
  var iterator = {
    next: function () {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }

  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }

  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    this._bodyInit = body;

    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);

    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
} // HTTP methods whose capitalization should be normalized


var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }

    this.url = input.url;
    this.credentials = input.credentials;

    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }

    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;

    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';

  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }

  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }

  this._initBody(body);
}

Request.prototype.clone = function () {
  return new Request(this, {
    body: this._bodyInit
  });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2

  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();

    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : 'OK';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';

  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, {
    status: 0,
    statusText: ''
  });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, {
    status: status,
    headers: {
      location: url
    }
  });
};

var DOMException = self.DOMException;
exports.DOMException = DOMException;

try {
  new DOMException();
} catch (err) {
  exports.DOMException = DOMException = function (message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.onabort = function () {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.open(request.method, request.url, true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }

    request.headers.forEach(function (value, name) {
      xhr.setRequestHeader(name, value);
    });

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}

fetch.polyfill = true;

if (!self.fetch) {
  self.fetch = fetch;
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
}
},{}],"node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

;

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
},{}],"node_modules/msal/lib-es6/utils/CryptoUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CryptoUtils = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var CryptoUtils =
/** @class */
function () {
  function CryptoUtils() {}
  /**
   * Creates a new random GUID - used to populate state?
   * @returns string (GUID)
   */


  CryptoUtils.createNewGuid = function () {
    /*
     * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
     * pseudo-random numbers.
     * The algorithm is as follows:
     *     Set the two most significant bits (bits 6 and 7) of the
     *        clock_seq_hi_and_reserved to zero and one, respectively.
     *     Set the four most significant bits (bits 12 through 15) of the
     *        time_hi_and_version field to the 4-bit version number from
     *        Section 4.1.3. Version4
     *     Set all the other bits to randomly (or pseudo-randomly) chosen
     *     values.
     * UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
     * time-low               = 4hexOctet
     * time-mid               = 2hexOctet
     * time-high-and-version  = 2hexOctet
     * clock-seq-and-reserved = hexOctet:
     * clock-seq-low          = hexOctet
     * node                   = 6hexOctet
     * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     * y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
     * y values are 8, 9, A, B
     */
    var cryptoObj = window.crypto; // for IE 11

    if (cryptoObj && cryptoObj.getRandomValues) {
      var buffer = new Uint8Array(16);
      cryptoObj.getRandomValues(buffer); // buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).

      buffer[6] |= 0x40; // buffer[6] | 01000000 will set the 6 bit to 1.

      buffer[6] &= 0x4f; // buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
      // buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.

      buffer[8] |= 0x80; // buffer[8] | 10000000 will set the 7 bit to 1.

      buffer[8] &= 0xbf; // buffer[8] & 10111111 will set the 6 bit to 0.

      return CryptoUtils.decimalToHex(buffer[0]) + CryptoUtils.decimalToHex(buffer[1]) + CryptoUtils.decimalToHex(buffer[2]) + CryptoUtils.decimalToHex(buffer[3]) + "-" + CryptoUtils.decimalToHex(buffer[4]) + CryptoUtils.decimalToHex(buffer[5]) + "-" + CryptoUtils.decimalToHex(buffer[6]) + CryptoUtils.decimalToHex(buffer[7]) + "-" + CryptoUtils.decimalToHex(buffer[8]) + CryptoUtils.decimalToHex(buffer[9]) + "-" + CryptoUtils.decimalToHex(buffer[10]) + CryptoUtils.decimalToHex(buffer[11]) + CryptoUtils.decimalToHex(buffer[12]) + CryptoUtils.decimalToHex(buffer[13]) + CryptoUtils.decimalToHex(buffer[14]) + CryptoUtils.decimalToHex(buffer[15]);
    } else {
      var guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
      var hex = "0123456789abcdef";
      var r = 0;
      var guidResponse = "";

      for (var i = 0; i < 36; i++) {
        if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
          // each x and y needs to be random
          r = Math.random() * 16 | 0;
        }

        if (guidHolder[i] === "x") {
          guidResponse += hex[r];
        } else if (guidHolder[i] === "y") {
          // clock-seq-and-reserved first hex is filtered and remaining hex values are random
          r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??

          r |= 0x8; // set pos 3 to 1 as 1???

          guidResponse += hex[r];
        } else {
          guidResponse += guidHolder[i];
        }
      }

      return guidResponse;
    }
  };
  /**
   * verifies if a string is  GUID
   * @param guid
   */


  CryptoUtils.isGuid = function (guid) {
    var regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexGuid.test(guid);
  };
  /**
   * Decimal to Hex
   *
   * @param num
   */


  CryptoUtils.decimalToHex = function (num) {
    var hex = num.toString(16);

    while (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  }; // See: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_4_%E2%80%93_escaping_the_string_before_encoding_it

  /**
   * encoding string to base64 - platform specific check
   *
   * @param input
   */


  CryptoUtils.base64Encode = function (input) {
    return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode(Number("0x" + p1));
    }));
  };
  /**
   * Decodes a base64 encoded string.
   *
   * @param input
   */


  CryptoUtils.base64Decode = function (input) {
    var encodedString = input.replace(/-/g, "+").replace(/_/g, "/");

    switch (encodedString.length % 4) {
      case 0:
        break;

      case 2:
        encodedString += "==";
        break;

      case 3:
        encodedString += "=";
        break;

      default:
        throw new Error("Invalid base64 string");
    }

    return decodeURIComponent(atob(encodedString).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  };
  /**
   * deserialize a string
   *
   * @param query
   */


  CryptoUtils.deserialize = function (query) {
    var match; // Regex for replacing addition symbol with a space

    var pl = /\+/g;
    var search = /([^&=]+)=([^&]*)/g;

    var decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    };

    var obj = {};
    match = search.exec(query);

    while (match) {
      obj[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }

    return obj;
  };

  return CryptoUtils;
}();

exports.CryptoUtils = CryptoUtils;
},{}],"node_modules/msal/lib-es6/utils/Constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.libraryVersion = libraryVersion;
exports.PromptState = exports.BlacklistedEQParams = exports.SSOTypes = exports.AADTrustedHostList = exports.ErrorCacheKeys = exports.PersistentCacheKeys = exports.TemporaryCacheKeys = exports.ServerHashParamKeys = exports.Constants = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 * Constants
 */
var Constants =
/** @class */
function () {
  function Constants() {}

  Object.defineProperty(Constants, "claims", {
    get: function () {
      return "claims";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "clientId", {
    get: function () {
      return "clientId";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "adalIdToken", {
    get: function () {
      return "adal.idtoken";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "cachePrefix", {
    get: function () {
      return "msal";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "scopes", {
    get: function () {
      return "scopes";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "no_account", {
    get: function () {
      return "NO_ACCOUNT";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "consumersUtid", {
    get: function () {
      return "9188040d-6c67-4c5b-b112-36a304b66dad";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "upn", {
    get: function () {
      return "upn";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "prompt_select_account", {
    get: function () {
      return "&prompt=select_account";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "prompt_none", {
    get: function () {
      return "&prompt=none";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "prompt", {
    get: function () {
      return "prompt";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "response_mode_fragment", {
    get: function () {
      return "&response_mode=fragment";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "resourceDelimiter", {
    get: function () {
      return "|";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "cacheDelimiter", {
    get: function () {
      return ".";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "popUpWidth", {
    get: function () {
      return this._popUpWidth;
    },
    set: function (width) {
      this._popUpWidth = width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "popUpHeight", {
    get: function () {
      return this._popUpHeight;
    },
    set: function (height) {
      this._popUpHeight = height;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "login", {
    get: function () {
      return "LOGIN";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "renewToken", {
    get: function () {
      return "RENEW_TOKEN";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "unknown", {
    get: function () {
      return "UNKNOWN";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "homeAccountIdentifier", {
    get: function () {
      return "homeAccountIdentifier";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "common", {
    get: function () {
      return "common";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "openidScope", {
    get: function () {
      return "openid";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "profileScope", {
    get: function () {
      return "profile";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "interactionTypeRedirect", {
    get: function () {
      return "redirectInteraction";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "interactionTypePopup", {
    get: function () {
      return "popupInteraction";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Constants, "inProgress", {
    get: function () {
      return "inProgress";
    },
    enumerable: true,
    configurable: true
  });
  Constants._popUpWidth = 483;
  Constants._popUpHeight = 600;
  return Constants;
}();

exports.Constants = Constants;

/**
 * Keys in the hashParams
 */
var ServerHashParamKeys;
exports.ServerHashParamKeys = ServerHashParamKeys;

(function (ServerHashParamKeys) {
  ServerHashParamKeys["SCOPE"] = "scope";
  ServerHashParamKeys["ERROR"] = "error";
  ServerHashParamKeys["ERROR_DESCRIPTION"] = "error_description";
  ServerHashParamKeys["ACCESS_TOKEN"] = "access_token";
  ServerHashParamKeys["ID_TOKEN"] = "id_token";
  ServerHashParamKeys["EXPIRES_IN"] = "expires_in";
  ServerHashParamKeys["SESSION_STATE"] = "session_state";
  ServerHashParamKeys["CLIENT_INFO"] = "client_info";
})(ServerHashParamKeys || (exports.ServerHashParamKeys = ServerHashParamKeys = {}));

;
/**
 * @hidden
 * CacheKeys for MSAL
 */

var TemporaryCacheKeys;
exports.TemporaryCacheKeys = TemporaryCacheKeys;

(function (TemporaryCacheKeys) {
  TemporaryCacheKeys["AUTHORITY"] = "authority";
  TemporaryCacheKeys["ACQUIRE_TOKEN_ACCOUNT"] = "acquireTokenAccount";
  TemporaryCacheKeys["SESSION_STATE"] = "session.state";
  TemporaryCacheKeys["STATE_LOGIN"] = "state.login";
  TemporaryCacheKeys["STATE_ACQ_TOKEN"] = "state.acquireToken";
  TemporaryCacheKeys["STATE_RENEW"] = "state.renew";
  TemporaryCacheKeys["NONCE_IDTOKEN"] = "nonce.idtoken";
  TemporaryCacheKeys["LOGIN_REQUEST"] = "login.request";
  TemporaryCacheKeys["RENEW_STATUS"] = "token.renew.status";
  TemporaryCacheKeys["URL_HASH"] = "urlHash";
  TemporaryCacheKeys["ANGULAR_LOGIN_REQUEST"] = "angular.login.request";
  TemporaryCacheKeys["INTERACTION_STATUS"] = "interaction_status";
  TemporaryCacheKeys["REDIRECT_REQUEST"] = "redirect_request";
})(TemporaryCacheKeys || (exports.TemporaryCacheKeys = TemporaryCacheKeys = {}));

var PersistentCacheKeys;
exports.PersistentCacheKeys = PersistentCacheKeys;

(function (PersistentCacheKeys) {
  PersistentCacheKeys["IDTOKEN"] = "idtoken";
  PersistentCacheKeys["CLIENT_INFO"] = "client.info";
})(PersistentCacheKeys || (exports.PersistentCacheKeys = PersistentCacheKeys = {}));

var ErrorCacheKeys;
exports.ErrorCacheKeys = ErrorCacheKeys;

(function (ErrorCacheKeys) {
  ErrorCacheKeys["LOGIN_ERROR"] = "login.error";
  ErrorCacheKeys["ERROR"] = "error";
  ErrorCacheKeys["ERROR_DESC"] = "error.description";
})(ErrorCacheKeys || (exports.ErrorCacheKeys = ErrorCacheKeys = {}));

var AADTrustedHostList = {
  "login.windows.net": "login.windows.net",
  "login.chinacloudapi.cn": "login.chinacloudapi.cn",
  "login.cloudgovapi.us": "login.cloudgovapi.us",
  "login.microsoftonline.com": "login.microsoftonline.com",
  "login.microsoftonline.de": "login.microsoftonline.de",
  "login.microsoftonline.us": "login.microsoftonline.us"
};
/**
 * @hidden
 * SSO Types - generated to populate hints
 */

exports.AADTrustedHostList = AADTrustedHostList;
var SSOTypes;
exports.SSOTypes = SSOTypes;

(function (SSOTypes) {
  SSOTypes["ACCOUNT"] = "account";
  SSOTypes["SID"] = "sid";
  SSOTypes["LOGIN_HINT"] = "login_hint";
  SSOTypes["ID_TOKEN"] = "id_token";
  SSOTypes["DOMAIN_HINT"] = "domain_hint";
  SSOTypes["ORGANIZATIONS"] = "organizations";
  SSOTypes["CONSUMERS"] = "consumers";
  SSOTypes["ACCOUNT_ID"] = "accountIdentifier";
  SSOTypes["HOMEACCOUNT_ID"] = "homeAccountIdentifier";
  SSOTypes["LOGIN_REQ"] = "login_req";
  SSOTypes["DOMAIN_REQ"] = "domain_req";
})(SSOTypes || (exports.SSOTypes = SSOTypes = {}));

;
/**
 * @hidden
 */

var BlacklistedEQParams = [SSOTypes.SID, SSOTypes.LOGIN_HINT];
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 * @hidden
 */

exports.BlacklistedEQParams = BlacklistedEQParams;
var PromptState = {
  LOGIN: "login",
  SELECT_ACCOUNT: "select_account",
  CONSENT: "consent",
  NONE: "none"
};
/**
 * MSAL JS Library Version
 */

exports.PromptState = PromptState;

function libraryVersion() {
  return "1.2.1";
}
},{}],"node_modules/msal/lib-es6/error/AuthError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthError = exports.AuthErrorMessage = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var AuthErrorMessage = {
  unexpectedError: {
    code: "unexpected_error",
    desc: "Unexpected error in authentication."
  },
  noWindowObjectError: {
    code: "no_window_object",
    desc: "No window object available. Details:"
  }
};
/**
 * General error class thrown by the MSAL.js library.
 */

exports.AuthErrorMessage = AuthErrorMessage;

var AuthError =
/** @class */
function (_super) {
  tslib_1.__extends(AuthError, _super);

  function AuthError(errorCode, errorMessage) {
    var _this = _super.call(this, errorMessage) || this;

    Object.setPrototypeOf(_this, AuthError.prototype);
    _this.errorCode = errorCode;
    _this.errorMessage = errorMessage;
    _this.name = "AuthError";
    return _this;
  }

  AuthError.createUnexpectedError = function (errDesc) {
    return new AuthError(AuthErrorMessage.unexpectedError.code, AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
  };

  AuthError.createNoWindowObjectError = function (errDesc) {
    return new AuthError(AuthErrorMessage.noWindowObjectError.code, AuthErrorMessage.noWindowObjectError.desc + " " + errDesc);
  };

  return AuthError;
}(Error);

exports.AuthError = AuthError;
},{"tslib":"node_modules/tslib/tslib.es6.js"}],"node_modules/msal/lib-es6/utils/StringUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringUtils = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var StringUtils =
/** @class */
function () {
  function StringUtils() {}
  /**
   * Check if a string is empty
   *
   * @param str
   */


  StringUtils.isEmpty = function (str) {
    return typeof str === "undefined" || !str || 0 === str.length;
  };

  return StringUtils;
}();

exports.StringUtils = StringUtils;
},{}],"node_modules/msal/lib-es6/error/ClientAuthError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientAuthError = exports.ClientAuthErrorMessage = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _AuthError = require("./AuthError");

var _StringUtils = require("../utils/StringUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ClientAuthErrorMessage = {
  multipleMatchingTokens: {
    code: "multiple_matching_tokens",
    desc: "The cache contains multiple tokens satisfying the requirements. " + "Call AcquireToken again providing more requirements like authority."
  },
  multipleCacheAuthorities: {
    code: "multiple_authorities",
    desc: "Multiple authorities found in the cache. Pass authority in the API overload."
  },
  endpointResolutionError: {
    code: "endpoints_resolution_error",
    desc: "Error: could not resolve endpoints. Please check network and try again."
  },
  popUpWindowError: {
    code: "popup_window_error",
    desc: "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."
  },
  tokenRenewalError: {
    code: "token_renewal_error",
    desc: "Token renewal operation failed due to timeout."
  },
  invalidIdToken: {
    code: "invalid_id_token",
    desc: "Invalid ID token format."
  },
  invalidStateError: {
    code: "invalid_state_error",
    desc: "Invalid state."
  },
  nonceMismatchError: {
    code: "nonce_mismatch_error",
    desc: "Nonce is not matching, Nonce received: "
  },
  loginProgressError: {
    code: "login_progress_error",
    desc: "Login_In_Progress: Error during login call - login is already in progress."
  },
  acquireTokenProgressError: {
    code: "acquiretoken_progress_error",
    desc: "AcquireToken_In_Progress: Error during login call - login is already in progress."
  },
  userCancelledError: {
    code: "user_cancelled",
    desc: "User cancelled the flow."
  },
  callbackError: {
    code: "callback_error",
    desc: "Error occurred in token received callback function."
  },
  userLoginRequiredError: {
    code: "user_login_error",
    desc: "User login is required."
  },
  userDoesNotExistError: {
    code: "user_non_existent",
    desc: "User object does not exist. Please call a login API."
  },
  clientInfoDecodingError: {
    code: "client_info_decoding_error",
    desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."
  },
  clientInfoNotPopulatedError: {
    code: "client_info_not_populated_error",
    desc: "The service did not populate client_info in the response, Please verify with the service team"
  },
  nullOrEmptyIdToken: {
    code: "null_or_empty_id_token",
    desc: "The idToken is null or empty. Please review the trace to determine the root cause."
  },
  idTokenNotParsed: {
    code: "id_token_parsing_error",
    desc: "ID token cannot be parsed. Please review stack trace to determine root cause."
  },
  tokenEncodingError: {
    code: "token_encoding_error",
    desc: "The token to be decoded is not encoded correctly."
  },
  invalidInteractionType: {
    code: "invalid_interaction_type",
    desc: "The interaction type passed to the handler was incorrect or unknown"
  },
  cacheParseError: {
    code: "cannot_parse_cache",
    desc: "The cached token key is not a valid JSON and cannot be parsed"
  },
  blockTokenRequestsInHiddenIframe: {
    code: "block_token_requests",
    desc: "Token calls are blocked in hidden iframes"
  }
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */

exports.ClientAuthErrorMessage = ClientAuthErrorMessage;

var ClientAuthError =
/** @class */
function (_super) {
  tslib_1.__extends(ClientAuthError, _super);

  function ClientAuthError(errorCode, errorMessage) {
    var _this = _super.call(this, errorCode, errorMessage) || this;

    _this.name = "ClientAuthError";
    Object.setPrototypeOf(_this, ClientAuthError.prototype);
    return _this;
  }

  ClientAuthError.createEndpointResolutionError = function (errDetail) {
    var errorMessage = ClientAuthErrorMessage.endpointResolutionError.desc;

    if (errDetail && !_StringUtils.StringUtils.isEmpty(errDetail)) {
      errorMessage += " Details: " + errDetail;
    }

    return new ClientAuthError(ClientAuthErrorMessage.endpointResolutionError.code, errorMessage);
  };

  ClientAuthError.createMultipleMatchingTokensInCacheError = function (scope) {
    return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingTokens.code, "Cache error for scope " + scope + ": " + ClientAuthErrorMessage.multipleMatchingTokens.desc + ".");
  };

  ClientAuthError.createMultipleAuthoritiesInCacheError = function (scope) {
    return new ClientAuthError(ClientAuthErrorMessage.multipleCacheAuthorities.code, "Cache error for scope " + scope + ": " + ClientAuthErrorMessage.multipleCacheAuthorities.desc + ".");
  };

  ClientAuthError.createPopupWindowError = function (errDetail) {
    var errorMessage = ClientAuthErrorMessage.popUpWindowError.desc;

    if (errDetail && !_StringUtils.StringUtils.isEmpty(errDetail)) {
      errorMessage += " Details: " + errDetail;
    }

    return new ClientAuthError(ClientAuthErrorMessage.popUpWindowError.code, errorMessage);
  };

  ClientAuthError.createTokenRenewalTimeoutError = function (urlNavigate) {
    var errorMessage = "URL navigated to is " + urlNavigate + ", " + ClientAuthErrorMessage.tokenRenewalError.desc;
    return new ClientAuthError(ClientAuthErrorMessage.tokenRenewalError.code, errorMessage);
  };

  ClientAuthError.createInvalidIdTokenError = function (idToken) {
    return new ClientAuthError(ClientAuthErrorMessage.invalidIdToken.code, ClientAuthErrorMessage.invalidIdToken.desc + " Given token: " + idToken);
  }; // TODO: Is this not a security flaw to send the user the state expected??


  ClientAuthError.createInvalidStateError = function (invalidState, actualState) {
    return new ClientAuthError(ClientAuthErrorMessage.invalidStateError.code, ClientAuthErrorMessage.invalidStateError.desc + " " + invalidState + ", state expected : " + actualState + ".");
  }; // TODO: Is this not a security flaw to send the user the Nonce expected??


  ClientAuthError.createNonceMismatchError = function (invalidNonce, actualNonce) {
    return new ClientAuthError(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc + " " + invalidNonce + ", nonce expected : " + actualNonce + ".");
  };

  ClientAuthError.createLoginInProgressError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.loginProgressError.code, ClientAuthErrorMessage.loginProgressError.desc);
  };

  ClientAuthError.createAcquireTokenInProgressError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.acquireTokenProgressError.code, ClientAuthErrorMessage.acquireTokenProgressError.desc);
  };

  ClientAuthError.createUserCancelledError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.userCancelledError.code, ClientAuthErrorMessage.userCancelledError.desc);
  };

  ClientAuthError.createErrorInCallbackFunction = function (errorDesc) {
    return new ClientAuthError(ClientAuthErrorMessage.callbackError.code, ClientAuthErrorMessage.callbackError.desc + " " + errorDesc + ".");
  };

  ClientAuthError.createUserLoginRequiredError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.userLoginRequiredError.code, ClientAuthErrorMessage.userLoginRequiredError.desc);
  };

  ClientAuthError.createUserDoesNotExistError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.userDoesNotExistError.code, ClientAuthErrorMessage.userDoesNotExistError.desc);
  };

  ClientAuthError.createClientInfoDecodingError = function (caughtError) {
    return new ClientAuthError(ClientAuthErrorMessage.clientInfoDecodingError.code, ClientAuthErrorMessage.clientInfoDecodingError.desc + " Failed with error: " + caughtError);
  };

  ClientAuthError.createClientInfoNotPopulatedError = function (caughtError) {
    return new ClientAuthError(ClientAuthErrorMessage.clientInfoNotPopulatedError.code, ClientAuthErrorMessage.clientInfoNotPopulatedError.desc + " Failed with error: " + caughtError);
  };

  ClientAuthError.createIdTokenNullOrEmptyError = function (invalidRawTokenString) {
    return new ClientAuthError(ClientAuthErrorMessage.nullOrEmptyIdToken.code, ClientAuthErrorMessage.nullOrEmptyIdToken.desc + " Raw ID Token Value: " + invalidRawTokenString);
  };

  ClientAuthError.createIdTokenParsingError = function (caughtParsingError) {
    return new ClientAuthError(ClientAuthErrorMessage.idTokenNotParsed.code, ClientAuthErrorMessage.idTokenNotParsed.desc + " Failed with error: " + caughtParsingError);
  };

  ClientAuthError.createTokenEncodingError = function (incorrectlyEncodedToken) {
    return new ClientAuthError(ClientAuthErrorMessage.tokenEncodingError.code, ClientAuthErrorMessage.tokenEncodingError.desc + " Attempted to decode: " + incorrectlyEncodedToken);
  };

  ClientAuthError.createInvalidInteractionTypeError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.invalidInteractionType.code, ClientAuthErrorMessage.invalidInteractionType.desc);
  };

  ClientAuthError.createCacheParseError = function (key) {
    var errorMessage = "invalid key: " + key + ", " + ClientAuthErrorMessage.cacheParseError.desc;
    return new ClientAuthError(ClientAuthErrorMessage.cacheParseError.code, errorMessage);
  };

  ClientAuthError.createBlockTokenRequestsInHiddenIframeError = function () {
    return new ClientAuthError(ClientAuthErrorMessage.blockTokenRequestsInHiddenIframe.code, ClientAuthErrorMessage.blockTokenRequestsInHiddenIframe.desc);
  };

  return ClientAuthError;
}(_AuthError.AuthError);

exports.ClientAuthError = ClientAuthError;
},{"tslib":"node_modules/tslib/tslib.es6.js","./AuthError":"node_modules/msal/lib-es6/error/AuthError.js","../utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/error/ClientConfigurationError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConfigurationError = exports.ClientConfigurationErrorMessage = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _ClientAuthError = require("./ClientAuthError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ClientConfigurationErrorMessage = {
  configurationNotSet: {
    code: "no_config_set",
    desc: "Configuration has not been set. Please call the UserAgentApplication constructor with a valid Configuration object."
  },
  storageNotSupported: {
    code: "storage_not_supported",
    desc: "The value for the cacheLocation is not supported."
  },
  noRedirectCallbacksSet: {
    code: "no_redirect_callbacks",
    desc: "No redirect callbacks have been set. Please call handleRedirectCallback() with the appropriate function arguments before continuing. " + "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
  },
  invalidCallbackObject: {
    code: "invalid_callback_object",
    desc: "The object passed for the callback was invalid. " + "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
  },
  scopesRequired: {
    code: "scopes_required",
    desc: "Scopes are required to obtain an access token."
  },
  emptyScopes: {
    code: "empty_input_scopes_error",
    desc: "Scopes cannot be passed as empty array."
  },
  nonArrayScopes: {
    code: "nonarray_input_scopes_error",
    desc: "Scopes cannot be passed as non-array."
  },
  clientScope: {
    code: "clientid_input_scopes_error",
    desc: "Client ID can only be provided as a single scope."
  },
  invalidPrompt: {
    code: "invalid_prompt_value",
    desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'"
  },
  invalidAuthorityType: {
    code: "invalid_authority_type",
    desc: "The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."
  },
  authorityUriInsecure: {
    code: "authority_uri_insecure",
    desc: "Authority URIs must use https."
  },
  authorityUriInvalidPath: {
    code: "authority_uri_invalid_path",
    desc: "Given authority URI is invalid."
  },
  unsupportedAuthorityValidation: {
    code: "unsupported_authority_validation",
    desc: "The authority validation is not supported for this authority type."
  },
  b2cAuthorityUriInvalidPath: {
    code: "b2c_authority_uri_invalid_path",
    desc: "The given URI for the B2C authority is invalid."
  },
  claimsRequestParsingError: {
    code: "claims_request_parsing_error",
    desc: "Could not parse the given claims request object."
  },
  emptyRequestError: {
    code: "empty_request_error",
    desc: "Request object is required."
  },
  invalidCorrelationIdError: {
    code: "invalid_guid_sent_as_correlationId",
    desc: "Please set the correlationId as a valid guid"
  },
  telemetryConfigError: {
    code: "telemetry_config_error",
    desc: "Telemetry config is not configured with required values"
  }
};
/**
 * Error thrown when there is an error in configuration of the .js library.
 */

exports.ClientConfigurationErrorMessage = ClientConfigurationErrorMessage;

var ClientConfigurationError =
/** @class */
function (_super) {
  tslib_1.__extends(ClientConfigurationError, _super);

  function ClientConfigurationError(errorCode, errorMessage) {
    var _this = _super.call(this, errorCode, errorMessage) || this;

    _this.name = "ClientConfigurationError";
    Object.setPrototypeOf(_this, ClientConfigurationError.prototype);
    return _this;
  }

  ClientConfigurationError.createNoSetConfigurationError = function () {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.configurationNotSet.code, "" + ClientConfigurationErrorMessage.configurationNotSet.desc);
  };

  ClientConfigurationError.createStorageNotSupportedError = function (givenCacheLocation) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.storageNotSupported.code, ClientConfigurationErrorMessage.storageNotSupported.desc + " Given location: " + givenCacheLocation);
  };

  ClientConfigurationError.createRedirectCallbacksNotSetError = function () {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.noRedirectCallbacksSet.code, ClientConfigurationErrorMessage.noRedirectCallbacksSet.desc);
  };

  ClientConfigurationError.createInvalidCallbackObjectError = function (callbackObject) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCallbackObject.code, ClientConfigurationErrorMessage.invalidCallbackObject.desc + " Given value for callback function: " + callbackObject);
  };

  ClientConfigurationError.createEmptyScopesArrayError = function (scopesValue) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopes.code, ClientConfigurationErrorMessage.emptyScopes.desc + " Given value: " + scopesValue + ".");
  };

  ClientConfigurationError.createScopesNonArrayError = function (scopesValue) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.nonArrayScopes.code, ClientConfigurationErrorMessage.nonArrayScopes.desc + " Given value: " + scopesValue + ".");
  };

  ClientConfigurationError.createClientIdSingleScopeError = function (scopesValue) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.clientScope.code, ClientConfigurationErrorMessage.clientScope.desc + " Given value: " + scopesValue + ".");
  };

  ClientConfigurationError.createScopesRequiredError = function (scopesValue) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.scopesRequired.code, ClientConfigurationErrorMessage.scopesRequired.desc + " Given value: " + scopesValue);
  };

  ClientConfigurationError.createInvalidPromptError = function (promptValue) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code, ClientConfigurationErrorMessage.invalidPrompt.desc + " Given value: " + promptValue);
  };

  ClientConfigurationError.createClaimsRequestParsingError = function (claimsRequestParseError) {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code, ClientConfigurationErrorMessage.claimsRequestParsingError.desc + " Given value: " + claimsRequestParseError);
  };

  ClientConfigurationError.createEmptyRequestError = function () {
    var _a = ClientConfigurationErrorMessage.emptyRequestError,
        code = _a.code,
        desc = _a.desc;
    return new ClientConfigurationError(code, desc);
  };

  ClientConfigurationError.createInvalidCorrelationIdError = function () {
    return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCorrelationIdError.code, ClientConfigurationErrorMessage.invalidCorrelationIdError.desc);
  };

  ClientConfigurationError.createTelemetryConfigError = function (config) {
    var _a = ClientConfigurationErrorMessage.telemetryConfigError,
        code = _a.code,
        desc = _a.desc;
    var requiredKeys = {
      applicationName: "string",
      applicationVersion: "string",
      telemetryEmitter: "function"
    };
    var missingKeys = Object.keys(requiredKeys).reduce(function (keys, key) {
      return config[key] ? keys : keys.concat([key + " (" + requiredKeys[key] + ")"]);
    }, []);
    return new ClientConfigurationError(code, desc + " mising values: " + missingKeys.join(","));
  };

  return ClientConfigurationError;
}(_ClientAuthError.ClientAuthError);

exports.ClientConfigurationError = ClientConfigurationError;
},{"tslib":"node_modules/tslib/tslib.es6.js","./ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js"}],"node_modules/msal/lib-es6/ScopeSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeSet = void 0;

var _ClientConfigurationError = require("./error/ClientConfigurationError");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ScopeSet =
/** @class */
function () {
  function ScopeSet() {}
  /**
   * Check if there are dup scopes in a given request
   *
   * @param cachedScopes
   * @param scopes
   */
  // TODO: Rename this, intersecting scopes isn't a great name for duplicate checker


  ScopeSet.isIntersectingScopes = function (cachedScopes, scopes) {
    cachedScopes = this.convertToLowerCase(cachedScopes);

    for (var i = 0; i < scopes.length; i++) {
      if (cachedScopes.indexOf(scopes[i].toLowerCase()) > -1) {
        return true;
      }
    }

    return false;
  };
  /**
   * Check if a given scope is present in the request
   *
   * @param cachedScopes
   * @param scopes
   */


  ScopeSet.containsScope = function (cachedScopes, scopes) {
    cachedScopes = this.convertToLowerCase(cachedScopes);
    return scopes.every(function (value) {
      return cachedScopes.indexOf(value.toString().toLowerCase()) >= 0;
    });
  };
  /**
   * toLower
   *
   * @param scopes
   */
  // TODO: Rename this, too generic name for a function that only deals with scopes


  ScopeSet.convertToLowerCase = function (scopes) {
    return scopes.map(function (scope) {
      return scope.toLowerCase();
    });
  };
  /**
   * remove one element from a scope array
   *
   * @param scopes
   * @param scope
   */
  // TODO: Rename this, too generic name for a function that only deals with scopes


  ScopeSet.removeElement = function (scopes, scope) {
    return scopes.filter(function (value) {
      return value !== scope;
    });
  };
  /**
   * Parse the scopes into a formatted scopeList
   * @param scopes
   */


  ScopeSet.parseScope = function (scopes) {
    var scopeList = "";

    if (scopes) {
      for (var i = 0; i < scopes.length; ++i) {
        scopeList += i !== scopes.length - 1 ? scopes[i] + " " : scopes[i];
      }
    }

    return scopeList;
  };
  /**
   * @hidden
   *
   * Used to validate the scopes input parameter requested  by the developer.
   * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
   * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
   * @ignore
   */


  ScopeSet.validateInputScope = function (scopes, scopesRequired, clientId) {
    if (!scopes) {
      if (scopesRequired) {
        throw _ClientConfigurationError.ClientConfigurationError.createScopesRequiredError(scopes);
      } else {
        return;
      }
    } // Check that scopes is an array object (also throws error if scopes == null)


    if (!Array.isArray(scopes)) {
      throw _ClientConfigurationError.ClientConfigurationError.createScopesNonArrayError(scopes);
    } // Check that scopes is not an empty array


    if (scopes.length < 1) {
      throw _ClientConfigurationError.ClientConfigurationError.createEmptyScopesArrayError(scopes.toString());
    } // Check that clientId is passed as single scope


    if (scopes.indexOf(clientId) > -1) {
      if (scopes.length > 1) {
        throw _ClientConfigurationError.ClientConfigurationError.createClientIdSingleScopeError(scopes.toString());
      }
    }
  };
  /**
   * @hidden
   *
   * Extracts scope value from the state sent with the authentication request.
   * @param {string} state
   * @returns {string} scope.
   * @ignore
   */


  ScopeSet.getScopeFromState = function (state) {
    if (state) {
      var splitIndex = state.indexOf("|");

      if (splitIndex > -1 && splitIndex + 1 < state.length) {
        return state.substring(splitIndex + 1);
      }
    }

    return "";
  };
  /**
   * @ignore
   * Appends extraScopesToConsent if passed
   * @param {@link AuthenticationParameters}
   */


  ScopeSet.appendScopes = function (reqScopes, reqExtraScopesToConsent) {
    if (reqScopes) {
      return reqExtraScopesToConsent ? reqScopes.concat(reqExtraScopesToConsent) : reqScopes;
    }

    return null;
  };

  return ScopeSet;
}();

exports.ScopeSet = ScopeSet;
},{"./error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js"}],"node_modules/msal/lib-es6/utils/UrlUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlUtils = void 0;

var _Constants = require("./Constants");

var _ScopeSet = require("../ScopeSet");

var _StringUtils = require("./StringUtils");

var _CryptoUtils = require("./CryptoUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var UrlUtils =
/** @class */
function () {
  function UrlUtils() {}
  /**
   * generates the URL with QueryString Parameters
   * @param scopes
   */


  UrlUtils.createNavigateUrl = function (serverRequestParams) {
    var str = this.createNavigationUrlString(serverRequestParams);
    var authEndpoint = serverRequestParams.authorityInstance.AuthorizationEndpoint; // if the endpoint already has queryparams, lets add to it, otherwise add the first one

    if (authEndpoint.indexOf("?") < 0) {
      authEndpoint += "?";
    } else {
      authEndpoint += "&";
    }

    var requestUrl = "" + authEndpoint + str.join("&");
    return requestUrl;
  };
  /**
   * Generate the array of all QueryStringParams to be sent to the server
   * @param scopes
   */


  UrlUtils.createNavigationUrlString = function (serverRequestParams) {
    var scopes = serverRequestParams.scopes;

    if (scopes.indexOf(serverRequestParams.clientId) === -1) {
      scopes.push(serverRequestParams.clientId);
    }

    var str = [];
    str.push("response_type=" + serverRequestParams.responseType);
    this.translateclientIdUsedInScope(scopes, serverRequestParams.clientId);
    str.push("scope=" + encodeURIComponent(_ScopeSet.ScopeSet.parseScope(scopes)));
    str.push("client_id=" + encodeURIComponent(serverRequestParams.clientId));
    str.push("redirect_uri=" + encodeURIComponent(serverRequestParams.redirectUri));
    str.push("state=" + encodeURIComponent(serverRequestParams.state));
    str.push("nonce=" + encodeURIComponent(serverRequestParams.nonce));
    str.push("client_info=1");
    str.push("x-client-SKU=" + serverRequestParams.xClientSku);
    str.push("x-client-Ver=" + serverRequestParams.xClientVer);

    if (serverRequestParams.promptValue) {
      str.push("prompt=" + encodeURIComponent(serverRequestParams.promptValue));
    }

    if (serverRequestParams.claimsValue) {
      str.push("claims=" + encodeURIComponent(serverRequestParams.claimsValue));
    }

    if (serverRequestParams.queryParameters) {
      str.push(serverRequestParams.queryParameters);
    }

    if (serverRequestParams.extraQueryParameters) {
      str.push(serverRequestParams.extraQueryParameters);
    }

    str.push("client-request-id=" + encodeURIComponent(serverRequestParams.correlationId));
    return str;
  };
  /**
   * append the required scopes: https://openid.net/specs/openid-connect-basic-1_0.html#Scopes
   * @param scopes
   */


  UrlUtils.translateclientIdUsedInScope = function (scopes, clientId) {
    var clientIdIndex = scopes.indexOf(clientId);

    if (clientIdIndex >= 0) {
      scopes.splice(clientIdIndex, 1);

      if (scopes.indexOf("openid") === -1) {
        scopes.push("openid");
      }

      if (scopes.indexOf("profile") === -1) {
        scopes.push("profile");
      }
    }
  };
  /**
   * Returns current window URL as redirect uri
   */


  UrlUtils.getDefaultRedirectUri = function () {
    return window.location.href.split("?")[0].split("#")[0];
  };
  /**
   * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
   * @param href The url
   * @param tenantId The tenant id to replace
   */


  UrlUtils.replaceTenantPath = function (url, tenantId) {
    url = url.toLowerCase();
    var urlObject = this.GetUrlComponents(url);
    var pathArray = urlObject.PathSegments;

    if (tenantId && pathArray.length !== 0 && (pathArray[0] === _Constants.Constants.common || pathArray[0] === _Constants.SSOTypes.ORGANIZATIONS)) {
      pathArray[0] = tenantId;
    }

    return this.constructAuthorityUriFromObject(urlObject, pathArray);
  };

  UrlUtils.constructAuthorityUriFromObject = function (urlObject, pathArray) {
    return this.CanonicalizeUri(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/"));
  };
  /**
   * Parses out the components from a url string.
   * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
   */


  UrlUtils.GetUrlComponents = function (url) {
    if (!url) {
      throw "Url required";
    } // https://gist.github.com/curtisz/11139b2cfcaef4a261e0


    var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
    var match = url.match(regEx);

    if (!match || match.length < 6) {
      throw "Valid url required";
    }

    var urlComponents = {
      Protocol: match[1],
      HostNameAndPort: match[4],
      AbsolutePath: match[5]
    };
    var pathSegments = urlComponents.AbsolutePath.split("/");
    pathSegments = pathSegments.filter(function (val) {
      return val && val.length > 0;
    }); // remove empty elements

    urlComponents.PathSegments = pathSegments;
    return urlComponents;
  };
  /**
   * Given a url or path, append a trailing slash if one doesnt exist
   *
   * @param url
   */


  UrlUtils.CanonicalizeUri = function (url) {
    if (url) {
      url = url.toLowerCase();
    }

    if (url && !UrlUtils.endsWith(url, "/")) {
      url += "/";
    }

    return url;
  };
  /**
   * Checks to see if the url ends with the suffix
   * Required because we are compiling for es5 instead of es6
   * @param url
   * @param str
   */
  // TODO: Rename this, not clear what it is supposed to do


  UrlUtils.endsWith = function (url, suffix) {
    if (!url || !suffix) {
      return false;
    }

    return url.indexOf(suffix, url.length - suffix.length) !== -1;
  };
  /**
   * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
   * @param url
   * @param name
   */


  UrlUtils.urlRemoveQueryStringParameter = function (url, name) {
    if (_StringUtils.StringUtils.isEmpty(url)) {
      return url;
    }

    var regex = new RegExp("(\\&" + name + "=)[^\&]+");
    url = url.replace(regex, ""); // name=value&

    regex = new RegExp("(" + name + "=)[^\&]+&");
    url = url.replace(regex, ""); // name=value

    regex = new RegExp("(" + name + "=)[^\&]+");
    url = url.replace(regex, "");
    return url;
  };
  /**
   * @hidden
   * @ignore
   *
   * Returns the anchor part(#) of the URL
   */


  UrlUtils.getHashFromUrl = function (urlStringOrFragment) {
    var hashIndex1 = urlStringOrFragment.indexOf("#");
    var hashIndex2 = urlStringOrFragment.indexOf("#/");

    if (hashIndex2 > -1) {
      return urlStringOrFragment.substring(hashIndex2 + 2);
    } else if (hashIndex1 > -1) {
      return urlStringOrFragment.substring(hashIndex1 + 1);
    }

    return urlStringOrFragment;
  };
  /**
   * @hidden
   * Check if the url contains a hash with known properties
   * @ignore
   */


  UrlUtils.urlContainsHash = function (urlString) {
    var parameters = UrlUtils.deserializeHash(urlString);
    return parameters.hasOwnProperty(_Constants.ServerHashParamKeys.ERROR_DESCRIPTION) || parameters.hasOwnProperty(_Constants.ServerHashParamKeys.ERROR) || parameters.hasOwnProperty(_Constants.ServerHashParamKeys.ACCESS_TOKEN) || parameters.hasOwnProperty(_Constants.ServerHashParamKeys.ID_TOKEN);
  };
  /**
   * @hidden
   * Returns deserialized portion of URL hash
   * @ignore
   */


  UrlUtils.deserializeHash = function (urlFragment) {
    var hash = UrlUtils.getHashFromUrl(urlFragment);
    return _CryptoUtils.CryptoUtils.deserialize(hash);
  };
  /**
   * @ignore
   * @param {string} URI
   * @returns {string} host from the URI
   *
   * extract URI from the host
   */


  UrlUtils.getHostFromUri = function (uri) {
    // remove http:// or https:// from uri
    var extractedUri = String(uri).replace(/^(https?:)\/\//, "");
    extractedUri = extractedUri.split("/")[0];
    return extractedUri;
  };

  return UrlUtils;
}();

exports.UrlUtils = UrlUtils;
},{"./Constants":"node_modules/msal/lib-es6/utils/Constants.js","../ScopeSet":"node_modules/msal/lib-es6/ScopeSet.js","./StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js","./CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js"}],"node_modules/msal/lib-es6/cache/AccessTokenKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessTokenKey = void 0;

var _CryptoUtils = require("../utils/CryptoUtils");

var _UrlUtils = require("../utils/UrlUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AccessTokenKey =
/** @class */
function () {
  function AccessTokenKey(authority, clientId, scopes, uid, utid) {
    this.authority = _UrlUtils.UrlUtils.CanonicalizeUri(authority);
    this.clientId = clientId;
    this.scopes = scopes;
    this.homeAccountIdentifier = _CryptoUtils.CryptoUtils.base64Encode(uid) + "." + _CryptoUtils.CryptoUtils.base64Encode(utid);
  }

  return AccessTokenKey;
}();

exports.AccessTokenKey = AccessTokenKey;
},{"../utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","../utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js"}],"node_modules/msal/lib-es6/cache/AccessTokenValue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessTokenValue = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AccessTokenValue =
/** @class */
function () {
  function AccessTokenValue(accessToken, idToken, expiresIn, homeAccountIdentifier) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.expiresIn = expiresIn;
    this.homeAccountIdentifier = homeAccountIdentifier;
  }

  return AccessTokenValue;
}();

exports.AccessTokenValue = AccessTokenValue;
},{}],"node_modules/msal/lib-es6/ServerRequestParameters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerRequestParameters = void 0;

var _CryptoUtils = require("./utils/CryptoUtils");

var _Constants = require("./utils/Constants");

var _StringUtils = require("./utils/StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Nonce: OIDC Nonce definition: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * State: OAuth Spec: https://tools.ietf.org/html/rfc6749#section-10.12
 * @hidden
 */
var ServerRequestParameters =
/** @class */
function () {
  /**
   * Constructor
   * @param authority
   * @param clientId
   * @param scope
   * @param responseType
   * @param redirectUri
   * @param state
   */
  function ServerRequestParameters(authority, clientId, responseType, redirectUri, scopes, state, correlationId) {
    this.authorityInstance = authority;
    this.clientId = clientId;
    this.nonce = _CryptoUtils.CryptoUtils.createNewGuid(); // set scope to clientId if null

    this.scopes = scopes ? scopes.slice() : [clientId]; // set state (already set at top level)

    this.state = state; // set correlationId

    this.correlationId = correlationId; // telemetry information

    this.xClientSku = "MSAL.JS";
    this.xClientVer = (0, _Constants.libraryVersion)();
    this.responseType = responseType;
    this.redirectUri = redirectUri;
  }

  Object.defineProperty(ServerRequestParameters.prototype, "authority", {
    get: function () {
      return this.authorityInstance ? this.authorityInstance.CanonicalAuthority : null;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * @hidden
   * @ignore
   *
   * Utility to populate QueryParameters and ExtraQueryParameters to ServerRequestParamerers
   * @param request
   * @param serverAuthenticationRequest
   */

  ServerRequestParameters.prototype.populateQueryParams = function (account, request, adalIdTokenObject) {
    var queryParameters = {};

    if (request) {
      // add the prompt parameter to serverRequestParameters if passed
      if (request.prompt) {
        this.promptValue = request.prompt;
      } // Add claims challenge to serverRequestParameters if passed


      if (request.claimsRequest) {
        this.claimsValue = request.claimsRequest;
      } // if the developer provides one of these, give preference to developer choice


      if (ServerRequestParameters.isSSOParam(request)) {
        queryParameters = this.constructUnifiedCacheQueryParameter(request, null);
      }
    }

    if (adalIdTokenObject) {
      queryParameters = this.constructUnifiedCacheQueryParameter(null, adalIdTokenObject);
    }
    /*
     * adds sid/login_hint if not populated; populates domain_req, login_req and domain_hint
     * this.logger.verbose("Calling addHint parameters");
     */


    queryParameters = this.addHintParameters(account, queryParameters); // sanity check for developer passed extraQueryParameters

    var eQParams = request.extraQueryParameters; // Populate the extraQueryParameters to be sent to the server

    this.queryParameters = ServerRequestParameters.generateQueryParametersString(queryParameters);
    this.extraQueryParameters = ServerRequestParameters.generateQueryParametersString(eQParams);
  }; // #region QueryParam helpers

  /**
   * Constructs extraQueryParameters to be sent to the server for the AuthenticationParameters set by the developer
   * in any login() or acquireToken() calls
   * @param idTokenObject
   * @param extraQueryParameters
   * @param sid
   * @param loginHint
   */
  // TODO: check how this behaves when domain_hint only is sent in extraparameters and idToken has no upn.


  ServerRequestParameters.prototype.constructUnifiedCacheQueryParameter = function (request, idTokenObject) {
    // preference order: account > sid > login_hint
    var ssoType;
    var ssoData;
    var serverReqParam = {}; // if account info is passed, account.sid > account.login_hint

    if (request) {
      if (request.account) {
        var account = request.account;

        if (account.sid) {
          ssoType = _Constants.SSOTypes.SID;
          ssoData = account.sid;
        } else if (account.userName) {
          ssoType = _Constants.SSOTypes.LOGIN_HINT;
          ssoData = account.userName;
        }
      } // sid from request
      else if (request.sid) {
          ssoType = _Constants.SSOTypes.SID;
          ssoData = request.sid;
        } // loginHint from request
        else if (request.loginHint) {
            ssoType = _Constants.SSOTypes.LOGIN_HINT;
            ssoData = request.loginHint;
          }
    } // adalIdToken retrieved from cache
    else if (idTokenObject) {
        if (idTokenObject.hasOwnProperty(_Constants.Constants.upn)) {
          ssoType = _Constants.SSOTypes.ID_TOKEN;
          ssoData = idTokenObject.upn;
        } else {
          ssoType = _Constants.SSOTypes.ORGANIZATIONS;
          ssoData = null;
        }
      }

    serverReqParam = this.addSSOParameter(ssoType, ssoData); // add the HomeAccountIdentifier info/ domain_hint

    if (request && request.account && request.account.homeAccountIdentifier) {
      serverReqParam = this.addSSOParameter(_Constants.SSOTypes.HOMEACCOUNT_ID, request.account.homeAccountIdentifier, serverReqParam);
    }

    return serverReqParam;
  };
  /**
   * @hidden
   *
   * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
   * domain_hint can be one of users/organizations which when added skips the email based discovery process of the user
   * domain_req utid received as part of the clientInfo
   * login_req uid received as part of clientInfo
   * Also does a sanity check for extraQueryParameters passed by the user to ensure no repeat queryParameters
   *
   * @param {@link Account} account - Account for which the token is requested
   * @param queryparams
   * @param {@link ServerRequestParameters}
   * @ignore
   */


  ServerRequestParameters.prototype.addHintParameters = function (account, qParams) {
    /*
     * This is a final check for all queryParams added so far; preference order: sid > login_hint
     * sid cannot be passed along with login_hint or domain_hint, hence we check both are not populated yet in queryParameters
     */
    if (account && !qParams[_Constants.SSOTypes.SID]) {
      // sid - populate only if login_hint is not already populated and the account has sid
      var populateSID = !qParams[_Constants.SSOTypes.LOGIN_HINT] && account.sid && this.promptValue === _Constants.PromptState.NONE;

      if (populateSID) {
        qParams = this.addSSOParameter(_Constants.SSOTypes.SID, account.sid, qParams);
      } // login_hint - account.userName
      else {
          var populateLoginHint = !qParams[_Constants.SSOTypes.LOGIN_HINT] && account.userName && !_StringUtils.StringUtils.isEmpty(account.userName);

          if (populateLoginHint) {
            qParams = this.addSSOParameter(_Constants.SSOTypes.LOGIN_HINT, account.userName, qParams);
          }
        }

      var populateReqParams = !qParams[_Constants.SSOTypes.DOMAIN_REQ] && !qParams[_Constants.SSOTypes.LOGIN_REQ];

      if (populateReqParams) {
        qParams = this.addSSOParameter(_Constants.SSOTypes.HOMEACCOUNT_ID, account.homeAccountIdentifier, qParams);
      }
    }

    return qParams;
  };
  /**
   * Add SID to extraQueryParameters
   * @param sid
   */


  ServerRequestParameters.prototype.addSSOParameter = function (ssoType, ssoData, ssoParam) {
    if (!ssoParam) {
      ssoParam = {};
    }

    if (!ssoData) {
      return ssoParam;
    }

    switch (ssoType) {
      case _Constants.SSOTypes.SID:
        {
          ssoParam[_Constants.SSOTypes.SID] = ssoData;
          break;
        }

      case _Constants.SSOTypes.ID_TOKEN:
        {
          ssoParam[_Constants.SSOTypes.LOGIN_HINT] = ssoData;
          ssoParam[_Constants.SSOTypes.DOMAIN_HINT] = _Constants.SSOTypes.ORGANIZATIONS;
          break;
        }

      case _Constants.SSOTypes.LOGIN_HINT:
        {
          ssoParam[_Constants.SSOTypes.LOGIN_HINT] = ssoData;
          break;
        }

      case _Constants.SSOTypes.ORGANIZATIONS:
        {
          ssoParam[_Constants.SSOTypes.DOMAIN_HINT] = _Constants.SSOTypes.ORGANIZATIONS;
          break;
        }

      case _Constants.SSOTypes.CONSUMERS:
        {
          ssoParam[_Constants.SSOTypes.DOMAIN_HINT] = _Constants.SSOTypes.CONSUMERS;
          break;
        }

      case _Constants.SSOTypes.HOMEACCOUNT_ID:
        {
          var homeAccountId = ssoData.split(".");

          var uid = _CryptoUtils.CryptoUtils.base64Decode(homeAccountId[0]);

          var utid = _CryptoUtils.CryptoUtils.base64Decode(homeAccountId[1]); // TODO: domain_req and login_req are not needed according to eSTS team


          ssoParam[_Constants.SSOTypes.LOGIN_REQ] = uid;
          ssoParam[_Constants.SSOTypes.DOMAIN_REQ] = utid;

          if (utid === _Constants.Constants.consumersUtid) {
            ssoParam[_Constants.SSOTypes.DOMAIN_HINT] = _Constants.SSOTypes.CONSUMERS;
          } else {
            ssoParam[_Constants.SSOTypes.DOMAIN_HINT] = _Constants.SSOTypes.ORGANIZATIONS;
          }

          break;
        }

      case _Constants.SSOTypes.LOGIN_REQ:
        {
          ssoParam[_Constants.SSOTypes.LOGIN_REQ] = ssoData;
          break;
        }

      case _Constants.SSOTypes.DOMAIN_REQ:
        {
          ssoParam[_Constants.SSOTypes.DOMAIN_REQ] = ssoData;
          break;
        }
    }

    return ssoParam;
  };
  /**
   * Utility to generate a QueryParameterString from a Key-Value mapping of extraQueryParameters passed
   * @param extraQueryParameters
   */


  ServerRequestParameters.generateQueryParametersString = function (queryParameters) {
    var paramsString = null;

    if (queryParameters) {
      Object.keys(queryParameters).forEach(function (key) {
        if (paramsString == null) {
          paramsString = key + "=" + encodeURIComponent(queryParameters[key]);
        } else {
          paramsString += "&" + key + "=" + encodeURIComponent(queryParameters[key]);
        }
      });
    }

    return paramsString;
  }; // #endregion

  /**
   * Check to see if there are SSO params set in the Request
   * @param request
   */


  ServerRequestParameters.isSSOParam = function (request) {
    return request && (request.account || request.sid || request.loginHint);
  };

  return ServerRequestParameters;
}();

exports.ServerRequestParameters = ServerRequestParameters;
},{"./utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","./utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js","./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/ClientInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientInfo = void 0;

var _CryptoUtils = require("./utils/CryptoUtils");

var _ClientAuthError = require("./error/ClientAuthError");

var _StringUtils = require("./utils/StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var ClientInfo =
/** @class */
function () {
  function ClientInfo(rawClientInfo) {
    if (!rawClientInfo || _StringUtils.StringUtils.isEmpty(rawClientInfo)) {
      this.uid = "";
      this.utid = "";
      return;
    }

    try {
      var decodedClientInfo = _CryptoUtils.CryptoUtils.base64Decode(rawClientInfo);

      var clientInfo = JSON.parse(decodedClientInfo);

      if (clientInfo) {
        if (clientInfo.hasOwnProperty("uid")) {
          this.uid = clientInfo.uid;
        }

        if (clientInfo.hasOwnProperty("utid")) {
          this.utid = clientInfo.utid;
        }
      }
    } catch (e) {
      throw _ClientAuthError.ClientAuthError.createClientInfoDecodingError(e);
    }
  }

  Object.defineProperty(ClientInfo.prototype, "uid", {
    get: function () {
      return this._uid ? this._uid : "";
    },
    set: function (uid) {
      this._uid = uid;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ClientInfo.prototype, "utid", {
    get: function () {
      return this._utid ? this._utid : "";
    },
    set: function (utid) {
      this._utid = utid;
    },
    enumerable: true,
    configurable: true
  });
  return ClientInfo;
}();

exports.ClientInfo = ClientInfo;
},{"./utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","./error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js","./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/utils/TokenUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenUtils = void 0;

var _CryptoUtils = require("./CryptoUtils");

var _StringUtils = require("./StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var TokenUtils =
/** @class */
function () {
  function TokenUtils() {}
  /**
   * decode a JWT
   *
   * @param jwtToken
   */


  TokenUtils.decodeJwt = function (jwtToken) {
    if (_StringUtils.StringUtils.isEmpty(jwtToken)) {
      return null;
    }

    var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
    var matches = idTokenPartsRegex.exec(jwtToken);

    if (!matches || matches.length < 4) {
      // this._requestContext.logger.warn("The returned id_token is not parseable.");
      return null;
    }

    var crackedToken = {
      header: matches[1],
      JWSPayload: matches[2],
      JWSSig: matches[3]
    };
    return crackedToken;
  };
  /**
   * Extract IdToken by decoding the RAWIdToken
   *
   * @param encodedIdToken
   */


  TokenUtils.extractIdToken = function (encodedIdToken) {
    // id token will be decoded to get the username
    var decodedToken = this.decodeJwt(encodedIdToken);

    if (!decodedToken) {
      return null;
    }

    try {
      var base64IdToken = decodedToken.JWSPayload;

      var base64Decoded = _CryptoUtils.CryptoUtils.base64Decode(base64IdToken);

      if (!base64Decoded) {
        // this._requestContext.logger.info("The returned id_token could not be base64 url safe decoded.");
        return null;
      } // ECMA script has JSON built-in support


      return JSON.parse(base64Decoded);
    } catch (err) {// this._requestContext.logger.error("The returned id_token could not be decoded" + err);
    }

    return null;
  };

  return TokenUtils;
}();

exports.TokenUtils = TokenUtils;
},{"./CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","./StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/IdToken.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdToken = void 0;

var _ClientAuthError = require("./error/ClientAuthError");

var _TokenUtils = require("./utils/TokenUtils");

var _StringUtils = require("./utils/StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var IdToken =
/** @class */
function () {
  /* tslint:disable:no-string-literal */
  function IdToken(rawIdToken) {
    if (_StringUtils.StringUtils.isEmpty(rawIdToken)) {
      throw _ClientAuthError.ClientAuthError.createIdTokenNullOrEmptyError(rawIdToken);
    }

    try {
      this.rawIdToken = rawIdToken;
      this.claims = _TokenUtils.TokenUtils.extractIdToken(rawIdToken);

      if (this.claims) {
        if (this.claims.hasOwnProperty("iss")) {
          this.issuer = this.claims["iss"];
        }

        if (this.claims.hasOwnProperty("oid")) {
          this.objectId = this.claims["oid"];
        }

        if (this.claims.hasOwnProperty("sub")) {
          this.subject = this.claims["sub"];
        }

        if (this.claims.hasOwnProperty("tid")) {
          this.tenantId = this.claims["tid"];
        }

        if (this.claims.hasOwnProperty("ver")) {
          this.version = this.claims["ver"];
        }

        if (this.claims.hasOwnProperty("preferred_username")) {
          this.preferredName = this.claims["preferred_username"];
        }

        if (this.claims.hasOwnProperty("name")) {
          this.name = this.claims["name"];
        }

        if (this.claims.hasOwnProperty("nonce")) {
          this.nonce = this.claims["nonce"];
        }

        if (this.claims.hasOwnProperty("exp")) {
          this.expiration = this.claims["exp"];
        }

        if (this.claims.hasOwnProperty("home_oid")) {
          this.homeObjectId = this.claims["home_oid"];
        }

        if (this.claims.hasOwnProperty("sid")) {
          this.sid = this.claims["sid"];
        }

        if (this.claims.hasOwnProperty("cloud_instance_host_name")) {
          this.cloudInstance = this.claims["cloud_instance_host_name"];
        }
        /* tslint:enable:no-string-literal */

      }
    } catch (e) {
      /*
       * TODO: This error here won't really every be thrown, since extractIdToken() returns null if the decodeJwt() fails.
       * Need to add better error handling here to account for being unable to decode jwts.
       */
      throw _ClientAuthError.ClientAuthError.createIdTokenParsingError(e);
    }
  }

  return IdToken;
}();

exports.IdToken = IdToken;
},{"./error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js","./utils/TokenUtils":"node_modules/msal/lib-es6/utils/TokenUtils.js","./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/cache/AccessTokenCacheItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessTokenCacheItem = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AccessTokenCacheItem =
/** @class */
function () {
  function AccessTokenCacheItem(key, value) {
    this.key = key;
    this.value = value;
  }

  return AccessTokenCacheItem;
}();

exports.AccessTokenCacheItem = AccessTokenCacheItem;
},{}],"node_modules/msal/lib-es6/cache/BrowserStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserStorage = void 0;

var _ClientConfigurationError = require("../error/ClientConfigurationError");

var _AuthError = require("../error/AuthError");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var BrowserStorage =
/** @class */
function () {
  function BrowserStorage(cacheLocation) {
    if (!window) {
      throw _AuthError.AuthError.createNoWindowObjectError("Browser storage class could not find window object");
    }

    var storageSupported = typeof window[cacheLocation] !== "undefined" && window[cacheLocation] != null;

    if (!storageSupported) {
      throw _ClientConfigurationError.ClientConfigurationError.createStorageNotSupportedError(cacheLocation);
    }

    this.cacheLocation = cacheLocation;
  }
  /**
   * add value to storage
   * @param key
   * @param value
   * @param enableCookieStorage
   */


  BrowserStorage.prototype.setItem = function (key, value, enableCookieStorage) {
    window[this.cacheLocation].setItem(key, value);

    if (enableCookieStorage) {
      this.setItemCookie(key, value);
    }
  };
  /**
   * get one item by key from storage
   * @param key
   * @param enableCookieStorage
   */


  BrowserStorage.prototype.getItem = function (key, enableCookieStorage) {
    if (enableCookieStorage && this.getItemCookie(key)) {
      return this.getItemCookie(key);
    }

    return window[this.cacheLocation].getItem(key);
  };
  /**
   * remove value from storage
   * @param key
   */


  BrowserStorage.prototype.removeItem = function (key) {
    return window[this.cacheLocation].removeItem(key);
  };
  /**
   * clear storage (remove all items from it)
   */


  BrowserStorage.prototype.clear = function () {
    return window[this.cacheLocation].clear();
  };
  /**
   * add value to cookies
   * @param cName
   * @param cValue
   * @param expires
   */


  BrowserStorage.prototype.setItemCookie = function (cName, cValue, expires) {
    var cookieStr = cName + "=" + cValue + ";path=/;";

    if (expires) {
      var expireTime = this.getCookieExpirationTime(expires);
      cookieStr += "expires=" + expireTime + ";";
    }

    document.cookie = cookieStr;
  };
  /**
   * get one item by key from cookies
   * @param cName
   */


  BrowserStorage.prototype.getItemCookie = function (cName) {
    var name = cName + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  };
  /**
   * Clear an item in the cookies by key
   * @param cName
   */


  BrowserStorage.prototype.clearItemCookie = function (cName) {
    this.setItemCookie(cName, "", -1);
  };
  /**
   * Get cookie expiration time
   * @param cookieLifeDays
   */


  BrowserStorage.prototype.getCookieExpirationTime = function (cookieLifeDays) {
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLifeDays * 24 * 60 * 60 * 1000);
    return expr.toUTCString();
  };

  return BrowserStorage;
}();

exports.BrowserStorage = BrowserStorage;
},{"../error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","../error/AuthError":"node_modules/msal/lib-es6/error/AuthError.js"}],"node_modules/msal/lib-es6/cache/AuthCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCache = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _Constants = require("../utils/Constants");

var _AccessTokenCacheItem = require("./AccessTokenCacheItem");

var _BrowserStorage = require("./BrowserStorage");

var _ClientAuthError = require("../error/ClientAuthError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AuthCache =
/** @class */
function (_super) {
  tslib_1.__extends(AuthCache, _super);

  function AuthCache(clientId, cacheLocation, storeAuthStateInCookie) {
    var _this = _super.call(this, cacheLocation) || this;

    _this.clientId = clientId; // This is hardcoded to true for now. We may make this configurable in the future

    _this.rollbackEnabled = true;

    _this.migrateCacheEntries(storeAuthStateInCookie);

    return _this;
  }
  /**
   * Support roll back to old cache schema until the next major release: true by default now
   * @param storeAuthStateInCookie
   */


  AuthCache.prototype.migrateCacheEntries = function (storeAuthStateInCookie) {
    var _this = this;

    var idTokenKey = _Constants.Constants.cachePrefix + "." + _Constants.PersistentCacheKeys.IDTOKEN;
    var clientInfoKey = _Constants.Constants.cachePrefix + "." + _Constants.PersistentCacheKeys.CLIENT_INFO;
    var errorKey = _Constants.Constants.cachePrefix + "." + _Constants.ErrorCacheKeys.ERROR;
    var errorDescKey = _Constants.Constants.cachePrefix + "." + _Constants.ErrorCacheKeys.ERROR_DESC;

    var idTokenValue = _super.prototype.getItem.call(this, idTokenKey);

    var clientInfoValue = _super.prototype.getItem.call(this, clientInfoKey);

    var errorValue = _super.prototype.getItem.call(this, errorKey);

    var errorDescValue = _super.prototype.getItem.call(this, errorDescKey);

    var values = [idTokenValue, clientInfoValue, errorValue, errorDescValue];
    var keysToMigrate = [_Constants.PersistentCacheKeys.IDTOKEN, _Constants.PersistentCacheKeys.CLIENT_INFO, _Constants.ErrorCacheKeys.ERROR, _Constants.ErrorCacheKeys.ERROR_DESC];
    keysToMigrate.forEach(function (cacheKey, index) {
      return _this.duplicateCacheEntry(cacheKey, values[index], storeAuthStateInCookie);
    });
  };
  /**
   * Utility function to help with roll back keys
   * @param newKey
   * @param value
   * @param storeAuthStateInCookie
   */


  AuthCache.prototype.duplicateCacheEntry = function (newKey, value, storeAuthStateInCookie) {
    if (value) {
      this.setItem(newKey, value, storeAuthStateInCookie);
    }
  };
  /**
   * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
   * @param key
   * @param addInstanceId
   */


  AuthCache.prototype.generateCacheKey = function (key, addInstanceId) {
    try {
      // Defined schemas do not need the key appended
      JSON.parse(key);
      return key;
    } catch (e) {
      if (key.indexOf("" + _Constants.Constants.cachePrefix) === 0 || key.indexOf(_Constants.Constants.adalIdToken) === 0) {
        return key;
      }

      return addInstanceId ? _Constants.Constants.cachePrefix + "." + this.clientId + "." + key : _Constants.Constants.cachePrefix + "." + key;
    }
  };
  /**
   * add value to storage
   * @param key
   * @param value
   * @param enableCookieStorage
   */


  AuthCache.prototype.setItem = function (key, value, enableCookieStorage, state) {
    _super.prototype.setItem.call(this, this.generateCacheKey(key, true), value, enableCookieStorage);

    if (this.rollbackEnabled) {
      _super.prototype.setItem.call(this, this.generateCacheKey(key, false), value, enableCookieStorage);
    }
  };
  /**
   * get one item by key from storage
   * @param key
   * @param enableCookieStorage
   */


  AuthCache.prototype.getItem = function (key, enableCookieStorage) {
    return _super.prototype.getItem.call(this, this.generateCacheKey(key, true), enableCookieStorage);
  };
  /**
   * remove value from storage
   * @param key
   */


  AuthCache.prototype.removeItem = function (key) {
    _super.prototype.removeItem.call(this, this.generateCacheKey(key, true));

    if (this.rollbackEnabled) {
      _super.prototype.removeItem.call(this, this.generateCacheKey(key, false));
    }
  };
  /**
   * Reset the cache items
   */


  AuthCache.prototype.resetCacheItems = function () {
    var storage = window[this.cacheLocation];
    var key;

    for (key in storage) {
      // Check if key contains msal prefix; For now, we are clearing all cache items created by MSAL.js
      if (storage.hasOwnProperty(key) && key.indexOf(_Constants.Constants.cachePrefix) !== -1) {
        _super.prototype.removeItem.call(this, key); // TODO: Clear cache based on client id (clarify use cases where this is needed)

      }
    }
  };
  /**
   * Reset all temporary cache items
   */


  AuthCache.prototype.resetTempCacheItems = function (state) {
    var storage = window[this.cacheLocation];
    var key; // check state and remove associated cache

    for (key in storage) {
      if (!state || key.indexOf(state) !== -1) {
        var splitKey = key.split(_Constants.Constants.resourceDelimiter);
        var keyState = splitKey.length > 1 ? splitKey[splitKey.length - 1] : null;

        if (keyState === state && !this.tokenRenewalInProgress(keyState)) {
          this.removeItem(key);
          this.setItemCookie(key, "", -1);
          this.clearMsalCookie(state);
        }
      }
    } // delete the interaction status cache


    this.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);
    this.removeItem(_Constants.TemporaryCacheKeys.REDIRECT_REQUEST);
  };
  /**
   * Set cookies for IE
   * @param cName
   * @param cValue
   * @param expires
   */


  AuthCache.prototype.setItemCookie = function (cName, cValue, expires) {
    _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, true), cValue, expires);

    if (this.rollbackEnabled) {
      _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, false), cValue, expires);
    }
  };
  /**
   * get one item by key from cookies
   * @param cName
   */


  AuthCache.prototype.getItemCookie = function (cName) {
    return _super.prototype.getItemCookie.call(this, this.generateCacheKey(cName, true));
  };
  /**
   * Get all access tokens in the cache
   * @param clientId
   * @param homeAccountIdentifier
   */


  AuthCache.prototype.getAllAccessTokens = function (clientId, homeAccountIdentifier) {
    var _this = this;

    var results = Object.keys(window[this.cacheLocation]).reduce(function (tokens, key) {
      var keyMatches = key.match(clientId) && key.match(homeAccountIdentifier) && key.match(_Constants.Constants.scopes);

      if (keyMatches) {
        var value = _this.getItem(key);

        if (value) {
          try {
            var parseAtKey = JSON.parse(key);
            var newAccessTokenCacheItem = new _AccessTokenCacheItem.AccessTokenCacheItem(parseAtKey, JSON.parse(value));
            return tokens.concat([newAccessTokenCacheItem]);
          } catch (e) {
            throw _ClientAuthError.ClientAuthError.createCacheParseError(key);
          }
        }
      }

      return tokens;
    }, []);
    return results;
  };
  /**
   * Return if the token renewal is still in progress
   * @param stateValue
   */


  AuthCache.prototype.tokenRenewalInProgress = function (stateValue) {
    var renewStatus = this.getItem(_Constants.TemporaryCacheKeys.RENEW_STATUS + "|" + stateValue);
    return !!(renewStatus && renewStatus === _Constants.Constants.inProgress);
  };
  /**
   * Clear all cookies
   */


  AuthCache.prototype.clearMsalCookie = function (state) {
    this.clearItemCookie(_Constants.TemporaryCacheKeys.NONCE_IDTOKEN + "|" + state);
    this.clearItemCookie(_Constants.TemporaryCacheKeys.STATE_LOGIN + "|" + state);
    this.clearItemCookie(_Constants.TemporaryCacheKeys.LOGIN_REQUEST + "|" + state);
    this.clearItemCookie(_Constants.TemporaryCacheKeys.STATE_ACQ_TOKEN + "|" + state);
  };
  /**
   * Create acquireTokenAccountKey to cache account object
   * @param accountId
   * @param state
   */


  AuthCache.generateAcquireTokenAccountKey = function (accountId, state) {
    return "" + _Constants.TemporaryCacheKeys.ACQUIRE_TOKEN_ACCOUNT + _Constants.Constants.resourceDelimiter + accountId + _Constants.Constants.resourceDelimiter + state;
  };
  /**
   * Create authorityKey to cache authority
   * @param state
   */


  AuthCache.generateAuthorityKey = function (state) {
    return "" + _Constants.TemporaryCacheKeys.AUTHORITY + _Constants.Constants.resourceDelimiter + state;
  };

  return AuthCache;
}(_BrowserStorage.BrowserStorage);

exports.AuthCache = AuthCache;
},{"tslib":"node_modules/tslib/tslib.es6.js","../utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js","./AccessTokenCacheItem":"node_modules/msal/lib-es6/cache/AccessTokenCacheItem.js","./BrowserStorage":"node_modules/msal/lib-es6/cache/BrowserStorage.js","../error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js"}],"node_modules/msal/lib-es6/Account.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;

var _CryptoUtils = require("./utils/CryptoUtils");

var _StringUtils = require("./utils/StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * accountIdentifier       combination of idToken.uid and idToken.utid
 * homeAccountIdentifier   combination of clientInfo.uid and clientInfo.utid
 * userName                idToken.preferred_username
 * name                    idToken.name
 * idToken                 idToken
 * sid                     idToken.sid - session identifier
 * environment             idtoken.issuer (the authority that issues the token)
 */
var Account =
/** @class */
function () {
  /**
   * Creates an Account Object
   * @praram accountIdentifier
   * @param homeAccountIdentifier
   * @param userName
   * @param name
   * @param idToken
   * @param sid
   * @param environment
   */
  function Account(accountIdentifier, homeAccountIdentifier, userName, name, idTokenClaims, sid, environment) {
    this.accountIdentifier = accountIdentifier;
    this.homeAccountIdentifier = homeAccountIdentifier;
    this.userName = userName;
    this.name = name; // will be deprecated soon

    this.idToken = idTokenClaims;
    this.idTokenClaims = idTokenClaims;
    this.sid = sid;
    this.environment = environment;
  }
  /**
   * @hidden
   * @param idToken
   * @param clientInfo
   */


  Account.createAccount = function (idToken, clientInfo) {
    // create accountIdentifier
    var accountIdentifier = idToken.objectId || idToken.subject; // create homeAccountIdentifier

    var uid = clientInfo ? clientInfo.uid : "";
    var utid = clientInfo ? clientInfo.utid : "";
    var homeAccountIdentifier;

    if (!_StringUtils.StringUtils.isEmpty(uid) && !_StringUtils.StringUtils.isEmpty(utid)) {
      homeAccountIdentifier = _CryptoUtils.CryptoUtils.base64Encode(uid) + "." + _CryptoUtils.CryptoUtils.base64Encode(utid);
    }

    return new Account(accountIdentifier, homeAccountIdentifier, idToken.preferredName, idToken.name, idToken.claims, idToken.sid, idToken.issuer);
  };
  /**
   * Utils function to compare two Account objects - used to check if the same user account is logged in
   *
   * @param a1: Account object
   * @param a2: Account object
   */


  Account.compareAccounts = function (a1, a2) {
    if (!a1 || !a2) {
      return false;
    }

    if (a1.homeAccountIdentifier && a2.homeAccountIdentifier) {
      if (a1.homeAccountIdentifier === a2.homeAccountIdentifier) {
        return true;
      }
    }

    return false;
  };

  return Account;
}();

exports.Account = Account;
},{"./utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/utils/WindowUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowUtils = void 0;

var _ClientAuthError = require("../error/ClientAuthError");

var _UrlUtils = require("./UrlUtils");

var _Constants = require("../utils/Constants");

var WindowUtils =
/** @class */
function () {
  function WindowUtils() {}
  /**
   * @hidden
   * Checks if the current page is running in an iframe.
   * @ignore
   */


  WindowUtils.isInIframe = function () {
    return window.parent !== window;
  };
  /**
   * @hidden
   * Check if the current page is running in a popup.
   * @ignore
   */


  WindowUtils.isInPopup = function () {
    return !!(window.opener && window.opener !== window);
  };
  /**
   * @hidden
   * Monitors a window until it loads a url with a hash
   * @ignore
   */


  WindowUtils.monitorWindowForHash = function (contentWindow, timeout, urlNavigate) {
    return new Promise(function (resolve, reject) {
      var maxTicks = timeout / WindowUtils.POLLING_INTERVAL_MS;
      var ticks = 0;
      var intervalId = setInterval(function () {
        if (contentWindow.closed) {
          clearInterval(intervalId);
          reject(_ClientAuthError.ClientAuthError.createUserCancelledError());
          return;
        }

        var href;

        try {
          /*
           * Will throw if cross origin,
           * which should be caught and ignored
           * since we need the interval to keep running while on STS UI.
           */
          href = contentWindow.location.href;
        } catch (e) {} // Don't process blank pages or cross domain


        if (!href || href === "about:blank") {
          return;
        } // Only run clock when we are on same domain


        ticks++;

        if (_UrlUtils.UrlUtils.urlContainsHash(href)) {
          clearInterval(intervalId);
          resolve(contentWindow.location.hash);
        } else if (ticks > maxTicks) {
          clearInterval(intervalId);
          reject(_ClientAuthError.ClientAuthError.createTokenRenewalTimeoutError(urlNavigate)); // better error?
        }
      }, WindowUtils.POLLING_INTERVAL_MS);
    });
  };
  /**
   * @hidden
   * Loads iframe with authorization endpoint URL
   * @ignore
   */


  WindowUtils.loadFrame = function (urlNavigate, frameName, timeoutMs, logger) {
    /*
     * This trick overcomes iframe navigation in IE
     * IE does not load the page consistently in iframe
     */
    logger.info("LoadFrame: " + frameName);
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var frameHandle = WindowUtils.addHiddenIFrame(frameName, logger);

        if (!frameHandle) {
          reject("Unable to load iframe with name: " + frameName);
          return;
        }

        if (frameHandle.src === "" || frameHandle.src === "about:blank") {
          frameHandle.src = urlNavigate;
          logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
        }

        resolve(frameHandle);
      }, timeoutMs);
    });
  };
  /**
   * @hidden
   * Adds the hidden iframe for silent token renewal.
   * @ignore
   */


  WindowUtils.addHiddenIFrame = function (iframeId, logger) {
    if (typeof iframeId === "undefined") {
      return null;
    }

    logger.info("Add msal frame to document:" + iframeId);
    var adalFrame = document.getElementById(iframeId);

    if (!adalFrame) {
      if (document.createElement && document.documentElement && window.navigator.userAgent.indexOf("MSIE 5.0") === -1) {
        var ifr = document.createElement("iframe");
        ifr.setAttribute("id", iframeId);
        ifr.style.visibility = "hidden";
        ifr.style.position = "absolute";
        ifr.style.width = ifr.style.height = "0";
        ifr.style.border = "0";
        ifr.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
        adalFrame = document.getElementsByTagName("body")[0].appendChild(ifr);
      } else if (document.body && document.body.insertAdjacentHTML) {
        document.body.insertAdjacentHTML("beforeend", "<iframe name='" + iframeId + "' id='" + iframeId + "' style='display:none'></iframe>");
      }

      if (window.frames && window.frames[iframeId]) {
        adalFrame = window.frames[iframeId];
      }
    }

    return adalFrame;
  };
  /**
   * @hidden
   * Removes a hidden iframe from the page.
   * @ignore
   */


  WindowUtils.removeHiddenIframe = function (iframe) {
    if (document.body !== iframe.parentNode) {
      document.body.removeChild(iframe);
    }
  };
  /**
   * @hidden
   * Find and return the iframe element with the given hash
   * @ignore
   */


  WindowUtils.getIframeWithHash = function (hash) {
    var iframes = document.getElementsByTagName("iframe");
    var iframeArray = Array.apply(null, Array(iframes.length)).map(function (iframe, index) {
      return iframes.item(index);
    }); // eslint-disable-line prefer-spread

    return iframeArray.filter(function (iframe) {
      try {
        return iframe.contentWindow.location.hash === hash;
      } catch (e) {
        return false;
      }
    })[0];
  };
  /**
   * @hidden
   * Returns an array of all the popups opened by MSAL
   * @ignore
   */


  WindowUtils.getPopups = function () {
    if (!window.openedWindows) {
      window.openedWindows = [];
    }

    return window.openedWindows;
  };
  /**
   * @hidden
   * Find and return the popup with the given hash
   * @ignore
   */


  WindowUtils.getPopUpWithHash = function (hash) {
    return WindowUtils.getPopups().filter(function (popup) {
      try {
        return popup.location.hash === hash;
      } catch (e) {
        return false;
      }
    })[0];
  };
  /**
   * @hidden
   * Add the popup to the known list of popups
   * @ignore
   */


  WindowUtils.trackPopup = function (popup) {
    WindowUtils.getPopups().push(popup);
  };
  /**
   * @hidden
   * Close all popups
   * @ignore
   */


  WindowUtils.closePopups = function () {
    WindowUtils.getPopups().forEach(function (popup) {
      return popup.close();
    });
  };
  /**
   * @ignore
   *
   * blocks any login/acquireToken calls to reload from within a hidden iframe (generated for silent calls)
   */


  WindowUtils.blockReloadInHiddenIframes = function () {
    // return an error if called from the hidden iframe created by the msal js silent calls
    if (_UrlUtils.UrlUtils.urlContainsHash(window.location.hash) && WindowUtils.isInIframe()) {
      throw _ClientAuthError.ClientAuthError.createBlockTokenRequestsInHiddenIframeError();
    }
  };
  /**
   *
   * @param cacheStorage
   */


  WindowUtils.checkIfBackButtonIsPressed = function (cacheStorage) {
    var redirectCache = cacheStorage.getItem(_Constants.TemporaryCacheKeys.REDIRECT_REQUEST); // if redirect request is set and there is no hash

    if (redirectCache && !_UrlUtils.UrlUtils.urlContainsHash(window.location.hash)) {
      var splitCache = redirectCache.split(_Constants.Constants.resourceDelimiter);
      var state = splitCache.length > 1 ? splitCache[splitCache.length - 1] : null;
      cacheStorage.resetTempCacheItems(state);
    }
  };
  /**
   * @hidden
   * Interval in milliseconds that we poll a window
   * @ignore
   */


  WindowUtils.POLLING_INTERVAL_MS = 50;
  return WindowUtils;
}();

exports.WindowUtils = WindowUtils;
},{"../error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js","./UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js","../utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js"}],"node_modules/msal/lib-es6/utils/TimeUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeUtils = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var TimeUtils =
/** @class */
function () {
  function TimeUtils() {}
  /**
   * Returns time in seconds for expiration based on string value passed in.
   *
   * @param expiresIn
   */


  TimeUtils.parseExpiresIn = function (expiresIn) {
    // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
    if (!expiresIn) {
      expiresIn = "3599";
    }

    return parseInt(expiresIn, 10);
  };
  /**
   * return the current time in Unix time. Date.getTime() returns in milliseconds.
   */


  TimeUtils.now = function () {
    return Math.round(new Date().getTime() / 1000.0);
  };

  return TimeUtils;
}();

exports.TimeUtils = TimeUtils;
},{}],"node_modules/msal/lib-es6/utils/RequestUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestUtils = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _Constants = require("../utils/Constants");

var _ClientConfigurationError = require("../error/ClientConfigurationError");

var _ScopeSet = require("../ScopeSet");

var _StringUtils = require("../utils/StringUtils");

var _CryptoUtils = require("../utils/CryptoUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var RequestUtils =
/** @class */
function () {
  function RequestUtils() {}
  /**
   * @ignore
   *
   * @param request
   * @param isLoginCall
   * @param requestType
   * @param redirectCallbacksSet
   * @param cacheStorage
   * @param clientId
   *
   * validates all request parameters and generates a consumable request object
   */


  RequestUtils.validateRequest = function (request, isLoginCall, clientId, requestType, redirectCallbacksSet) {
    // Throw error if request is empty for acquire * calls
    if (!isLoginCall && !request) {
      throw _ClientConfigurationError.ClientConfigurationError.createEmptyRequestError();
    } // Throw error if callbacks are not set before redirect


    if (requestType == _Constants.Constants.interactionTypeRedirect && !redirectCallbacksSet) {
      throw _ClientConfigurationError.ClientConfigurationError.createRedirectCallbacksNotSetError();
    }

    var scopes;
    var extraQueryParameters;

    if (request) {
      // if extraScopesToConsent is passed in loginCall, append them to the login request; Validate and filter scopes (the validate function will throw if validation fails)
      scopes = isLoginCall ? _ScopeSet.ScopeSet.appendScopes(request.scopes, request.extraScopesToConsent) : request.scopes;

      _ScopeSet.ScopeSet.validateInputScope(scopes, !isLoginCall, clientId); // validate prompt parameter


      this.validatePromptParameter(request.prompt); // validate extraQueryParameters

      extraQueryParameters = this.validateEQParameters(request.extraQueryParameters, request.claimsRequest); // validate claimsRequest

      this.validateClaimsRequest(request.claimsRequest);
    } // validate and generate state and correlationId


    var state = this.validateAndGenerateState(request && request.state);
    var correlationId = this.validateAndGenerateCorrelationId(request && request.correlationId);

    var validatedRequest = tslib_1.__assign({}, request, {
      extraQueryParameters: extraQueryParameters,
      scopes: scopes,
      state: state,
      correlationId: correlationId
    });

    return validatedRequest;
  };
  /**
   * @ignore
   *
   * Utility to test if valid prompt value is passed in the request
   * @param request
   */


  RequestUtils.validatePromptParameter = function (prompt) {
    if (prompt) {
      if ([_Constants.PromptState.LOGIN, _Constants.PromptState.SELECT_ACCOUNT, _Constants.PromptState.CONSENT, _Constants.PromptState.NONE].indexOf(prompt) < 0) {
        throw _ClientConfigurationError.ClientConfigurationError.createInvalidPromptError(prompt);
      }
    }
  };
  /**
   * @ignore
   *
   * Removes unnecessary or duplicate query parameters from extraQueryParameters
   * @param request
   */


  RequestUtils.validateEQParameters = function (extraQueryParameters, claimsRequest) {
    var eQParams = tslib_1.__assign({}, extraQueryParameters);

    if (!eQParams) {
      return null;
    }

    if (claimsRequest) {
      // this.logger.warning("Removed duplicate claims from extraQueryParameters. Please use either the claimsRequest field OR pass as extraQueryParameter - not both.");
      delete eQParams[_Constants.Constants.claims];
    }

    _Constants.BlacklistedEQParams.forEach(function (param) {
      if (eQParams[param]) {
        // this.logger.warning("Removed duplicate " + param + " from extraQueryParameters. Please use the " + param + " field in request object.");
        delete eQParams[param];
      }
    });

    return eQParams;
  };
  /**
   * @ignore
   *
   * Validates the claims passed in request is a JSON
   * TODO: More validation will be added when the server team tells us how they have actually implemented claims
   * @param claimsRequest
   */


  RequestUtils.validateClaimsRequest = function (claimsRequest) {
    if (!claimsRequest) {
      return;
    }

    var claims;

    try {
      claims = JSON.parse(claimsRequest);
    } catch (e) {
      throw _ClientConfigurationError.ClientConfigurationError.createClaimsRequestParsingError(e);
    }
  };
  /**
   * @ignore
   *
   * generate unique state per request
   * @param request
   */


  RequestUtils.validateAndGenerateState = function (state) {
    // append GUID to user set state  or set one for the user if null
    return !_StringUtils.StringUtils.isEmpty(state) ? _CryptoUtils.CryptoUtils.createNewGuid() + "|" + state : _CryptoUtils.CryptoUtils.createNewGuid();
  };
  /**
   * @ignore
   *
   * validate correlationId and generate if not valid or not set by the user
   * @param correlationId
   */


  RequestUtils.validateAndGenerateCorrelationId = function (correlationId) {
    // validate user set correlationId or set one for the user if null
    if (correlationId && !_CryptoUtils.CryptoUtils.isGuid(correlationId)) {
      throw _ClientConfigurationError.ClientConfigurationError.createInvalidCorrelationIdError();
    }

    return _CryptoUtils.CryptoUtils.isGuid(correlationId) ? correlationId : _CryptoUtils.CryptoUtils.createNewGuid();
  };

  return RequestUtils;
}();

exports.RequestUtils = RequestUtils;
},{"tslib":"node_modules/tslib/tslib.es6.js","../utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js","../error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","../ScopeSet":"node_modules/msal/lib-es6/ScopeSet.js","../utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js","../utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js"}],"node_modules/msal/lib-es6/utils/ResponseUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseUtils = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var ResponseUtils =
/** @class */
function () {
  function ResponseUtils() {}

  ResponseUtils.setResponseIdToken = function (originalResponse, idTokenObj) {
    if (!originalResponse) {
      return null;
    } else if (!idTokenObj) {
      return originalResponse;
    }

    var exp = Number(idTokenObj.expiration);

    if (exp && !originalResponse.expiresOn) {
      originalResponse.expiresOn = new Date(exp * 1000);
    }

    return tslib_1.__assign({}, originalResponse, {
      idToken: idTokenObj,
      idTokenClaims: idTokenObj.claims,
      uniqueId: idTokenObj.objectId || idTokenObj.subject,
      tenantId: idTokenObj.tenantId
    });
  };

  return ResponseUtils;
}();

exports.ResponseUtils = ResponseUtils;
},{"tslib":"node_modules/tslib/tslib.es6.js"}],"node_modules/msal/lib-es6/XHRClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XhrClient = void 0;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * XHR client for JSON endpoints
 * https://www.npmjs.com/package/async-promise
 * @hidden
 */
var XhrClient =
/** @class */
function () {
  function XhrClient() {}

  XhrClient.prototype.sendRequestAsync = function (url, method, enableCaching) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url,
      /* async: */
      true);

      if (enableCaching) {
        /*
         * TODO: (shivb) ensure that this can be cached
         * xhr.setRequestHeader("Cache-Control", "Public");
         */
      }

      xhr.onload = function (ev) {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(_this.handleError(xhr.responseText));
        }

        var jsonResponse;

        try {
          jsonResponse = JSON.parse(xhr.responseText);
        } catch (e) {
          reject(_this.handleError(xhr.responseText));
        }

        resolve(jsonResponse);
      };

      xhr.onerror = function (ev) {
        reject(xhr.status);
      };

      if (method === "GET") {
        xhr.send();
      } else {
        throw "not implemented";
      }
    });
  };

  XhrClient.prototype.handleError = function (responseText) {
    var jsonResponse;

    try {
      jsonResponse = JSON.parse(responseText);

      if (jsonResponse.error) {
        return jsonResponse.error;
      } else {
        throw responseText;
      }
    } catch (e) {
      return responseText;
    }
  };

  return XhrClient;
}();

exports.XhrClient = XhrClient;
},{}],"node_modules/msal/lib-es6/authority/Authority.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authority = exports.AuthorityType = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _ClientConfigurationError = require("../error/ClientConfigurationError");

var _XHRClient = require("../XHRClient");

var _UrlUtils = require("../utils/UrlUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AuthorityType;
exports.AuthorityType = AuthorityType;

(function (AuthorityType) {
  AuthorityType[AuthorityType["Aad"] = 0] = "Aad";
  AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
  AuthorityType[AuthorityType["B2C"] = 2] = "B2C";
})(AuthorityType || (exports.AuthorityType = AuthorityType = {}));
/**
 * @hidden
 */


var Authority =
/** @class */
function () {
  function Authority(authority, validateAuthority) {
    this.IsValidationEnabled = validateAuthority;
    this.CanonicalAuthority = authority;
    this.validateAsUri();
  }

  Object.defineProperty(Authority.prototype, "Tenant", {
    get: function () {
      return this.CanonicalAuthorityUrlComponents.PathSegments[0];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Authority.prototype, "AuthorizationEndpoint", {
    get: function () {
      this.validateResolved();
      return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace("{tenant}", this.Tenant);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Authority.prototype, "EndSessionEndpoint", {
    get: function () {
      this.validateResolved();
      return this.tenantDiscoveryResponse.EndSessionEndpoint.replace("{tenant}", this.Tenant);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Authority.prototype, "SelfSignedJwtAudience", {
    get: function () {
      this.validateResolved();
      return this.tenantDiscoveryResponse.Issuer.replace("{tenant}", this.Tenant);
    },
    enumerable: true,
    configurable: true
  });

  Authority.prototype.validateResolved = function () {
    if (!this.tenantDiscoveryResponse) {
      throw "Please call ResolveEndpointsAsync first";
    }
  };

  Object.defineProperty(Authority.prototype, "CanonicalAuthority", {
    /**
     * A URL that is the authority set by the developer
     */
    get: function () {
      return this.canonicalAuthority;
    },
    set: function (url) {
      this.canonicalAuthority = _UrlUtils.UrlUtils.CanonicalizeUri(url);
      this.canonicalAuthorityUrlComponents = null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Authority.prototype, "CanonicalAuthorityUrlComponents", {
    get: function () {
      if (!this.canonicalAuthorityUrlComponents) {
        this.canonicalAuthorityUrlComponents = _UrlUtils.UrlUtils.GetUrlComponents(this.CanonicalAuthority);
      }

      return this.canonicalAuthorityUrlComponents;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Authority.prototype, "DefaultOpenIdConfigurationEndpoint", {
    /**
     * // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    get: function () {
      return this.CanonicalAuthority + "v2.0/.well-known/openid-configuration";
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Given a string, validate that it is of the form https://domain/path
   */

  Authority.prototype.validateAsUri = function () {
    var components;

    try {
      components = this.CanonicalAuthorityUrlComponents;
    } catch (e) {
      throw _ClientConfigurationError.ClientConfigurationErrorMessage.invalidAuthorityType;
    }

    if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
      throw _ClientConfigurationError.ClientConfigurationErrorMessage.authorityUriInsecure;
    }

    if (!components.PathSegments || components.PathSegments.length < 1) {
      throw _ClientConfigurationError.ClientConfigurationErrorMessage.authorityUriInvalidPath;
    }
  };
  /**
   * Calls the OIDC endpoint and returns the response
   */


  Authority.prototype.DiscoverEndpoints = function (openIdConfigurationEndpoint) {
    var client = new _XHRClient.XhrClient();
    return client.sendRequestAsync(openIdConfigurationEndpoint, "GET",
    /* enableCaching: */
    true).then(function (response) {
      return {
        AuthorizationEndpoint: response.authorization_endpoint,
        EndSessionEndpoint: response.end_session_endpoint,
        Issuer: response.issuer
      };
    });
  };
  /**
   * Returns a promise.
   * Checks to see if the authority is in the cache
   * Discover endpoints via openid-configuration
   * If successful, caches the endpoint for later use in OIDC
   */


  Authority.prototype.resolveEndpointsAsync = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
      var openIdConfigurationEndpointResponse, _a;

      return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.GetOpenIdConfigurationEndpointAsync()];

          case 1:
            openIdConfigurationEndpointResponse = _b.sent();
            _a = this;
            return [4
            /*yield*/
            , this.DiscoverEndpoints(openIdConfigurationEndpointResponse)];

          case 2:
            _a.tenantDiscoveryResponse = _b.sent();
            return [2
            /*return*/
            , this];
        }
      });
    });
  };

  return Authority;
}();

exports.Authority = Authority;
},{"tslib":"node_modules/tslib/tslib.es6.js","../error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","../XHRClient":"node_modules/msal/lib-es6/XHRClient.js","../utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js"}],"node_modules/msal/lib-es6/authority/AadAuthority.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AadAuthority = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _Authority = require("./Authority");

var _XHRClient = require("../XHRClient");

var _Constants = require("../utils/Constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AadAuthority =
/** @class */
function (_super) {
  tslib_1.__extends(AadAuthority, _super);

  function AadAuthority(authority, validateAuthority) {
    return _super.call(this, authority, validateAuthority) || this;
  }

  Object.defineProperty(AadAuthority.prototype, "AadInstanceDiscoveryEndpointUrl", {
    get: function () {
      return AadAuthority.AadInstanceDiscoveryEndpoint + "?api-version=1.0&authorization_endpoint=" + this.CanonicalAuthority + "oauth2/v2.0/authorize";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(AadAuthority.prototype, "AuthorityType", {
    get: function () {
      return _Authority.AuthorityType.Aad;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns a promise which resolves to the OIDC endpoint
   * Only responds with the endpoint
   */

  AadAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
      var client;
      return tslib_1.__generator(this, function (_a) {
        if (!this.IsValidationEnabled || this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)) {
          return [2
          /*return*/
          , this.DefaultOpenIdConfigurationEndpoint];
        }

        client = new _XHRClient.XhrClient();
        return [2
        /*return*/
        , client.sendRequestAsync(this.AadInstanceDiscoveryEndpointUrl, "GET", true).then(function (response) {
          return response.tenant_discovery_endpoint;
        })];
      });
    });
  };
  /**
   * Checks to see if the host is in a list of trusted hosts
   * @param {string} The host to look up
   */


  AadAuthority.prototype.IsInTrustedHostList = function (host) {
    return _Constants.AADTrustedHostList[host.toLowerCase()];
  };

  AadAuthority.AadInstanceDiscoveryEndpoint = "https://login.microsoftonline.com/common/discovery/instance";
  return AadAuthority;
}(_Authority.Authority);

exports.AadAuthority = AadAuthority;
},{"tslib":"node_modules/tslib/tslib.es6.js","./Authority":"node_modules/msal/lib-es6/authority/Authority.js","../XHRClient":"node_modules/msal/lib-es6/XHRClient.js","../utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js"}],"node_modules/msal/lib-es6/authority/B2cAuthority.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B2cAuthority = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _AadAuthority = require("./AadAuthority");

var _Authority = require("./Authority");

var _ClientConfigurationError = require("../error/ClientConfigurationError");

var _UrlUtils = require("../utils/UrlUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var B2cAuthority =
/** @class */
function (_super) {
  tslib_1.__extends(B2cAuthority, _super);

  function B2cAuthority(authority, validateAuthority) {
    var _this = _super.call(this, authority, validateAuthority) || this;

    var urlComponents = _UrlUtils.UrlUtils.GetUrlComponents(authority);

    var pathSegments = urlComponents.PathSegments;

    if (pathSegments.length < 3) {
      throw _ClientConfigurationError.ClientConfigurationErrorMessage.b2cAuthorityUriInvalidPath;
    }

    _this.CanonicalAuthority = "https://" + urlComponents.HostNameAndPort + "/" + pathSegments[0] + "/" + pathSegments[1] + "/" + pathSegments[2] + "/";
    return _this;
  }

  Object.defineProperty(B2cAuthority.prototype, "AuthorityType", {
    get: function () {
      return _Authority.AuthorityType.B2C;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns a promise with the TenantDiscoveryEndpoint
   */

  B2cAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
      return tslib_1.__generator(this, function (_a) {
        if (!this.IsValidationEnabled || this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)) {
          return [2
          /*return*/
          , this.DefaultOpenIdConfigurationEndpoint];
        }

        throw _ClientConfigurationError.ClientConfigurationErrorMessage.unsupportedAuthorityValidation;
      });
    });
  };

  B2cAuthority.B2C_PREFIX = "tfp";
  return B2cAuthority;
}(_AadAuthority.AadAuthority);

exports.B2cAuthority = B2cAuthority;
},{"tslib":"node_modules/tslib/tslib.es6.js","./AadAuthority":"node_modules/msal/lib-es6/authority/AadAuthority.js","./Authority":"node_modules/msal/lib-es6/authority/Authority.js","../error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","../utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js"}],"node_modules/msal/lib-es6/authority/AuthorityFactory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorityFactory = void 0;

var _AadAuthority = require("./AadAuthority");

var _B2cAuthority = require("./B2cAuthority");

var _Authority = require("./Authority");

var _ClientConfigurationError = require("../error/ClientConfigurationError");

var _UrlUtils = require("../utils/UrlUtils");

var _StringUtils = require("../utils/StringUtils");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
var AuthorityFactory =
/** @class */
function () {
  function AuthorityFactory() {}
  /**
   * Parse the url and determine the type of authority
   */


  AuthorityFactory.DetectAuthorityFromUrl = function (authorityUrl) {
    authorityUrl = _UrlUtils.UrlUtils.CanonicalizeUri(authorityUrl);

    var components = _UrlUtils.UrlUtils.GetUrlComponents(authorityUrl);

    var pathSegments = components.PathSegments;

    switch (pathSegments[0]) {
      case "tfp":
        return _Authority.AuthorityType.B2C;

      default:
        return _Authority.AuthorityType.Aad;
    }
  };
  /**
   * Create an authority object of the correct type based on the url
   * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
   */


  AuthorityFactory.CreateInstance = function (authorityUrl, validateAuthority) {
    if (_StringUtils.StringUtils.isEmpty(authorityUrl)) {
      return null;
    }

    var type = AuthorityFactory.DetectAuthorityFromUrl(authorityUrl); // Depending on above detection, create the right type.

    switch (type) {
      case _Authority.AuthorityType.B2C:
        return new _B2cAuthority.B2cAuthority(authorityUrl, validateAuthority);

      case _Authority.AuthorityType.Aad:
        return new _AadAuthority.AadAuthority(authorityUrl, validateAuthority);

      default:
        throw _ClientConfigurationError.ClientConfigurationErrorMessage.invalidAuthorityType;
    }
  };

  return AuthorityFactory;
}();

exports.AuthorityFactory = AuthorityFactory;
},{"./AadAuthority":"node_modules/msal/lib-es6/authority/AadAuthority.js","./B2cAuthority":"node_modules/msal/lib-es6/authority/B2cAuthority.js","./Authority":"node_modules/msal/lib-es6/authority/Authority.js","../error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","../utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js","../utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js"}],"node_modules/msal/lib-es6/Logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;

var _StringUtils = require("./utils/StringUtils");

var _Constants = require("./utils/Constants");

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["Error"] = 0] = "Error";
  LogLevel[LogLevel["Warning"] = 1] = "Warning";
  LogLevel[LogLevel["Info"] = 2] = "Info";
  LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

var Logger =
/** @class */
function () {
  function Logger(localCallback, options) {
    if (options === void 0) {
      options = {};
    }
    /**
     * @hidden
     */


    this.level = LogLevel.Info;
    var _a = options.correlationId,
        correlationId = _a === void 0 ? "" : _a,
        _b = options.level,
        level = _b === void 0 ? LogLevel.Info : _b,
        _c = options.piiLoggingEnabled,
        piiLoggingEnabled = _c === void 0 ? false : _c;
    this.localCallback = localCallback;
    this.correlationId = correlationId;
    this.level = level;
    this.piiLoggingEnabled = piiLoggingEnabled;
  }
  /**
   * @hidden
   */


  Logger.prototype.logMessage = function (logLevel, logMessage, containsPii) {
    if (logLevel > this.level || !this.piiLoggingEnabled && containsPii) {
      return;
    }

    var timestamp = new Date().toUTCString();
    var log;

    if (!_StringUtils.StringUtils.isEmpty(this.correlationId)) {
      log = timestamp + ":" + this.correlationId + "-" + (0, _Constants.libraryVersion)() + "-" + LogLevel[logLevel] + " " + logMessage;
    } else {
      log = timestamp + ":" + (0, _Constants.libraryVersion)() + "-" + LogLevel[logLevel] + " " + logMessage;
    }

    this.executeCallback(logLevel, log, containsPii);
  };
  /**
   * @hidden
   */


  Logger.prototype.executeCallback = function (level, message, containsPii) {
    if (this.localCallback) {
      this.localCallback(level, message, containsPii);
    }
  };
  /**
   * @hidden
   */


  Logger.prototype.error = function (message) {
    this.logMessage(LogLevel.Error, message, false);
  };
  /**
   * @hidden
   */


  Logger.prototype.errorPii = function (message) {
    this.logMessage(LogLevel.Error, message, true);
  };
  /**
   * @hidden
   */


  Logger.prototype.warning = function (message) {
    this.logMessage(LogLevel.Warning, message, false);
  };
  /**
   * @hidden
   */


  Logger.prototype.warningPii = function (message) {
    this.logMessage(LogLevel.Warning, message, true);
  };
  /**
   * @hidden
   */


  Logger.prototype.info = function (message) {
    this.logMessage(LogLevel.Info, message, false);
  };
  /**
   * @hidden
   */


  Logger.prototype.infoPii = function (message) {
    this.logMessage(LogLevel.Info, message, true);
  };
  /**
   * @hidden
   */


  Logger.prototype.verbose = function (message) {
    this.logMessage(LogLevel.Verbose, message, false);
  };
  /**
   * @hidden
   */


  Logger.prototype.verbosePii = function (message) {
    this.logMessage(LogLevel.Verbose, message, true);
  };

  Logger.prototype.isPiiLoggingEnabled = function () {
    return this.piiLoggingEnabled;
  };

  return Logger;
}();

exports.Logger = Logger;
},{"./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js","./utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js"}],"node_modules/msal/lib-es6/Configuration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildConfiguration = buildConfiguration;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _Logger = require("./Logger");

var _UrlUtils = require("./utils/UrlUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Defaults for the Configuration Options
 */
var FRAME_TIMEOUT = 6000;
var OFFSET = 300;
var NAVIGATE_FRAME_WAIT = 500;
var DEFAULT_AUTH_OPTIONS = {
  clientId: "",
  authority: null,
  validateAuthority: true,
  redirectUri: function () {
    return _UrlUtils.UrlUtils.getDefaultRedirectUri();
  },
  postLogoutRedirectUri: function () {
    return _UrlUtils.UrlUtils.getDefaultRedirectUri();
  },
  navigateToLoginRequestUrl: true
};
var DEFAULT_CACHE_OPTIONS = {
  cacheLocation: "sessionStorage",
  storeAuthStateInCookie: false
};
var DEFAULT_SYSTEM_OPTIONS = {
  logger: new _Logger.Logger(null),
  loadFrameTimeout: FRAME_TIMEOUT,
  tokenRenewalOffsetSeconds: OFFSET,
  navigateFrameWait: NAVIGATE_FRAME_WAIT
};
var DEFAULT_FRAMEWORK_OPTIONS = {
  isAngular: false,
  unprotectedResources: new Array(),
  protectedResourceMap: new Map()
};
/**
 * MSAL function that sets the default options when not explicitly configured from app developer
 *
 * @param TAuthOptions
 * @param TCacheOptions
 * @param TSystemOptions
 * @param TFrameworkOptions
 *
 * @returns TConfiguration object
 */

function buildConfiguration(_a) {
  var auth = _a.auth,
      _b = _a.cache,
      cache = _b === void 0 ? {} : _b,
      _c = _a.system,
      system = _c === void 0 ? {} : _c,
      _d = _a.framework,
      framework = _d === void 0 ? {} : _d;
  var overlayedConfig = {
    auth: tslib_1.__assign({}, DEFAULT_AUTH_OPTIONS, auth),
    cache: tslib_1.__assign({}, DEFAULT_CACHE_OPTIONS, cache),
    system: tslib_1.__assign({}, DEFAULT_SYSTEM_OPTIONS, system),
    framework: tslib_1.__assign({}, DEFAULT_FRAMEWORK_OPTIONS, framework)
  };
  return overlayedConfig;
}
},{"tslib":"node_modules/tslib/tslib.es6.js","./Logger":"node_modules/msal/lib-es6/Logger.js","./utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js"}],"node_modules/msal/lib-es6/error/ServerError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerError = exports.ServerErrorMessage = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _AuthError = require("./AuthError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ServerErrorMessage = {
  serverUnavailable: {
    code: "server_unavailable",
    desc: "Server is temporarily unavailable."
  },
  unknownServerError: {
    code: "unknown_server_error"
  }
};
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */

exports.ServerErrorMessage = ServerErrorMessage;

var ServerError =
/** @class */
function (_super) {
  tslib_1.__extends(ServerError, _super);

  function ServerError(errorCode, errorMessage) {
    var _this = _super.call(this, errorCode, errorMessage) || this;

    _this.name = "ServerError";
    Object.setPrototypeOf(_this, ServerError.prototype);
    return _this;
  }

  ServerError.createServerUnavailableError = function () {
    return new ServerError(ServerErrorMessage.serverUnavailable.code, ServerErrorMessage.serverUnavailable.desc);
  };

  ServerError.createUnknownServerError = function (errorDesc) {
    return new ServerError(ServerErrorMessage.unknownServerError.code, errorDesc);
  };

  return ServerError;
}(_AuthError.AuthError);

exports.ServerError = ServerError;
},{"tslib":"node_modules/tslib/tslib.es6.js","./AuthError":"node_modules/msal/lib-es6/error/AuthError.js"}],"node_modules/msal/lib-es6/error/InteractionRequiredAuthError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionRequiredAuthError = exports.InteractionRequiredAuthErrorMessage = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _ServerError = require("./ServerError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var InteractionRequiredAuthErrorMessage = {
  interactionRequired: {
    code: "interaction_required"
  },
  consentRequired: {
    code: "consent_required"
  },
  loginRequired: {
    code: "login_required"
  }
};
/**
 * Error thrown when the user is required to perform an interactive token request.
 */

exports.InteractionRequiredAuthErrorMessage = InteractionRequiredAuthErrorMessage;

var InteractionRequiredAuthError =
/** @class */
function (_super) {
  tslib_1.__extends(InteractionRequiredAuthError, _super);

  function InteractionRequiredAuthError(errorCode, errorMessage) {
    var _this = _super.call(this, errorCode, errorMessage) || this;

    _this.name = "InteractionRequiredAuthError";
    Object.setPrototypeOf(_this, InteractionRequiredAuthError.prototype);
    return _this;
  }

  InteractionRequiredAuthError.isInteractionRequiredError = function (errorString) {
    var interactionRequiredCodes = [InteractionRequiredAuthErrorMessage.interactionRequired.code, InteractionRequiredAuthErrorMessage.consentRequired.code, InteractionRequiredAuthErrorMessage.loginRequired.code];
    return errorString && interactionRequiredCodes.indexOf(errorString) > -1;
  };

  InteractionRequiredAuthError.createLoginRequiredAuthError = function (errorDesc) {
    return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.loginRequired.code, errorDesc);
  };

  InteractionRequiredAuthError.createInteractionRequiredAuthError = function (errorDesc) {
    return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.interactionRequired.code, errorDesc);
  };

  InteractionRequiredAuthError.createConsentRequiredAuthError = function (errorDesc) {
    return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.consentRequired.code, errorDesc);
  };

  return InteractionRequiredAuthError;
}(_ServerError.ServerError);

exports.InteractionRequiredAuthError = InteractionRequiredAuthError;
},{"tslib":"node_modules/tslib/tslib.es6.js","./ServerError":"node_modules/msal/lib-es6/error/ServerError.js"}],"node_modules/msal/lib-es6/AuthResponse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildResponseStateOnly = buildResponseStateOnly;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function buildResponseStateOnly(state) {
  return {
    uniqueId: "",
    tenantId: "",
    tokenType: "",
    idToken: null,
    idTokenClaims: null,
    accessToken: "",
    scopes: null,
    expiresOn: null,
    account: null,
    accountState: state,
    fromCache: false
  };
}
},{}],"node_modules/msal/lib-es6/telemetry/TelemetryConstants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TENANT_PLACEHOLDER = exports.TELEMETRY_BLOB_EVENT_NAMES = exports.ELAPSED_TIME_KEY = exports.START_TIME_KEY = exports.EVENT_NAME_KEY = exports.EVENT_NAME_PREFIX = void 0;
var EVENT_NAME_PREFIX = "msal.";
exports.EVENT_NAME_PREFIX = EVENT_NAME_PREFIX;
var EVENT_NAME_KEY = "event_name";
exports.EVENT_NAME_KEY = EVENT_NAME_KEY;
var START_TIME_KEY = "start_time";
exports.START_TIME_KEY = START_TIME_KEY;
var ELAPSED_TIME_KEY = "elapsed_time";
exports.ELAPSED_TIME_KEY = ELAPSED_TIME_KEY;
var TELEMETRY_BLOB_EVENT_NAMES = {
  MsalCorrelationIdConstStrKey: "Microsoft.MSAL.correlation_id",
  ApiTelemIdConstStrKey: "msal.api_telem_id",
  ApiIdConstStrKey: "msal.api_id",
  BrokerAppConstStrKey: "Microsoft_MSAL_broker_app",
  CacheEventCountConstStrKey: "Microsoft_MSAL_cache_event_count",
  HttpEventCountTelemetryBatchKey: "Microsoft_MSAL_http_event_count",
  IdpConstStrKey: "Microsoft_MSAL_idp",
  IsSilentTelemetryBatchKey: "",
  IsSuccessfulConstStrKey: "Microsoft_MSAL_is_successful",
  ResponseTimeConstStrKey: "Microsoft_MSAL_response_time",
  TenantIdConstStrKey: "Microsoft_MSAL_tenant_id",
  UiEventCountTelemetryBatchKey: "Microsoft_MSAL_ui_event_count"
}; // This is used to replace the real tenant in telemetry info

exports.TELEMETRY_BLOB_EVENT_NAMES = TELEMETRY_BLOB_EVENT_NAMES;
var TENANT_PLACEHOLDER = "<tenant>";
exports.TENANT_PLACEHOLDER = TENANT_PLACEHOLDER;
},{}],"node_modules/msal/lib-es6/telemetry/TelemetryUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prependEventNamePrefix = exports.hashPersonalIdentifier = exports.scrubTenantFromUri = void 0;

var _B2cAuthority = require("../authority/B2cAuthority");

var _Constants = require("../utils/Constants");

var _TelemetryConstants = require("./TelemetryConstants");

var _CryptoUtils = require("../utils/CryptoUtils");

var _UrlUtils = require("../utils/UrlUtils");

var scrubTenantFromUri = function (uri) {
  var url = _UrlUtils.UrlUtils.GetUrlComponents(uri); // validate trusted host


  if (!_Constants.AADTrustedHostList[url.HostNameAndPort.toLocaleLowerCase()]) {
    // Should this return null or what was passed?
    return null;
  }

  var pathParams = url.PathSegments;

  if (pathParams && pathParams.length >= 2) {
    var tenantPosition = pathParams[1] === _B2cAuthority.B2cAuthority.B2C_PREFIX ? 2 : 1;

    if (tenantPosition < pathParams.length) {
      pathParams[tenantPosition] = _TelemetryConstants.TENANT_PLACEHOLDER;
    }
  }

  return url.Protocol + "//" + url.HostNameAndPort + "/" + pathParams.join("/");
};

exports.scrubTenantFromUri = scrubTenantFromUri;

var hashPersonalIdentifier = function (valueToHash) {
  /*
   * TODO sha256 this
   * Current test runner is being funny with node libs that are webpacked anyway
   * need a different solution
   */
  return _CryptoUtils.CryptoUtils.base64Encode(valueToHash);
};

exports.hashPersonalIdentifier = hashPersonalIdentifier;

var prependEventNamePrefix = function (suffix) {
  return "" + _TelemetryConstants.EVENT_NAME_PREFIX + (suffix || "");
};

exports.prependEventNamePrefix = prependEventNamePrefix;
},{"../authority/B2cAuthority":"node_modules/msal/lib-es6/authority/B2cAuthority.js","../utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js","./TelemetryConstants":"node_modules/msal/lib-es6/telemetry/TelemetryConstants.js","../utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","../utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js"}],"node_modules/msal/lib-es6/telemetry/TelemetryEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _TelemetryConstants = require("./TelemetryConstants");

var _TelemetryUtils = require("./TelemetryUtils");

var _CryptoUtils = require("../utils/CryptoUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TelemetryEvent =
/** @class */
function () {
  function TelemetryEvent(eventName, correlationId) {
    var _a;

    this.startTimestamp = Date.now();
    this.eventId = _CryptoUtils.CryptoUtils.createNewGuid();
    this.event = (_a = {}, _a[(0, _TelemetryUtils.prependEventNamePrefix)(_TelemetryConstants.EVENT_NAME_KEY)] = eventName, _a[(0, _TelemetryUtils.prependEventNamePrefix)(_TelemetryConstants.START_TIME_KEY)] = this.startTimestamp, _a[(0, _TelemetryUtils.prependEventNamePrefix)(_TelemetryConstants.ELAPSED_TIME_KEY)] = -1, _a["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = correlationId, _a);
  }

  TelemetryEvent.prototype.setElapsedTime = function (time) {
    this.event[(0, _TelemetryUtils.prependEventNamePrefix)(_TelemetryConstants.ELAPSED_TIME_KEY)] = time;
  };

  TelemetryEvent.prototype.stop = function () {
    // Set duration of event
    this.setElapsedTime(+Date.now() - +this.startTimestamp);
  };

  Object.defineProperty(TelemetryEvent.prototype, "telemetryCorrelationId", {
    get: function () {
      return this.event["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey];
    },
    set: function (value) {
      this.event["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TelemetryEvent.prototype, "eventName", {
    get: function () {
      return this.event[(0, _TelemetryUtils.prependEventNamePrefix)(_TelemetryConstants.EVENT_NAME_KEY)];
    },
    enumerable: true,
    configurable: true
  });

  TelemetryEvent.prototype.get = function () {
    return tslib_1.__assign({}, this.event, {
      eventId: this.eventId
    });
  };

  return TelemetryEvent;
}();

var _default = TelemetryEvent;
exports.default = _default;
},{"tslib":"node_modules/tslib/tslib.es6.js","./TelemetryConstants":"node_modules/msal/lib-es6/telemetry/TelemetryConstants.js","./TelemetryUtils":"node_modules/msal/lib-es6/telemetry/TelemetryUtils.js","../utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js"}],"node_modules/msal/lib-es6/telemetry/DefaultEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _TelemetryConstants = require("./TelemetryConstants");

var _TelemetryEvent = _interopRequireDefault(require("./TelemetryEvent"));

var _TelemetryUtils = require("./TelemetryUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DefaultEvent =
/** @class */
function (_super) {
  tslib_1.__extends(DefaultEvent, _super); // TODO Platform Type


  function DefaultEvent(platform, correlationId, clientId, eventCount) {
    var _this = _super.call(this, (0, _TelemetryUtils.prependEventNamePrefix)("default_event"), correlationId) || this;

    _this.event[(0, _TelemetryUtils.prependEventNamePrefix)("client_id")] = clientId;
    _this.event[(0, _TelemetryUtils.prependEventNamePrefix)("sdk_plaform")] = platform.sdk;
    _this.event[(0, _TelemetryUtils.prependEventNamePrefix)("sdk_version")] = platform.sdkVersion;
    _this.event[(0, _TelemetryUtils.prependEventNamePrefix)("application_name")] = platform.applicationName;
    _this.event[(0, _TelemetryUtils.prependEventNamePrefix)("application_version")] = platform.applicationVersion;
    _this.event["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.UiEventCountTelemetryBatchKey] = _this.getEventCount((0, _TelemetryUtils.prependEventNamePrefix)("ui_event"), eventCount);
    _this.event["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.HttpEventCountTelemetryBatchKey] = _this.getEventCount((0, _TelemetryUtils.prependEventNamePrefix)("http_event"), eventCount);
    _this.event["" + _TelemetryConstants.TELEMETRY_BLOB_EVENT_NAMES.CacheEventCountConstStrKey] = _this.getEventCount((0, _TelemetryUtils.prependEventNamePrefix)("cache_event"), eventCount);
    return _this; // / Device id?
  }

  DefaultEvent.prototype.getEventCount = function (eventName, eventCount) {
    if (!eventCount[eventName]) {
      return 0;
    }

    return eventCount[eventName];
  };

  return DefaultEvent;
}(_TelemetryEvent.default);

var _default = DefaultEvent;
exports.default = _default;
},{"tslib":"node_modules/tslib/tslib.es6.js","./TelemetryConstants":"node_modules/msal/lib-es6/telemetry/TelemetryConstants.js","./TelemetryEvent":"node_modules/msal/lib-es6/telemetry/TelemetryEvent.js","./TelemetryUtils":"node_modules/msal/lib-es6/telemetry/TelemetryUtils.js"}],"node_modules/msal/lib-es6/telemetry/TelemetryManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DefaultEvent = _interopRequireDefault(require("./DefaultEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for use in cache events
var MSAL_CACHE_EVENT_VALUE_PREFIX = "msal.token";
var MSAL_CACHE_EVENT_NAME = "msal.cache_event";

var createEventKey = function (event) {
  return event.telemetryCorrelationId + "-" + event.eventId + "-" + event.eventName;
};

var TelemetryManager =
/** @class */
function () {
  function TelemetryManager(config, telemetryEmitter) {
    // correlation Id to list of events
    this.completedEvents = {}; // event key to event

    this.inProgressEvents = {}; // correlation id to map of eventname to count

    this.eventCountByCorrelationId = {}; // Implement after API EVENT

    this.onlySendFailureTelemetry = false; // TODO THROW if bad options

    this.telemetryPlatform = config.platform;
    this.clientId = config.clientId;
    this.onlySendFailureTelemetry = config.onlySendFailureTelemetry;
    /*
     * TODO, when i get to wiring this through, think about what it means if
     * a developer does not implement telem at all, we still instrument, but telemetryEmitter can be
     * optional?
     */

    this.telemetryEmitter = telemetryEmitter;
  }

  TelemetryManager.prototype.startEvent = function (event) {
    if (!this.telemetryEmitter) {
      return;
    }

    var eventKey = createEventKey(event);
    this.inProgressEvents[eventKey] = event;
  };

  TelemetryManager.prototype.stopEvent = function (event) {
    var eventKey = createEventKey(event);

    if (!this.telemetryEmitter || !this.inProgressEvents[eventKey]) {
      return;
    }

    event.stop();
    this.incrementEventCount(event);
    var completedEvents = this.completedEvents[event.telemetryCorrelationId];
    this.completedEvents[event.telemetryCorrelationId] = (completedEvents || []).concat([event]);
    delete this.inProgressEvents[eventKey];
  };

  TelemetryManager.prototype.flush = function (correlationId) {
    var _this = this; // If there is only unfinished events should this still return them?


    if (!this.telemetryEmitter || !this.completedEvents[correlationId]) {
      return;
    }

    var orphanedEvents = this.getOrphanedEvents(correlationId);
    orphanedEvents.forEach(function (event) {
      return _this.incrementEventCount(event);
    });
    var eventsToFlush = this.completedEvents[correlationId].concat(orphanedEvents);
    delete this.completedEvents[correlationId];
    var eventCountsToFlush = this.eventCountByCorrelationId[correlationId];
    delete this.eventCountByCorrelationId[correlationId]; // TODO add funcitonality for onlyFlushFailures after implementing api event? ??

    if (!eventsToFlush || !eventsToFlush.length) {
      return;
    }

    var defaultEvent = new _DefaultEvent.default(this.telemetryPlatform, correlationId, this.clientId, eventCountsToFlush);
    var eventsWithDefaultEvent = eventsToFlush.concat([defaultEvent]);
    this.telemetryEmitter(eventsWithDefaultEvent.map(function (e) {
      return e.get();
    }));
  };

  TelemetryManager.prototype.incrementEventCount = function (event) {
    var _a;
    /*
     * TODO, name cache event different?
     * if type is cache event, change name
     */


    var eventName = event.eventName;
    var eventCount = this.eventCountByCorrelationId[event.telemetryCorrelationId];

    if (!eventCount) {
      this.eventCountByCorrelationId[event.telemetryCorrelationId] = (_a = {}, _a[eventName] = 1, _a);
    } else {
      eventCount[eventName] = eventCount[eventName] ? eventCount[eventName] + 1 : 1;
    }
  };

  TelemetryManager.prototype.getOrphanedEvents = function (correlationId) {
    var _this = this;

    return Object.keys(this.inProgressEvents).reduce(function (memo, eventKey) {
      if (eventKey.indexOf(correlationId) !== -1) {
        var event_1 = _this.inProgressEvents[eventKey];
        delete _this.inProgressEvents[eventKey];
        return memo.concat([event_1]);
      }

      return memo;
    }, []);
  };

  return TelemetryManager;
}();

var _default = TelemetryManager;
exports.default = _default;
},{"./DefaultEvent":"node_modules/msal/lib-es6/telemetry/DefaultEvent.js"}],"node_modules/msal/lib-es6/UserAgentApplication.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAgentApplication = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _AccessTokenKey = require("./cache/AccessTokenKey");

var _AccessTokenValue = require("./cache/AccessTokenValue");

var _ServerRequestParameters = require("./ServerRequestParameters");

var _ClientInfo = require("./ClientInfo");

var _IdToken = require("./IdToken");

var _AuthCache = require("./cache/AuthCache");

var _Account = require("./Account");

var _ScopeSet = require("./ScopeSet");

var _StringUtils = require("./utils/StringUtils");

var _WindowUtils = require("./utils/WindowUtils");

var _TokenUtils = require("./utils/TokenUtils");

var _TimeUtils = require("./utils/TimeUtils");

var _UrlUtils = require("./utils/UrlUtils");

var _RequestUtils = require("./utils/RequestUtils");

var _ResponseUtils = require("./utils/ResponseUtils");

var _AuthorityFactory = require("./authority/AuthorityFactory");

var _Configuration = require("./Configuration");

var _ClientConfigurationError = require("./error/ClientConfigurationError");

var _AuthError = require("./error/AuthError");

var _ClientAuthError = require("./error/ClientAuthError");

var _ServerError = require("./error/ServerError");

var _InteractionRequiredAuthError = require("./error/InteractionRequiredAuthError");

var _AuthResponse = require("./AuthResponse");

var _TelemetryManager = _interopRequireDefault(require("./telemetry/TelemetryManager"));

var _Constants = require("./utils/Constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// default authority
var DEFAULT_AUTHORITY = "https://login.microsoftonline.com/common";
/**
 * @hidden
 * @ignore
 * response_type from OpenIDConnect
 * References: https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html & https://tools.ietf.org/html/rfc6749#section-4.2.1
 * Since we support only implicit flow in this library, we restrict the response_type support to only 'token' and 'id_token'
 *
 */

var ResponseTypes = {
  id_token: "id_token",
  token: "token",
  id_token_token: "id_token token"
};
/**
 * UserAgentApplication class
 *
 * Object Instance that the developer can use to make loginXX OR acquireTokenXX functions
 */

var UserAgentApplication =
/** @class */
function () {
  /**
   * @constructor
   * Constructor for the UserAgentApplication used to instantiate the UserAgentApplication object
   *
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application.
   * You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
   * - authority: the authority URL for your application.
   *
   * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
   * It is of the form https://login.microsoftonline.com/&lt;Enter_the_Tenant_Info_Here&gt;.
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   *
   * In Azure B2C, authority is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/&lt;policyName&gt;/
   *
   * @param {@link (Configuration:type)} configuration object for the MSAL UserAgentApplication instance
   */
  function UserAgentApplication(configuration) {
    // callbacks for token/error
    this.authResponseCallback = null;
    this.tokenReceivedCallback = null;
    this.errorReceivedCallback = null; // Set the Configuration

    this.config = (0, _Configuration.buildConfiguration)(configuration); // Set the callback boolean

    this.redirectCallbacksSet = false;
    this.logger = this.config.system.logger;
    this.clientId = this.config.auth.clientId;
    this.inCookie = this.config.cache.storeAuthStateInCookie;
    this.telemetryManager = this.getTelemetryManagerFromConfig(this.config.system.telemetry, this.clientId); // if no authority is passed, set the default: "https://login.microsoftonline.com/common"

    this.authority = this.config.auth.authority || DEFAULT_AUTHORITY; // cache keys msal - typescript throws an error if any value other than "localStorage" or "sessionStorage" is passed

    this.cacheStorage = new _AuthCache.AuthCache(this.clientId, this.config.cache.cacheLocation, this.inCookie); // Initialize window handling code

    window.activeRenewals = {};
    window.renewStates = [];
    window.callbackMappedToRenewStates = {};
    window.promiseMappedToRenewStates = {};
    window.msal = this;
    var urlHash = window.location.hash;

    var urlContainsHash = _UrlUtils.UrlUtils.urlContainsHash(urlHash); // check if back button is pressed


    _WindowUtils.WindowUtils.checkIfBackButtonIsPressed(this.cacheStorage); // On the server 302 - Redirect, handle this


    if (urlContainsHash && !_WindowUtils.WindowUtils.isInIframe() && !_WindowUtils.WindowUtils.isInPopup()) {
      this.handleAuthenticationResponse(urlHash);
    }
  }

  Object.defineProperty(UserAgentApplication.prototype, "authority", {
    /**
     * Method to manage the authority URL.
     *
     * @returns {string} authority
     */
    get: function () {
      return this.authorityInstance.CanonicalAuthority;
    },

    /**
     * setter for the authority URL
     * @param {string} authority
     */
    // If the developer passes an authority, create an instance
    set: function (val) {
      this.authorityInstance = _AuthorityFactory.AuthorityFactory.CreateInstance(val, this.config.auth.validateAuthority);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Get the current authority instance from the MSAL configuration object
   *
   * @returns {@link Authority} authority instance
   */

  UserAgentApplication.prototype.getAuthorityInstance = function () {
    return this.authorityInstance;
  };

  UserAgentApplication.prototype.handleRedirectCallback = function (authOrTokenCallback, errorReceivedCallback) {
    if (!authOrTokenCallback) {
      this.redirectCallbacksSet = false;
      throw _ClientConfigurationError.ClientConfigurationError.createInvalidCallbackObjectError(authOrTokenCallback);
    } // Set callbacks


    if (errorReceivedCallback) {
      this.tokenReceivedCallback = authOrTokenCallback;
      this.errorReceivedCallback = errorReceivedCallback;
      this.logger.warning("This overload for callback is deprecated - please change the format of the callbacks to a single callback as shown: (err: AuthError, response: AuthResponse).");
    } else {
      this.authResponseCallback = authOrTokenCallback;
    }

    this.redirectCallbacksSet = true; // On the server 302 - Redirect, handle this

    var cachedHash = this.cacheStorage.getItem(_Constants.TemporaryCacheKeys.URL_HASH);

    if (cachedHash) {
      this.processCallBack(cachedHash, null);
    }
  };
  /**
   * Public API to verify if the URL contains the hash with known properties
   * @param hash
   */


  UserAgentApplication.prototype.urlContainsHash = function (hash) {
    return _UrlUtils.UrlUtils.urlContainsHash(hash);
  };

  UserAgentApplication.prototype.authResponseHandler = function (interactionType, response, resolve) {
    if (interactionType === _Constants.Constants.interactionTypeRedirect) {
      if (this.errorReceivedCallback) {
        this.tokenReceivedCallback(response);
      } else if (this.authResponseCallback) {
        this.authResponseCallback(null, response);
      }
    } else if (interactionType === _Constants.Constants.interactionTypePopup) {
      resolve(response);
    } else {
      throw _ClientAuthError.ClientAuthError.createInvalidInteractionTypeError();
    }
  };

  UserAgentApplication.prototype.authErrorHandler = function (interactionType, authErr, response, reject) {
    // set interaction_status to complete
    this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);

    if (interactionType === _Constants.Constants.interactionTypeRedirect) {
      if (this.errorReceivedCallback) {
        this.errorReceivedCallback(authErr, response.accountState);
      } else {
        this.authResponseCallback(authErr, response);
      }
    } else if (interactionType === _Constants.Constants.interactionTypePopup) {
      reject(authErr);
    } else {
      throw _ClientAuthError.ClientAuthError.createInvalidInteractionTypeError();
    }
  }; // #endregion

  /**
   * Use when initiating the login process by redirecting the user's browser to the authorization endpoint.
   * @param {@link (AuthenticationParameters:type)}
   */


  UserAgentApplication.prototype.loginRedirect = function (userRequest) {
    // validate request
    var request = _RequestUtils.RequestUtils.validateRequest(userRequest, true, this.clientId, _Constants.Constants.interactionTypeRedirect, this.redirectCallbacksSet);

    this.acquireTokenInteractive(_Constants.Constants.interactionTypeRedirect, true, request, null, null);
  };
  /**
   * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint.
   * @param {@link (AuthenticationParameters:type)}
   *
   * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
   */


  UserAgentApplication.prototype.acquireTokenRedirect = function (userRequest) {
    // validate request
    var request = _RequestUtils.RequestUtils.validateRequest(userRequest, false, this.clientId, _Constants.Constants.interactionTypeRedirect, this.redirectCallbacksSet);

    this.acquireTokenInteractive(_Constants.Constants.interactionTypeRedirect, false, request, null, null);
  };
  /**
   * Use when initiating the login process via opening a popup window in the user's browser
   *
   * @param {@link (AuthenticationParameters:type)}
   *
   * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
   */


  UserAgentApplication.prototype.loginPopup = function (userRequest) {
    var _this = this; // validate request


    var request = _RequestUtils.RequestUtils.validateRequest(userRequest, true, this.clientId, _Constants.Constants.interactionTypePopup);

    return new Promise(function (resolve, reject) {
      _this.acquireTokenInteractive(_Constants.Constants.interactionTypePopup, true, request, resolve, reject);
    }).catch(function (error) {
      _this.cacheStorage.resetTempCacheItems(request.state);

      throw error;
    });
  };
  /**
   * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
   * @param {@link AuthenticationParameters}
   *
   * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
   * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
   */


  UserAgentApplication.prototype.acquireTokenPopup = function (userRequest) {
    var _this = this; // validate request


    var request = _RequestUtils.RequestUtils.validateRequest(userRequest, false, this.clientId, _Constants.Constants.interactionTypePopup);

    return new Promise(function (resolve, reject) {
      _this.acquireTokenInteractive(_Constants.Constants.interactionTypePopup, false, request, resolve, reject);
    }).catch(function (error) {
      _this.cacheStorage.resetTempCacheItems(request.state);

      throw error;
    });
  }; // #region Acquire Token

  /**
   * Use when initiating the login process or when you want to obtain an access_token for your API,
   * either by redirecting the user's browser window to the authorization endpoint or via opening a popup window in the user's browser.
   * @param {@link (AuthenticationParameters:type)}
   *
   * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
   */


  UserAgentApplication.prototype.acquireTokenInteractive = function (interactionType, isLoginCall, request, resolve, reject) {
    var _this = this; // block the request if made from the hidden iframe


    _WindowUtils.WindowUtils.blockReloadInHiddenIframes();

    var interactionProgress = this.cacheStorage.getItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);

    if (interactionType === _Constants.Constants.interactionTypeRedirect) {
      this.cacheStorage.setItem(_Constants.TemporaryCacheKeys.REDIRECT_REQUEST, "" + _Constants.Constants.inProgress + _Constants.Constants.resourceDelimiter + request.state);
    } // If already in progress, do not proceed


    if (interactionProgress === _Constants.Constants.inProgress) {
      var thrownError = isLoginCall ? _ClientAuthError.ClientAuthError.createLoginInProgressError() : _ClientAuthError.ClientAuthError.createAcquireTokenInProgressError();
      var stateOnlyResponse = (0, _AuthResponse.buildResponseStateOnly)(this.getAccountState(request.state));
      this.cacheStorage.resetTempCacheItems(request.state);
      this.authErrorHandler(interactionType, thrownError, stateOnlyResponse, reject);
      return;
    } // Get the account object if a session exists


    var account = request && request.account && !isLoginCall ? request.account : this.getAccount(); // If no session exists, prompt the user to login.

    if (!account && !_ServerRequestParameters.ServerRequestParameters.isSSOParam(request)) {
      if (isLoginCall) {
        // extract ADAL id_token if exists
        var adalIdToken = this.extractADALIdToken(); // silent login if ADAL id_token is retrieved successfully - SSO

        if (adalIdToken && !request.scopes) {
          this.logger.info("ADAL's idToken exists. Extracting login information from ADAL's idToken ");
          var tokenRequest = this.buildIDTokenRequest(request);
          this.silentLogin = true;
          this.acquireTokenSilent(tokenRequest).then(function (response) {
            _this.silentLogin = false;

            _this.logger.info("Unified cache call is successful");

            _this.authResponseHandler(interactionType, response, resolve);

            return;
          }, function (error) {
            _this.silentLogin = false;

            _this.logger.error("Error occurred during unified cache ATS: " + error); // proceed to login since ATS failed


            _this.acquireTokenHelper(null, interactionType, isLoginCall, request, resolve, reject);
          });
        } // No ADAL token found, proceed to login
        else {
            this.acquireTokenHelper(null, interactionType, isLoginCall, request, resolve, reject);
          }
      } // AcquireToken call, but no account or context given, so throw error
      else {
          this.logger.info("User login is required");
          var stateOnlyResponse = (0, _AuthResponse.buildResponseStateOnly)(this.getAccountState(request.state));
          this.cacheStorage.resetTempCacheItems(request.state);
          this.authErrorHandler(interactionType, _ClientAuthError.ClientAuthError.createUserLoginRequiredError(), stateOnlyResponse, reject);
          return;
        }
    } // User session exists
    else {
        this.acquireTokenHelper(account, interactionType, isLoginCall, request, resolve, reject);
      }
  };
  /**
   * @hidden
   * @ignore
   * Helper function to acquireToken
   *
   */


  UserAgentApplication.prototype.acquireTokenHelper = function (account, interactionType, isLoginCall, request, resolve, reject) {
    var _this = this; // Track the acquireToken progress


    this.cacheStorage.setItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS, _Constants.Constants.inProgress);
    var scope = request.scopes ? request.scopes.join(" ").toLowerCase() : this.clientId.toLowerCase();
    var serverAuthenticationRequest;
    var acquireTokenAuthority = request && request.authority ? _AuthorityFactory.AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority) : this.authorityInstance;
    var popUpWindow;

    if (interactionType === _Constants.Constants.interactionTypePopup) {
      // Generate a popup window
      try {
        popUpWindow = this.openPopup("about:blank", "msal", _Constants.Constants.popUpWidth, _Constants.Constants.popUpHeight); // Push popup window handle onto stack for tracking

        _WindowUtils.WindowUtils.trackPopup(popUpWindow);
      } catch (e) {
        this.logger.info(_ClientAuthError.ClientAuthErrorMessage.popUpWindowError.code + ":" + _ClientAuthError.ClientAuthErrorMessage.popUpWindowError.desc);
        this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR, _ClientAuthError.ClientAuthErrorMessage.popUpWindowError.code);
        this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR_DESC, _ClientAuthError.ClientAuthErrorMessage.popUpWindowError.desc);

        if (reject) {
          reject(_ClientAuthError.ClientAuthError.createPopupWindowError());
        }
      }

      if (!popUpWindow) {
        return;
      }
    }

    acquireTokenAuthority.resolveEndpointsAsync().then(function () {
      return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var responseType, loginStartPage, urlNavigate, hash, error_1;
        return tslib_1.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              responseType = isLoginCall ? ResponseTypes.id_token : this.getTokenType(account, request.scopes, false);

              if (isLoginCall) {
                // if the user sets the login start page - angular only??
                loginStartPage = this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.ANGULAR_LOGIN_REQUEST + _Constants.Constants.resourceDelimiter + request.state);

                if (!loginStartPage || loginStartPage === "") {
                  loginStartPage = window.location.href;
                } else {
                  this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.ANGULAR_LOGIN_REQUEST + _Constants.Constants.resourceDelimiter + request.state, "");
                }
              }

              serverAuthenticationRequest = new _ServerRequestParameters.ServerRequestParameters(acquireTokenAuthority, this.clientId, responseType, this.getRedirectUri(request && request.redirectUri), request.scopes, request.state, request.correlationId);
              this.updateCacheEntries(serverAuthenticationRequest, account, loginStartPage); // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer

              serverAuthenticationRequest.populateQueryParams(account, request);
              urlNavigate = _UrlUtils.UrlUtils.createNavigateUrl(serverAuthenticationRequest) + _Constants.Constants.response_mode_fragment; // set state in cache

              if (interactionType === _Constants.Constants.interactionTypeRedirect) {
                if (!isLoginCall) {
                  this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.STATE_ACQ_TOKEN + _Constants.Constants.resourceDelimiter + request.state, serverAuthenticationRequest.state, this.inCookie);
                }
              } else if (interactionType === _Constants.Constants.interactionTypePopup) {
                window.renewStates.push(serverAuthenticationRequest.state);
                window.requestType = isLoginCall ? _Constants.Constants.login : _Constants.Constants.renewToken; // Register callback to capture results from server

                this.registerCallback(serverAuthenticationRequest.state, scope, resolve, reject);
              } else {
                throw _ClientAuthError.ClientAuthError.createInvalidInteractionTypeError();
              } // prompt user for interaction


              this.navigateWindow(urlNavigate, popUpWindow);
              if (!popUpWindow) return [3
              /*break*/
              , 4];
              _a.label = 1;

            case 1:
              _a.trys.push([1, 3,, 4]);

              return [4
              /*yield*/
              , _WindowUtils.WindowUtils.monitorWindowForHash(popUpWindow, this.config.system.loadFrameTimeout, urlNavigate)];

            case 2:
              hash = _a.sent();
              this.handleAuthenticationResponse(hash); // Request completed successfully, set to completed

              this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);
              this.logger.info("Closing popup window"); // TODO: Check how this can be extracted for any framework specific code?

              if (this.config.framework.isAngular) {
                this.broadcast("msal:popUpHashChanged", hash);

                _WindowUtils.WindowUtils.closePopups();
              }

              return [3
              /*break*/
              , 4];

            case 3:
              error_1 = _a.sent();

              if (reject) {
                reject(error_1);
              }

              if (this.config.framework.isAngular) {
                this.broadcast("msal:popUpClosed", error_1.errorCode + _Constants.Constants.resourceDelimiter + error_1.errorMessage);
              } else {
                // Request failed, set to canceled
                this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);
                popUpWindow.close();
              }

              return [3
              /*break*/
              , 4];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    }).catch(function (err) {
      _this.logger.warning("could not resolve endpoints");

      _this.cacheStorage.resetTempCacheItems(request.state);

      _this.authErrorHandler(interactionType, _ClientAuthError.ClientAuthError.createEndpointResolutionError(err.toString), (0, _AuthResponse.buildResponseStateOnly)(request.state), reject);

      if (popUpWindow) {
        popUpWindow.close();
      }
    });
  };
  /**
   * Use this function to obtain a token before every call to the API / resource provider
   *
   * MSAL return's a cached token when available
   * Or it send's a request to the STS to obtain a new token using a hidden iframe.
   *
   * @param {@link AuthenticationParameters}
   *
   * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
   * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
   *
   */


  UserAgentApplication.prototype.acquireTokenSilent = function (userRequest) {
    var _this = this; // validate the request


    var request = _RequestUtils.RequestUtils.validateRequest(userRequest, false, this.clientId);

    return new Promise(function (resolve, reject) {
      // block the request if made from the hidden iframe
      _WindowUtils.WindowUtils.blockReloadInHiddenIframes();

      var scope = request.scopes.join(" ").toLowerCase(); // if the developer passes an account, give that account the priority

      var account = request.account || _this.getAccount(); // extract if there is an adalIdToken stashed in the cache


      var adalIdToken = _this.cacheStorage.getItem(_Constants.Constants.adalIdToken); // if there is no account logged in and no login_hint/sid is passed in the request


      if (!account && !(request.sid || request.loginHint) && _StringUtils.StringUtils.isEmpty(adalIdToken)) {
        _this.logger.info("User login is required");

        return reject(_ClientAuthError.ClientAuthError.createUserLoginRequiredError());
      } // set the response type based on the current cache status / scopes set


      var responseType = _this.getTokenType(account, request.scopes, true); // create a serverAuthenticationRequest populating the `queryParameters` to be sent to the Server


      var serverAuthenticationRequest = new _ServerRequestParameters.ServerRequestParameters(_AuthorityFactory.AuthorityFactory.CreateInstance(request.authority, _this.config.auth.validateAuthority), _this.clientId, responseType, _this.getRedirectUri(request.redirectUri), request.scopes, request.state, request.correlationId); // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer

      if (_ServerRequestParameters.ServerRequestParameters.isSSOParam(request) || account) {
        serverAuthenticationRequest.populateQueryParams(account, request);
      } // if user didn't pass login_hint/sid and adal's idtoken is present, extract the login_hint from the adalIdToken
      else if (!account && !_StringUtils.StringUtils.isEmpty(adalIdToken)) {
          // if adalIdToken exists, extract the SSO info from the same
          var adalIdTokenObject = _TokenUtils.TokenUtils.extractIdToken(adalIdToken);

          _this.logger.verbose("ADAL's idToken exists. Extracting login information from ADAL's idToken ");

          serverAuthenticationRequest.populateQueryParams(account, null, adalIdTokenObject);
        }

      var userContainedClaims = request.claimsRequest || serverAuthenticationRequest.claimsValue;
      var authErr;
      var cacheResultResponse;

      if (!userContainedClaims && !request.forceRefresh) {
        try {
          cacheResultResponse = _this.getCachedToken(serverAuthenticationRequest, account);
        } catch (e) {
          authErr = e;
        }
      } // resolve/reject based on cacheResult


      if (cacheResultResponse) {
        _this.logger.info("Token is already in cache for scope:" + scope);

        resolve(cacheResultResponse);
        return null;
      } else if (authErr) {
        _this.logger.infoPii(authErr.errorCode + ":" + authErr.errorMessage);

        reject(authErr);
        return null;
      } // else proceed with login
      else {
          var logMessage = void 0;

          if (userContainedClaims) {
            logMessage = "Skipped cache lookup since claims were given.";
          } else if (request.forceRefresh) {
            logMessage = "Skipped cache lookup since request.forceRefresh option was set to true";
          } else {
            logMessage = "Token is not in cache for scope:" + scope;
          }

          _this.logger.verbose(logMessage); // Cache result can return null if cache is empty. In that case, set authority to default value if no authority is passed to the api.


          if (!serverAuthenticationRequest.authorityInstance) {
            serverAuthenticationRequest.authorityInstance = request.authority ? _AuthorityFactory.AuthorityFactory.CreateInstance(request.authority, _this.config.auth.validateAuthority) : _this.authorityInstance;
          } // cache miss


          return serverAuthenticationRequest.authorityInstance.resolveEndpointsAsync().then(function () {
            /*
             * refresh attempt with iframe
             * Already renewing for this scope, callback when we get the token.
             */
            if (window.activeRenewals[scope]) {
              _this.logger.verbose("Renew token for scope: " + scope + " is in progress. Registering callback"); // Active renewals contains the state for each renewal.


              _this.registerCallback(window.activeRenewals[scope], scope, resolve, reject);
            } else {
              if (request.scopes && request.scopes.indexOf(_this.clientId) > -1 && request.scopes.length === 1) {
                /*
                 * App uses idToken to send to api endpoints
                 * Default scope is tracked as clientId to store this token
                 */
                _this.logger.verbose("renewing idToken");

                _this.silentLogin = true;

                _this.renewIdToken(request.scopes, resolve, reject, account, serverAuthenticationRequest);
              } else {
                // renew access token
                _this.logger.verbose("renewing accesstoken");

                _this.renewToken(request.scopes, resolve, reject, account, serverAuthenticationRequest);
              }
            }
          }).catch(function (err) {
            _this.logger.warning("could not resolve endpoints");

            reject(_ClientAuthError.ClientAuthError.createEndpointResolutionError(err.toString()));
            return null;
          });
        }
    }).catch(function (error) {
      _this.cacheStorage.resetTempCacheItems(request.state);

      throw error;
    });
  }; // #endregion
  // #region Popup Window Creation

  /**
   * @hidden
   *
   * Configures popup window for login.
   *
   * @param urlNavigate
   * @param title
   * @param popUpWidth
   * @param popUpHeight
   * @ignore
   * @hidden
   */


  UserAgentApplication.prototype.openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
    try {
      /**
       * adding winLeft and winTop to account for dual monitor
       * using screenLeft and screenTop for IE8 and earlier
       */
      var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
      var winTop = window.screenTop ? window.screenTop : window.screenY;
      /**
       * window.innerWidth displays browser window"s height and width excluding toolbars
       * using document.documentElement.clientWidth for IE8 and earlier
       */

      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var left = width / 2 - popUpWidth / 2 + winLeft;
      var top_1 = height / 2 - popUpHeight / 2 + winTop; // open the window

      var popupWindow = window.open(urlNavigate, title, "width=" + popUpWidth + ", height=" + popUpHeight + ", top=" + top_1 + ", left=" + left);

      if (!popupWindow) {
        throw _ClientAuthError.ClientAuthError.createPopupWindowError();
      }

      if (popupWindow.focus) {
        popupWindow.focus();
      }

      return popupWindow;
    } catch (e) {
      this.logger.error("error opening popup " + e.message);
      this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);
      throw _ClientAuthError.ClientAuthError.createPopupWindowError(e.toString());
    }
  }; // #endregion
  // #region Iframe Management

  /**
   * @hidden
   * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
   * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
   * @ignore
   */


  UserAgentApplication.prototype.loadIframeTimeout = function (urlNavigate, frameName, scope) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
      var expectedState, iframe, hash, error_2;
      return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            expectedState = window.activeRenewals[scope];
            this.logger.verbose("Set loading state to pending for: " + scope + ":" + expectedState);
            this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.RENEW_STATUS + _Constants.Constants.resourceDelimiter + expectedState, _Constants.Constants.inProgress);
            return [4
            /*yield*/
            , _WindowUtils.WindowUtils.loadFrame(urlNavigate, frameName, this.config.system.navigateFrameWait, this.logger)];

          case 1:
            iframe = _a.sent();
            _a.label = 2;

          case 2:
            _a.trys.push([2, 4,, 5]);

            return [4
            /*yield*/
            , _WindowUtils.WindowUtils.monitorWindowForHash(iframe.contentWindow, this.config.system.loadFrameTimeout, urlNavigate)];

          case 3:
            hash = _a.sent();

            if (hash) {
              this.handleAuthenticationResponse(hash);
            }

            return [3
            /*break*/
            , 5];

          case 4:
            error_2 = _a.sent();

            if (this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.RENEW_STATUS + _Constants.Constants.resourceDelimiter + expectedState) === _Constants.Constants.inProgress) {
              // fail the iframe session if it's in pending state
              this.logger.verbose("Loading frame has timed out after: " + this.config.system.loadFrameTimeout / 1000 + " seconds for scope " + scope + ":" + expectedState); // Error after timeout

              if (expectedState && window.callbackMappedToRenewStates[expectedState]) {
                window.callbackMappedToRenewStates[expectedState](null, error_2);
              }

              this.cacheStorage.removeItem("" + _Constants.TemporaryCacheKeys.RENEW_STATUS + _Constants.Constants.resourceDelimiter + expectedState);
            }

            _WindowUtils.WindowUtils.removeHiddenIframe(iframe);

            throw error_2;

          case 5:
            _WindowUtils.WindowUtils.removeHiddenIframe(iframe);

            return [2
            /*return*/
            ];
        }
      });
    });
  }; // #endregion
  // #region General Helpers

  /**
   * @hidden
   * Used to redirect the browser to the STS authorization endpoint
   * @param {string} urlNavigate - URL of the authorization endpoint
   */


  UserAgentApplication.prototype.navigateWindow = function (urlNavigate, popupWindow) {
    // Navigate if valid URL
    if (urlNavigate && !_StringUtils.StringUtils.isEmpty(urlNavigate)) {
      var navigateWindow = popupWindow ? popupWindow : window;
      var logMessage = popupWindow ? "Navigated Popup window to:" + urlNavigate : "Navigate to:" + urlNavigate;
      this.logger.infoPii(logMessage);
      navigateWindow.location.assign(urlNavigate);
    } else {
      this.logger.info("Navigate url is empty");
      throw _AuthError.AuthError.createUnexpectedError("Navigate url is empty");
    }
  };
  /**
   * @hidden
   * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
   * @param {string} expectedState - Unique state identifier (guid).
   * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
   * @param {Function} resolve - The resolve function of the promise object.
   * @param {Function} reject - The reject function of the promise object.
   * @ignore
   */


  UserAgentApplication.prototype.registerCallback = function (expectedState, scope, resolve, reject) {
    var _this = this; // track active renewals


    window.activeRenewals[scope] = expectedState; // initialize callbacks mapped array

    if (!window.promiseMappedToRenewStates[expectedState]) {
      window.promiseMappedToRenewStates[expectedState] = [];
    } // indexing on the current state, push the callback params to callbacks mapped


    window.promiseMappedToRenewStates[expectedState].push({
      resolve: resolve,
      reject: reject
    }); // Store the server response in the current window??

    if (!window.callbackMappedToRenewStates[expectedState]) {
      window.callbackMappedToRenewStates[expectedState] = function (response, error) {
        // reset active renewals
        window.activeRenewals[scope] = null; // for all promiseMappedtoRenewStates for a given 'state' - call the reject/resolve with error/token respectively

        for (var i = 0; i < window.promiseMappedToRenewStates[expectedState].length; ++i) {
          try {
            if (error) {
              window.promiseMappedToRenewStates[expectedState][i].reject(error);
            } else if (response) {
              window.promiseMappedToRenewStates[expectedState][i].resolve(response);
            } else {
              _this.cacheStorage.resetTempCacheItems(expectedState);

              throw _AuthError.AuthError.createUnexpectedError("Error and response are both null");
            }
          } catch (e) {
            _this.logger.warning(e);
          }
        } // reset


        window.promiseMappedToRenewStates[expectedState] = null;
        window.callbackMappedToRenewStates[expectedState] = null;
      };
    }
  }; // #endregion
  // #region Logout

  /**
   * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   */


  UserAgentApplication.prototype.logout = function () {
    var _this = this;

    this.clearCache();
    this.account = null;
    var logout = "";

    if (this.getPostLogoutRedirectUri()) {
      logout = "post_logout_redirect_uri=" + encodeURIComponent(this.getPostLogoutRedirectUri());
    }

    this.authorityInstance.resolveEndpointsAsync().then(function (authority) {
      var urlNavigate = authority.EndSessionEndpoint ? authority.EndSessionEndpoint + "?" + logout : _this.authority + "oauth2/v2.0/logout?" + logout;

      _this.navigateWindow(urlNavigate);
    });
  };
  /**
   * @hidden
   * Clear all access tokens in the cache.
   * @ignore
   */


  UserAgentApplication.prototype.clearCache = function () {
    window.renewStates = [];
    var accessTokenItems = this.cacheStorage.getAllAccessTokens(_Constants.Constants.clientId, _Constants.Constants.homeAccountIdentifier);

    for (var i = 0; i < accessTokenItems.length; i++) {
      this.cacheStorage.removeItem(JSON.stringify(accessTokenItems[i].key));
    }

    this.cacheStorage.resetCacheItems(); // state not being sent would mean this call may not be needed; check later

    this.cacheStorage.clearMsalCookie();
  };
  /**
   * @hidden
   * Clear a given access token from the cache.
   *
   * @param accessToken
   */


  UserAgentApplication.prototype.clearCacheForScope = function (accessToken) {
    var accessTokenItems = this.cacheStorage.getAllAccessTokens(_Constants.Constants.clientId, _Constants.Constants.homeAccountIdentifier);

    for (var i = 0; i < accessTokenItems.length; i++) {
      var token = accessTokenItems[i];

      if (token.value.accessToken === accessToken) {
        this.cacheStorage.removeItem(JSON.stringify(token.key));
      }
    }
  }; // #endregion
  // #region Response

  /**
   * @hidden
   * @ignore
   * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
   * @param {string} hash - Hash passed from redirect page.
   * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
   */


  UserAgentApplication.prototype.isCallback = function (hash) {
    this.logger.info("isCallback will be deprecated in favor of urlContainsHash in MSAL.js v2.0.");
    return _UrlUtils.UrlUtils.urlContainsHash(hash);
  };
  /**
   * @hidden
   * Used to call the constructor callback with the token/error
   * @param {string} [hash=window.location.hash] - Hash fragment of Url.
   */


  UserAgentApplication.prototype.processCallBack = function (hash, stateInfo, parentCallback) {
    this.logger.info("Processing the callback from redirect response"); // get the state info from the hash

    if (!stateInfo) {
      stateInfo = this.getResponseState(hash);
    }

    var response;
    var authErr; // Save the token info from the hash

    try {
      response = this.saveTokenFromHash(hash, stateInfo);
    } catch (err) {
      authErr = err;
    } // remove hash from the cache


    this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.URL_HASH);

    try {
      // Clear the cookie in the hash
      this.cacheStorage.clearMsalCookie(stateInfo.state);
      var accountState = this.getAccountState(stateInfo.state);

      if (response) {
        if (stateInfo.requestType === _Constants.Constants.renewToken || response.accessToken) {
          if (window.parent !== window) {
            this.logger.verbose("Window is in iframe, acquiring token silently");
          } else {
            this.logger.verbose("acquiring token interactive in progress");
          }

          response.tokenType = _Constants.ServerHashParamKeys.ACCESS_TOKEN;
        } else if (stateInfo.requestType === _Constants.Constants.login) {
          response.tokenType = _Constants.ServerHashParamKeys.ID_TOKEN;
        }

        if (!parentCallback) {
          this.authResponseHandler(_Constants.Constants.interactionTypeRedirect, response);
          return;
        }
      } else if (!parentCallback) {
        this.cacheStorage.resetTempCacheItems(stateInfo.state);
        this.authErrorHandler(_Constants.Constants.interactionTypeRedirect, authErr, (0, _AuthResponse.buildResponseStateOnly)(accountState));
        return;
      }

      parentCallback(response, authErr);
    } catch (err) {
      this.logger.error("Error occurred in token received callback function: " + err);
      throw _ClientAuthError.ClientAuthError.createErrorInCallbackFunction(err.toString());
    }
  };
  /**
   * @hidden
   * This method must be called for processing the response received from the STS. It extracts the hash, processes the token or error information and saves it in the cache. It then
   * calls the registered callbacks in case of redirect or resolves the promises with the result.
   * @param {string} [hash=window.location.hash] - Hash fragment of Url.
   */


  UserAgentApplication.prototype.handleAuthenticationResponse = function (hash) {
    // retrieve the hash
    var locationHash = hash || window.location.hash; // Check if the current flow is popup or hidden iframe

    var iframeWithHash = _WindowUtils.WindowUtils.getIframeWithHash(locationHash);

    var popUpWithHash = _WindowUtils.WindowUtils.getPopUpWithHash(locationHash);

    var isPopupOrIframe = !!(iframeWithHash || popUpWithHash); // if (window.parent !== window), by using self, window.parent becomes equal to window in getResponseState method specifically

    var stateInfo = this.getResponseState(locationHash);
    var tokenResponseCallback = null;
    this.logger.info("Returned from redirect url"); // If parent window is the msal instance which opened the current window (iframe)

    if (isPopupOrIframe) {
      tokenResponseCallback = window.callbackMappedToRenewStates[stateInfo.state];
    } else {
      // Redirect cases
      tokenResponseCallback = null; // if set to navigate to loginRequest page post login

      if (this.config.auth.navigateToLoginRequestUrl) {
        this.cacheStorage.setItem(_Constants.TemporaryCacheKeys.URL_HASH, locationHash);

        if (window.parent === window) {
          var loginRequestUrl = this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.LOGIN_REQUEST + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie); // Redirect to home page if login request url is null (real null or the string null)

          if (!loginRequestUrl || loginRequestUrl === "null") {
            this.logger.error("Unable to get valid login request url from cache, redirecting to home page");
            window.location.href = "/";
          } else {
            window.location.href = loginRequestUrl;
          }
        }

        return;
      } else {
        window.location.hash = "";
      }

      if (!this.redirectCallbacksSet) {
        // We reached this point too early - cache hash, return and process in handleRedirectCallbacks
        this.cacheStorage.setItem(_Constants.TemporaryCacheKeys.URL_HASH, locationHash);
        return;
      }
    }

    this.processCallBack(locationHash, stateInfo, tokenResponseCallback); // If current window is opener, close all windows

    if (isPopupOrIframe) {
      _WindowUtils.WindowUtils.closePopups();
    }
  };
  /**
   * @hidden
   * Creates a stateInfo object from the URL fragment and returns it.
   * @param {string} hash  -  Hash passed from redirect page
   * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
   * @ignore
   */


  UserAgentApplication.prototype.getResponseState = function (hash) {
    var parameters = _UrlUtils.UrlUtils.deserializeHash(hash);

    var stateResponse;

    if (!parameters) {
      throw _AuthError.AuthError.createUnexpectedError("Hash was not parsed correctly.");
    }

    if (parameters.hasOwnProperty("state")) {
      stateResponse = {
        requestType: _Constants.Constants.unknown,
        state: parameters.state,
        stateMatch: false
      };
    } else {
      throw _AuthError.AuthError.createUnexpectedError("Hash does not contain state.");
    }
    /*
     * async calls can fire iframe and login request at the same time if developer does not use the API as expected
     * incoming callback needs to be looked up to find the request type
     */
    // loginRedirect


    if (stateResponse.state === this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.STATE_LOGIN + _Constants.Constants.resourceDelimiter + stateResponse.state, this.inCookie) || stateResponse.state === this.silentAuthenticationState) {
      // loginRedirect
      stateResponse.requestType = _Constants.Constants.login;
      stateResponse.stateMatch = true;
      return stateResponse;
    } // acquireTokenRedirect
    else if (stateResponse.state === this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.STATE_ACQ_TOKEN + _Constants.Constants.resourceDelimiter + stateResponse.state, this.inCookie)) {
        // acquireTokenRedirect
        stateResponse.requestType = _Constants.Constants.renewToken;
        stateResponse.stateMatch = true;
        return stateResponse;
      } // external api requests may have many renewtoken requests for different resource


    if (!stateResponse.stateMatch) {
      stateResponse.requestType = window.requestType;
      var statesInParentContext = window.renewStates;

      for (var i = 0; i < statesInParentContext.length; i++) {
        if (statesInParentContext[i] === stateResponse.state) {
          stateResponse.stateMatch = true;
          break;
        }
      }
    }

    return stateResponse;
  }; // #endregion
  // #region Token Processing (Extract to TokenProcessing.ts)

  /**
   * @hidden
   * Used to get token for the specified set of scopes from the cache
   * @param {@link ServerRequestParameters} - Request sent to the STS to obtain an id_token/access_token
   * @param {Account} account - Account for which the scopes were requested
   */


  UserAgentApplication.prototype.getCachedToken = function (serverAuthenticationRequest, account) {
    var accessTokenCacheItem = null;
    var scopes = serverAuthenticationRequest.scopes; // filter by clientId and account

    var tokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, account ? account.homeAccountIdentifier : null); // No match found after initial filtering

    if (tokenCacheItems.length === 0) {
      return null;
    }

    var filteredItems = []; // if no authority passed

    if (!serverAuthenticationRequest.authority) {
      // filter by scope
      for (var i = 0; i < tokenCacheItems.length; i++) {
        var cacheItem = tokenCacheItems[i];
        var cachedScopes = cacheItem.key.scopes.split(" ");

        if (_ScopeSet.ScopeSet.containsScope(cachedScopes, scopes)) {
          filteredItems.push(cacheItem);
        }
      } // if only one cached token found


      if (filteredItems.length === 1) {
        accessTokenCacheItem = filteredItems[0];
        serverAuthenticationRequest.authorityInstance = _AuthorityFactory.AuthorityFactory.CreateInstance(accessTokenCacheItem.key.authority, this.config.auth.validateAuthority);
      } // if more than one cached token is found
      else if (filteredItems.length > 1) {
          throw _ClientAuthError.ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
        } // if no match found, check if there was a single authority used
        else {
            var authorityList = this.getUniqueAuthority(tokenCacheItems, "authority");

            if (authorityList.length > 1) {
              throw _ClientAuthError.ClientAuthError.createMultipleAuthoritiesInCacheError(scopes.toString());
            }

            serverAuthenticationRequest.authorityInstance = _AuthorityFactory.AuthorityFactory.CreateInstance(authorityList[0], this.config.auth.validateAuthority);
          }
    } // if an authority is passed in the API
    else {
        // filter by authority and scope
        for (var i = 0; i < tokenCacheItems.length; i++) {
          var cacheItem = tokenCacheItems[i];
          var cachedScopes = cacheItem.key.scopes.split(" ");

          if (_ScopeSet.ScopeSet.containsScope(cachedScopes, scopes) && _UrlUtils.UrlUtils.CanonicalizeUri(cacheItem.key.authority) === serverAuthenticationRequest.authority) {
            filteredItems.push(cacheItem);
          }
        } // no match


        if (filteredItems.length === 0) {
          return null;
        } // if only one cachedToken Found
        else if (filteredItems.length === 1) {
            accessTokenCacheItem = filteredItems[0];
          } else {
            // if more than one cached token is found
            throw _ClientAuthError.ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
          }
      }

    if (accessTokenCacheItem != null) {
      var expired = Number(accessTokenCacheItem.value.expiresIn); // If expiration is within offset, it will force renew

      var offset = this.config.system.tokenRenewalOffsetSeconds || 300;

      if (expired && expired > _TimeUtils.TimeUtils.now() + offset) {
        var idTokenObj = new _IdToken.IdToken(accessTokenCacheItem.value.idToken);

        if (!account) {
          account = this.getAccount();

          if (!account) {
            throw _AuthError.AuthError.createUnexpectedError("Account should not be null here.");
          }
        }

        var aState = this.getAccountState(serverAuthenticationRequest.state);
        var response = {
          uniqueId: "",
          tenantId: "",
          tokenType: accessTokenCacheItem.value.idToken === accessTokenCacheItem.value.accessToken ? _Constants.ServerHashParamKeys.ID_TOKEN : _Constants.ServerHashParamKeys.ACCESS_TOKEN,
          idToken: idTokenObj,
          idTokenClaims: idTokenObj.claims,
          accessToken: accessTokenCacheItem.value.accessToken,
          scopes: accessTokenCacheItem.key.scopes.split(" "),
          expiresOn: new Date(expired * 1000),
          account: account,
          accountState: aState,
          fromCache: true
        };

        _ResponseUtils.ResponseUtils.setResponseIdToken(response, idTokenObj);

        return response;
      } else {
        this.cacheStorage.removeItem(JSON.stringify(filteredItems[0].key));
        return null;
      }
    } else {
      return null;
    }
  };
  /**
   * @hidden
   * Used to get a unique list of authorities from the cache
   * @param {Array<AccessTokenCacheItem>}  accessTokenCacheItems - accessTokenCacheItems saved in the cache
   * @ignore
   */


  UserAgentApplication.prototype.getUniqueAuthority = function (accessTokenCacheItems, property) {
    var authorityList = [];
    var flags = [];
    accessTokenCacheItems.forEach(function (element) {
      if (element.key.hasOwnProperty(property) && flags.indexOf(element.key[property]) === -1) {
        flags.push(element.key[property]);
        authorityList.push(element.key[property]);
      }
    });
    return authorityList;
  };
  /**
   * @hidden
   * Check if ADAL id_token exists and return if exists.
   *
   */


  UserAgentApplication.prototype.extractADALIdToken = function () {
    var adalIdToken = this.cacheStorage.getItem(_Constants.Constants.adalIdToken);

    if (!_StringUtils.StringUtils.isEmpty(adalIdToken)) {
      return _TokenUtils.TokenUtils.extractIdToken(adalIdToken);
    }

    return null;
  };
  /**
   * @hidden
   * Acquires access token using a hidden iframe.
   * @ignore
   */


  UserAgentApplication.prototype.renewToken = function (scopes, resolve, reject, account, serverAuthenticationRequest) {
    var scope = scopes.join(" ").toLowerCase();
    this.logger.verbose("renewToken is called for scope:" + scope);
    var frameName = "msalRenewFrame" + scope;

    var frameHandle = _WindowUtils.WindowUtils.addHiddenIFrame(frameName, this.logger);

    this.updateCacheEntries(serverAuthenticationRequest, account);
    this.logger.verbose("Renew token Expected state: " + serverAuthenticationRequest.state); // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame

    var urlNavigate = _UrlUtils.UrlUtils.urlRemoveQueryStringParameter(_UrlUtils.UrlUtils.createNavigateUrl(serverAuthenticationRequest), _Constants.Constants.prompt) + _Constants.Constants.prompt_none + _Constants.Constants.response_mode_fragment;

    window.renewStates.push(serverAuthenticationRequest.state);
    window.requestType = _Constants.Constants.renewToken;
    this.registerCallback(serverAuthenticationRequest.state, scope, resolve, reject);
    this.logger.infoPii("Navigate to:" + urlNavigate);
    frameHandle.src = "about:blank";
    this.loadIframeTimeout(urlNavigate, frameName, scope).catch(function (error) {
      return reject(error);
    });
  };
  /**
   * @hidden
   * Renews idtoken for app's own backend when clientId is passed as a single scope in the scopes array.
   * @ignore
   */


  UserAgentApplication.prototype.renewIdToken = function (scopes, resolve, reject, account, serverAuthenticationRequest) {
    this.logger.info("renewidToken is called");
    var frameName = "msalIdTokenFrame";

    var frameHandle = _WindowUtils.WindowUtils.addHiddenIFrame(frameName, this.logger);

    this.updateCacheEntries(serverAuthenticationRequest, account);
    this.logger.verbose("Renew Idtoken Expected state: " + serverAuthenticationRequest.state); // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame

    var urlNavigate = _UrlUtils.UrlUtils.urlRemoveQueryStringParameter(_UrlUtils.UrlUtils.createNavigateUrl(serverAuthenticationRequest), _Constants.Constants.prompt) + _Constants.Constants.prompt_none + _Constants.Constants.response_mode_fragment;

    if (this.silentLogin) {
      window.requestType = _Constants.Constants.login;
      this.silentAuthenticationState = serverAuthenticationRequest.state;
    } else {
      window.requestType = _Constants.Constants.renewToken;
      window.renewStates.push(serverAuthenticationRequest.state);
    } // note: scope here is clientId


    this.registerCallback(serverAuthenticationRequest.state, this.clientId, resolve, reject);
    this.logger.infoPii("Navigate to:" + urlNavigate);
    frameHandle.src = "about:blank";
    this.loadIframeTimeout(urlNavigate, frameName, this.clientId).catch(function (error) {
      return reject(error);
    });
  };
  /**
   * @hidden
   *
   * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
   * @param {string} authority authority received in the redirect response from AAD.
   * @param {TokenResponse} requestInfo an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
   * @param {Account} account account object for which scopes are consented for. The default account is the logged in account.
   * @param {ClientInfo} clientInfo clientInfo received as part of the response comprising of fields uid and utid.
   * @param {IdToken} idToken idToken received as part of the response.
   * @ignore
   * @private
   */

  /* tslint:disable:no-string-literal */


  UserAgentApplication.prototype.saveAccessToken = function (response, authority, parameters, clientInfo, idTokenObj) {
    var scope;

    var accessTokenResponse = tslib_1.__assign({}, response);

    var clientObj = new _ClientInfo.ClientInfo(clientInfo);
    var expiration; // if the response contains "scope"

    if (parameters.hasOwnProperty(_Constants.ServerHashParamKeys.SCOPE)) {
      // read the scopes
      scope = parameters[_Constants.ServerHashParamKeys.SCOPE];
      var consentedScopes = scope.split(" "); // retrieve all access tokens from the cache, remove the dup scores

      var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, authority);

      for (var i = 0; i < accessTokenCacheItems.length; i++) {
        var accessTokenCacheItem = accessTokenCacheItems[i];

        if (accessTokenCacheItem.key.homeAccountIdentifier === response.account.homeAccountIdentifier) {
          var cachedScopes = accessTokenCacheItem.key.scopes.split(" ");

          if (_ScopeSet.ScopeSet.isIntersectingScopes(cachedScopes, consentedScopes)) {
            this.cacheStorage.removeItem(JSON.stringify(accessTokenCacheItem.key));
          }
        }
      } // Generate and cache accessTokenKey and accessTokenValue


      var expiresIn = _TimeUtils.TimeUtils.parseExpiresIn(parameters[_Constants.ServerHashParamKeys.EXPIRES_IN]);

      expiration = _TimeUtils.TimeUtils.now() + expiresIn;
      var accessTokenKey = new _AccessTokenKey.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
      var accessTokenValue = new _AccessTokenValue.AccessTokenValue(parameters[_Constants.ServerHashParamKeys.ACCESS_TOKEN], idTokenObj.rawIdToken, expiration.toString(), clientInfo);
      this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
      accessTokenResponse.accessToken = parameters[_Constants.ServerHashParamKeys.ACCESS_TOKEN];
      accessTokenResponse.scopes = consentedScopes;
    } // if the response does not contain "scope" - scope is usually client_id and the token will be id_token
    else {
        scope = this.clientId; // Generate and cache accessTokenKey and accessTokenValue

        var accessTokenKey = new _AccessTokenKey.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
        expiration = Number(idTokenObj.expiration);
        var accessTokenValue = new _AccessTokenValue.AccessTokenValue(parameters[_Constants.ServerHashParamKeys.ID_TOKEN], parameters[_Constants.ServerHashParamKeys.ID_TOKEN], expiration.toString(), clientInfo);
        this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
        accessTokenResponse.scopes = [scope];
        accessTokenResponse.accessToken = parameters[_Constants.ServerHashParamKeys.ID_TOKEN];
      }

    if (expiration) {
      accessTokenResponse.expiresOn = new Date(expiration * 1000);
    } else {
      this.logger.error("Could not parse expiresIn parameter");
    }

    return accessTokenResponse;
  };
  /**
   * @hidden
   * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the account object.
   * @ignore
   */


  UserAgentApplication.prototype.saveTokenFromHash = function (hash, stateInfo) {
    this.logger.info("State status:" + stateInfo.stateMatch + "; Request type:" + stateInfo.requestType);
    var response = {
      uniqueId: "",
      tenantId: "",
      tokenType: "",
      idToken: null,
      idTokenClaims: null,
      accessToken: null,
      scopes: [],
      expiresOn: null,
      account: null,
      accountState: "",
      fromCache: false
    };
    var error;

    var hashParams = _UrlUtils.UrlUtils.deserializeHash(hash);

    var authorityKey = "";
    var acquireTokenAccountKey = "";
    var idTokenObj = null; // If server returns an error

    if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.ERROR_DESCRIPTION) || hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.ERROR)) {
      this.logger.infoPii("Error :" + hashParams[_Constants.ServerHashParamKeys.ERROR] + "; Error description:" + hashParams[_Constants.ServerHashParamKeys.ERROR_DESCRIPTION]);
      this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR, hashParams[_Constants.ServerHashParamKeys.ERROR]);
      this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR_DESC, hashParams[_Constants.ServerHashParamKeys.ERROR_DESCRIPTION]); // login

      if (stateInfo.requestType === _Constants.Constants.login) {
        this.cacheStorage.setItem(_Constants.ErrorCacheKeys.LOGIN_ERROR, hashParams[_Constants.ServerHashParamKeys.ERROR_DESCRIPTION] + ":" + hashParams[_Constants.ServerHashParamKeys.ERROR]);
        authorityKey = _AuthCache.AuthCache.generateAuthorityKey(stateInfo.state);
      } // acquireToken


      if (stateInfo.requestType === _Constants.Constants.renewToken) {
        authorityKey = _AuthCache.AuthCache.generateAuthorityKey(stateInfo.state);
        var account = this.getAccount();
        var accountId = void 0;

        if (account && !_StringUtils.StringUtils.isEmpty(account.homeAccountIdentifier)) {
          accountId = account.homeAccountIdentifier;
        } else {
          accountId = _Constants.Constants.no_account;
        }

        acquireTokenAccountKey = _AuthCache.AuthCache.generateAcquireTokenAccountKey(accountId, stateInfo.state);
      }

      var _a = _Constants.ServerHashParamKeys.ERROR,
          hashErr = hashParams[_a],
          _b = _Constants.ServerHashParamKeys.ERROR_DESCRIPTION,
          hashErrDesc = hashParams[_b];

      if (_InteractionRequiredAuthError.InteractionRequiredAuthError.isInteractionRequiredError(hashErr) || _InteractionRequiredAuthError.InteractionRequiredAuthError.isInteractionRequiredError(hashErrDesc)) {
        error = new _InteractionRequiredAuthError.InteractionRequiredAuthError(hashParams[_Constants.ServerHashParamKeys.ERROR], hashParams[_Constants.ServerHashParamKeys.ERROR_DESCRIPTION]);
      } else {
        error = new _ServerError.ServerError(hashParams[_Constants.ServerHashParamKeys.ERROR], hashParams[_Constants.ServerHashParamKeys.ERROR_DESCRIPTION]);
      }
    } // If the server returns "Success"
    else {
        // Verify the state from redirect and record tokens to storage if exists
        if (stateInfo.stateMatch) {
          this.logger.info("State is right");

          if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.SESSION_STATE)) {
            this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.SESSION_STATE + _Constants.Constants.resourceDelimiter + stateInfo.state, hashParams[_Constants.ServerHashParamKeys.SESSION_STATE]);
          }

          response.accountState = this.getAccountState(stateInfo.state);
          var clientInfo = ""; // Process access_token

          if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.ACCESS_TOKEN)) {
            this.logger.info("Fragment has access token"); // retrieve the id_token from response if present

            if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.ID_TOKEN)) {
              idTokenObj = new _IdToken.IdToken(hashParams[_Constants.ServerHashParamKeys.ID_TOKEN]);
              response.idToken = idTokenObj;
              response.idTokenClaims = idTokenObj.claims;
            } else {
              idTokenObj = new _IdToken.IdToken(this.cacheStorage.getItem(_Constants.PersistentCacheKeys.IDTOKEN));
              response = _ResponseUtils.ResponseUtils.setResponseIdToken(response, idTokenObj);
            } // set authority


            var authority = this.populateAuthority(stateInfo.state, this.inCookie, this.cacheStorage, idTokenObj); // retrieve client_info - if it is not found, generate the uid and utid from idToken

            if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.CLIENT_INFO)) {
              clientInfo = hashParams[_Constants.ServerHashParamKeys.CLIENT_INFO];
            } else {
              this.logger.warning("ClientInfo not received in the response from AAD");
              throw _ClientAuthError.ClientAuthError.createClientInfoNotPopulatedError("ClientInfo not received in the response from the server");
            }

            response.account = _Account.Account.createAccount(idTokenObj, new _ClientInfo.ClientInfo(clientInfo));
            var accountKey = void 0;

            if (response.account && !_StringUtils.StringUtils.isEmpty(response.account.homeAccountIdentifier)) {
              accountKey = response.account.homeAccountIdentifier;
            } else {
              accountKey = _Constants.Constants.no_account;
            }

            acquireTokenAccountKey = _AuthCache.AuthCache.generateAcquireTokenAccountKey(accountKey, stateInfo.state);

            var acquireTokenAccountKey_noaccount = _AuthCache.AuthCache.generateAcquireTokenAccountKey(_Constants.Constants.no_account, stateInfo.state);

            var cachedAccount = this.cacheStorage.getItem(acquireTokenAccountKey);
            var acquireTokenAccount = void 0; // Check with the account in the Cache

            if (!_StringUtils.StringUtils.isEmpty(cachedAccount)) {
              acquireTokenAccount = JSON.parse(cachedAccount);

              if (response.account && acquireTokenAccount && _Account.Account.compareAccounts(response.account, acquireTokenAccount)) {
                response = this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
                this.logger.info("The user object received in the response is the same as the one passed in the acquireToken request");
              } else {
                this.logger.warning("The account object created from the response is not the same as the one passed in the acquireToken request");
              }
            } else if (!_StringUtils.StringUtils.isEmpty(this.cacheStorage.getItem(acquireTokenAccountKey_noaccount))) {
              response = this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
            }
          } // Process id_token


          if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.ID_TOKEN)) {
            this.logger.info("Fragment has id token"); // set the idToken

            idTokenObj = new _IdToken.IdToken(hashParams[_Constants.ServerHashParamKeys.ID_TOKEN]);
            response = _ResponseUtils.ResponseUtils.setResponseIdToken(response, idTokenObj);

            if (hashParams.hasOwnProperty(_Constants.ServerHashParamKeys.CLIENT_INFO)) {
              clientInfo = hashParams[_Constants.ServerHashParamKeys.CLIENT_INFO];
            } else {
              this.logger.warning("ClientInfo not received in the response from AAD");
            } // set authority


            var authority = this.populateAuthority(stateInfo.state, this.inCookie, this.cacheStorage, idTokenObj);
            this.account = _Account.Account.createAccount(idTokenObj, new _ClientInfo.ClientInfo(clientInfo));
            response.account = this.account;

            if (idTokenObj && idTokenObj.nonce) {
              // check nonce integrity if idToken has nonce - throw an error if not matched
              if (idTokenObj.nonce !== this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.NONCE_IDTOKEN + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie)) {
                this.account = null;
                this.cacheStorage.setItem(_Constants.ErrorCacheKeys.LOGIN_ERROR, "Nonce Mismatch. Expected Nonce: " + this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.NONCE_IDTOKEN + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie) + "," + "Actual Nonce: " + idTokenObj.nonce);
                this.logger.error("Nonce Mismatch.Expected Nonce: " + this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.NONCE_IDTOKEN + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie) + "," + "Actual Nonce: " + idTokenObj.nonce);
                error = _ClientAuthError.ClientAuthError.createNonceMismatchError(this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.NONCE_IDTOKEN + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie), idTokenObj.nonce);
              } // Save the token
              else {
                  this.cacheStorage.setItem(_Constants.PersistentCacheKeys.IDTOKEN, hashParams[_Constants.ServerHashParamKeys.ID_TOKEN]);
                  this.cacheStorage.setItem(_Constants.PersistentCacheKeys.CLIENT_INFO, clientInfo); // Save idToken as access token for app itself

                  this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
                }
            } else {
              authorityKey = stateInfo.state;
              acquireTokenAccountKey = stateInfo.state;
              this.logger.error("Invalid id_token received in the response");
              error = _ClientAuthError.ClientAuthError.createInvalidIdTokenError(idTokenObj);
              this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR, error.errorCode);
              this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR_DESC, error.errorMessage);
            }
          }
        } // State mismatch - unexpected/invalid state
        else {
            authorityKey = stateInfo.state;
            acquireTokenAccountKey = stateInfo.state;
            var expectedState = this.cacheStorage.getItem("" + _Constants.TemporaryCacheKeys.STATE_LOGIN + _Constants.Constants.resourceDelimiter + stateInfo.state, this.inCookie);
            this.logger.error("State Mismatch.Expected State: " + expectedState + "," + "Actual State: " + stateInfo.state);
            error = _ClientAuthError.ClientAuthError.createInvalidStateError(stateInfo.state, expectedState);
            this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR, error.errorCode);
            this.cacheStorage.setItem(_Constants.ErrorCacheKeys.ERROR_DESC, error.errorMessage);
          }
      } // Set status to completed


    this.cacheStorage.removeItem("" + _Constants.TemporaryCacheKeys.RENEW_STATUS + _Constants.Constants.resourceDelimiter + stateInfo.state);
    this.cacheStorage.resetTempCacheItems(stateInfo.state); // this is required if navigateToLoginRequestUrl=false

    if (this.inCookie) {
      this.cacheStorage.setItemCookie(authorityKey, "", -1);
      this.cacheStorage.clearMsalCookie(stateInfo.state);
    }

    if (error) {
      // Error case, set status to cancelled
      throw error;
    }

    if (!response) {
      throw _AuthError.AuthError.createUnexpectedError("Response is null");
    }

    return response;
  };
  /**
   * Set Authority when saving Token from the hash
   * @param state
   * @param inCookie
   * @param cacheStorage
   * @param idTokenObj
   * @param response
   */


  UserAgentApplication.prototype.populateAuthority = function (state, inCookie, cacheStorage, idTokenObj) {
    var authorityKey = _AuthCache.AuthCache.generateAuthorityKey(state);

    var cachedAuthority = cacheStorage.getItem(authorityKey, inCookie); // retrieve the authority from cache and replace with tenantID

    return _StringUtils.StringUtils.isEmpty(cachedAuthority) ? cachedAuthority : _UrlUtils.UrlUtils.replaceTenantPath(cachedAuthority, idTokenObj.tenantId);
  };
  /* tslint:enable:no-string-literal */
  // #endregion
  // #region Account

  /**
   * Returns the signed in account
   * (the account object is created at the time of successful login)
   * or null when no state is found
   * @returns {@link Account} - the account object stored in MSAL
   */


  UserAgentApplication.prototype.getAccount = function () {
    // if a session already exists, get the account from the session
    if (this.account) {
      return this.account;
    } // frame is used to get idToken and populate the account for the given session


    var rawIdToken = this.cacheStorage.getItem(_Constants.PersistentCacheKeys.IDTOKEN);
    var rawClientInfo = this.cacheStorage.getItem(_Constants.PersistentCacheKeys.CLIENT_INFO);

    if (!_StringUtils.StringUtils.isEmpty(rawIdToken) && !_StringUtils.StringUtils.isEmpty(rawClientInfo)) {
      var idToken = new _IdToken.IdToken(rawIdToken);
      var clientInfo = new _ClientInfo.ClientInfo(rawClientInfo);
      this.account = _Account.Account.createAccount(idToken, clientInfo);
      return this.account;
    } // if login not yet done, return null


    return null;
  };
  /**
   * @hidden
   *
   * Extracts state value from the accountState sent with the authentication request.
   * @returns {string} scope.
   * @ignore
   */


  UserAgentApplication.prototype.getAccountState = function (state) {
    if (state) {
      var splitIndex = state.indexOf("|");

      if (splitIndex > -1 && splitIndex + 1 < state.length) {
        return state.substring(splitIndex + 1);
      }
    }

    return state;
  };
  /**
   * Use to get a list of unique accounts in MSAL cache based on homeAccountIdentifier.
   *
   * @param {@link Array<Account>} Account - all unique accounts in MSAL cache.
   */


  UserAgentApplication.prototype.getAllAccounts = function () {
    var accounts = [];
    var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(_Constants.Constants.clientId, _Constants.Constants.homeAccountIdentifier);

    for (var i = 0; i < accessTokenCacheItems.length; i++) {
      var idToken = new _IdToken.IdToken(accessTokenCacheItems[i].value.idToken);
      var clientInfo = new _ClientInfo.ClientInfo(accessTokenCacheItems[i].value.homeAccountIdentifier);

      var account = _Account.Account.createAccount(idToken, clientInfo);

      accounts.push(account);
    }

    return this.getUniqueAccounts(accounts);
  };
  /**
   * @hidden
   *
   * Used to filter accounts based on homeAccountIdentifier
   * @param {Array<Account>}  Accounts - accounts saved in the cache
   * @ignore
   */


  UserAgentApplication.prototype.getUniqueAccounts = function (accounts) {
    if (!accounts || accounts.length <= 1) {
      return accounts;
    }

    var flags = [];
    var uniqueAccounts = [];

    for (var index = 0; index < accounts.length; ++index) {
      if (accounts[index].homeAccountIdentifier && flags.indexOf(accounts[index].homeAccountIdentifier) === -1) {
        flags.push(accounts[index].homeAccountIdentifier);
        uniqueAccounts.push(accounts[index]);
      }
    }

    return uniqueAccounts;
  }; // #endregion
  // #region Angular

  /**
   * @hidden
   *
   * Broadcast messages - Used only for Angular?  *
   * @param eventName
   * @param data
   */


  UserAgentApplication.prototype.broadcast = function (eventName, data) {
    var evt = new CustomEvent(eventName, {
      detail: data
    });
    window.dispatchEvent(evt);
  };
  /**
   * @hidden
   *
   * Helper function to retrieve the cached token
   *
   * @param scopes
   * @param {@link Account} account
   * @param state
   * @return {@link AuthResponse} AuthResponse
   */


  UserAgentApplication.prototype.getCachedTokenInternal = function (scopes, account, state, correlationId) {
    // Get the current session's account object
    var accountObject = account || this.getAccount();

    if (!accountObject) {
      return null;
    } // Construct AuthenticationRequest based on response type; set "redirectUri" from the "request" which makes this call from Angular - for this.getRedirectUri()


    var newAuthority = this.authorityInstance ? this.authorityInstance : _AuthorityFactory.AuthorityFactory.CreateInstance(this.authority, this.config.auth.validateAuthority);
    var responseType = this.getTokenType(accountObject, scopes, true);
    var serverAuthenticationRequest = new _ServerRequestParameters.ServerRequestParameters(newAuthority, this.clientId, responseType, this.getRedirectUri(), scopes, state, correlationId); // get cached token

    return this.getCachedToken(serverAuthenticationRequest, account);
  };
  /**
   * @hidden
   *
   * Get scopes for the Endpoint - Used in Angular to track protected and unprotected resources without interaction from the developer app
   * Note: Please check if we need to set the "redirectUri" from the "request" which makes this call from Angular - for this.getRedirectUri()
   *
   * @param endpoint
   */


  UserAgentApplication.prototype.getScopesForEndpoint = function (endpoint) {
    // if user specified list of unprotectedResources, no need to send token to these endpoints, return null.
    if (this.config.framework.unprotectedResources.length > 0) {
      for (var i = 0; i < this.config.framework.unprotectedResources.length; i++) {
        if (endpoint.indexOf(this.config.framework.unprotectedResources[i]) > -1) {
          return null;
        }
      }
    } // process all protected resources and send the matched one


    if (this.config.framework.protectedResourceMap.size > 0) {
      for (var _i = 0, _a = Array.from(this.config.framework.protectedResourceMap.keys()); _i < _a.length; _i++) {
        var key = _a[_i]; // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1

        if (endpoint.indexOf(key) > -1) {
          return this.config.framework.protectedResourceMap.get(key);
        }
      }
    }
    /*
     * default resource will be clientid if nothing specified
     * App will use idtoken for calls to itself
     * check if it's staring from http or https, needs to match with app host
     */


    if (endpoint.indexOf("http://") > -1 || endpoint.indexOf("https://") > -1) {
      if (_UrlUtils.UrlUtils.getHostFromUri(endpoint) === _UrlUtils.UrlUtils.getHostFromUri(this.getRedirectUri())) {
        return new Array(this.clientId);
      }
    } else {
      /*
       * in angular level, the url for $http interceptor call could be relative url,
       * if it's relative call, we'll treat it as app backend call.
       */
      return new Array(this.clientId);
    } // if not the app's own backend or not a domain listed in the endpoints structure


    return null;
  };
  /**
   * Return boolean flag to developer to help inform if login is in progress
   * @returns {boolean} true/false
   */


  UserAgentApplication.prototype.getLoginInProgress = function () {
    var pendingCallback = this.cacheStorage.getItem(_Constants.TemporaryCacheKeys.URL_HASH);

    if (pendingCallback) {
      return true;
    }

    return this.cacheStorage.getItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS) === _Constants.Constants.inProgress;
  };
  /**
   * @hidden
   * @ignore
   *
   * @param loginInProgress
   */


  UserAgentApplication.prototype.setInteractionInProgress = function (inProgress) {
    if (inProgress) {
      this.cacheStorage.setItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS, _Constants.Constants.inProgress);
    } else {
      this.cacheStorage.removeItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS);
    }
  };
  /**
   * @hidden
   * @ignore
   *
   * @param loginInProgress
   */


  UserAgentApplication.prototype.setloginInProgress = function (loginInProgress) {
    this.setInteractionInProgress(loginInProgress);
  };
  /**
   * @hidden
   * @ignore
   *
   * returns the status of acquireTokenInProgress
   */


  UserAgentApplication.prototype.getAcquireTokenInProgress = function () {
    return this.cacheStorage.getItem(_Constants.TemporaryCacheKeys.INTERACTION_STATUS) === _Constants.Constants.inProgress;
  };
  /**
   * @hidden
   * @ignore
   *
   * @param acquireTokenInProgress
   */


  UserAgentApplication.prototype.setAcquireTokenInProgress = function (acquireTokenInProgress) {
    this.setInteractionInProgress(acquireTokenInProgress);
  };
  /**
   * @hidden
   * @ignore
   *
   * returns the logger handle
   */


  UserAgentApplication.prototype.getLogger = function () {
    return this.config.system.logger;
  }; // #endregion
  // #region Getters and Setters

  /**
   * Use to get the redirect uri configured in MSAL or null.
   * Evaluates redirectUri if its a function, otherwise simply returns its value.
   *
   * @returns {string} redirect URL
   */


  UserAgentApplication.prototype.getRedirectUri = function (reqRedirectUri) {
    if (reqRedirectUri) {
      return reqRedirectUri;
    } else if (typeof this.config.auth.redirectUri === "function") {
      return this.config.auth.redirectUri();
    }

    return this.config.auth.redirectUri;
  };
  /**
   * Use to get the post logout redirect uri configured in MSAL or null.
   * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
   *
   * @returns {string} post logout redirect URL
   */


  UserAgentApplication.prototype.getPostLogoutRedirectUri = function () {
    if (typeof this.config.auth.postLogoutRedirectUri === "function") {
      return this.config.auth.postLogoutRedirectUri();
    }

    return this.config.auth.postLogoutRedirectUri;
  };
  /**
   * Use to get the current {@link Configuration} object in MSAL
   *
   * @returns {@link Configuration}
   */


  UserAgentApplication.prototype.getCurrentConfiguration = function () {
    if (!this.config) {
      throw _ClientConfigurationError.ClientConfigurationError.createNoSetConfigurationError();
    }

    return this.config;
  };
  /**
   * @ignore
   *
   * Utils function to create the Authentication
   * @param {@link account} account object
   * @param scopes
   * @param silentCall
   *
   * @returns {string} token type: id_token or access_token
   *
   */


  UserAgentApplication.prototype.getTokenType = function (accountObject, scopes, silentCall) {
    /*
     * if account is passed and matches the account object/or set to getAccount() from cache
     * if client-id is passed as scope, get id_token else token/id_token_token (in case no session exists)
     */
    var tokenType; // acquireTokenSilent

    if (silentCall) {
      if (_Account.Account.compareAccounts(accountObject, this.getAccount())) {
        tokenType = scopes.indexOf(this.config.auth.clientId) > -1 ? ResponseTypes.id_token : ResponseTypes.token;
      } else {
        tokenType = scopes.indexOf(this.config.auth.clientId) > -1 ? ResponseTypes.id_token : ResponseTypes.id_token_token;
      }

      return tokenType;
    } // all other cases
    else {
        if (!_Account.Account.compareAccounts(accountObject, this.getAccount())) {
          tokenType = ResponseTypes.id_token_token;
        } else {
          tokenType = scopes.indexOf(this.clientId) > -1 ? ResponseTypes.id_token : ResponseTypes.token;
        }

        return tokenType;
      }
  };
  /**
   * @hidden
   * @ignore
   *
   * Sets the cachekeys for and stores the account information in cache
   * @param account
   * @param state
   * @hidden
   */


  UserAgentApplication.prototype.setAccountCache = function (account, state) {
    // Cache acquireTokenAccountKey
    var accountId = account ? this.getAccountId(account) : _Constants.Constants.no_account;

    var acquireTokenAccountKey = _AuthCache.AuthCache.generateAcquireTokenAccountKey(accountId, state);

    this.cacheStorage.setItem(acquireTokenAccountKey, JSON.stringify(account));
  };
  /**
   * @hidden
   * @ignore
   *
   * Sets the cacheKey for and stores the authority information in cache
   * @param state
   * @param authority
   * @hidden
   */


  UserAgentApplication.prototype.setAuthorityCache = function (state, authority) {
    // Cache authorityKey
    var authorityKey = _AuthCache.AuthCache.generateAuthorityKey(state);

    this.cacheStorage.setItem(authorityKey, _UrlUtils.UrlUtils.CanonicalizeUri(authority), this.inCookie);
  };
  /**
   * Updates account, authority, and nonce in cache
   * @param serverAuthenticationRequest
   * @param account
   * @hidden
   * @ignore
   */


  UserAgentApplication.prototype.updateCacheEntries = function (serverAuthenticationRequest, account, loginStartPage) {
    // Cache account and authority
    if (loginStartPage) {
      // Cache the state, nonce, and login request data
      this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.LOGIN_REQUEST + _Constants.Constants.resourceDelimiter + serverAuthenticationRequest.state, loginStartPage, this.inCookie);
      this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.STATE_LOGIN + _Constants.Constants.resourceDelimiter + serverAuthenticationRequest.state, serverAuthenticationRequest.state, this.inCookie);
    } else {
      this.setAccountCache(account, serverAuthenticationRequest.state);
    } // Cache authorityKey


    this.setAuthorityCache(serverAuthenticationRequest.state, serverAuthenticationRequest.authority); // Cache nonce

    this.cacheStorage.setItem("" + _Constants.TemporaryCacheKeys.NONCE_IDTOKEN + _Constants.Constants.resourceDelimiter + serverAuthenticationRequest.state, serverAuthenticationRequest.nonce, this.inCookie);
  };
  /**
   * Returns the unique identifier for the logged in account
   * @param account
   * @hidden
   * @ignore
   */


  UserAgentApplication.prototype.getAccountId = function (account) {
    // return `${account.accountIdentifier}` + Constants.resourceDelimiter + `${account.homeAccountIdentifier}`;
    var accountId;

    if (!_StringUtils.StringUtils.isEmpty(account.homeAccountIdentifier)) {
      accountId = account.homeAccountIdentifier;
    } else {
      accountId = _Constants.Constants.no_account;
    }

    return accountId;
  };
  /**
   * @ignore
   * @param extraQueryParameters
   *
   * Construct 'tokenRequest' from the available data in adalIdToken
   */


  UserAgentApplication.prototype.buildIDTokenRequest = function (request) {
    var tokenRequest = {
      scopes: [this.clientId],
      authority: this.authority,
      account: this.getAccount(),
      extraQueryParameters: request.extraQueryParameters
    };
    return tokenRequest;
  };
  /**
   * @ignore
   * @param config
   * @param clientId
   *
   * Construct TelemetryManager from Configuration
   */


  UserAgentApplication.prototype.getTelemetryManagerFromConfig = function (config, clientId) {
    if (!config) {
      // if unset
      return null;
    } // if set then validate


    var applicationName = config.applicationName,
        applicationVersion = config.applicationVersion,
        telemetryEmitter = config.telemetryEmitter;

    if (!applicationName || !applicationVersion || !telemetryEmitter) {
      throw _ClientConfigurationError.ClientConfigurationError.createTelemetryConfigError(config);
    } // if valid then construct


    var telemetryPlatform = {
      sdk: "msal.js",
      sdkVersion: (0, _Constants.libraryVersion)(),
      applicationName: applicationName,
      applicationVersion: applicationVersion
    };
    var telemetryManagerConfig = {
      platform: telemetryPlatform,
      clientId: clientId
    };
    return new _TelemetryManager.default(telemetryManagerConfig, telemetryEmitter);
  };

  return UserAgentApplication;
}();

exports.UserAgentApplication = UserAgentApplication;
},{"tslib":"node_modules/tslib/tslib.es6.js","./cache/AccessTokenKey":"node_modules/msal/lib-es6/cache/AccessTokenKey.js","./cache/AccessTokenValue":"node_modules/msal/lib-es6/cache/AccessTokenValue.js","./ServerRequestParameters":"node_modules/msal/lib-es6/ServerRequestParameters.js","./ClientInfo":"node_modules/msal/lib-es6/ClientInfo.js","./IdToken":"node_modules/msal/lib-es6/IdToken.js","./cache/AuthCache":"node_modules/msal/lib-es6/cache/AuthCache.js","./Account":"node_modules/msal/lib-es6/Account.js","./ScopeSet":"node_modules/msal/lib-es6/ScopeSet.js","./utils/StringUtils":"node_modules/msal/lib-es6/utils/StringUtils.js","./utils/WindowUtils":"node_modules/msal/lib-es6/utils/WindowUtils.js","./utils/TokenUtils":"node_modules/msal/lib-es6/utils/TokenUtils.js","./utils/TimeUtils":"node_modules/msal/lib-es6/utils/TimeUtils.js","./utils/UrlUtils":"node_modules/msal/lib-es6/utils/UrlUtils.js","./utils/RequestUtils":"node_modules/msal/lib-es6/utils/RequestUtils.js","./utils/ResponseUtils":"node_modules/msal/lib-es6/utils/ResponseUtils.js","./authority/AuthorityFactory":"node_modules/msal/lib-es6/authority/AuthorityFactory.js","./Configuration":"node_modules/msal/lib-es6/Configuration.js","./error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","./error/AuthError":"node_modules/msal/lib-es6/error/AuthError.js","./error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js","./error/ServerError":"node_modules/msal/lib-es6/error/ServerError.js","./error/InteractionRequiredAuthError":"node_modules/msal/lib-es6/error/InteractionRequiredAuthError.js","./AuthResponse":"node_modules/msal/lib-es6/AuthResponse.js","./telemetry/TelemetryManager":"node_modules/msal/lib-es6/telemetry/TelemetryManager.js","./utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js"}],"node_modules/msal/lib-es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserAgentApplication", {
  enumerable: true,
  get: function () {
    return _UserAgentApplication.UserAgentApplication;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _Logger.Logger;
  }
});
Object.defineProperty(exports, "LogLevel", {
  enumerable: true,
  get: function () {
    return _Logger.LogLevel;
  }
});
Object.defineProperty(exports, "Account", {
  enumerable: true,
  get: function () {
    return _Account.Account;
  }
});
Object.defineProperty(exports, "Constants", {
  enumerable: true,
  get: function () {
    return _Constants.Constants;
  }
});
Object.defineProperty(exports, "Authority", {
  enumerable: true,
  get: function () {
    return _Authority.Authority;
  }
});
Object.defineProperty(exports, "CryptoUtils", {
  enumerable: true,
  get: function () {
    return _CryptoUtils.CryptoUtils;
  }
});
Object.defineProperty(exports, "AuthError", {
  enumerable: true,
  get: function () {
    return _AuthError.AuthError;
  }
});
Object.defineProperty(exports, "ClientAuthError", {
  enumerable: true,
  get: function () {
    return _ClientAuthError.ClientAuthError;
  }
});
Object.defineProperty(exports, "ServerError", {
  enumerable: true,
  get: function () {
    return _ServerError.ServerError;
  }
});
Object.defineProperty(exports, "ClientConfigurationError", {
  enumerable: true,
  get: function () {
    return _ClientConfigurationError.ClientConfigurationError;
  }
});
Object.defineProperty(exports, "InteractionRequiredAuthError", {
  enumerable: true,
  get: function () {
    return _InteractionRequiredAuthError.InteractionRequiredAuthError;
  }
});

var _UserAgentApplication = require("./UserAgentApplication");

var _Logger = require("./Logger");

var _Account = require("./Account");

var _Constants = require("./utils/Constants");

var _Authority = require("./authority/Authority");

var _CryptoUtils = require("./utils/CryptoUtils");

var _AuthError = require("./error/AuthError");

var _ClientAuthError = require("./error/ClientAuthError");

var _ServerError = require("./error/ServerError");

var _ClientConfigurationError = require("./error/ClientConfigurationError");

var _InteractionRequiredAuthError = require("./error/InteractionRequiredAuthError");
},{"./UserAgentApplication":"node_modules/msal/lib-es6/UserAgentApplication.js","./Logger":"node_modules/msal/lib-es6/Logger.js","./Account":"node_modules/msal/lib-es6/Account.js","./utils/Constants":"node_modules/msal/lib-es6/utils/Constants.js","./authority/Authority":"node_modules/msal/lib-es6/authority/Authority.js","./utils/CryptoUtils":"node_modules/msal/lib-es6/utils/CryptoUtils.js","./error/AuthError":"node_modules/msal/lib-es6/error/AuthError.js","./error/ClientAuthError":"node_modules/msal/lib-es6/error/ClientAuthError.js","./error/ServerError":"node_modules/msal/lib-es6/error/ServerError.js","./error/ClientConfigurationError":"node_modules/msal/lib-es6/error/ClientConfigurationError.js","./error/InteractionRequiredAuthError":"node_modules/msal/lib-es6/error/InteractionRequiredAuthError.js"}],"app.js":[function(require,module,exports) {
"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

require("whatwg-fetch");

var _msal = require("msal");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var clientId = "c518ef2d-fc2c-4b69-8b34-0330a0864a5c";
var scopes = ['User.Read'];
var p = document.querySelector('p');
var loginButton = document.querySelector('#login');
var clearCacheButton = document.querySelector('#clear-cache');

function log(text) {
  p.innerText = JSON.stringify(text);
}

(function () {
  if (window.location.hash.includes('id_token=')) {
    log('Id token in hash (is callback)');
    Office.onReady(function () {
      log('Window is callback (wait)');

      if (Office.context.ui) {
        Office.context.ui.messageParent(window.location.hash);
        log('Message sent to parent');
      } else {
        log('Missing Office.context.ui');
      }
    });
    return;
  } // Only initialize msal if window is not callback.
  // MSAL will pick up the hash and redirect - we don't want this.


  var msal = new _msal.UserAgentApplication({
    auth: {
      clientId: clientId
    },
    cache: {
      cacheLocation: 'localStorage'
    }
  });
  clearCacheButton.addEventListener('click', function () {
    msal.clearCache();
  });

  function callApi() {
    return _callApi.apply(this, arguments);
  }

  function _callApi() {
    _callApi = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _ref3, accessToken, me;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              log('Call Graph API (get /me)');
              _context2.prev = 1;
              _context2.next = 4;
              return msal.acquireTokenSilent({
                scopes: scopes
              });

            case 4:
              _ref3 = _context2.sent;
              accessToken = _ref3.accessToken;
              log(accessToken);
              _context2.next = 9;
              return fetch('https://graph.microsoft.com/v1.0/me', {
                headers: {
                  authorization: "Bearer ".concat(accessToken)
                }
              }).then(function (res) {
                return res.json();
              });

            case 9:
              me = _context2.sent;
              log(me);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              log(_context2.t0);
              throw _context2.t0;

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));
    return _callApi.apply(this, arguments);
  }

  log('Waiting for office...');
  Office.onReady(function () {
    log('Office loaded');

    if (msal.getAccount()) {
      callApi();
    } else if (msal.getLoginInProgress()) {
      log('Logging in (login in progress)...');
    } else {
      loginButton.disabled = false;
      log('Ready. Click button');
    }
  });
  loginButton.addEventListener('click',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msal.openPopup = function () {
              var dummy = {
                close: function close() {},
                location: {
                  assign: function assign(url) {
                    Office.context.ui.displayDialogAsync(url, {
                      width: 25,
                      height: 50
                    }, function (res) {
                      dummy.close = res.value.close;
                      res.value.addEventHandler(Office.EventType.DialogMessageReceived, function (_ref2) {
                        var message = _ref2.message;
                        return dummy.location.href = dummy.location.hash = message;
                      });
                    });
                  }
                }
              };
              return dummy;
            };

            log('Logging in...');
            _context.next = 4;
            return msal.loginPopup({
              scopes: scopes
            });

          case 4:
            callApi();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
})();
},{"core-js/stable":"node_modules/core-js/stable/index.js","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","whatwg-fetch":"node_modules/whatwg-fetch/fetch.js","msal":"node_modules/msal/lib-es6/index.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46751" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map