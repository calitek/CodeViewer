webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(306);


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(58);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(44);

var ReactCurrentOwner = __webpack_require__(45);

var warning = __webpack_require__(12);
var canDefineProperty = __webpack_require__(71);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(120);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (true) {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (true) {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
       true ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
       true ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (true) {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (true) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (true) {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _camelToDashCase = __webpack_require__(37);

var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

// returns a style object with a single concated prefixed value string

exports['default'] = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return (function () {
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }));
  })();
};

module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(280);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(262);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(110);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(253);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(109),
    isObjectLike = __webpack_require__(282);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTreeNode = selectTreeNode;
exports.setTreeNodeClosed = setTreeNodeClosed;
exports.getTreeDataDone = getTreeDataDone;
function selectTreeNode(node) {
  return function (dispatch, getState) {
    dispatch({ type: 'SelectTreeNode', node: node });
    dispatch({ type: 'ApiSetTreeData', data: { data: getState().treeState.treeData } });
    var currentTreeNode = getState().treeState.currentTreeNode;
    var filePath = currentTreeNode.rootpath + currentTreeNode.nodeid;
    dispatch({ type: 'ApiGetFileData', data: { filePath: filePath, nodeid: currentTreeNode.nodeid } });
  };
}

function setTreeNodeClosed(node) {
  return function (dispatch, getState) {
    dispatch({ type: 'SetTreeNodeClosed', node: node });
    dispatch({ type: 'ApiSetTreeData', data: { data: getState().treeState.treeData } });
  };
}

function getTreeDataDone(data) {
  return function (dispatch, getState) {
    dispatch({ type: 'GetTreeDataDone', data: data });
    dispatch({ type: 'SelectTreeNode', node: getState().treeState.currentTreeNode });
  };
}

/***/ }),
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (value) {
  if (Array.isArray(value)) value = value.join(',');

  return value.match(/-webkit-|-moz-|-ms-/) !== null;
};

module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(42);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssRuleSetToString;

var _appendPxIfNeeded = __webpack_require__(112);

var _appendPxIfNeeded2 = _interopRequireDefault(_appendPxIfNeeded);

var _camelCasePropsToDashCase = __webpack_require__(289);

var _camelCasePropsToDashCase2 = _interopRequireDefault(_camelCasePropsToDashCase);

var _mapObject = __webpack_require__(117);

var _mapObject2 = _interopRequireDefault(_mapObject);

var _prefixer = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMarkupForStyles(style) {
  return Object.keys(style).map(function (property) {
    return property + ': ' + style[property] + ';';
  }).join('\n');
}

function cssRuleSetToString(selector, rules, userAgent) {
  if (!rules) {
    return '';
  }

  var rulesWithPx = (0, _mapObject2.default)(rules, function (value, key) {
    return (0, _appendPxIfNeeded2.default)(key, value);
  });
  var prefixedRules = (0, _prefixer.getPrefixedStyle)(rulesWithPx, userAgent);
  var cssPrefixedRules = (0, _camelCasePropsToDashCase2.default)(prefixedRules);
  var serializedRules = createMarkupForStyles(cssPrefixedRules);

  return selector + '{' + serializedRules + '}';
}
module.exports = exports['default'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enhancer = __webpack_require__(113);

var _enhancer2 = _interopRequireDefault(_enhancer);

var _plugins = __webpack_require__(118);

var _plugins2 = _interopRequireDefault(_plugins);

var _style = __webpack_require__(292);

var _style2 = _interopRequireDefault(_style);

var _styleRoot = __webpack_require__(290);

var _styleRoot2 = _interopRequireDefault(_styleRoot);

var _getState = __webpack_require__(115);

var _getState2 = _interopRequireDefault(_getState);

var _keyframes = __webpack_require__(293);

var _keyframes2 = _interopRequireDefault(_keyframes);

var _resolveStyles = __webpack_require__(119);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Radium(ComposedComponent) {
  return (0, _enhancer2.default)(ComposedComponent);
}

Radium.Plugins = _plugins2.default;
Radium.Style = _style2.default;
Radium.StyleRoot = _styleRoot2.default;
Radium.getState = _getState2.default;
Radium.keyframes = _keyframes2.default;

if (true) {
  Radium.TestMode = {
    clearState: _resolveStyles.__clearStateForTests,
    disable: _resolveStyles.__setTestMode.bind(null, false),
    enable: _resolveStyles.__setTestMode.bind(null, true)
  };
}

exports.default = Radium;
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Based on https://github.com/jsstyles/css-vendor, but without having to
                                                                                                                                                                                                                                                   * convert between different cases all the time.
                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                   */

exports.getPrefixedKeyframes = getPrefixedKeyframes;
exports.getPrefixedStyle = getPrefixedStyle;

var _inlineStylePrefixer = __webpack_require__(229);

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformValues(style) {
  return Object.keys(style).reduce(function (newStyle, key) {
    var value = style[key];
    if (Array.isArray(value)) {
      value = value.join(';' + key + ':');
    } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString === 'function') {
      value = value.toString();
    }

    newStyle[key] = value;
    return newStyle;
  }, {});
}

var _hasWarnedAboutUserAgent = false;
var _lastUserAgent = void 0;
var _cachedPrefixer = void 0;

function getPrefixer(userAgent) {
  var actualUserAgent = userAgent || global && global.navigator && global.navigator.userAgent;

  if (true) {
    if (!actualUserAgent && !_hasWarnedAboutUserAgent) {
      /* eslint-disable no-console */
      console.warn('Radium: userAgent should be supplied for server-side rendering. See ' + 'https://github.com/FormidableLabs/radium/tree/master/docs/api#radium ' + 'for more information.');
      /* eslint-enable no-console */
      _hasWarnedAboutUserAgent = true;
    }
  }

  if (!_cachedPrefixer || actualUserAgent !== _lastUserAgent) {
    if (actualUserAgent === 'all') {
      _cachedPrefixer = {
        prefix: _inlineStylePrefixer2.default.prefixAll,
        prefixedKeyframes: 'keyframes'
      };
    } else {
      _cachedPrefixer = new _inlineStylePrefixer2.default({ userAgent: actualUserAgent });
    }
    _lastUserAgent = actualUserAgent;
  }
  return _cachedPrefixer;
}

function getPrefixedKeyframes(userAgent) {
  return getPrefixer(userAgent).prefixedKeyframes;
}

// Returns a new style object with vendor prefixes added to property names
// and values.
function getPrefixedStyle(style, userAgent) {
  var styleWithFallbacks = transformValues(style);
  var prefixer = getPrefixer(userAgent);
  var prefixedStyle = prefixer.prefix(styleWithFallbacks);
  return prefixedStyle;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleKeeper = function () {
  function StyleKeeper(userAgent) {
    _classCallCheck(this, StyleKeeper);

    this._userAgent = userAgent;
    this._listeners = [];
    this._cssSet = {};
  }

  StyleKeeper.prototype.subscribe = function subscribe(listener) {
    var _this = this;

    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }

    return {
      // Must be fat arrow to capture `this`
      remove: function remove() {
        var listenerIndex = _this._listeners.indexOf(listener);
        if (listenerIndex > -1) {
          _this._listeners.splice(listenerIndex, 1);
        }
      }
    };
  };

  StyleKeeper.prototype.addCSS = function addCSS(css) {
    var _this2 = this;

    if (!this._cssSet[css]) {
      this._cssSet[css] = true;
      this._emitChange();
    }

    return {
      // Must be fat arrow to capture `this`
      remove: function remove() {
        delete _this2._cssSet[css];
        _this2._emitChange();
      }
    };
  };

  StyleKeeper.prototype.getCSS = function getCSS() {
    return Object.keys(this._cssSet).join('\n');
  };

  StyleKeeper.prototype._emitChange = function _emitChange() {
    this._listeners.forEach(function (listener) {
      return listener();
    });
  };

  return StyleKeeper;
}();

exports.default = StyleKeeper;
module.exports = exports['default'];

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(21);

var ReactNoopUpdateQueue = __webpack_require__(69);

var canDefineProperty = __webpack_require__(71);
var emptyObject = __webpack_require__(59);
var invariant = __webpack_require__(19);
var warning = __webpack_require__(12);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ?  true ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (true) {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
           true ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(21);

var ReactCurrentOwner = __webpack_require__(45);

var invariant = __webpack_require__(19);
var warning = __webpack_require__(12);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
   true ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ?  true ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ?  true ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ?  true ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ?  true ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ?  true ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ?  true ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(12);

function warnNoop(publicInstance, callerName) {
  if (true) {
    var constructor = publicInstance.constructor;
     true ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (true) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (true) {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileDataDone = getFileDataDone;
function getFileDataDone(data) {
  return { type: 'GetFileDataDone', data: data };
}

/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var standardBtnSty = {
  backgroundColor: '#9a6',
  borderBottomColor: '#cea',
  borderLeftColor: '#93a363',
  borderRightColor: '#cea',
  borderTopColor: '#93a363',
  borderRadius: '6px',
  color: '#eeffee',
  cursor: 'pointer',
  lineHeight: '100%',
  outline: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap'
};

var standardBtnIcon = {
  backgroundColor: 'transparent',
  backgroundImg: 'none',
  backgroundSize: 'cover',
  border: '0px',
  color: '#4d2c3d',
  cursor: 'pointer',
  height: 'inherit',
  margin: '0 3px',
  outline: 'none',
  padding: '0px',
  verticalAlign: 'middle',
  width: 'inherit'
};

function getStyle(btnProp) {
  var buttonSty = Object.assign({}, standardBtnSty);
  var btnStyle = 'Btn30';
  var isDesktop = btnProp.isDesktop ? btnProp.isDesktop : true;
  if (btnProp.btn.style) btnStyle = btnProp.btn.style;
  if (btnProp.btn.backimg && !btnProp.btn.style) btnStyle = 'BackImg';
  if (btnProp.btn.icon && !btnProp.btn.style) btnStyle = 'BtnIcon';
  if (isDesktop) {
    switch (btnStyle) {
      case 'Btn18':
        buttonSty.fontSize = '0.8em';
        buttonSty.height = '18px';
        buttonSty.margin = '0 2px';
        buttonSty.minWidth = '52px';
        buttonSty.padding = '2px';
        break;
      case 'Btn24':
        buttonSty.fontSize = '0.9em';
        buttonSty.height = '24px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.3em';
        break;
      case 'Btn30':
        buttonSty.fontSize = '0.9em';
        buttonSty.height = '30px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em';
        break;
      case 'Btn40':
        buttonSty.fontSize = '1.1em';
        buttonSty.height = '40px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em .8em';
        break;
      case 'BackImg':
        {
          buttonSty = Object.assign({}, standardBtnIcon);
          buttonSty.background = btnProp.btn.backimg;
          break;
        }
      case 'BtnIcon':
        buttonSty = standardBtnIcon;break;
    }
  } else {
    switch (btnStyle) {
      case 'Btn16':
        buttonSty.height = '24px';
        buttonSty.margin = '0 2px';
        buttonSty.padding = '0.1em 0.3em 0.3em';
        break;
      case 'Btn24':
        buttonSty.height = '30px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.3rem';
        break;
      case 'Btn30':
        buttonSty.fontSize = '1.1em';
        buttonSty.height = '40px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em .8em';
        break;
      case 'BtnIcon':
        buttonSty = standardBtnIcon;break;
    }
  }
  if (btnProp.btn.reStyle) buttonSty = btnProp.btn.reStyle;
  if (btnProp.btn.assignStyle) buttonSty = Object.assign(buttonSty, btnProp.btn.assignStyle);
  return buttonSty;
}

var JButton = function JButton(props) {
  var clickHandler = function clickHandler() {
    if (props.parentClickHandler) props.parentClickHandler(props.btn.buttonid);
  };
  var buttonSty = getStyle(props);
  var isDisabled = props.isDisabled ? props.isDisabled : false;
  var renderIt = void 0;
  if (props.btn.icon) {
    renderIt = _react2.default.createElement(
      'button',
      { id: props.btn.buttonid, className: 'HighZ', style: buttonSty, onClick: clickHandler },
      _react2.default.createElement('i', { className: props.btn.icon })
    );
  } else {
    renderIt = _react2.default.createElement(
      'button',
      { id: props.btn.buttonid, style: buttonSty, disabled: isDisabled, onClick: clickHandler },
      props.btn.text
    );
  }
  return renderIt;
};

JButton.propTypes = {
  btn: _react2.default.PropTypes.object.isRequired,
  isDisabled: _react2.default.PropTypes.bool,
  isDesktop: _react2.default.PropTypes.bool,
  parentClickHandler: _react2.default.PropTypes.func
};

// btn.object = {
//   buttonid: 'identifier for parentClickHandler', this and one of the next three are required
//   text: 'standard button content',
//   backimg: 'url for a back image',
//   icon: 'used for an icon font',

//   style: 'predefined sizing for default style',
//   reStyle: 'replace the default style',
//   assignStyle: 'use Object.assign with the default style'
// }

module.exports = JButton;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// helper to capitalize strings


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// helper to capitalize strings


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(61),
    getRawTag = __webpack_require__(254),
    objectToString = __webpack_require__(275);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(249),
    getValue = __webpack_require__(255);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(248);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendPxIfNeeded;


// Copied from https://github.com/facebook/react/blob/
// 102cd291899f9942a76c40a0e78920a6fe544dc1/
// src/renderers/dom/shared/CSSProperty.js
var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

function appendPxIfNeeded(propertyName, value) {
  var needsPxSuffix = !isUnitlessNumber[propertyName] && typeof value === 'number' && value !== 0;
  return needsPxSuffix ? value + 'px' : value;
}
module.exports = exports['default'];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = enhanceWithRadium;

var _react = __webpack_require__(3);

var _styleKeeper = __webpack_require__(66);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

var _resolveStyles = __webpack_require__(119);

var _resolveStyles2 = _interopRequireDefault(_resolveStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  });
}

function isStateless(component) {
  return !component.render && !(component.prototype && component.prototype.render);
}

function enhanceWithRadium(configOrComposedComponent) {
  var _class, _temp;

  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (typeof configOrComposedComponent !== 'function') {
    var _ret = function () {
      var newConfig = _extends({}, config, configOrComposedComponent);
      return {
        v: function v(configOrComponent) {
          return enhanceWithRadium(configOrComponent, newConfig);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  var component = configOrComposedComponent;
  var ComposedComponent = component;

  // Handle stateless components
  if (isStateless(ComposedComponent)) {
    ComposedComponent = function (_Component) {
      _inherits(ComposedComponent, _Component);

      function ComposedComponent() {
        _classCallCheck(this, ComposedComponent);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ComposedComponent.prototype.render = function render() {
        return component(this.props, this.context);
      };

      return ComposedComponent;
    }(_react.Component);
    ComposedComponent.displayName = component.displayName || component.name;
  }

  var RadiumEnhancer = (_temp = _class = function (_ComposedComponent) {
    _inherits(RadiumEnhancer, _ComposedComponent);

    function RadiumEnhancer() {
      _classCallCheck(this, RadiumEnhancer);

      var _this2 = _possibleConstructorReturn(this, _ComposedComponent.apply(this, arguments));

      _this2.state = _this2.state || {};
      _this2.state._radiumStyleState = {};
      _this2._radiumIsMounted = true;
      return _this2;
    }

    RadiumEnhancer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (_ComposedComponent.prototype.componentWillUnmount) {
        _ComposedComponent.prototype.componentWillUnmount.call(this);
      }

      this._radiumIsMounted = false;

      if (this._radiumMouseUpListener) {
        this._radiumMouseUpListener.remove();
      }

      if (this._radiumMediaQueryListenersByQuery) {
        Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
          this._radiumMediaQueryListenersByQuery[query].remove();
        }, this);
      }
    };

    RadiumEnhancer.prototype.getChildContext = function getChildContext() {
      var superChildContext = _ComposedComponent.prototype.getChildContext ? _ComposedComponent.prototype.getChildContext.call(this) : {};

      if (!this.props.radiumConfig) {
        return superChildContext;
      }

      var newContext = _extends({}, superChildContext);

      if (this.props.radiumConfig) {
        newContext._radiumConfig = this.props.radiumConfig;
      }

      return newContext;
    };

    RadiumEnhancer.prototype.render = function render() {
      var renderedElement = _ComposedComponent.prototype.render.call(this);
      var currentConfig = this.props.radiumConfig || this.context._radiumConfig || config;

      if (config && currentConfig !== config) {
        currentConfig = _extends({}, config, currentConfig);
      }

      return (0, _resolveStyles2.default)(this, renderedElement, currentConfig);
    };

    return RadiumEnhancer;
  }(ComposedComponent), _class._isRadiumEnhanced = true, _temp);

  // Class inheritance uses Object.create and because of __proto__ issues
  // with IE <10 any static properties of the superclass aren't inherited and
  // so need to be manually populated.
  // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-

  copyProperties(component, RadiumEnhancer);

  if (true) {
    // This also fixes React Hot Loader by exposing the original components top
    // level prototype methods on the Radium enhanced prototype as discussed in
    // https://github.com/FormidableLabs/radium/issues/219.
    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
  }

  if (RadiumEnhancer.propTypes && RadiumEnhancer.propTypes.style) {
    RadiumEnhancer.propTypes = _extends({}, RadiumEnhancer.propTypes, {
      style: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
    });
  }

  RadiumEnhancer.displayName = component.displayName || component.name || 'Component';

  RadiumEnhancer.contextTypes = _extends({}, RadiumEnhancer.contextTypes, {
    _radiumConfig: _react.PropTypes.object,
    _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
  });

  RadiumEnhancer.childContextTypes = _extends({}, RadiumEnhancer.childContextTypes, {
    _radiumConfig: _react.PropTypes.object,
    _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
  });

  return RadiumEnhancer;
}
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var getStateKey = function getStateKey(elementKey) {
  return elementKey === null || elementKey === undefined ? 'main' : elementKey.toString();
};

exports.default = getStateKey;
module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getStateKey = __webpack_require__(114);

var _getStateKey2 = _interopRequireDefault(_getStateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getState = function getState(state, elementKey, value) {
  var key = (0, _getStateKey2.default)(elementKey);

  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
};

exports.default = getState;
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hash;


// a simple djb2 hash based on hash-string:
// https://github.com/MatthewBarker/hash-string/blob/master/source/hash-string.js
// returns a hex-encoded hash
function hash(text) {
  if (!text) {
    return '';
  }

  var hashValue = 5381;
  var index = text.length - 1;

  while (index) {
    hashValue = hashValue * 33 ^ text.charCodeAt(index);
    index -= 1;
  }

  return (hashValue >>> 0).toString(16);
}
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;
function mapObject(object, mapper) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapper(object[key], key);
    return result;
  }, {});
}
module.exports = exports["default"];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkPropsPlugin = __webpack_require__(295);

var _checkPropsPlugin2 = _interopRequireDefault(_checkPropsPlugin);

var _keyframesPlugin = __webpack_require__(296);

var _keyframesPlugin2 = _interopRequireDefault(_keyframesPlugin);

var _mergeStyleArrayPlugin = __webpack_require__(297);

var _mergeStyleArrayPlugin2 = _interopRequireDefault(_mergeStyleArrayPlugin);

var _prefixPlugin = __webpack_require__(299);

var _prefixPlugin2 = _interopRequireDefault(_prefixPlugin);

var _removeNestedStylesPlugin = __webpack_require__(300);

var _removeNestedStylesPlugin2 = _interopRequireDefault(_removeNestedStylesPlugin);

var _resolveInteractionStylesPlugin = __webpack_require__(301);

var _resolveInteractionStylesPlugin2 = _interopRequireDefault(_resolveInteractionStylesPlugin);

var _resolveMediaQueriesPlugin = __webpack_require__(302);

var _resolveMediaQueriesPlugin2 = _interopRequireDefault(_resolveMediaQueriesPlugin);

var _visitedPlugin = __webpack_require__(303);

var _visitedPlugin2 = _interopRequireDefault(_visitedPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  checkProps: _checkPropsPlugin2.default,
  keyframes: _keyframesPlugin2.default,
  mergeStyleArray: _mergeStyleArrayPlugin2.default,
  prefix: _prefixPlugin2.default,
  removeNestedStyles: _removeNestedStylesPlugin2.default,
  resolveInteractionStyles: _resolveInteractionStylesPlugin2.default,
  resolveMediaQueries: _resolveMediaQueriesPlugin2.default,
  visited: _visitedPlugin2.default
};
/* eslint-disable block-scoped-const */

module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _appendImportantToEachValue = __webpack_require__(288);

var _appendImportantToEachValue2 = _interopRequireDefault(_appendImportantToEachValue);

var _cssRuleSetToString = __webpack_require__(63);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _getState = __webpack_require__(115);

var _getState2 = _interopRequireDefault(_getState);

var _getStateKey = __webpack_require__(114);

var _getStateKey2 = _interopRequireDefault(_getStateKey);

var _hash = __webpack_require__(116);

var _hash2 = _interopRequireDefault(_hash);

var _mergeStyles = __webpack_require__(294);

var _plugins = __webpack_require__(118);

var _plugins2 = _interopRequireDefault(_plugins);

var _exenv = __webpack_require__(218);

var _exenv2 = _interopRequireDefault(_exenv);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
  plugins: [_plugins2.default.mergeStyleArray, _plugins2.default.checkProps, _plugins2.default.resolveMediaQueries, _plugins2.default.resolveInteractionStyles, _plugins2.default.keyframes, _plugins2.default.visited, _plugins2.default.removeNestedStyles, _plugins2.default.prefix, _plugins2.default.checkProps]
};

// Gross
var globalState = {};

// Declare early for recursive helpers.
var resolveStyles = null;

var _shouldResolveStyles = function _shouldResolveStyles(component) {
  return component.type && !component.type._isRadiumEnhanced;
};

var _resolveChildren = function _resolveChildren(_ref) {
  var children = _ref.children;
  var component = _ref.component;
  var config = _ref.config;
  var existingKeyMap = _ref.existingKeyMap;

  if (!children) {
    return children;
  }

  var childrenType = typeof children === 'undefined' ? 'undefined' : _typeof(children);

  if (childrenType === 'string' || childrenType === 'number') {
    // Don't do anything with a single primitive child
    return children;
  }

  if (childrenType === 'function') {
    // Wrap the function, resolving styles on the result
    return function () {
      var result = children.apply(this, arguments);
      if (_react2.default.isValidElement(result)) {
        return resolveStyles(component, result, config, existingKeyMap, true);
      }
      return result;
    };
  }

  if (_react2.default.Children.count(children) === 1 && children.type) {
    // If a React Element is an only child, don't wrap it in an array for
    // React.Children.map() for React.Children.only() compatibility.
    var onlyChild = _react2.default.Children.only(children);
    return resolveStyles(component, onlyChild, config, existingKeyMap, true);
  }

  return _react2.default.Children.map(children, function (child) {
    if (_react2.default.isValidElement(child)) {
      return resolveStyles(component, child, config, existingKeyMap, true);
    }

    return child;
  });
};

// Recurse over props, just like children
var _resolveProps = function _resolveProps(_ref2) {
  var component = _ref2.component;
  var config = _ref2.config;
  var existingKeyMap = _ref2.existingKeyMap;
  var props = _ref2.props;

  var newProps = props;

  Object.keys(props).forEach(function (prop) {
    // We already recurse over children above
    if (prop === 'children') {
      return;
    }

    var propValue = props[prop];
    if (_react2.default.isValidElement(propValue)) {
      newProps = _extends({}, newProps);
      newProps[prop] = resolveStyles(component, propValue, config, existingKeyMap, true);
    }
  });

  return newProps;
};

var _buildGetKey = function _buildGetKey(_ref3) {
  var componentName = _ref3.componentName;
  var existingKeyMap = _ref3.existingKeyMap;
  var renderedElement = _ref3.renderedElement;

  // We need a unique key to correlate state changes due to user interaction
  // with the rendered element, so we know to apply the proper interactive
  // styles.
  var originalKey = typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
  var key = (0, _getStateKey2.default)(originalKey);

  var alreadyGotKey = false;
  var getKey = function getKey() {
    if (alreadyGotKey) {
      return key;
    }

    alreadyGotKey = true;

    if (existingKeyMap[key]) {
      var elementName = void 0;
      if (typeof renderedElement.type === 'string') {
        elementName = renderedElement.type;
      } else if (renderedElement.type.constructor) {
        elementName = renderedElement.type.constructor.displayName || renderedElement.type.constructor.name;
      }

      throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.') + ' ' + 'Component: "' + componentName + '". ' + (elementName ? 'Element: "' + elementName + '".' : ''));
    }

    existingKeyMap[key] = true;

    return key;
  };

  return getKey;
};

var _setStyleState = function _setStyleState(component, key, stateKey, value) {
  if (!component._radiumIsMounted) {
    return;
  }

  var existing = component._lastRadiumState || component.state && component.state._radiumStyleState || {};

  var state = { _radiumStyleState: _extends({}, existing) };
  state._radiumStyleState[key] = _extends({}, state._radiumStyleState[key]);
  state._radiumStyleState[key][stateKey] = value;

  component._lastRadiumState = state._radiumStyleState;
  component.setState(state);
};

var _runPlugins = function _runPlugins(_ref4) {
  var component = _ref4.component;
  var config = _ref4.config;
  var existingKeyMap = _ref4.existingKeyMap;
  var props = _ref4.props;
  var renderedElement = _ref4.renderedElement;

  // Don't run plugins if renderedElement is not a simple ReactDOMElement or has
  // no style.
  if (!_react2.default.isValidElement(renderedElement) || typeof renderedElement.type !== 'string' || !props.style) {
    return props;
  }

  var newProps = props;

  var plugins = config.plugins || DEFAULT_CONFIG.plugins;

  var componentName = component.constructor.displayName || component.constructor.name;
  var getKey = _buildGetKey({ renderedElement: renderedElement, existingKeyMap: existingKeyMap, componentName: componentName });
  var getComponentField = function getComponentField(key) {
    return component[key];
  };
  var getGlobalState = function getGlobalState(key) {
    return globalState[key];
  };
  var componentGetState = function componentGetState(stateKey, elementKey) {
    return (0, _getState2.default)(component.state, elementKey || getKey(), stateKey);
  };
  var setState = function setState(stateKey, value, elementKey) {
    return _setStyleState(component, elementKey || getKey(), stateKey, value);
  };

  var addCSS = function addCSS(css) {
    var styleKeeper = component._radiumStyleKeeper || component.context._radiumStyleKeeper;
    if (!styleKeeper) {
      if (__isTestModeEnabled) {
        return {
          remove: function remove() {}
        };
      }

      throw new Error('To use plugins requiring `addCSS` (e.g. keyframes, media queries), ' + 'please wrap your application in the StyleRoot component. Component ' + 'name: `' + componentName + '`.');
    }

    return styleKeeper.addCSS(css);
  };

  var newStyle = props.style;

  plugins.forEach(function (plugin) {
    var result = plugin({
      ExecutionEnvironment: _exenv2.default,
      addCSS: addCSS,
      appendImportantToEachValue: _appendImportantToEachValue2.default,
      componentName: componentName,
      config: config,
      cssRuleSetToString: _cssRuleSetToString2.default,
      getComponentField: getComponentField,
      getGlobalState: getGlobalState,
      getState: componentGetState,
      hash: _hash2.default,
      mergeStyles: _mergeStyles.mergeStyles,
      props: newProps,
      setState: setState,
      isNestedStyle: _mergeStyles.isNestedStyle,
      style: newStyle
    }) || {};

    newStyle = result.style || newStyle;

    newProps = result.props && Object.keys(result.props).length ? _extends({}, newProps, result.props) : newProps;

    var newComponentFields = result.componentFields || {};
    Object.keys(newComponentFields).forEach(function (fieldName) {
      component[fieldName] = newComponentFields[fieldName];
    });

    var newGlobalState = result.globalState || {};
    Object.keys(newGlobalState).forEach(function (key) {
      globalState[key] = newGlobalState[key];
    });
  });

  if (newStyle !== props.style) {
    newProps = _extends({}, newProps, { style: newStyle });
  }

  return newProps;
};

// Wrapper around React.cloneElement. To avoid processing the same element
// twice, whenever we clone an element add a special prop to make sure we don't
// process this element again.
var _cloneElement = function _cloneElement(renderedElement, newProps, newChildren) {
  // Only add flag if this is a normal DOM element
  if (typeof renderedElement.type === 'string') {
    newProps = _extends({}, newProps, { 'data-radium': true });
  }

  return _react2.default.cloneElement(renderedElement, newProps, newChildren);
};

//
// The nucleus of Radium. resolveStyles is called on the rendered elements
// before they are returned in render. It iterates over the elements and
// children, rewriting props to add event handlers required to capture user
// interactions (e.g. mouse over). It also replaces the style prop because it
// adds in the various interaction styles (e.g. :hover).
//
resolveStyles = function resolveStyles(component, // ReactComponent, flow+eslint complaining
renderedElement) {
  var config = arguments.length <= 2 || arguments[2] === undefined ? DEFAULT_CONFIG : arguments[2];
  var existingKeyMap = arguments[3];
  var shouldCheckBeforeResolve = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
  // ReactElement
  existingKeyMap = existingKeyMap || {};
  if (!renderedElement ||
  // Bail if we've already processed this element. This ensures that only the
  // owner of an element processes that element, since the owner's render
  // function will be called first (which will always be the case, since you
  // can't know what else to render until you render the parent component).
  renderedElement.props && renderedElement.props['data-radium'] ||

  // Bail if this element is a radium enhanced element, because if it is,
  // then it will take care of resolving its own styles.
  shouldCheckBeforeResolve && !_shouldResolveStyles(renderedElement)) {
    return renderedElement;
  }

  var newChildren = _resolveChildren({
    children: renderedElement.props.children,
    component: component,
    config: config,
    existingKeyMap: existingKeyMap
  });

  var newProps = _resolveProps({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: renderedElement.props
  });

  newProps = _runPlugins({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: newProps,
    renderedElement: renderedElement
  });

  // If nothing changed, don't bother cloning the element. Might be a bit
  // wasteful, as we add the sentinal to stop double-processing when we clone.
  // Assume benign double-processing is better than unneeded cloning.
  if (newChildren === renderedElement.props.children && newProps === renderedElement.props) {
    return renderedElement;
  }

  return _cloneElement(renderedElement, newProps !== renderedElement.props ? newProps : {}, newChildren);
};

// Only for use by tests
var __isTestModeEnabled = false;
if (true) {
  resolveStyles.__clearStateForTests = function () {
    globalState = {};
  };
  resolveStyles.__setTestMode = function (isEnabled) {
    __isTestModeEnabled = isEnabled;
  };
}

exports.default = resolveStyles;
module.exports = exports['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(45);
var ReactComponentTreeHook = __webpack_require__(68);
var ReactElement = __webpack_require__(20);

var checkReactTypeSpec = __webpack_require__(313);

var canDefineProperty = __webpack_require__(71);
var getIteratorFn = __webpack_require__(72);
var warning = __webpack_require__(12);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

   true ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
     true ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }
        info += getDeclarationErrorAddendum();
         true ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (true) {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
             true ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _tree = __webpack_require__(175);

var _tree2 = _interopRequireDefault(_tree);

var _file = __webpack_require__(174);

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCtrlSty = {
  height: '100%',
  padding: '0 10px 0 0'
};

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { id: 'AppCtrlSty', style: AppCtrlSty },
    _react2.default.createElement(
      'div',
      { className: 'FlexBox', style: { height: 'calc(100% - 20px)' } },
      _react2.default.createElement(_tree2.default, null),
      _react2.default.createElement(_file2.default, null)
    )
  );
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(36);

var _reduxThunk = __webpack_require__(99);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(98);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _api = __webpack_require__(178);

var _api2 = _interopRequireDefault(_api);

var _api3 = __webpack_require__(177);

var _api4 = _interopRequireDefault(_api3);

var _file = __webpack_require__(179);

var _file2 = _interopRequireDefault(_file);

var _tree = __webpack_require__(180);

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({ fileState: _file2.default, treeState: _tree2.default });
var middleware = [_reduxThunk2.default];

var api = 1; //run in node-1 run in electron-2
if (api === 1) middleware.push(_api.wsMiddleware);else middleware.push(_api3.ipcMiddleware);

var useLogger = 0;
var loggerMiddleware = (0, _reduxLogger2.default)();
if (useLogger) middleware.push(loggerMiddleware);

var store = (0, _redux.createStore)(reducer, _redux.applyMiddleware.apply(undefined, middleware));

if (api === 1) (0, _api2.default)(store);else (0, _api4.default)(store);

store.dispatch({ type: 'ApiGetTreeData' });

exports.default = store;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 164 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/favicon.ico";

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/fire.ico";

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/leaf.ico";

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/moon.ico";

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/snow.ico";

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sun.ico";

/***/ }),
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileViewSty = {
  backgroundColor: '#232a1f',
  color: '#ccc',
  margin: '5px 20px',
  overflow: 'auto',
  width: '100%'
};

var FileCtrlSty = {
  marginBottom: '5%',
  width: '100%'
};

function FileView(_ref) {
  var fileState = _ref.fileState;

  var htmlDivSty = { width: '100%' };
  if (fileState.fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden';else htmlDivSty.overflow = 'auto';
  var fileHtml = { __html: fileState.fileData };
  return _react2.default.createElement(
    'div',
    { id: 'FileViewCtrlRenderSty', style: FileViewSty },
    _react2.default.createElement(
      'div',
      { id: 'FileCtrlSty', style: FileCtrlSty },
      _react2.default.createElement('div', { dangerouslySetInnerHTML: fileHtml, style: htmlDivSty })
    )
  );
}

function mapStateToProps(store) {
  return { fileState: store.fileState };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileView);

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(29);

var _redux = __webpack_require__(36);

var _tree = __webpack_require__(56);

var _api = __webpack_require__(176);

var _jmsReactComponents = __webpack_require__(198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeCtrlSty = {
  flexGrow: '1',
  height: 'calc(100% - 19px)',
  overflowX: 'auto',
  resize: 'horizontal',
  width: '350px'
};

var options = {
  icon: { sun: 'dev', leaf: 'home', snow: 'sys' },
  typeName: ['node', 'type']
};

var readTreeBtn = { buttonid: 'readTree', text: 'Read Tree' };

var TreeCtrl = function TreeCtrl(props) {
  var iconHandler = function iconHandler(node) {
    props.setTreeNodeClosed(node);
  };
  var clickHandler = function clickHandler(node) {
    props.selectTreeNode(node);
  };
  var readTreeHandler = function readTreeHandler() {
    props.apiReadTree();
  };
  return _react2.default.createElement(
    'div',
    { id: 'TreeCtrl', style: TreeCtrlSty },
    _react2.default.createElement(_jmsReactComponents.JButton, { btn: readTreeBtn, parentClickHandler: readTreeHandler }),
    _react2.default.createElement(_jmsReactComponents.JTreeView, {
      data: props.treeState.treeData,
      options: options,
      iconClick: iconHandler,
      titleClick: clickHandler
    })
  );
};

function mapStateToProps(store) {
  return { treeState: store.treeState };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ selectTreeNode: _tree.selectTreeNode, setTreeNodeClosed: _tree.setTreeNodeClosed, apiReadTree: _api.apiReadTree }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TreeCtrl);

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiReadTree = apiReadTree;
function apiReadTree() {
  return { type: 'ApiReadTree' };
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipcMiddleware = ipcMiddleware;

exports.default = function (store) {

  ipc.on('server:GetFileDataDone', function (event, data) {
    store.dispatch(fileActions.getFileDataDone(data.fileData));
  });

  ipc.on('server:GetTreeDataDone', function (event, data) {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
};

var _file = __webpack_require__(101);

var fileActions = _interopRequireWildcard(_file);

var _tree = __webpack_require__(56);

var treeActions = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ipcMiddleware() {
  return function (next) {
    return function (action) {
      if (ipc) {
        switch (action.type) {
          case 'ApiReadTree':
            ipc.send('client:readTree', {});break;
          case 'ApiGetFileData':
            ipc.send('client:getFileData', action.data);break;
          case 'ApiGetTreeData':
            ipc.send('client:getTreeData');break;
          case 'ApiSetTreeData':
            ipc.send('client:setTreeData', action.data);break;
        }
      }
      return next(action);
    };
  };
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wsMiddleware = wsMiddleware;

exports.default = function (store) {
  /* eslint-disable */
  socket = new io();
  /* eslint-enable */

  socket.on('server:GetFileDataDone', function (data) {
    store.dispatch(fileActions.getFileDataDone(data.fileData));
  });

  socket.on('server:GetTreeDataDone', function (data) {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
};

var _file = __webpack_require__(101);

var fileActions = _interopRequireWildcard(_file);

var _tree = __webpack_require__(56);

var treeActions = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var socket = null;

function wsMiddleware() {
  return function (next) {
    return function (action) {
      if (socket) {
        switch (action.type) {
          case 'ApiReadTree':
            socket.emit('client:readTree', {});break;
          case 'ApiGetFileData':
            socket.emit('client:getFileData', action.data);break;
          case 'ApiGetTreeData':
            socket.emit('client:getTreeData');break;
          case 'ApiSetTreeData':
            socket.emit('client:setTreeData', action.data);break;
        }
      }
      return next(action);
    };
  };
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleActions;

var initialFileState = {
  fileData: ''
};

function handleActions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialFileState;
  var action = arguments[1];

  var _fileState = Object.assign({}, state);
  switch (action.type) {
    case 'GetFileDataDone':
      _fileState.fileData = action.data;return _fileState;
    case 'GetTreeDataDone':
      _fileState.fileData = '';return _fileState;
    default:
      return state;
  }
}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = handleActions;

var _lodash = __webpack_require__(97);

var _lodash2 = _interopRequireDefault(_lodash);

var _traverse = __webpack_require__(100);

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _gotTreeData(treedata) {
  var _currentTreeNode = _getSelected(treedata);
  if (_currentTreeNode == null) _currentTreeNode = treedata[0];
  return { treeData: treedata, currentTreeNode: _currentTreeNode };
}

function _getSelected(tree) {
  var result = null;
  _lodash2.default.each(tree, function (node) {
    if (node.selected) result = node;
    if (result == null && node.children.length > 0) result = _getSelected(node.children);
  });
  return result;
}

function _getNodeIndex(_treeData, treeNode) {
  var treeData = _treeData;
  var nodeID = treeNode.nodeid;
  if (_lodash2.default.isEmpty(nodeID)) {
    return [];
  }

  var nodeIdArray = nodeID.split('/'),
      searchID = nodeIdArray.shift(),
      nodeIndex = [],
      index = void 0,
      nextSearchID = void 0;

  while (searchID) {
    if (!treeData) {
      return [];
    }
    var treeItem = _lodash2.default.find(treeData, { nodeid: searchID });
    index = _lodash2.default.indexOf(treeData, treeItem);
    if (index < 0) {
      return [];
    }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += '/' + nextSearchID;
      treeData = treeData[index].children;
      if (treeData) {
        nodeIndex.push('children');
      }
    } else searchID = nextSearchID;
  }

  return nodeIndex;
}

function _selectTreeNode(_treeData, _currentTreeNode, treeNode) {
  var nodeIndex1 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex1.push('selected');
  (0, _traverse2.default)(_treeData).set(nodeIndex1, false);
  _currentTreeNode = treeNode;
  var nodeIndex2 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex2.push('selected');
  (0, _traverse2.default)(_treeData).set(nodeIndex2, true);

  return { treeData: _treeData, currentTreeNode: _currentTreeNode };
}

function _setTreeNodeClosed(_treeData, treeNode) {
  var nodeIndex = _getNodeIndex(_treeData, treeNode);
  nodeIndex.push('closed');
  var visible = (0, _traverse2.default)(_treeData).get(nodeIndex);
  if (typeof visible === 'undefined') visible = false;else visible = !visible;
  if (visible) (0, _traverse2.default)(_treeData).set(nodeIndex, true);else (0, _traverse2.default)(_treeData).set(nodeIndex, false);

  return { treeData: _treeData };
}

var initialTreeState = {
  treeData: [{}],
  currentTreeNode: { title: 'not selected' }
};

function handleActions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialTreeState;
  var action = arguments[1];

  var _treeState = Object.assign({}, state);
  var treeCopy = _treeState.treeData.slice(0);
  var currentCopy = Object.assign({}, _treeState.currentTreeNode);
  switch (action.type) {
    case 'GetTreeDataDone':
      {
        return _gotTreeData(action.data);
      }
    case 'SelectTreeNode':
      {
        return _selectTreeNode(treeCopy, currentCopy, action.node);
      }
    case 'SetTreeNodeClosed':
      {
        var closedTreeData = _setTreeNodeClosed(treeCopy, action.node);
        return _extends({}, state, closedTreeData);
      }
    default:
      return state;
  }
}

/***/ }),
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  JButton: __webpack_require__(105),
  JDropMenu: __webpack_require__(200),
  JDropSelect: __webpack_require__(201),
  JMultiSelect: __webpack_require__(202),
  JInput: __webpack_require__(203),
  JGallery: __webpack_require__(205),
  JList: __webpack_require__(209),
  JPageIndicator: __webpack_require__(210),
  JProgressBar: __webpack_require__(211),
  JRangeSelector: __webpack_require__(212),
  JSlider: __webpack_require__(213),
  JTooltip: __webpack_require__(214),
  JTreeView: __webpack_require__(215),
  JTreeViewB: __webpack_require__(216)
};

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Icon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.styles = function () {
      return {
        component: Object.assign({
          width: _this.props.size,
          height: _this.props.size,
          display: 'inline-block',
          verticalAlign: 'middle'
        }, _this.props.style)
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var elementProps = this.props.elementProps;

      var styles = this.styles();

      return React.createElement(
        'svg',
        _extends({}, elementProps, {
          className: 'mx-icon',
          preserveAspectRatio: 'xMidYMid meet',
          style: styles.component,
          viewBox: '0 0 512 512'
        }),
        React.createElement(
          'g',
          null,
          React.createElement('path', {
            d: 'M256,88.6c-92.3,0-167.4,75.1-167.4,167.4S163.7,423.4,256,423.4S423.4,348.3,423.4,256\n            S348.3,88.6,256,88.6z M256,395.5c-76.9,0-139.5-62.6-139.5-139.5S179.1,116.5,256,116.5S395.5,179.1,395.5,256\n            S332.9,395.5,256,395.5z'
          }),
          React.createElement('path', {
            d: 'M331.8,180.2c-5.4-5.4-14.3-5.4-19.7,0L256,236.3l-56.1-56.1c-5.4-5.4-14.3-5.4-19.7,0\n            c-5.4,5.4-5.4,14.3,0,19.7l56.1,56.1l-56.1,56.1c-5.4,5.4-5.4,14.3,0,19.7c2.7,2.7,6.3,4.1,9.9,4.1c3.6,0,7.1-1.4,9.9-4.1\n            l56.1-56.1l56.1,56.1c2.7,2.7,6.3,4.1,9.9,4.1s7.1-1.4,9.9-4.1c5.4-5.4,5.4-14.3,0-19.7L275.7,256l56.1-56.1\n            C337.3,194.4,337.3,185.6,331.8,180.2z'
          })
        )
      );
    }
  }]);

  return Icon;
}(React.Component);

Icon.propTypes = {
  elementProps: React.PropTypes.object,
  size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  style: React.PropTypes.object,
  type: React.PropTypes.string
};

Icon.defaultProps = {
  elementProps: {},
  size: 24,
  type: 'accounts'
};

module.exports = Icon;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownSty = { position: 'relative' };

var DropdownControlSty = {
  position: 'relative',
  overflow: 'hidden',
  background: 'transparent',
  boxSizing: 'border-box',
  cursor: 'default',
  outline: 'none',
  padding: '5px 5px',
  textAlign: 'right',
  transition: 'all 200ms ease',
  width: '100%'
};

var DropdownMenuSty = {
  backgroundColor: '#261a3b',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
  boxSizing: 'border-box',
  fontSize: '.9em',
  lineHeight: '150%',
  marginTop: '-1px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '8px 12px',
  position: 'absolute',
  right: '0px',
  top: '100%',
  zIndex: '200'
};

var DropdownSeperatorSty = {
  backgroundColor: '#000000',
  height: '3px',
  margin: '3px 0',
  width: '100%'
};

var DropdownOptionSty = {
  boxSizing: 'border-box',
  color: '#EEFFEE',
  cursor: 'pointer',
  display: 'block'
};

var JDropMenu = function (_React$Component) {
  _inherits(JDropMenu, _React$Component);

  function JDropMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JDropMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JDropMenu.__proto__ || Object.getPrototypeOf(JDropMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isOpen: false, selected: {} }, _this.setValue = function (e) {
      var selectedOption = _this.props.options[parseInt(e.target.id)];
      _this.props.onChange(selectedOption);
      _this.setState({ isOpen: false });
    }, _this.handleMouseDown = function (event) {
      if (event.type == 'mousedown' && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();
      _this.setState({ isOpen: !_this.state.isOpen });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JDropMenu, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var items = this.props.options.map(function (option, index) {
        if (option.type == 'seperator') {
          return _react2.default.createElement('div', { style: DropdownSeperatorSty, key: option.key });
        } else {
          return _react2.default.createElement(
            'div',
            {
              id: index,
              key: option.value,
              style: DropdownOptionSty,
              onClick: _this2.setValue
            },
            option.label
          );
        }
      });

      var value = _react2.default.createElement('i', { className: 'fa fa-bars fa-lg' });
      var menu = this.state.isOpen ? _react2.default.createElement(
        'div',
        { style: DropdownMenuSty },
        items
      ) : null;

      return _react2.default.createElement(
        'div',
        { style: DropdownSty },
        _react2.default.createElement(
          'div',
          { style: DropdownControlSty, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
          value
        ),
        menu
      );
    }
  }]);

  return JDropMenu;
}(_react2.default.Component);

JDropMenu.propTypes = {
  options: _react2.default.PropTypes.array.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};

module.exports = JDropMenu;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownSty = { display: 'inline-block', lineHeight: '18px', position: 'relative' };

var DropdownControlSty = {
  background: 'transparent',
  boxSizing: 'border-box',
  cursor: 'default',
  overflow: 'hidden',
  outline: 'none',
  position: 'relative',
  textAlign: 'right',
  transition: 'all 200ms ease',
  width: '100%'
};

var DropdownMenuSty = {
  backgroundColor: '#FFF',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
  boxSizing: 'border-box',
  fontSize: '.9em',
  lineHeight: '140%',
  marginTop: '-1px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '8px 12px',
  position: 'absolute',
  right: '0px',
  top: '100%',
  WebkitOverflowScrolling: 'touch',
  whiteSpace: 'nowrap',
  zIndex: '200'
};

var DropdownArrowSty = {
  borderColor: '#999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '5px 5px 0',
  content: '\' \'',
  display: 'block',
  height: '0px',
  marginTop: '-ceil(5)',
  position: 'absolute',
  right: '8px',
  top: '6px',
  width: '0px'
};

var DropdownSeperatorSty = {
  backgroundColor: '#000000',
  height: '3px',
  margin: '3px 0',
  width: '100%'
};

var DropdownOptionSty = {
  boxSizing: 'border-box',
  color: '#EEFFEE',
  cursor: 'pointer',
  display: 'block'
};

var placeSty = {
  backgroundColor: 'transparent',
  paddingRight: '20px'
};

var JDropSelect = function (_React$Component) {
  _inherits(JDropSelect, _React$Component);

  function JDropSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JDropSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JDropSelect.__proto__ || Object.getPrototypeOf(JDropSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isOpen: false, selected: { label: 'Select...', value: '' } }, _this.setValue = function (e) {
      var selectedOption = _this.props.options[parseInt(e.target.id)];
      if (selectedOption !== _this.state.selected && _this.props.onChange) _this.props.onChange(_this.props.itemName, selectedOption);
      _this.setState({ selected: selectedOption, isOpen: false });
    }, _this.handleMouseDown = function (event) {
      if (event.type == 'mousedown' && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();
      _this.setState({ isOpen: !_this.state.isOpen });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JDropSelect, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ selected: this.props.defaultSelected || { label: 'Select...', value: '' } });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.defaultSelected && newProps.defaultSelected !== this.state.selected) {
        this.setState({ selected: newProps.defaultSelected });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var items = this.props.options.map(function (option, index) {
        if (option.type == 'seperator') {
          return _react2.default.createElement('div', { style: DropdownSeperatorSty, key: option.key });
        } else {
          var selected = Boolean(option.label == _this2.state.selected.label);
          var labelSpanSty = { cursor: 'pointer' };
          labelSpanSty.color = selected ? 'green' : 'black';
          return _react2.default.createElement(
            'div',
            {
              id: index,
              key: option.value,
              style: DropdownOptionSty,
              onClick: _this2.setValue
            },
            _react2.default.createElement(
              'span',
              { id: index, style: labelSpanSty },
              option.label
            )
          );
        }
      });

      var value = _react2.default.createElement(
        'div',
        { style: placeSty },
        this.state.selected.label
      );
      var menu = this.state.isOpen ? _react2.default.createElement(
        'div',
        { style: DropdownMenuSty },
        items
      ) : null;

      return _react2.default.createElement(
        'div',
        { id: 'DropdownSty', style: DropdownSty },
        _react2.default.createElement(
          'div',
          {
            id: 'DropdownControlSty',
            style: DropdownControlSty,
            onMouseDown: this.handleMouseDown,
            onTouchEnd: this.handleMouseDown
          },
          value,
          _react2.default.createElement('span', { id: 'DropdownArrowSty', style: DropdownArrowSty })
        ),
        menu
      );
    }
  }]);

  return JDropSelect;
}(_react2.default.Component);

JDropSelect.propTypes = {
  options: _react2.default.PropTypes.array.isRequired,
  defaultSelected: _react2.default.PropTypes.object.isRequired,
  itemName: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};

module.exports = JDropSelect;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);
var Radium = __webpack_require__(64);

var Icon = __webpack_require__(199);

var DropdownArrowSty = {
  borderColor: '#999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '5px 5px 0',
  content: '',
  display: 'block',
  height: '0px',
  marginTop: '-ceil(5)',
  position: 'absolute',
  right: '8px',
  top: '6px',
  width: '0px'
};

var MultiSelect = function (_React$Component) {
  _inherits(MultiSelect, _React$Component);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.currentValue.length === 0 && _this.props.currentValue.length > 0) {
        _this.setState({ selectedItems: [] });
      } else if (nextProps.currentValue.length > _this.props.currentValue.length) {
        var newValues = [];
        nextProps.currentValue.forEach(function (value) {
          var index = nextProps.items.findIndex(function (option) {
            return option.value === value;
          });
          if (index > -1) newValues.push(nextProps.items[index]);
        });
        _this.setState({ selectedItems: newValues });
      }
    };

    _this._getFilteredItems = function () {
      return _this.props.items.filter(function (item) {
        return _this.state.selectedItems.indexOf(item) === -1 && item.label.toLowerCase().indexOf(_this.state.searchString.toLowerCase()) > -1;
      });
    };

    _this._handleBlur = function () {
      _this.setState({
        highlightedValue: null,
        isOpen: false,
        searchString: ''
      });
    };

    _this._handleFocus = function () {
      _this.setState({ isOpen: true });

      if (_this.input) _this.input.focus();
    };

    _this._handleItemMouseOver = function () {
      _this.setState({ highlightedValue: null });
    };

    _this._handleSelectAll = function () {
      _this.props.onChange(_this.props.itemName, _this.props.items);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: _this.props.items
      });
    };

    _this._handleClearAll = function () {
      _this.props.onChange(_this.props.itemName, []);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: []
      });
    };

    _this._handleItemSelect = function (e) {
      //add to selectedItems
      var selectedItems = _this.state.selectedItems;

      var getFilteredItemsIndex = parseInt(e.target.id);
      var item = _this._getFilteredItems()[getFilteredItemsIndex];

      selectedItems.push(item);

      _this.props.onChange(_this.props.itemName, selectedItems);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: selectedItems
      });

      if (_this.input) _this.input.focus();
    };

    _this._handleItemRemove = function (e) {
      var item = _this.state.selectedItems[parseInt(e.target.id)];

      var selectedItems = _this.state.selectedItems.filter(function (selectedItem) {
        return selectedItem !== item;
      });

      _this.props.onChange(_this.props.itemName, selectedItems);

      _this.setState({ selectedItems: selectedItems });

      if (_this.input) _this.input.focus();
    };

    _this._scrollList = function (nextIndex, scrollDirection) {
      var filteredItems = _this._getFilteredItems();
      var ul = _this.optionList;
      var skipClearSelectAll = 2;
      var activeLi = ul.children[nextIndex + skipClearSelectAll];

      if (scrollDirection === 'up' && activeLi) {
        var heightFromTop = (nextIndex + skipClearSelectAll) * activeLi.clientHeight + activeLi.clientHeight;

        if (heightFromTop > ul.clientHeight || nextIndex === 0) {
          ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
        }
      } else if (scrollDirection === 'down' && activeLi) {
        var heightFromBottom = (filteredItems.length - nextIndex) * activeLi.clientHeight;

        if (heightFromBottom > ul.clientHeight) {
          ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
        }

        if (nextIndex === filteredItems.length - 1) {
          ul.scrollTop = filteredItems.length * activeLi.clientHeight;
        }
      }
    };

    _this._handleClose = function () {
      _this.setState({
        searchString: '',
        isOpen: false,
        highlightedValue: null
      });
    };

    _this._handleInputChange = function (e) {
      _this.setState({ searchString: e.target.value });
    };

    _this._renderSelectedItems = function () {
      return _this.state.selectedItems.map(function (item, index) {
        return React.createElement(
          'div',
          { className: 'mx-MultiSelect-selected', key: index, style: styles.itemTag },
          item.label,
          React.createElement(Icon, {
            elementProps: { id: index, onClick: _this._handleItemRemove },
            size: 15,
            style: styles.removeIcon,
            type: 'close'
          })
        );
      });
    };

    _this._renderItemList = function () {
      var selectAll = React.createElement(
        'div',
        {
          className: 'mx-MultiSelect-select-all',
          key: 'selectAllItem',
          onMouseDown: _this._handleSelectAll,
          onMouseOver: _this._handleItemMouseOver,
          style: styles.item
        },
        'Select All'
      );
      var clear = React.createElement(
        'div',
        {
          className: 'mx-MultiSelect-clear-all',
          key: 'clearAllItem',
          onMouseDown: _this._handleClearAll,
          onMouseOver: _this._handleItemMouseOver,
          style: styles.item
        },
        'Clear'
      );
      var showSelectAll = _this.props.useSelectAll && _this.state.selectedItems.length !== _this.props.items.length;
      return React.createElement(
        'div',
        { className: 'mx-MultiSelect-option-list', ref: function ref(_ref) {
            return _this.optionList = _ref;
          }, style: styles.itemList },
        showSelectAll ? selectAll : null,
        _this._getFilteredItems().map(function (item, index) {
          return React.createElement(
            'div',
            {
              className: 'mx-MultiSelect-option FlexBox FlexJustify',
              key: index,
              id: index,
              onMouseDown: _this._handleItemSelect,
              onMouseOver: _this._handleItemMouseOver,
              style: [styles.item, item === _this.state.highlightedValue && styles.activeItem]
            },
            React.createElement(
              'span',
              { id: index },
              item.label
            ),
            React.createElement(
              'span',
              { id: index },
              item.count
            )
          );
        }),
        _this.state.selectedItems.length > 0 ? clear : null,
        React.createElement(
          'div',
          {
            className: 'mx-MultiSelect-close',
            key: 'close',
            onMouseDown: _this._handleClose,
            onMouseOver: _this._handleItemMouseOver,
            style: [styles.item, styles.close]
          },
          React.createElement(
            'span',
            null,
            'Close'
          )
        )
      );
    };

    _this.state = {
      highlightedValue: null,
      isOpen: false,
      searchString: '',
      selectedItems: props.preSelectedItems
    };
    return _this;
  }

  _createClass(MultiSelect, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        {
          className: 'mx-MultiSelect',
          onBlur: this._handleBlur,
          onFocus: this._handleFocus,
          style: [styles.component, this.props.style],
          tabIndex: '0'
        },
        this._renderSelectedItems(),
        React.createElement(
          'div',
          {
            className: 'mx-MultiSelect-option-list-container',
            style: [styles.itemListContainer, !this.state.isOpen && { display: 'none' }]
          },
          this._renderItemList()
        ),
        React.createElement('span', { id: 'DropdownArrowSty', style: DropdownArrowSty })
      );
    }
  }]);

  return MultiSelect;
}(React.Component);

MultiSelect.propTypes = {
  items: React.PropTypes.array,
  onItemRemove: React.PropTypes.func,
  onItemSelect: React.PropTypes.func,
  placeholderText: React.PropTypes.string,
  preSelectedItems: React.PropTypes.array,
  useSelectAll: React.PropTypes.bool
};

MultiSelect.defaultProps = {
  items: [],
  onItemRemove: function onItemRemove() {},
  onItemSelect: function onItemSelect() {},

  placeholderText: 'Select Filters',
  preSelectedItems: [],
  useSelectAll: false
};

var StyleConstants = {
  FontFamily: 'ProximaNovaRegular, Helvetica, Arial, sans-serif',
  Colors: {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    NormalBackground: '#eaeae0',
    ActiveBackground: '#435c3c'
  }
};

var styles = {
  component: {
    backgroundColor: StyleConstants.Colors.NormalBackground,
    boxSizing: 'border-box',
    color: 'black',
    fontFamily: StyleConstants.FontFamily,
    fontSize: '1em',
    lineHeight: '18px',
    padding: '0px',
    position: 'relative',
    WebkitAppearance: 'none',
    width: '100%',
    minHeight: '18px',

    ':focus': {
      backgroundColor: StyleConstants.Colors.NormalBackground,
      boxShadow: 'none',
      color: StyleConstants.Colors.BLACK,
      outline: 'none'
    }
  },
  activeItem: {
    backgroundColor: StyleConstants.Colors.ActiveBackground,
    color: StyleConstants.Colors.WHITE
  },
  clearFix: {
    clear: 'both'
  },
  close: {
    padding: '5px',
    textAlign: 'center'
  },
  itemList: {
    minHeight: '18px',
    maxHeight: '200px',
    overflow: 'auto'
  },
  itemListContainer: {
    clear: 'both',
    backgroundColor: StyleConstants.Colors.NormalBackground,
    position: 'absolute',
    left: -1,
    right: -1,
    marginTop: '7px',
    marginBottom: '20px',
    zIndex: 10
  },
  itemTag: {
    backgroundColor: StyleConstants.Colors.NormalBackground,
    display: 'inline-block',
    lineHeight: '0.8em',
    marginTop: '1px',
    marginRight: '2px',
    marginBottom: '1px',
    paddingLeft: '3px',
    position: 'relative'
  },
  item: {
    color: StyleConstants.Colors.BLACK,
    cursor: 'pointer',
    padding: '3px',
    lineHeight: '1em',

    ':focus': {
      border: 'none',
      boxShadow: 'none',
      outline: 'none'
    },
    ':hover': {
      backgroundColor: StyleConstants.Colors.ActiveBackground,
      color: StyleConstants.Colors.WHITE
    }
  },
  removeIcon: {
    color: StyleConstants.Colors.BLACK,
    marginLeft: '5px',
    cursor: 'pointer'
  }
};

module.exports = Radium(MultiSelect);

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JInput = function (_React$Component) {
  _inherits(JInput, _React$Component);

  function JInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JInput.__proto__ || Object.getPrototypeOf(JInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = { textValue: '' }, _this.componentDidMount = function () {
      if (_this.props.input.textValue) _this.setState({ textValue: _this.props.input.textValue });
      if (_this.props.input.focus) _this.inputRef.focus();
    }, _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.input.textValue && _this.state.textValue != nextProps.input.textValue) {
        _this.setState({ textValue: nextProps.input.textValue });
      }
    }, _this.handleCheckedChange = function (event) {
      _this.props.handleChange(_this.props.input.name, event.target.checked);
    }, _this.handleTextValueChange = function (event) {
      var newValue = event.target.value;
      _this.setState({ textValue: newValue });
      _this.props.handleChange(_this.props.input.name, newValue);
    }, _this.handleValueChange = function (event) {
      _this.props.handleChange(_this.props.input.name, event.target.value);
    }, _this.handleFolderChange = function (event) {
      _this.props.handleChange(_this.props.input.name, event.target.value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputSty = this.props.input.style || { color: '#4d2c3d' };
      var inputType = this.props.input.type || 'text';
      var returnIt = '';

      switch (inputType) {
        case 'checkbox':
          {
            var checkedValue = this.props.input.checkedValue != null ? this.props.input.checkedValue : false;
            returnIt = _react2.default.createElement('input', {
              ref: function ref(_ref2) {
                _this2.inputRef = _ref2;
              },
              type: inputType,
              style: inputSty,
              checked: checkedValue,
              onChange: this.handleCheckedChange
            });
            break;
          }
        case 'radio':
          {
            var radioValue = this.props.input.radioValue || '';
            var radioChecked = this.props.input.radioChecked != null ? this.props.input.radioChecked : false;
            returnIt = _react2.default.createElement('input', {
              ref: function ref(_ref3) {
                _this2.inputRef = _ref3;
              },
              type: inputType,
              style: inputSty,
              checked: radioChecked,
              value: radioValue,
              onChange: this.handleValueChange
            });
            break;
          }
        case 'color':
          {
            var colorValue = this.props.input.colorValue || '#1A3212';
            returnIt = _react2.default.createElement('input', {
              type: inputType,
              ref: function ref(_ref4) {
                _this2.inputRef = _ref4;
              },
              style: inputSty,
              value: colorValue,
              onChange: this.handleValueChange
            });
            break;
          }
        case 'number':
        case 'range':
          {
            var numberValue = this.props.input.numberValue || 0;
            var min = this.props.input.min || 0;
            var max = this.props.input.max || 100;
            var step = this.props.input.step || 1;
            returnIt = _react2.default.createElement('input', {
              type: inputType,
              ref: function ref(_ref5) {
                _this2.inputRef = _ref5;
              },
              style: inputSty,
              value: numberValue,
              min: min, max: max, step: step,
              onChange: this.handleValueChange
            });
            break;
          }
        case 'file':
          {
            returnIt = _react2.default.createElement('input', {
              type: inputType,
              ref: function ref(_ref6) {
                _this2.inputRef = _ref6;
              },
              style: inputSty,
              onChange: this.handleFolderChange,
              multiple: true
            });
            break;
          }
        default:
          {
            var textValue = this.state.textValue;
            returnIt = _react2.default.createElement('input', {
              type: inputType,
              ref: function ref(_ref7) {
                _this2.inputRef = _ref7;
              },
              style: inputSty,
              value: textValue,
              onChange: this.handleTextValueChange
            });
            break;
          }
      }

      return returnIt;
    }
  }]);

  return JInput;
}(_react2.default.Component);

JInput.propTypes = {
  input: _react2.default.PropTypes.object.isRequired,
  handleChange: _react2.default.PropTypes.func.isRequired
};

// const input.object = {
//   name: 'string - id returned to handleValueChange', Required
//   type: 'string - text(default), checkbox, color, file, number, range and radio',
//   focus: 'bool - focus on this ref',
//   style: 'object - replace default style',
//   min: 'int - number and range type min value',
//   max: 'int - number and range type max value',
//   step: 'int - number and range type step value',
//   radioValue: 'string - radio type label/value',
//   radioChecked: 'bool - radio type selected'
// };

module.exports = JInput;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var backgroundSize = 'contain';
var dropShadow = '0 1px 0px #333, 1px 0 0px #333, 1px 2px 1px #333, 2px 1px 1px #333, 2px 3px 2px #333';

module.exports = {
  GallerySty: {
    backgroundColor: 'grey',
    color: 'white',
    height: '100vh',
    left: '0px',
    padding: '0 10px 0 0',
    position: 'absolute',
    top: '0px',
    width: '100vw'
  },
  imageDivSty: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: backgroundSize,
    height: '100%',
    MozBackgroundSize: backgroundSize,
    OBackgroundSize: backgroundSize,
    overflow: 'hidden',
    padding: '0px',
    position: 'relative',
    WebkitBackgroundSize: backgroundSize,
    width: '100%'
  },
  imageThumbSty: { position: 'relative', height: '100%', width: '100%' },
  actionSty: { position: 'relative', height: '100%', width: '100%' },
  fullCloseSty: { position: 'absolute', left: '15px', top: '5px' },
  nextSty: { position: 'absolute', right: '25px', top: '50%' },
  prevSty: { position: 'absolute', left: '25px', top: '50%' },
  thumbsOpenSty: { position: 'absolute', right: '25px', top: '5px' },
  thumbsClosedSty: { color: '#afac87', position: 'absolute', right: '25px', top: '0px' },
  nextPanelSty: { height: '80vh', position: 'absolute', right: '0px', top: '10vh', width: '75%' },
  prevPanelSty: { height: '80vh', position: 'absolute', left: '0px', top: '10vh', width: '25%' },
  copyRightSty: {
    position: 'absolute', color: '#777', right: '5px', top: '75%', fontSize: '.8em',
    writingMode: 'vertical-rl', textShadow: dropShadow
  },
  statusSty: { color: 'black', fontSize: '1.5em', position: 'absolute', textAlign: 'center', top: '5px', width: '100%' }
};

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _screenfull = __webpack_require__(472);

var _screenfull2 = _interopRequireDefault(_screenfull);

var _jButton = __webpack_require__(105);

var _jButton2 = _interopRequireDefault(_jButton);

var _jThumbs = __webpack_require__(206);

var _jThumbs2 = _interopRequireDefault(_jThumbs);

var _gallery = __webpack_require__(204);

var _gallery2 = _interopRequireDefault(_gallery);

var _shortcuts = __webpack_require__(208);

var _shortcuts2 = _interopRequireDefault(_shortcuts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var infoPicCommentSty = {
  background: 'rgba(0, 0, 0, .7)',
  borderRadius: '20px',
  bottom: '0px',
  color: '#ffffff',
  display: 'inline-block',
  maxWidth: '600px',
  padding: '20px',
  position: 'relative',
  textShadow: '0 1px 0px #000, 1px 0 0px #000, 1px 2px 1px #000, 2px 1px 1px #000, 2px 3px 2px #000',
  width: 'auto'
};

var infoCommentOuterSty = {
  bottom: '0',
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
  zIndex: '201'
};

var GalleryRender = function (_React$Component) {
  _inherits(GalleryRender, _React$Component);

  function GalleryRender() {
    _classCallCheck(this, GalleryRender);

    return _possibleConstructorReturn(this, (GalleryRender.__proto__ || Object.getPrototypeOf(GalleryRender)).apply(this, arguments));
  }

  _createClass(GalleryRender, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.data.length === 0 || this.props.hide) return null;
      var btnX = void 0;
      if (window.screen.width > 2560 || window.screen.height > 2560) btnX = 'fa-3x';else btnX = 'fa-2x';
      var fullBtnIcon = this.state.isNotExpanded ? 'fa fa-expand fa-2x' : 'fa fa-compress fa-2x';
      var closeBtn = { buttonid: 'close', icon: 'fa fa-close ' + btnX, style: 'BtnImg' };
      var fullBtn = { buttonid: 'full', icon: fullBtnIcon, style: 'BtnImg' };
      var nextBtn = { buttonid: 'next', icon: 'fa fa-chevron-right ' + btnX, style: 'BtnImg' };
      var prevBtn = { buttonid: 'prev', icon: 'fa fa-chevron-left ' + btnX, style: 'BtnImg' };
      var shortcutsBtn = { buttonid: 'shortcuts', icon: 'fa fa-keyboard-o ' + btnX, style: 'BtnImg' };
      var thumbsOpenColumnBtn = { buttonid: 'openThumbs', icon: 'fa fa-film ' + btnX, style: 'BtnImg' };
      var thumbsOpenRowBtn = { buttonid: 'openThumbs', icon: 'fa fa-film fa-rotate-90 ' + btnX, style: 'BtnImg' };
      var InfoCommentOuterSty = Object.assign({}, infoCommentOuterSty);
      var InfoPicCommentSty = Object.assign({}, infoPicCommentSty);

      var PicList = this.props.data;
      var imageSrc = PicList[this.state.index].lgFolder + PicList[this.state.index].FileName;

      var GalleryImageSty = Object.assign({}, _gallery2.default.imageDivSty);
      GalleryImageSty.backgroundImage = 'url(' + imageSrc + ')';

      var HoverSty = { height: '100%', width: '100%' };
      if (this.state.hover) HoverSty.display = 'block';else HoverSty.display = 'none';

      var status = this.state.index + 1 + '/' + PicList.length;
      var imageThumbClass = void 0;
      if (this.state.thumbColumn) imageThumbClass = 'FlexBox';else imageThumbClass = 'FlexBoxC';
      var ThumbsOpenSty = Object.assign({}, _gallery2.default.thumbsOpenSty);
      var ThumbsClosedSty = Object.assign({}, _gallery2.default.thumbsClosedSty);
      if (this.state.hideThumbs) {
        ThumbsOpenSty.display = 'block';
        ThumbsClosedSty.display = 'none';
      } else {
        ThumbsOpenSty.display = 'none';
        ThumbsClosedSty.display = 'block';
      }

      var copyRight = PicList[this.state.index].Copyright;
      var banClass = 'fa fa-close fa-stack-1x';

      var comment = PicList[this.state.index].Description;
      InfoCommentOuterSty.display = comment ? 'block' : 'none';
      var showClose = { display: this.props.close ? 'inlineBlock' : 'none' };
      return _react2.default.createElement(
        'div',
        { id: 'GallerySty', style: _gallery2.default.GallerySty },
        _react2.default.createElement(
          'div',
          { id: 'imageThumbDiv', className: imageThumbClass, style: _gallery2.default.imageThumbSty },
          _react2.default.createElement(
            'div',
            { id: 'imageDiv', style: GalleryImageSty },
            _react2.default.createElement(
              'div',
              { id: 'status', className: 'HighZ', style: _gallery2.default.statusSty },
              status
            ),
            _react2.default.createElement(
              'div',
              { id: 'copyRight', style: _gallery2.default.copyRightSty },
              copyRight
            ),
            _react2.default.createElement(
              'div',
              { id: 'actionDiv', className: 'HighZ', style: _gallery2.default.actionSty, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
              _react2.default.createElement(
                'div',
                { id: 'hoverDiv', style: HoverSty },
                _react2.default.createElement(
                  'div',
                  { id: 'prevdiv', style: _gallery2.default.prevSty },
                  _react2.default.createElement(_jButton2.default, { btn: prevBtn })
                ),
                _react2.default.createElement(
                  'div',
                  { id: 'nextdiv', style: _gallery2.default.nextSty },
                  _react2.default.createElement(_jButton2.default, { btn: nextBtn })
                ),
                _react2.default.createElement(
                  'div',
                  { id: 'thumbsOpenDiv', style: ThumbsOpenSty },
                  _react2.default.createElement(_jButton2.default, { btn: thumbsOpenColumnBtn, parentClickHandler: this.hideThumbHandlerP }),
                  '\xA0',
                  _react2.default.createElement(_jButton2.default, { btn: thumbsOpenRowBtn, parentClickHandler: this.hideThumbHandlerL })
                ),
                _react2.default.createElement(
                  'div',
                  { id: 'thumbsClosedDiv', style: ThumbsClosedSty, onClick: this.hideThumbHandler },
                  _react2.default.createElement(
                    'span',
                    { className: 'fa-stack fa-2x' },
                    _react2.default.createElement('i', { className: 'fa fa-film fa-stack-1x' }),
                    _react2.default.createElement('i', { className: banClass })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { id: 'fulldiv', style: _gallery2.default.fullCloseSty },
                  _react2.default.createElement(_jButton2.default, { btn: fullBtn, parentClickHandler: this.actionHandler }),
                  _react2.default.createElement(
                    'span',
                    { style: showClose },
                    '\xA0',
                    _react2.default.createElement(_jButton2.default, { btn: closeBtn, parentClickHandler: this.actionHandler })
                  ),
                  '\xA0',
                  _react2.default.createElement(_jButton2.default, { btn: shortcutsBtn, parentClickHandler: this.hideShortcutsHandler })
                ),
                _react2.default.createElement('div', { id: 'nextPanel', style: _gallery2.default.nextPanelSty, onClick: this.nextIndex }),
                _react2.default.createElement('div', { id: 'prevPanel', style: _gallery2.default.prevPanelSty, onClick: this.prevIndex }),
                _react2.default.createElement(_shortcuts2.default, { closeHandler: this.hideShortcutsHandler, hide: this.state.hideShortcuts })
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'InfoCommentOuterSty', style: InfoCommentOuterSty },
              _react2.default.createElement(
                'div',
                { id: 'InfoPicCommentSty', ref: function ref(_ref) {
                    _this2.infoComment = _ref;
                  }, style: InfoPicCommentSty },
                comment
              )
            )
          ),
          _react2.default.createElement(_jThumbs2.default, {
            data: { list: PicList, index: this.state.index },
            selectHandler: this.thumbClickHandler,
            thumbColumn: this.state.thumbColumn,
            hide: this.state.hideThumbs
          })
        )
      );
    }
  }]);

  return GalleryRender;
}(_react2.default.Component);

var JGallery = function (_GalleryRender) {
  _inherits(JGallery, _GalleryRender);

  function JGallery() {
    var _ref2;

    var _temp, _this3, _ret;

    _classCallCheck(this, JGallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = JGallery.__proto__ || Object.getPrototypeOf(JGallery)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = { index: 0, hover: false, hideThumbs: true, thumbColumn: false, hideShortcuts: true, isNotExpanded: true }, _this3.componentDidMount = function () {
      window.addEventListener('keydown', _this3.keyDownListener);
    }, _this3.componentWillUnmount = function () {
      window.removeEventListener('keydown', _this3.keyDownListener);
    }, _this3.keyDownListener = function (event) {
      if (_this3.props.hide) return;
      var intKey = window.Event ? event.which : event.keyCode;
      switch (intKey) {
        case 37:
          _this3.prevIndex();event.preventDefault();break; //<--
        case 39:
          _this3.nextIndex();event.preventDefault();break; //-->
        case 66:
          _this3.hideThumbHandlerL();event.preventDefault();break; //B
        case 84:
          _this3.hideThumbHandlerP();event.preventDefault();break; //T
        case 83:
          _this3.actionHandler('full');event.preventDefault();break; //S
        case 88:
          _this3.actionHandler('close');event.preventDefault();break; //X
      }
    }, _this3.actionHandler = function (action) {
      switch (action) {
        case 'close':
          _this3.props.close();break;
        case 'full':
          if (_screenfull2.default.enabled) {
            _screenfull2.default.toggle();_this3.setState({ isNotExpanded: !_this3.state.isNotExpanded });
          }break;
      }
    }, _this3.nextIndex = function () {
      var newIndex = _this3.state.index + 1;
      if (newIndex === _this3.props.data.length) newIndex = 0;
      _this3.setState({ index: newIndex });
    }, _this3.prevIndex = function () {
      var newIndex = _this3.state.index - 1;
      if (newIndex === -1) newIndex = _this3.props.data.length - 1;
      _this3.setState({ index: newIndex });
    }, _this3.onMouseEnter = function () {
      _this3.setState({ hover: true });
    }, _this3.onMouseLeave = function () {
      _this3.setState({ hover: false });
    }, _this3.thumbClickHandler = function (index) {
      _this3.setState({ index: index });
    }, _this3.hideShortcutsHandler = function () {
      _this3.setState({ hideShortcuts: !_this3.state.hideShortcuts });
    }, _this3.hideThumbHandler = function () {
      _this3.setState({ hideThumbs: !_this3.state.hideThumbs });
    }, _this3.hideThumbHandlerL = function () {
      _this3.setState({ hideThumbs: !_this3.state.hideThumbs, thumbColumn: false });
    }, _this3.hideThumbHandlerP = function () {
      _this3.setState({ hideThumbs: !_this3.state.hideThumbs, thumbColumn: true });
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  return JGallery;
}(GalleryRender);

module.exports = JGallery;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _listitem = __webpack_require__(207);

var _listitem2 = _interopRequireDefault(_listitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var thumbColumnSty = {
  boxSizing: 'border-box',
  flexGrow: '1',
  height: '100%',
  margin: '0px',
  maxWidth: '10%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0px 10px',
  textAlign: 'center'
};

var thumbRowSty = {
  maxHeight: '13vh',
  margin: '10px 0px 5px',
  overflowY: 'hidden',
  overflowX: 'auto',
  padding: '0px',
  width: '100%',
  whiteSpace: 'nowrap'
};

function listMap(item, index) {
  return _react2.default.createElement(_listitem2.default, {
    key: index, item: item, index: index,
    selected: this.props.data.index,
    clickHandler: this.props.selectHandler,
    afterScroll: this.afterScroll,
    thumbColumn: this.props.thumbColumn
  });
}

var ThumbColumn = function (_React$Component) {
  _inherits(ThumbColumn, _React$Component);

  function ThumbColumn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ThumbColumn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ThumbColumn.__proto__ || Object.getPrototypeOf(ThumbColumn)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillReceiveProps = function () {
      if (!_this.props.hide) ReactDom.findDOMNode(_this).scrollTop = 0;
    }, _this.afterScroll = function () {
      var thisElement = ReactDom.findDOMNode(_this);
      var thisElementScrollTop = thisElement.scrollTop;
      if (thisElement.scrollHeight - thisElementScrollTop != thisElement.clientHeight) {
        thisElement.scrollTop = thisElementScrollTop - 300;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ThumbColumn, [{
    key: 'render',
    value: function render() {
      if (this.props.hide) return null;
      var children = this.props.data.list.map(listMap, this);
      var ThumbColumnSty = void 0;
      if (this.props.thumbColumn) ThumbColumnSty = Object.assign({}, thumbColumnSty);else ThumbColumnSty = Object.assign({}, thumbRowSty);
      return _react2.default.createElement(
        'div',
        { id: 'ThumbColumnSty', style: ThumbColumnSty },
        children
      );
    }
  }]);

  return ThumbColumn;
}(_react2.default.Component);

exports.default = ThumbColumn;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThumbColumnItemSty = {
  background: 'transparent',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginBottom: '10px',
  marginRight: 'auto',
  marginLeft: 'auto',
  textAlign: 'center',
  width: 'calc(100% - 4px)'
};

var ThumbRowItemSty = {
  background: 'transparent',
  display: 'inline-block',
  verticalAlign: 'middle'
};

var thumbImageSty = {
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  maxWidth: 'calc(100% - 6px)',
  maxHeight: 'calc(13vh - 41px)',
  width: 'auto',
  height: 'auto'
};

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function () {
      if (_this.props.index == _this.props.selected) {
        _this.refName.scrollIntoView({ behavior: 'smooth' });
        _this.props.afterScroll();
      }
    }, _this.clickHandler = function () {
      _this.props.clickHandler(_this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var thumbColumnImgBorder = void 0;
      if (this.props.index == this.props.selected) thumbColumnImgBorder = '3px solid rgb(220, 112, 24)';else thumbColumnImgBorder = '3px solid transparent';

      var ThumbDivSty = void 0;
      if (this.props.thumbColumn) ThumbDivSty = Object.assign({}, ThumbColumnItemSty);else ThumbDivSty = Object.assign({}, ThumbRowItemSty);
      // ThumbDivSty.backgroundImage = 'url(' + src + ')';
      var ThumbImgSty = Object.assign({}, thumbImageSty);
      ThumbImgSty.border = thumbColumnImgBorder;
      var src = this.props.item.smFolder + this.props.item.FileName;
      return _react2.default.createElement(
        'div',
        { id: 'ThumbColumnItemSty', ref: function ref(_ref2) {
            _this2.refName = _ref2;
          }, style: ThumbDivSty },
        _react2.default.createElement('img', { id: 'ThumbColumnImgSty', src: src, onClick: this.clickHandler, style: ThumbImgSty })
      );
    }
  }]);

  return ListItem;
}(_react2.default.Component);

exports.default = ListItem;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShortcutsSty = {
  backgroundColor: '#333',
  border: '1px solid green',
  color: '#AAA',
  left: '10px',
  padding: '10px',
  position: 'absolute',
  top: '50px'
};

var headSty = {
  color: '#e2d290',
  fontSize: '1.2em',
  textAlign: 'center'
};

var keySty = {
  color: '#aaa',
  fontSize: '1em',
  textAlign: 'center',
  width: '30px'
};

var descSty = {
  color: '#aaa',
  fontSize: '1em',
  textAlign: 'left'
};

var okSty = {
  backgroundColor: '#222',
  cursor: 'pointer',
  padding: '5px 0px',
  textAlign: 'center',
  width: '100%'
};

var Shortcuts = function (_React$Component) {
  _inherits(Shortcuts, _React$Component);

  function Shortcuts() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Shortcuts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Shortcuts.__proto__ || Object.getPrototypeOf(Shortcuts)).call.apply(_ref, [this].concat(args))), _this), _this.closeHandler = function () {
      _this.props.closeHandler();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Shortcuts, [{
    key: 'render',
    value: function render() {
      if (this.props.hide) return null;
      return _react2.default.createElement(
        'div',
        { id: 'Shortcuts', className: 'HighZ', style: ShortcutsSty },
        _react2.default.createElement(
          'div',
          { style: headSty },
          'Keyboard Shortcuts'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { className: 'FlexBox' },
          _react2.default.createElement(
            'div',
            { style: keySty },
            '\u2192',
            _react2.default.createElement('br', null),
            '\u2190',
            _react2.default.createElement('br', null),
            'T',
            _react2.default.createElement('br', null),
            'B',
            _react2.default.createElement('br', null),
            'S',
            _react2.default.createElement('br', null),
            'X',
            _react2.default.createElement('br', null)
          ),
          _react2.default.createElement(
            'div',
            { style: descSty },
            'Next pic',
            _react2.default.createElement('br', null),
            'Previous pic',
            _react2.default.createElement('br', null),
            'Side Thumbs',
            _react2.default.createElement('br', null),
            'Bottom Thumbs',
            _react2.default.createElement('br', null),
            'Full screen',
            _react2.default.createElement('br', null),
            'Exit',
            _react2.default.createElement('br', null)
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { style: okSty, onClick: this.closeHandler },
          'Ok'
        )
      );
    }
  }]);

  return Shortcuts;
}(_react2.default.Component);

exports.default = Shortcuts;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listSty = {};
var listStyleDefault = {};

var lineSty = {};
var lineStyleDefault = {
  color: '#a7b3a5',
  marginLeft: '7px'
};

function divMap(item, index) {
  return _react2.default.createElement(
    'div',
    { style: lineSty, key: index },
    item
  );
}

function spanMap(item, index) {
  return _react2.default.createElement(
    'span',
    { style: lineSty, key: index },
    item
  );
}

function JList(_ref) {
  var data = _ref.data,
      lineStyle = _ref.lineStyle,
      listStyle = _ref.listStyle,
      spanLine = _ref.spanLine;

  listSty = listStyle ? listStyle : listStyleDefault;
  lineSty = lineStyle ? lineStyle : lineStyleDefault;
  var list;
  if (spanLine) list = data.map(spanMap);else list = data.map(divMap);
  return _react2.default.createElement(
    'div',
    { id: 'JListSty', style: listSty },
    list
  );
}

module.exports = JList;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(3);

var styles = {
  component: {
    textAlign: 'center',
    padding: '0'
  },
  dot: {
    width: 9,
    height: 9,
    margin: 7,
    padding: 0,
    borderRadius: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  dotActive: {
    backgroundColor: '#b4dbc0'
  }
};

var PageIndicator = function PageIndicator(props) {

  var _handleDotClick = function _handleDotClick(e) {
    if (props.onClick) props.onClick(parseInt(e.target.id));
  };

  var _renderDots = function _renderDots() {
    var dots = [];

    for (var i = 0; i < props.count; i++) {
      var dotStyles = props.activeIndex === i ? Object.assign({}, styles.dot, styles.dotActive) : styles.dot;
      dots.push(React.createElement('span', { key: 'dot' + i, id: i, onClick: _handleDotClick, style: dotStyles }));
    }
    return dots;
  };

  var renderedDots = _renderDots();

  return React.createElement(
    'div',
    { style: styles.component },
    renderedDots
  );
};

PageIndicator.propTypes = {
  activeIndex: React.PropTypes.number,
  count: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func
};

module.exports = PageIndicator;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultCountSty = {
  backgroundColor: '#4d2c3d',
  height: '12px',
  marginRight: '5px',
  marginTop: '4px',
  width: '100%'
};

var defaultIndexSty = { backgroundColor: '#ab9353', height: '6px', borderTop: '3px solid #4d2c3d', width: '1%' };
var centerSty = { color: '#e9e7da', marginLeft: 'auto', marginRight: 'auto', marginTop: '-33px' };
var numberSty = { color: '#e9e7da' };

var JProgressBar = function JProgressBar(props) {
  if (!props.data) return null;
  var progressSty = { fontSize: '1em', width: '100%' };
  var count = props.data.count;
  var index = props.data.index;
  var perc = index / count * 100;
  var percentage = perc > 50 ? Math.floor(perc) : Math.ceil(perc);

  var countSty = props.countSty ? Object.assign({}, props.countSty) : Object.assign({}, defaultCountSty);
  var indexSty = props.indexSty ? Object.assign({}, props.indexSty) : Object.assign({}, defaultIndexSty);
  indexSty.width = percentage + '%';
  countSty.backgroundColor = props.countColor ? props.countColor : defaultCountSty.backgroundColor;
  indexSty.backgroundColor = props.indexColor ? props.indexColor : defaultIndexSty.backgroundColor;
  indexSty.borderTopColor = countSty.backgroundColor;

  var barRender = _react2.default.createElement(
    'div',
    { id: 'countSty', style: countSty },
    _react2.default.createElement('div', { id: 'indexSty', style: indexSty })
  );

  var progressRender = '';
  var position = props.position ? props.position : 'center';
  switch (position) {
    case 'center':
      progressRender = _react2.default.createElement(
        'div',
        { id: 'JProgressBar', style: progressSty },
        barRender,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', width: '100%' } },
          _react2.default.createElement(
            'div',
            { style: centerSty },
            index,
            '\xA0/\xA0',
            count
          )
        )
      );break;
    case 'after':
      progressRender = _react2.default.createElement(
        'div',
        { id: 'JProgressBar', className: 'FlexBox', style: progressSty },
        barRender,
        _react2.default.createElement(
          'span',
          { style: numberSty },
          index,
          '\xA0/\xA0',
          count
        )
      );break;
    case 'before':
      progressRender = _react2.default.createElement(
        'div',
        { id: 'JProgressBar', className: 'FlexBox', style: progressSty },
        _react2.default.createElement(
          'span',
          { style: numberSty },
          index,
          '\xA0/\xA0',
          count,
          '\xA0'
        ),
        barRender
      );break;
    case 'beforenafter':
      progressRender = _react2.default.createElement(
        'div',
        { id: 'JProgressBar', className: 'FlexBox', style: progressSty },
        _react2.default.createElement(
          'span',
          { style: numberSty },
          index,
          '\xA0'
        ),
        barRender,
        '\xA0',
        _react2.default.createElement(
          'span',
          { style: numberSty },
          count
        )
      );break;
    case 'none':
      progressRender = _react2.default.createElement(
        'div',
        { id: 'JProgressBar', style: progressSty },
        barRender
      );break;
  }
  return progressRender;
};

module.exports = JProgressBar;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);
var Radium = __webpack_require__(64);
var _throttle = __webpack_require__(285);

var StyleConstants = {
  Colors: {
    trackColor: '#4d2c3d',
    selectedColor: '#ab9353'
  },
  FontFamily: 'Helvetica, Arial, sans-serif',
  ShadowLow: '0 1px 2px rgba(0,0,0,0.1)'
};

var RangeSelector = function (_React$Component) {
  _inherits(RangeSelector, _React$Component);

  function RangeSelector(props) {
    _classCallCheck(this, RangeSelector);

    var _this = _possibleConstructorReturn(this, (RangeSelector.__proto__ || Object.getPrototypeOf(RangeSelector)).call(this, props));

    _initialiseProps.call(_this);

    var lowerValue = props.defaultLowerValue;
    var upperValue = props.defaultUpperValue;
    _this.state = {
      dragging: null,
      lowerPixels: 0,
      lowerValue: lowerValue,
      range: props.upperBound - props.lowerBound,
      upperPixels: 1,
      upperValue: upperValue,
      trackClicked: false
    };
    return _this;
  }

  //this method now handles both the dragging of the toggle, and moving it when track is clicked


  _createClass(RangeSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      return React.createElement(
        'div',
        { className: 'mx-rangeselector', style: [styles.component, this.props.style] },
        React.createElement(
          'div',
          {
            className: 'mx-rangeselector-range',
            onMouseLeave: this._handleDragEnd,
            onMouseMove: this._handleDragging,
            onMouseUp: this._handleDragEnd,
            onTouchEnd: this._handleDragEnd,
            onTouchMove: this._handleDragging,
            ref: function ref(_ref) {
              return _this2.rangeSelectorRef = _ref;
            },
            style: styles.range
          },
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-track-holder',
              onMouseDown: this._handleTrackMouseDown,
              style: styles.trackHolder
            },
            React.createElement('div', { className: 'mx-rangeselector-track', style: styles.track }),
            React.createElement(
              'div',
              { className: 'mx-rangeselector-selected', style: styles.selected },
              React.createElement(
                'div',
                { className: 'mx-rangeselector-selected-label', style: styles.selectedLabel },
                this.state.selectedLabel
              )
            )
          ),
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-lower-toggle',
              onMouseDown: this._handleLowerDragStart,
              onTouchStart: this._handleLowerDragStart,
              style: styles.lowerToggle
            },
            React.createElement(
              'label',
              { className: 'mx-rangeselector-lower-toggle-label', style: styles.lowerToggleLabel },
              this.props.formatter(this.state.lowerValue)
            )
          ),
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-upper-toggle',
              onMouseDown: this._handleUpperDragStart,
              onTouchStart: this._handleUpperDragStart,
              style: styles.upperToggle
            },
            React.createElement(
              'label',
              { className: 'mx-rangeselector-upper-toggle-label', style: styles.upperToggleLabel },
              this.props.formatter(this.state.upperValue)
            )
          )
        )
      );
    }
  }]);

  return RangeSelector;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    _this3._setDefaultRangeValues(_this3.state.lowerValue, _this3.state.upperValue);

    window.addEventListener('resize', _throttle(_this3._setDefaultRangeValues, 300));
  };

  this.componentWillReceiveProps = function (newProps) {
    var lowerReset = Boolean(newProps.lowerValue == _this3.props.defaultLowerValue && newProps.upperValue == _this3.props.defaultUpperValue && newProps.lowerValue != _this3.props.lowerValue);
    var upperReset = Boolean(newProps.upperValue == _this3.props.defaultUpperValue && newProps.lowerValue == _this3.props.defaultLowerValue && newProps.upperValue != _this3.props.upperValue);
    if (lowerReset || upperReset) {
      _this3.setState({ lowerValue: newProps.lowerValue, upperValue: newProps.upperValue });
      _this3._setDefaultRangeValues(newProps.lowerValue, newProps.upperValue);
    }
  };

  this.componentWillUnmount = function () {
    window.removeEventListener('resize', _throttle(_this3._setDefaultRangeValues, 300));
  };

  this._setDefaultRangeValues = function (lowerValue, upperValue) {
    var component = _this3.rangeSelectorRef;
    var componentStyles = window.getComputedStyle(component);
    var width = parseInt(componentStyles.width, 0);

    //convert our values to a 0-based scale
    var lowerPosition = lowerValue - _this3.props.lowerBound;
    var upperPosition = upperValue - _this3.props.lowerBound;

    //convert our 0-based values to pixels
    var lowerPixels = Math.round(lowerPosition * width / _this3.state.range / _this3.props.interval * _this3.props.interval);
    var upperPixels = Math.round(upperPosition * width / _this3.state.range / _this3.props.interval * _this3.props.interval);

    _this3.setState({ lowerPixels: lowerPixels, upperPixels: upperPixels, width: width });
  };

  this._handleLowerDragStart = function () {
    _this3.setState({ dragging: 'Lower' });
  };

  this._handleUpperDragStart = function () {
    _this3.setState({ dragging: 'Upper' });
  };

  this._handleTrackMouseDown = function (e) {
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var newPixels = clientX - _this3.rangeSelectorRef.getBoundingClientRect().left;
    var updatedState = { trackClicked: true };
    var clickBelowLower = newPixels < _this3.state.lowerPixels;
    var clickAboveUpper = newPixels > _this3.state.upperPixels;
    var clickCloserToLower = newPixels > _this3.state.lowerPixels && newPixels < _this3.state.lowerPixels + (_this3.state.upperPixels - _this3.state.lowerPixels) / 2;
    var clickCloserToUpper = newPixels < _this3.state.upperPixels && newPixels > _this3.state.upperPixels - (_this3.state.upperPixels - _this3.state.lowerPixels) / 2;

    if (clickBelowLower || clickCloserToLower) {
      updatedState.dragging = 'Lower';
    }

    if (clickAboveUpper || clickCloserToUpper) {
      updatedState.dragging = 'Upper';
    }

    _this3.setState(updatedState, _this3._handleDragging(e));
  };

  this._handleDragging = function (e) {
    if (_this3.state.dragging) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var pixelInterval = _this3.props.interval * _this3.state.width / _this3.state.range;
      var newState = { selectedLabel: null };

      var newPixels = clientX - _this3.rangeSelectorRef.getBoundingClientRect().left;

      //make sure we don't go past the end of the track
      newPixels = Math.min(newPixels, _this3.state.width);

      //make sure we don't go past the beginning of the track
      newPixels = Math.max(newPixels, 0);

      //make sure the lower toggle doesn't go past the upper toggle
      if (_this3.state.dragging === 'Lower') {
        newPixels = Math.min(newPixels, _this3.state.upperPixels - pixelInterval);
      }

      //make sure the upper toggle doesn't go past the lower toggle
      if (_this3.state.dragging === 'Upper') {
        newPixels = Math.max(newPixels, _this3.state.lowerPixels + pixelInterval);
      }

      //make sure we snap to our interval
      newPixels = Math.round(newPixels / pixelInterval) * pixelInterval;

      //convert our pixels to a 0-based scale
      var newPosition = newPixels * _this3.state.range / _this3.state.width + _this3.props.lowerBound;

      //covert our 0-based value to actual value
      var newValue = Math.round(newPosition / _this3.props.interval) * _this3.props.interval;

      newState[_this3.state.dragging.toLowerCase() + 'Pixels'] = newPixels;
      newState[_this3.state.dragging.toLowerCase() + 'Value'] = newValue;

      if (_this3.state.trackClicked) {
        newState.dragging = false;
        newState.trackClicked = false;
      }

      if (_this3.props.updateOnDrag || _this3.state.trackClicked) {
        _this3.props['on' + _this3.state.dragging + 'DragStop'](newValue, _this3.props.itemName);
      }

      _this3.setState(newState);

      e.preventDefault();
    }
  };

  this._handleDragEnd = function (e) {
    if (_this3.state.dragging) {
      if (_this3.state.trackClicked) {
        _this3._handleDragging(e);
      } else {
        if (!_this3.state.updateOnDrag) {
          _this3.props['on' + _this3.state.dragging + 'DragStop'](_this3.state[_this3.state.dragging.toLowerCase() + 'Value'], _this3.props.itemName);
        }

        _this3.setState({ dragging: false, trackClicked: false });
      }
    }
  };

  this.styles = function () {
    return {
      component: {
        fontFamily: StyleConstants.FontFamily,
        fontSize: '.8em',
        fontWeight: '700',
        position: 'relative'
      },
      range: {
        margin: '0 10px',
        padding: '0px 0',
        visibility: _this3.state.showPresets ? 'hidden' : 'visible'
      },
      track: {
        background: StyleConstants.Colors.trackColor,
        borderRadius: '3px',
        height: '7px'
      },
      trackHolder: {
        cursor: 'pointer',
        padding: '15px 0'
      },
      lowerToggle: {
        background: StyleConstants.Colors.selectedColor,
        borderRadius: '100%',
        boxShadow: StyleConstants.ShadowLow,
        cursor: 'pointer',
        height: '24px',
        left: _this3.state.lowerPixels,
        marginLeft: '10px',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        width: '24px'
      },
      lowerToggleLabel: {
        cursor: 'pointer',
        display: 'block',
        left: '0%',
        marginTop: '5px',
        minWidth: '24px',
        position: 'absolute',
        textAlign: 'center',
        top: '0%',
        transform: 'translateX(-50%, -50%)',
        WebkitTransform: 'translateX(-50%, -50%)'
      },
      upperToggle: {
        background: StyleConstants.Colors.selectedColor,
        borderRadius: '100%',
        boxShadow: StyleConstants.ShadowLow,
        cursor: 'pointer',
        height: '24px',
        left: _this3.state.upperPixels,
        marginLeft: '10px',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        width: '24px',
        zIndex: 1
      },
      upperToggleLabel: {
        cursor: 'pointer',
        display: 'block',
        left: '0%',
        marginTop: '5px',
        minWidth: '24px',
        position: 'absolute',
        textAlign: 'center',
        top: '0%',
        transform: 'translateX(-50%, -50%)',
        WebkitTransform: 'translateX(-50%, -50%)'
      },
      selected: {
        background: StyleConstants.Colors.selectedColor,
        height: '3px',
        left: _this3.state.lowerPixels + 10,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        width: _this3.state.upperPixels - _this3.state.lowerPixels
      },
      selectedLabel: {
        textAlign: 'center',
        marginTop: '30px',
        fontStyle: 'italic',
        opacity: 0.5
      }
    };
  };
};

RangeSelector.propTypes = {
  lowerValue: React.PropTypes.number,
  upperValue: React.PropTypes.number,
  defaultLowerValue: React.PropTypes.number,
  defaultUpperValue: React.PropTypes.number,
  formatter: React.PropTypes.func,
  interval: React.PropTypes.number,
  lowerBound: React.PropTypes.number,
  itemName: React.PropTypes.string,
  onLowerDragStop: React.PropTypes.func,
  onUpperDragStop: React.PropTypes.func,
  updateOnDrag: React.PropTypes.bool,
  upperBound: React.PropTypes.number
};

RangeSelector.defaultProps = {
  lowerValue: 0,
  upperValue: 1,
  defaultLowerValue: 0,
  defaultUpperValue: 1,
  interval: 1,
  formatter: function formatter(value) {
    return value;
  },

  lowerBound: 0,
  itemName: '',
  onLowerDragStop: function onLowerDragStop() {},
  onUpperDragStop: function onUpperDragStop() {},

  updateOnDrag: false,
  upperBound: 100
};

module.exports = Radium(RangeSelector);

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);
var Radium = __webpack_require__(64);

var StyleConstants = {
  Colors: {
    trackColor: '#4d2c3d',
    selectedColor: '#ab9353'
  },
  FontFamily: 'Helvetica, Arial, sans-serif',
  ShadowLow: '0 1px 2px rgba(0,0,0,0.1)',
  Spacing: {
    XLARGE: 30,
    LARGE: '24px',
    MEDIUM: 15,
    SMALL: 10,
    XSMALL: 5
  }
};

var SimpleSlider = function (_React$Component) {
  _inherits(SimpleSlider, _React$Component);

  function SimpleSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SimpleSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleSlider.__proto__ || Object.getPrototypeOf(SimpleSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      leftPixels: 0,
      width: 0
    }, _this.componentDidMount = function () {
      if (!_this.rangeSelectorRef) return;
      var component = _this.rangeSelectorRef;
      var width = component.clientWidth;
      var leftPixels = _this.props.percent * width;

      _this.setState({ width: width, leftPixels: leftPixels });
    }, _this.componentWillReceiveProps = function (newProps) {
      if (_this.props.percent !== newProps.percent) {
        var leftPixels = newProps.percent * _this.state.width;

        _this.setState({ leftPixels: leftPixels });
      }
    }, _this._handleMouseEvents = function (e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var leftSpace = _this.rangeSelectorRef.getBoundingClientRect().left;
      var currentPercent = (clientX - leftSpace) / _this.state.width;

      if (currentPercent < 0) {
        currentPercent = 0;
      } else if (currentPercent > 1) {
        currentPercent = 1;
      }

      _this.props.onPercentChange(_this.props.formatter(currentPercent), _this.props.itemName);
    }, _this._handleDragStart = function () {
      _this.setState({ dragging: true });
    }, _this._handleDragging = function (e) {
      if (_this.state.dragging) {
        _this._handleMouseEvents(e);
      }
    }, _this._handleDragEnd = function () {
      _this.setState({ dragging: false });
    }, _this.styles = function () {
      var cursorStyle = 'grab';

      if (_this.props.disabled) {
        cursorStyle = 'not-allowed';
      }
      if (_this.state.dragging) {
        cursorStyle = 'grabbing';
      }

      return Object.assign({}, {
        component: {
          fontFamily: StyleConstants.FontFamily,
          fontSize: '.8em',
          fontWeight: '700',
          position: 'relative'
        },
        range: {
          margin: '0 ' + StyleConstants.Spacing.MEDIUM + 'px',
          padding: '0px 0'
        },
        track: {
          background: StyleConstants.Colors.trackColor,
          borderRadius: '3px',
          height: '7px',
          marginLeft: '-5px'
        },
        trackHolder: {
          cursor: cursorStyle,
          padding: StyleConstants.Spacing.MEDIUM + 'px 0'
        },
        toggle: {
          background: StyleConstants.Colors.selectedColor,
          borderRadius: '100%',
          boxShadow: StyleConstants.ShadowLow,
          cursor: cursorStyle,
          height: StyleConstants.Spacing.LARGE,
          left: _this.state.leftPixels,
          position: 'absolute',
          top: '50%',
          transform: 'translate(20%, -50%)',
          WebkitTransform: 'translate(20%, -50%)',
          width: StyleConstants.Spacing.LARGE,
          zIndex: 2
        },
        toggleLabel: {
          cursor: 'pointer',
          display: 'block',
          left: '0%',
          marginTop: '5px',
          minWidth: StyleConstants.Spacing.LARGE,
          position: 'absolute',
          textAlign: 'center',
          top: '0%',
          transform: 'translateX(-50%, -50%)',
          WebkitTransform: 'translateX(-50%, -50%)'
        },
        selected: {
          background: StyleConstants.Colors.selectedColor,
          borderRadius: '3px',
          left: StyleConstants.Spacing.SMALL,
          height: '3px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          width: _this.state.leftPixels,
          zIndex: 1
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SimpleSlider, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var disabled = this.props.disabled;


      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          {
            onMouseLeave: disabled ? null : this._handleDragEnd,
            onMouseMove: disabled ? null : this._handleDragging,
            onMouseUp: disabled ? null : this._handleDragEnd,
            onTouchEnd: disabled ? null : this._handleDragEnd,
            onTouchMove: disabled ? null : this._handleDragging,
            ref: function ref(_ref2) {
              return _this2.rangeSelectorRef = _ref2;
            },
            style: styles.range
          },
          React.createElement(
            'div',
            {
              onMouseDown: disabled ? null : this._handleMouseEvents,
              style: styles.trackHolder
            },
            React.createElement('div', { style: styles.track }),
            React.createElement('div', { style: styles.selected })
          ),
          React.createElement(
            'div',
            {
              onMouseDown: disabled ? null : this._handleDragStart,
              onTouchStart: disabled ? null : this._handleDragStart,
              style: styles.toggle
            },
            React.createElement(
              'label',
              { className: 'mx-rangeselector-upper-toggle-label', style: styles.toggleLabel },
              this.props.formatter(this.props.percent)
            )
          )
        )
      );
    }
  }]);

  return SimpleSlider;
}(React.Component);

SimpleSlider.propTypes = {
  disabled: React.PropTypes.bool,
  formatter: React.PropTypes.func,
  itemName: React.PropTypes.string,
  onPercentChange: React.PropTypes.func.isRequired,
  percent: React.PropTypes.number.isRequired,
  selectedColor: React.PropTypes.string,
  styles: React.PropTypes.object
};

SimpleSlider.defaultProps = {
  disabled: false,
  formatter: function formatter(value) {
    return value;
  },

  itemName: '',
  selectedColor: StyleConstants.Colors.selectedColor
};

module.exports = Radium(SimpleSlider);

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TooltipSty = {
  display: 'inline-block',
  lineHeight: '14px',
  marginRight: '5px',
  verticalAlign: 'top'
};

var helpTip = {
  background: '#5a5e5e',
  border: '1px solid #a3aaaa',
  borderRadius: '50%',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
  boxSizing: 'border-box',
  color: '#fafafa',
  cursor: 'default',
  fontSize: '11px',
  height: '14px',
  lineHeight: '14px',
  marginTop: '1px',
  textAlign: 'center',
  width: '14px'
};

var contentSty = {
  background: 'rgb(28, 34, 24)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  color: '#e9e7da',
  fontSize: '0.9375em',
  lineHeight: '1.2em',
  maxWidth: '280px',
  minWidth: '200px',
  padding: '5px',
  textAlign: 'left',
  wordWrap: 'break-word',
  zIndex: '200'
};

var contentOuterSty = { height: '100%', width: '100%' };

function Contents(_ref) {
  var tooltipActive = _ref.tooltipActive,
      place = _ref.place,
      position = _ref.position,
      data = _ref.data;

  if (!data) return null;
  var contentHtml = data;
  var contentLength = contentHtml.length;
  var topNeg = (Math.ceil(contentLength / 40) + 1) * 18;
  var rightNeg = contentLength * .25;

  var active = tooltipActive;
  var inPosition = position || null;
  var contentInnerSty = { position: 'absolute' };
  if (active) {
    switch (place) {
      case 'bottom':
        contentInnerSty.left = inPosition.right + 5;contentInnerSty.top = inPosition.top + 20;break;
      case 'right':
        contentInnerSty.left = inPosition.right + 5;contentInnerSty.top = inPosition.top - rightNeg;break;
      case 'top':
        contentInnerSty.left = inPosition.right + 5;contentInnerSty.top = inPosition.top - topNeg;break;
    }
  } else contentInnerSty.display = 'none';
  var displayContent = { __html: contentHtml };
  return _react2.default.createElement(
    'div',
    { id: 'contentOuterSty', style: contentOuterSty },
    _react2.default.createElement(
      'div',
      { id: 'contentInnerSty', style: contentInnerSty },
      _react2.default.createElement(
        'div',
        { id: 'contentSty', style: contentSty },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: displayContent })
      )
    )
  );
}

var JTooltip = function (_React$Component) {
  _inherits(JTooltip, _React$Component);

  function JTooltip() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, JTooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = JTooltip.__proto__ || Object.getPrototypeOf(JTooltip)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { tooltipActive: false, position: {} }, _this.onMouseEnter = function () {
      var rect = _this.TooltipRef.getBoundingClientRect();
      var position = {};
      position.left = rect.left - _this.props.adjust.left;
      position.top = rect.top - _this.props.adjust.top;
      position.right = rect.right - _this.props.adjust.left;
      position.bottom = rect.bottom - _this.props.adjust.top;
      _this.setState({ tooltipActive: true, position: position });
    }, _this.onMouseLeave = function () {
      _this.setState({ tooltipActive: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JTooltip, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var help = '?';
      return _react2.default.createElement(
        'div',
        { id: 'TooltipSty', ref: function ref(_ref3) {
            _this2.TooltipRef = _ref3;
          }, style: TooltipSty },
        _react2.default.createElement(
          'div',
          { id: 'events', onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
          _react2.default.createElement(
            'div',
            { id: 'helpTip', style: helpTip },
            help
          )
        ),
        _react2.default.createElement(Contents, {
          tooltipActive: this.state.tooltipActive,
          place: this.props.place,
          position: this.state.position,
          data: this.props.data
        })
      );
    }
  }]);

  return JTooltip;
}(_react2.default.Component);

module.exports = JTooltip;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _get = __webpack_require__(111);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeRootSty = { lineHeight: '120%' };
var liSty = { listStyleType: 'none' };
var ulSty = { height: 'inherit', WebkitPaddingStart: '16px' };
var ulStyle = { height: 'inherit', WebkitPaddingStart: '16px' };
var iconSty = { marginRight: '10px', width: '16px' };

var nottogglable = {
  color: '#FFF',
  cursor: 'pointer',
  margin: '0 0 0 .8em'
};

var inOptions = {};
var inCustomColors = {};

var defaultColors = {
  parent: '#AF90A5',
  parentSelected: '#7BB53B',
  endnode: '#afac87',
  endnodeSelected: '#b58900'
};

var JTreeViewNode = function JTreeViewNode(props) {
  var iconHandler = function iconHandler() {
    if (props.node.children && props.node.children.length > 0) {
      props.iconClick(props.node);
    } else {
      clickHandler();
    }
  };
  var clickHandler = function clickHandler() {
    props.titleClick(props.node);
  };
  var titleColors = inCustomColors ? inCustomColors : defaultColors;
  var titleSty = { marginTop: '2px' };
  var childNodes = void 0;
  var pSty = nottogglable;

  if (props.node.children && props.node.children.length > 0) {
    childNodes = props.node.children.map(function (child, index) {
      return _react2.default.createElement(
        'li',
        { key: index, style: liSty },
        _react2.default.createElement(JTreeViewNode, { node: child, iconClick: props.iconClick, titleClick: props.titleClick })
      );
    });
    titleSty.color = props.node.selected ? titleColors.parentSelected : titleColors.parent;
  } else {
    titleSty.color = props.node.selected ? titleColors.endnodeSelected : titleColors.endnode;
  }

  var isClosed = true;
  if (props.node.closed != null) isClosed = props.node.closed;

  var branch = _react2.default.createElement(
    'ul',
    { id: 'ulStyle', style: ulStyle },
    childNodes
  );
  if (isClosed) branch = null;

  var iconType = (0, _get2.default)(props, inOptions.typeName);
  if (iconType == inOptions.icon.sun) iconSty.background = 'url(\'./img/sun.ico\') 0/16px no-repeat';else if (iconType == inOptions.icon.leaf) iconSty.background = 'url(\'./img/leaf.ico\') 0/16px no-repeat';else if (iconType == inOptions.icon.snow) iconSty.background = 'url(\'./img/snow.ico\') 0/16px no-repeat';else iconSty.background = 'url(\'./img/sun.ico\') 0/16px no-repeat';

  return _react2.default.createElement(
    'div',
    { id: 'TreeNode' },
    _react2.default.createElement(
      'div',
      { id: 'pSty', style: pSty, className: 'FlexBox' },
      _react2.default.createElement(
        'div',
        { id: 'iconSty', onClick: iconHandler, style: iconSty },
        '\xA0'
      ),
      _react2.default.createElement(
        'div',
        { id: 'titleSty', onClick: clickHandler, style: titleSty },
        props.node.title
      )
    ),
    branch
  );
};

function JTreeView(_ref) {
  var data = _ref.data,
      options = _ref.options,
      iconClick = _ref.iconClick,
      titleClick = _ref.titleClick,
      customColors = _ref.customColors;

  inOptions = options;
  inCustomColors = customColors;
  var childNodes = data.map(function (child, index) {
    return _react2.default.createElement(
      'li',
      { key: index, style: liSty },
      _react2.default.createElement(JTreeViewNode, { node: child, iconClick: iconClick, titleClick: titleClick })
    );
  });
  return _react2.default.createElement(
    'div',
    { id: 'TreeRootSty', style: TreeRootSty },
    _react2.default.createElement(
      'ul',
      { id: 'ulSty', style: ulSty },
      childNodes
    )
  );
}

module.exports = JTreeView;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _get = __webpack_require__(111);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeRootSty = { lineHeight: '21px' };
var liSty = { listStyleType: 'none' };
var ulSty = { WebkitPaddingStart: '16px' };
var ulStyle = { WebkitPaddingStart: '16px' };
var iconSty = { height: '21px', marginRight: '10px', width: '16px' };

var nottogglable = {
  color: '#FFF',
  cursor: 'pointer',
  margin: '0 0 0 12px'
};

var togglable = {
  color: '#815C7C',
  cursor: 'pointer',
  margin: '0px'
};

var inOptions = {};
var inCustomColors = {};

var defaultColors = {
  parent: '#AF90A5',
  parentSelected: '#7BB53B',
  endnode: '#afac87',
  endnodeSelected: '#b58900'
};

var JTreeViewBNode = function (_React$Component) {
  _inherits(JTreeViewBNode, _React$Component);

  function JTreeViewBNode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JTreeViewBNode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JTreeViewBNode.__proto__ || Object.getPrototypeOf(JTreeViewBNode)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _this.iconHandler = function () {
      if (_this.props.node.children && _this.props.node.children.length > 0) {
        _this.setState({ visible: !_this.state.visible });
      } else {
        _this.props.titleClick(_this.props.node);
      }
    }, _this.clickHandler = function () {
      _this.props.titleClick(_this.props.node);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JTreeViewBNode, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var titleColors = inCustomColors ? inCustomColors : defaultColors;
      var titleSty = { marginTop: '2px' };
      var childNodes = void 0;
      var pSty = nottogglable;
      if (this.props.node.children && this.props.node.children.length > 0) {
        childNodes = this.props.node.children.map(function (child, index) {
          return _react2.default.createElement(
            'li',
            { key: index, style: liSty },
            _react2.default.createElement(JTreeViewBNode, { node: child, titleClick: _this2.props.titleClick })
          );
        });
        pSty = togglable;
        titleSty.color = this.props.node.selected ? titleColors.parentSelected : titleColors.parent;
      } else {
        titleSty.color = this.props.node.selected ? titleColors.endnodeSelected : titleColors.endnode;
      }

      var branch = null;
      if (this.state.visible) {
        branch = _react2.default.createElement(
          'ul',
          { id: 'ulStyle', style: ulStyle },
          childNodes
        );
      }

      var props = this.props;
      var iconType = (0, _get2.default)(props, inOptions.typeName);
      if (iconType == inOptions.icon.sun) iconSty.background = 'url(\'./img/sun.ico\') 0/16px no-repeat';else if (iconType == inOptions.icon.leaf) iconSty.background = 'url(\'./img/leaf.ico\') 0/16px no-repeat';else if (iconType == inOptions.icon.snow) iconSty.background = 'url(\'./img/snow.ico\') 0/16px no-repeat';else iconSty.background = 'url(\'./img/sun.ico\') 0/16px no-repeat';

      var titleName = this.props.node.title;

      return _react2.default.createElement(
        'div',
        { id: 'TreeNode' },
        _react2.default.createElement(
          'div',
          { id: 'pSty', style: pSty, className: 'FlexBox' },
          _react2.default.createElement(
            'div',
            { id: 'iconSty', onClick: this.iconHandler, style: iconSty },
            '\xA0'
          ),
          _react2.default.createElement(
            'div',
            { id: 'titleSty', onClick: this.clickHandler, style: titleSty },
            titleName
          )
        ),
        branch
      );
    }
  }]);

  return JTreeViewBNode;
}(_react2.default.Component);

function JTreeViewB(_ref2) {
  var data = _ref2.data,
      options = _ref2.options,
      titleClick = _ref2.titleClick,
      customColors = _ref2.customColors;

  inOptions = options;
  inCustomColors = customColors;
  var childNodes = data.map(function (child, index) {
    return _react2.default.createElement(
      'li',
      { key: index, style: liSty },
      _react2.default.createElement(JTreeViewBNode, { node: child, titleClick: titleClick })
    );
  });
  return _react2.default.createElement(
    'div',
    { id: 'TreeRootSty', style: TreeRootSty },
    _react2.default.createElement(
      'ul',
      { id: 'ulSty', style: ulSty },
      childNodes
    )
  );
}

module.exports = JTreeViewB;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (true) __webpack_require__(478)(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(38);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var _utilsIsPrefixedValue = __webpack_require__(60);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

function calc(property, value) {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

    return (0, _utilsJoinPrefixedRules2['default'])(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}

module.exports = exports['default'];

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(38);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(37);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = { flex: true, 'inline-flex': true };

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(37);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(38);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var _utilsIsPrefixedValue = __webpack_require__(60);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && value.match(values) !== null) {
    if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(38);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(37);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = __webpack_require__(107);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsIsPrefixedValue = __webpack_require__(60);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

var _prefixProps = __webpack_require__(106);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
};

function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    var _ref2;

    var outputValue = prefixValue(value);
    var webkitOutput = outputValue.split(',').filter(function (value) {
      return value.match(/-moz-|-ms-/) === null;
    }).join(',');

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return _defineProperty({}, property, webkitOutput);
    }

    return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _utilsCapitalizeString2['default'])(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
  }
}

function prefixValue(value) {
  if ((0, _utilsIsPrefixedValue2['default'])(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach(function (val, index) {
    multipleValues[index] = Object.keys(_prefixProps2['default']).reduce(function (out, prefix) {
      var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

      Object.keys(_prefixProps2['default'][prefix]).forEach(function (prop) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(prop);

        if (val.indexOf(dashCaseProperty) > -1) {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
        }
      });
      return out;
    }, val);
  });

  return multipleValues.join(',');
}
module.exports = exports['default'];

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = prefixAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _prefixProps = __webpack_require__(106);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _utilsCapitalizeString = __webpack_require__(107);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = __webpack_require__(228);

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _pluginsCalc = __webpack_require__(219);

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = __webpack_require__(220);

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = __webpack_require__(221);

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = __webpack_require__(225);

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = __webpack_require__(224);

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = __webpack_require__(226);

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = __webpack_require__(222);

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = __webpack_require__(223);

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'], _pluginsFlex2['default']];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */

function prefixAll(styles) {
  return Object.keys(styles).reduce(function (prefixedStyles, property) {
    var value = styles[property];
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      prefixedStyles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2['default']).forEach(function (prefix) {
        var properties = _prefixProps2['default'][prefix];
        // add prefixes if needed
        if (properties[property]) {
          prefixedStyles[prefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
        }
      });

      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return (0, _utilsAssign2['default'])(prefixedStyles, plugin(property, value));
      });
    }

    return prefixedStyles;
  }, styles);
}

module.exports = exports['default'];

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// leight polyfill for Object.assign


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return Object.keys(extend).reduce(function (out, key) {
    base[key] = extend[key];
    return out;
  }, {});
};

module.exports = exports["default"];

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _inlineStylePrefixAll = __webpack_require__(227);

var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);

var _utilsGetBrowserInformation = __webpack_require__(240);

var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);

var _utilsGetPrefixedKeyframes = __webpack_require__(241);

var _utilsGetPrefixedKeyframes2 = _interopRequireDefault(_utilsGetPrefixedKeyframes);

var _utilsCapitalizeString = __webpack_require__(108);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = __webpack_require__(239);

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _prefixProps = __webpack_require__(238);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _pluginsCalc = __webpack_require__(230);

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = __webpack_require__(231);

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = __webpack_require__(232);

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = __webpack_require__(236);

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = __webpack_require__(235);

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = __webpack_require__(237);

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = __webpack_require__(233);

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = __webpack_require__(234);

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'],
// this must be run AFTER the flexbox specs
_pluginsFlex2['default']];

var Prefixer = (function () {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */

  function Prefixer() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Prefixer);

    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;

    this._browserInfo = (0, _utilsGetBrowserInformation2['default'])(this._userAgent);

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.prefix) {
      // set additional prefix information
      this.cssPrefix = this._browserInfo.prefix.css;
      this.jsPrefix = this._browserInfo.prefix.inline;
      this.prefixedKeyframes = (0, _utilsGetPrefixedKeyframes2['default'])(this._browserInfo);
    } else {
      this._usePrefixAllFallback = true;
      return false;
    }

    var data = this._browserInfo.browser && _prefixProps2['default'][this._browserInfo.browser];
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(function (key) {
        return data[key] >= _this._browserInfo.version;
      }).reduce(function (result, name) {
        result[name] = true;
        return result;
      }, {});
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      this._usePrefixAllFallback = true;
    }
  }

  /**
   * Returns a prefixed version of the style object
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */

  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      var _this2 = this;

      // use prefixAll as fallback if userAgent can not be resolved
      if (this._usePrefixAllFallback) {
        return (0, _inlineStylePrefixAll2['default'])(styles);
      }

      // only add prefixes if needed
      if (!this._hasPropsRequiringPrefix) {
        return styles;
      }

      styles = (0, _utilsAssign2['default'])({}, styles);

      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (value instanceof Object) {
          // recurse through nested style objects
          styles[property] = _this2.prefix(value);
        } else {
          // add prefixes if needed
          if (_this2._requiresPrefix[property]) {
            styles[_this2.jsPrefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
            if (!_this2._keepUnprefixed) {
              delete styles[property];
            }
          }

          // resolve plugins
          plugins.forEach(function (plugin) {
            // generates a new plugin interface with current data
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: _this2._browserInfo,
              prefix: {
                js: _this2.jsPrefix,
                css: _this2.cssPrefix,
                keyframes: _this2.prefixedKeyframes
              },
              keepUnprefixed: _this2._keepUnprefixed,
              requiresPrefix: _this2._requiresPrefix
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });

      return styles;
    }

    /**
     * Returns a prefixed version of the style object using all vendor prefixes
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
     */
  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      return (0, _inlineStylePrefixAll2['default'])(styles);
    }
  }]);

  return Prefixer;
})();

exports['default'] = Prefixer;
module.exports = exports['default'];

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

function calc(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
    return _defineProperty({}, property, value.replace(/calc\(/g, css + 'calc(') + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return {
      cursor: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'flex': true,
  'inline-flex': true
};

function flex(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
    return {
      display: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: 'flexbox',
  'inline-flex': 'inline-flexbox'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

var properties = Object.keys(alternativeProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxIE(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];

var properties = Object.keys(alternativeProps).concat(otherProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxOld(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.match(values) !== null && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties[property] && values[value]) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(16);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = __webpack_require__(108);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsUnprefixProperty = __webpack_require__(242);

var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);

var properties = { transition: true, transitionProperty: true };

function transition(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var requiresPrefix = _ref2.requiresPrefix;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // also check for already prefixed transitions
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ret = (function () {
      var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _utilsCamelToDashCase2['default'])(prop);
      });

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (property) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(property) > -1) {
            multipleValues[index] = val.replace(property, css + property) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });

      return {
        v: _defineProperty({}, property, multipleValues.join(','))
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

module.exports = exports['default'];

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 52, "userSelect": 52, "fontKerning": 32, "textEmphasisPosition": 52, "textEmphasis": 52, "textEmphasisStyle": 52, "textEmphasisColor": 52, "boxDecorationBreak": 52, "clipPath": 52, "maskImage": 52, "maskMode": 52, "maskRepeat": 52, "maskPosition": 52, "maskClip": 52, "maskOrigin": 52, "maskSize": 52, "maskComposite": 52, "mask": 52, "maskBorderSource": 52, "maskBorderMode": 52, "maskBorderSlice": 52, "maskBorderWidth": 52, "maskBorderOutset": 52, "maskBorderRepeat": 52, "maskBorder": 52, "maskType": 52, "textDecorationStyle": 52, "textDecorationSkip": 52, "textDecorationLine": 52, "textDecorationColor": 52, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 52, "breakBefore": 52, "breakInside": 52, "columnCount": 52, "columnFill": 52, "columnGap": 52, "columnRule": 52, "columnRuleColor": 52, "columnRuleStyle": 52, "columnRuleWidth": 52, "columns": 52, "columnSpan": 52, "columnWidth": 52 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 9.1, "userSelect": 9.1, "backdropFilter": 9.1, "fontKerning": 9.1, "scrollSnapType": 9.1, "scrollSnapPointsX": 9.1, "scrollSnapPointsY": 9.1, "scrollSnapDestination": 9.1, "scrollSnapCoordinate": 9.1, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 9.1, "clipPath": 9.1, "maskImage": 9.1, "maskMode": 9.1, "maskRepeat": 9.1, "maskPosition": 9.1, "maskClip": 9.1, "maskOrigin": 9.1, "maskSize": 9.1, "maskComposite": 9.1, "mask": 9.1, "maskBorderSource": 9.1, "maskBorderMode": 9.1, "maskBorderSlice": 9.1, "maskBorderWidth": 9.1, "maskBorderOutset": 9.1, "maskBorderRepeat": 9.1, "maskBorder": 9.1, "maskType": 9.1, "textDecorationStyle": 9.1, "textDecorationSkip": 9.1, "textDecorationLine": 9.1, "textDecorationColor": 9.1, "shapeImageThreshold": 9.1, "shapeImageMargin": 9.1, "shapeImageOutside": 9.1, "filter": 9, "hyphens": 9.1, "flowInto": 9.1, "flowFrom": 9.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 9.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 47, "userSelect": 47, "boxSizing": 28, "textAlignLast": 47, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 47, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 37, "userSelect": 37, "fontKerning": 19, "textEmphasisPosition": 37, "textEmphasis": 37, "textEmphasisStyle": 37, "textEmphasisColor": 37, "boxDecorationBreak": 37, "clipPath": 37, "maskImage": 37, "maskMode": 37, "maskRepeat": 37, "maskPosition": 37, "maskClip": 37, "maskOrigin": 37, "maskSize": 37, "maskComposite": 37, "mask": 37, "maskBorderSource": 37, "maskBorderMode": 37, "maskBorderSlice": 37, "maskBorderWidth": 37, "maskBorderOutset": 37, "maskBorderRepeat": 37, "maskBorder": 37, "maskType": 37, "filter": 37, "fontFeatureSettings": 37, "breakAfter": 37, "breakBefore": 37, "breakInside": 37, "columnCount": 37, "columnFill": 37, "columnGap": 37, "columnRule": 37, "columnRuleColor": 37, "columnRuleStyle": 37, "columnRuleWidth": 37, "columns": 37, "columnSpan": 37, "columnWidth": 37 }, "ie": { "gridTemplateRows": 11, "breakInside": 11, "transformOriginY": 9, "gridRowStart": 11, "gridColumn": 11, "regionFragment": 11, "breakBefore": 11, "userSelect": 11, "gridColumnEnd": 11, "gridRowEnd": 11, "gridTemplateColumns": 11, "gridColumnStart": 11, "gridArea": 11, "flexDirection": 10, "gridRowGap": 11, "gridTemplateAreas": 11, "gridAutoRows": 11, "gridRow": 11, "scrollSnapDestination": 11, "scrollSnapPointsY": 11, "touchAction": 10, "gridGap": 11, "gridColumnGap": 11, "wrapFlow": 11, "scrollSnapPointsX": 11, "flowFrom": 11, "transform": 9, "breakAfter": 11, "wrapMargin": 11, "scrollSnapCoordinate": 11, "flexWrap": 10, "scrollSnapType": 11, "flex": 10, "wrapThrough": 11, "gridAutoColumns": 11, "flexFlow": 10, "gridTemplate": 11, "hyphens": 11, "grid": 11, "transformOriginX": 9, "flowInto": 11, "transformOrigin": 9, "gridAutoFlow": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 14, "wrapFlow": 14, "wrapThrough": 14, "wrapMargin": 14, "scrollSnapType": 14, "scrollSnapPointsX": 14, "scrollSnapPointsY": 14, "scrollSnapDestination": 14, "scrollSnapCoordinate": 14, "hyphens": 14, "flowInto": 14, "flowFrom": 14, "breakBefore": 14, "breakAfter": 14, "breakInside": 14, "regionFragment": 14, "gridTemplateColumns": 14, "gridTemplateRows": 14, "gridTemplateAreas": 14, "gridTemplate": 14, "gridAutoColumns": 14, "gridAutoRows": 14, "gridAutoFlow": 14, "grid": 14, "gridRowStart": 14, "gridColumnStart": 14, "gridRowEnd": 14, "gridRow": 14, "gridColumn": 14, "gridColumnEnd": 14, "gridColumnGap": 14, "gridRowGap": 14, "gridArea": 14, "gridGap": 14 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9.3, "userSelect": 9.3, "backdropFilter": 9.3, "fontKerning": 9.3, "scrollSnapType": 9.3, "scrollSnapPointsX": 9.3, "scrollSnapPointsY": 9.3, "scrollSnapDestination": 9.3, "scrollSnapCoordinate": 9.3, "boxDecorationBreak": 9.3, "clipPath": 9.3, "maskImage": 9.3, "maskMode": 9.3, "maskRepeat": 9.3, "maskPosition": 9.3, "maskClip": 9.3, "maskOrigin": 9.3, "maskSize": 9.3, "maskComposite": 9.3, "mask": 9.3, "maskBorderSource": 9.3, "maskBorderMode": 9.3, "maskBorderSlice": 9.3, "maskBorderWidth": 9.3, "maskBorderOutset": 9.3, "maskBorderRepeat": 9.3, "maskBorder": 9.3, "maskType": 9.3, "textSizeAdjust": 9.3, "textDecorationStyle": 9.3, "textDecorationSkip": 9.3, "textDecorationLine": 9.3, "textDecorationColor": 9.3, "shapeImageThreshold": 9.3, "shapeImageMargin": 9.3, "shapeImageOutside": 9.3, "filter": 9, "hyphens": 9.3, "flowInto": 9.3, "flowFrom": 9.3, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9.3, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 47, "userSelect": 47, "fontKerning": 4.4, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_chr": { "appearance": 47, "userSelect": 47, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "textDecorationStyle": 47, "textDecorationSkip": 47, "textDecorationLine": 47, "textDecorationColor": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "flexWrap": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transformStyle": 9.9, "transformOriginZ": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "animationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };
module.exports = exports["default"];

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// leight polyfill for Object.assign


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (key) {
    return base[key] = extend[key];
  });
  return base;
};

module.exports = exports["default"];

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bowser = __webpack_require__(217);

var _bowser2 = _interopRequireDefault(_bowser);

var vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
};

var browsers = {
  chrome: [['chrome']],
  safari: [['safari']],
  firefox: [['firefox']],
  ie: [['msie']],
  edge: [['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'tablet']],
  android: [['android', 'mobile'], ['android', 'tablet']]
};

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */

exports['default'] = function (userAgent) {
  if (!userAgent) {
    return false;
  }

  var info = _bowser2['default']._detect(userAgent);

  Object.keys(vendorPrefixes).forEach(function (prefix) {
    vendorPrefixes[prefix].forEach(function (browser) {
      if (info[browser]) {
        info.prefix = {
          inline: prefix,
          css: '-' + prefix.toLowerCase() + '-'
        };
      }
    });
  });

  var name = '';
  Object.keys(browsers).forEach(function (browser) {
    browsers[browser].forEach(function (condition) {
      var match = 0;
      condition.forEach(function (single) {
        if (info[single]) {
          match += 1;
        }
      });
      if (condition.length === match) {
        name = browser;
      }
    });
  });

  info.browser = name;
  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  info.version = info.version ? parseFloat(info.version) : parseInt(parseFloat(info.osversion), 10);

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (info.browser === 'android' && info.chrome && info.version > 37) {
    info.browser = 'and_chr';
  }
  info.version = parseFloat(info.version);
  info.osversion = parseFloat(info.osversion);
  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (info.browser === 'android' && info.osversion < 5) {
    info.version = info.osversion;
  }

  return info;
};

module.exports = exports['default'];

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (_ref) {
  var browser = _ref.browser;
  var version = _ref.version;
  var prefix = _ref.prefix;

  var prefixedKeyframes = 'keyframes';

  if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
    prefixedKeyframes = prefix.css + prefixedKeyframes;
  }
  return prefixedKeyframes;
};

module.exports = exports['default'];

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(256),
    hashDelete = __webpack_require__(257),
    hashGet = __webpack_require__(258),
    hashHas = __webpack_require__(259),
    hashSet = __webpack_require__(260);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(264),
    listCacheDelete = __webpack_require__(265),
    listCacheGet = __webpack_require__(266),
    listCacheHas = __webpack_require__(267),
    listCacheSet = __webpack_require__(268);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(110),
    root = __webpack_require__(42);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(269),
    mapCacheDelete = __webpack_require__(270),
    mapCacheGet = __webpack_require__(271),
    mapCacheHas = __webpack_require__(272),
    mapCacheSet = __webpack_require__(273);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 247 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(251),
    toKey = __webpack_require__(277);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(281),
    isMasked = __webpack_require__(263),
    isObject = __webpack_require__(31),
    toSource = __webpack_require__(278);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(61),
    arrayMap = __webpack_require__(247),
    isArray = __webpack_require__(62),
    isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(62),
    isKey = __webpack_require__(261),
    stringToPath = __webpack_require__(276),
    toString = __webpack_require__(287);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(42);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(61);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 255 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(41);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 257 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(41);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(41);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(41);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(62),
    isSymbol = __webpack_require__(43);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 262 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(252);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 264 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(39);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(39);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(39);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(39);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(243),
    ListCache = __webpack_require__(244),
    Map = __webpack_require__(245);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(283);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 275 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(274);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 278 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(31),
    now = __webpack_require__(284),
    toNumber = __webpack_require__(286);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 280 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(109),
    isObject = __webpack_require__(31);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 282 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(246);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(42);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(279),
    isObject = __webpack_require__(31);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(31),
    isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(250);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendImportantToEachValue;

var _appendPxIfNeeded = __webpack_require__(112);

var _appendPxIfNeeded2 = _interopRequireDefault(_appendPxIfNeeded);

var _mapObject = __webpack_require__(117);

var _mapObject2 = _interopRequireDefault(_mapObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendImportantToEachValue(style) {
  return (0, _mapObject2.default)(style, function (result, key) {
    return (0, _appendPxIfNeeded2.default)(key, style[key]) + ' !important';
  });
}
module.exports = exports['default'];

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var _camelCaseRegex = /([a-z])?([A-Z])/g;

var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
  return (p1 || '') + '-' + p2.toLowerCase();
};

var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
  return s.replace(_camelCaseRegex, _camelCaseReplacer);
};

var camelCasePropsToDashCase = function camelCasePropsToDashCase(prefixedStyle) {
  // Since prefix is expected to work on inline style objects, we must
  // translate the keys to dash case for rendering to CSS.
  return Object.keys(prefixedStyle).reduce(function (result, key) {
    var dashCaseKey = _camelCaseToDashCase(key);

    // Fix IE vendor prefix
    if (/^ms-/.test(dashCaseKey)) {
      dashCaseKey = '-' + dashCaseKey;
    }

    result[dashCaseKey] = prefixedStyle[key];
    return result;
  }, {});
};

exports.default = camelCasePropsToDashCase;
module.exports = exports['default'];

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _enhancer = __webpack_require__(113);

var _enhancer2 = _interopRequireDefault(_enhancer);

var _styleKeeper = __webpack_require__(66);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

var _styleSheet = __webpack_require__(291);

var _styleSheet2 = _interopRequireDefault(_styleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _getStyleKeeper(instance) {
  if (!instance._radiumStyleKeeper) {
    var userAgent = instance.props.radiumConfig && instance.props.radiumConfig.userAgent || instance.context._radiumConfig && instance.context._radiumConfig.userAgent;
    instance._radiumStyleKeeper = new _styleKeeper2.default(userAgent);
  }

  return instance._radiumStyleKeeper;
}

var StyleRoot = function (_Component) {
  _inherits(StyleRoot, _Component);

  function StyleRoot() {
    _classCallCheck(this, StyleRoot);

    var _this = _possibleConstructorReturn(this, _Component.apply(this, arguments));

    _getStyleKeeper(_this);
    return _this;
  }

  StyleRoot.prototype.getChildContext = function getChildContext() {
    return { _radiumStyleKeeper: _getStyleKeeper(this) };
  };

  StyleRoot.prototype.render = function render() {
    /* eslint-disable no-unused-vars */
    // Pass down all props except config to the rendered div.
    var _props = this.props;
    var radiumConfig = _props.radiumConfig;

    var otherProps = _objectWithoutProperties(_props, ['radiumConfig']);
    /* eslint-enable no-unused-vars */

    return _react2.default.createElement(
      'div',
      otherProps,
      this.props.children,
      _react2.default.createElement(_styleSheet2.default, null)
    );
  };

  return StyleRoot;
}(_react.Component);

StyleRoot.contextTypes = {
  _radiumConfig: _react.PropTypes.object,
  _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
};

StyleRoot.childContextTypes = {
  _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
};

StyleRoot = (0, _enhancer2.default)(StyleRoot);

exports.default = StyleRoot;
module.exports = exports['default'];

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _styleKeeper = __webpack_require__(66);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleSheet = (_temp = _class = function (_Component) {
  _inherits(StyleSheet, _Component);

  function StyleSheet() {
    _classCallCheck(this, StyleSheet);

    var _this = _possibleConstructorReturn(this, _Component.apply(this, arguments));

    _this.state = _this._getCSSState();

    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  StyleSheet.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this._subscription = this.context._radiumStyleKeeper.subscribe(this._onChange);
    this._onChange();
  };

  StyleSheet.prototype.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;
    if (this._subscription) {
      this._subscription.remove();
    }
  };

  StyleSheet.prototype._getCSSState = function _getCSSState() {
    return { css: this.context._radiumStyleKeeper.getCSS() };
  };

  StyleSheet.prototype._onChange = function _onChange() {
    var _this2 = this;

    setTimeout(function () {
      _this2._isMounted && _this2.setState(_this2._getCSSState());
    }, 0);
  };

  StyleSheet.prototype.render = function render() {
    return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: this.state.css } });
  };

  return StyleSheet;
}(_react.Component), _class.contextTypes = {
  _radiumStyleKeeper: _react2.default.PropTypes.instanceOf(_styleKeeper2.default)
}, _temp);
exports.default = StyleSheet;
module.exports = exports['default'];

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _cssRuleSetToString = __webpack_require__(63);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = _react2.default.createClass({
  displayName: 'Style',

  propTypes: {
    radiumConfig: _react.PropTypes.object,
    rules: _react.PropTypes.object,
    scopeSelector: _react.PropTypes.string
  },

  contextTypes: {
    _radiumConfig: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      scopeSelector: ''
    };
  },
  _buildStyles: function _buildStyles(styles) {
    var _this = this;

    var userAgent = this.props.radiumConfig && this.props.radiumConfig.userAgent || this.context && this.context._radiumConfig && this.context._radiumConfig.userAgent;

    var scopeSelector = this.props.scopeSelector;

    var rootRules = Object.keys(styles).reduce(function (accumulator, selector) {
      if (_typeof(styles[selector]) !== 'object') {
        accumulator[selector] = styles[selector];
      }

      return accumulator;
    }, {});
    var rootStyles = Object.keys(rootRules).length ? (0, _cssRuleSetToString2.default)(scopeSelector || '', rootRules, userAgent) : '';

    return rootStyles + Object.keys(styles).reduce(function (accumulator, selector) {
      var rules = styles[selector];

      if (selector === 'mediaQueries') {
        accumulator += _this._buildMediaQueryString(rules);
      } else if (_typeof(styles[selector]) === 'object') {
        var completeSelector = scopeSelector ? selector.split(',').map(function (part) {
          return scopeSelector + ' ' + part.trim();
        }).join(',') : selector;

        accumulator += (0, _cssRuleSetToString2.default)(completeSelector, rules, userAgent);
      }

      return accumulator;
    }, '');
  },
  _buildMediaQueryString: function _buildMediaQueryString(stylesByMediaQuery) {
    var _this2 = this;

    var mediaQueryString = '';

    Object.keys(stylesByMediaQuery).forEach(function (query) {
      mediaQueryString += '@media ' + query + '{' + _this2._buildStyles(stylesByMediaQuery[query]) + '}';
    });

    return mediaQueryString;
  },
  render: function render() {
    if (!this.props.rules) {
      return null;
    }

    var styles = this._buildStyles(this.props.rules);

    return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
  }
});

exports.default = Style;
module.exports = exports['default'];

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyframes;

var _cssRuleSetToString = __webpack_require__(63);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _hash = __webpack_require__(116);

var _hash2 = _interopRequireDefault(_hash);

var _prefixer = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyframes(keyframeRules, name) {
  return {
    __radiumKeyframes: true,
    __process: function __process(userAgent) {
      var keyframesPrefixed = (0, _prefixer.getPrefixedKeyframes)(userAgent);
      var rules = Object.keys(keyframeRules).map(function (percentage) {
        return (0, _cssRuleSetToString2.default)(percentage, keyframeRules[percentage], userAgent);
      }).join('\n');
      var animationName = (name ? name + '-' : '') + 'radium-animation-' + (0, _hash2.default)(rules);
      var css = '@' + keyframesPrefixed + ' ' + animationName + ' {\n' + rules + '\n}\n';
      return { css: css, animationName: animationName };
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isNestedStyle = isNestedStyle;
exports.mergeStyles = mergeStyles;
function isNestedStyle(value) {
  // Don't merge objects overriding toString, since they should be converted
  // to string values.
  return value && value.constructor === Object && value.toString === Object.prototype.toString;
}

// Merge style objects. Deep merge plain object values.
function mergeStyles(styles) {
  var result = {};

  styles.forEach(function (style) {
    if (!style || (typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') {
      return;
    }

    if (Array.isArray(style)) {
      style = mergeStyles(style);
    }

    Object.keys(style).forEach(function (key) {
      // Simple case, nothing nested
      if (!isNestedStyle(style[key]) || !isNestedStyle(result[key])) {
        result[key] = style[key];
        return;
      }

      // If nested media, don't merge the nested styles, append a space to the
      // end (benign when converted to CSS). This way we don't end up merging
      // media queries that appear later in the chain with those that appear
      // earlier.
      if (key.indexOf('@media') === 0) {
        var newKey = key;
        while (true) {
          // eslint-disable-line no-constant-condition
          newKey += ' ';
          if (!result[newKey]) {
            result[newKey] = style[key];
            return;
          }
        }
      }

      // Merge all other nested styles recursively
      result[key] = mergeStyles([result[key], style[key]]);
    });
  });

  return result;
}

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _checkProps = function checkProps() {};

if (true) {
  (function () {
    // Warn if you use longhand and shorthand properties in the same style
    // object.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

    var shorthandPropertyExpansions = {
      'background': ['backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundPositionX', 'backgroundPositionY', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'backgroundSize'],
      'border': ['borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth'],
      'borderImage': ['borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth'],
      'borderRadius': ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
      'font': ['fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontWeight', 'lineHeight'],
      'listStyle': ['listStyleImage', 'listStylePosition', 'listStyleType'],
      'margin': ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
      'padding': ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
      'transition': ['transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction']
    };

    _checkProps = function checkProps(config) {
      var componentName = config.componentName;
      var style = config.style;

      if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object' || !style) {
        return;
      }

      var styleKeys = Object.keys(style);
      styleKeys.forEach(function (styleKey) {
        if (Array.isArray(shorthandPropertyExpansions[styleKey]) && shorthandPropertyExpansions[styleKey].some(function (sp) {
          return styleKeys.indexOf(sp) !== -1;
        })) {
          if (true) {
            /* eslint-disable no-console */
            console.warn('Radium: property "' + styleKey + '" in style object', style, ': do not mix longhand and ' + 'shorthand properties in the same style object. Check the render ' + 'method of ' + componentName + '.', 'See https://github.com/FormidableLabs/radium/issues/95 for more ' + 'information.');
            /* eslint-enable no-console */
          }
        }
      });

      styleKeys.forEach(function (k) {
        return _checkProps(_extends({}, config, { style: style[k] }));
      });
      return;
    };
  })();
}

exports.default = _checkProps;
module.exports = exports['default'];

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyframesPlugin;
function keyframesPlugin(_ref // eslint-disable-line no-shadow
) {
  var addCSS = _ref.addCSS;
  var config = _ref.config;
  var style = _ref.style;

  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (key === 'animationName' && value && value.__radiumKeyframes) {
      var keyframesValue = value;

      var _keyframesValue$__pro = keyframesValue.__process(config.userAgent);

      var animationName = _keyframesValue$__pro.animationName;
      var css = _keyframesValue$__pro.css;

      addCSS(css);
      value = animationName;
    }

    newStyleInProgress[key] = value;
    return newStyleInProgress;
  }, {});
  return { style: newStyle };
}
module.exports = exports['default'];

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


// Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
// Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
var mergeStyleArrayPlugin = function mergeStyleArrayPlugin(_ref) {
  var style = _ref.style;
  var mergeStyles = _ref.mergeStyles;
  // eslint-disable-line no-shadow
  var newStyle = Array.isArray(style) ? mergeStyles(style) : style;
  return { style: newStyle };
};

exports.default = mergeStyleArrayPlugin;
module.exports = exports['default'];

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var _callbacks = [];
var _mouseUpListenerIsActive = false;

function _handleMouseUp() {
  _callbacks.forEach(function (callback) {
    callback();
  });
}

var subscribe = function subscribe(callback) {
  if (_callbacks.indexOf(callback) === -1) {
    _callbacks.push(callback);
  }

  if (!_mouseUpListenerIsActive) {
    window.addEventListener('mouseup', _handleMouseUp);
    _mouseUpListenerIsActive = true;
  }

  return {
    remove: function remove() {
      var index = _callbacks.indexOf(callback);
      _callbacks.splice(index, 1);

      if (_callbacks.length === 0 && _mouseUpListenerIsActive) {
        window.removeEventListener('mouseup', _handleMouseUp);
        _mouseUpListenerIsActive = false;
      }
    }
  };
};

exports.default = {
  subscribe: subscribe,
  __triggerForTests: _handleMouseUp
};
module.exports = exports['default'];

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixPlugin;

var _prefixer = __webpack_require__(65);

function prefixPlugin(_ref // eslint-disable-line no-shadow
) {
  var config = _ref.config;
  var style = _ref.style;

  var newStyle = (0, _prefixer.getPrefixedStyle)(style, config.userAgent);
  return { style: newStyle };
}
module.exports = exports['default'];

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeNestedStyles;
function removeNestedStyles(_ref) {
  var isNestedStyle = _ref.isNestedStyle;
  var style = _ref.style;
  // eslint-disable-line no-shadow
  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (!isNestedStyle(value)) {
      newStyleInProgress[key] = value;
    }
    return newStyleInProgress;
  }, {});

  return {
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mouseUpListener = __webpack_require__(298);

var _mouseUpListener2 = _interopRequireDefault(_mouseUpListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isInteractiveStyleField = function _isInteractiveStyleField(styleFieldName) {
  return styleFieldName === ':hover' || styleFieldName === ':active' || styleFieldName === ':focus';
};

var resolveInteractionStyles = function resolveInteractionStyles(config) {
  var ExecutionEnvironment = config.ExecutionEnvironment;
  var getComponentField = config.getComponentField;
  var getState = config.getState;
  var mergeStyles = config.mergeStyles;
  var props = config.props;
  var setState = config.setState;
  var style = config.style;


  var newComponentFields = {};
  var newProps = {};

  // Only add handlers if necessary
  if (style[':hover']) {
    (function () {
      // Always call the existing handler if one is already defined.
      // This code, and the very similar ones below, could be abstracted a bit
      // more, but it hurts readability IMO.
      var existingOnMouseEnter = props.onMouseEnter;
      newProps.onMouseEnter = function (e) {
        existingOnMouseEnter && existingOnMouseEnter(e);
        setState(':hover', true);
      };

      var existingOnMouseLeave = props.onMouseLeave;
      newProps.onMouseLeave = function (e) {
        existingOnMouseLeave && existingOnMouseLeave(e);
        setState(':hover', false);
      };
    })();
  }

  if (style[':active']) {
    (function () {
      var existingOnMouseDown = props.onMouseDown;
      newProps.onMouseDown = function (e) {
        existingOnMouseDown && existingOnMouseDown(e);
        newComponentFields._lastMouseDown = Date.now();
        setState(':active', 'viamousedown');
      };

      var existingOnKeyDown = props.onKeyDown;
      newProps.onKeyDown = function (e) {
        existingOnKeyDown && existingOnKeyDown(e);
        if (e.key === ' ' || e.key === 'Enter') {
          setState(':active', 'viakeydown');
        }
      };

      var existingOnKeyUp = props.onKeyUp;
      newProps.onKeyUp = function (e) {
        existingOnKeyUp && existingOnKeyUp(e);
        if (e.key === ' ' || e.key === 'Enter') {
          setState(':active', false);
        }
      };
    })();
  }

  if (style[':focus']) {
    (function () {
      var existingOnFocus = props.onFocus;
      newProps.onFocus = function (e) {
        existingOnFocus && existingOnFocus(e);
        setState(':focus', true);
      };

      var existingOnBlur = props.onBlur;
      newProps.onBlur = function (e) {
        existingOnBlur && existingOnBlur(e);
        setState(':focus', false);
      };
    })();
  }

  if (style[':active'] && !getComponentField('_radiumMouseUpListener') && ExecutionEnvironment.canUseEventListeners) {
    newComponentFields._radiumMouseUpListener = _mouseUpListener2.default.subscribe(function () {
      Object.keys(getComponentField('state')._radiumStyleState).forEach(function (key) {
        if (getState(':active', key) === 'viamousedown') {
          setState(':active', false, key);
        }
      });
    });
  }

  // Merge the styles in the order they were defined
  var interactionStyles = props.disabled ? [style[':disabled']] : Object.keys(style).filter(function (name) {
    return _isInteractiveStyleField(name) && getState(name);
  }).map(function (name) {
    return style[name];
  });

  var newStyle = mergeStyles([style].concat(interactionStyles));

  // Remove interactive styles
  newStyle = Object.keys(newStyle).reduce(function (styleWithoutInteractions, name) {
    if (!_isInteractiveStyleField(name) && name !== ':disabled') {
      styleWithoutInteractions[name] = newStyle[name];
    }
    return styleWithoutInteractions;
  }, {});

  return {
    componentFields: newComponentFields,
    props: newProps,
    style: newStyle
  };
};

exports.default = resolveInteractionStyles;
module.exports = exports['default'];

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = resolveMediaQueries;


var _windowMatchMedia = void 0;
function _getWindowMatchMedia(ExecutionEnvironment) {
  if (_windowMatchMedia === undefined) {
    _windowMatchMedia = !!ExecutionEnvironment.canUseDOM && !!window && !!window.matchMedia && function (mediaQueryString) {
      return window.matchMedia(mediaQueryString);
    } || null;
  }
  return _windowMatchMedia;
}

function _filterObject(obj, predicate) {
  return Object.keys(obj).filter(function (key) {
    return predicate(obj[key], key);
  }).reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

function _removeMediaQueries(style) {
  return Object.keys(style).reduce(function (styleWithoutMedia, key) {
    if (key.indexOf('@media') !== 0) {
      styleWithoutMedia[key] = style[key];
    }
    return styleWithoutMedia;
  }, {});
}

function _topLevelRulesToCSS(_ref) {
  var addCSS = _ref.addCSS;
  var appendImportantToEachValue = _ref.appendImportantToEachValue;
  var cssRuleSetToString = _ref.cssRuleSetToString;
  var hash = _ref.hash;
  var isNestedStyle = _ref.isNestedStyle;
  var style = _ref.style;
  var userAgent = _ref.userAgent;

  var className = '';
  Object.keys(style).filter(function (name) {
    return name.indexOf('@media') === 0;
  }).map(function (query) {
    var topLevelRules = appendImportantToEachValue(_filterObject(style[query], function (value) {
      return !isNestedStyle(value);
    }));

    if (!Object.keys(topLevelRules).length) {
      return;
    }

    var ruleCSS = cssRuleSetToString('', topLevelRules, userAgent);

    // CSS classes cannot start with a number
    var mediaQueryClassName = 'rmq-' + hash(query + ruleCSS);
    var css = query + '{ .' + mediaQueryClassName + ruleCSS + '}';

    addCSS(css);

    className += (className ? ' ' : '') + mediaQueryClassName;
  });
  return className;
}

function _subscribeToMediaQuery(_ref2) {
  var listener = _ref2.listener;
  var listenersByQuery = _ref2.listenersByQuery;
  var matchMedia = _ref2.matchMedia;
  var mediaQueryListsByQuery = _ref2.mediaQueryListsByQuery;
  var query = _ref2.query;

  query = query.replace('@media ', '');

  var mql = mediaQueryListsByQuery[query];
  if (!mql && matchMedia) {
    mediaQueryListsByQuery[query] = mql = matchMedia(query);
  }

  if (!listenersByQuery || !listenersByQuery[query]) {
    mql.addListener(listener);

    listenersByQuery[query] = {
      remove: function remove() {
        mql.removeListener(listener);
      }
    };
  }
  return mql;
}

function resolveMediaQueries(_ref3) {
  var ExecutionEnvironment = _ref3.ExecutionEnvironment;
  var addCSS = _ref3.addCSS;
  var appendImportantToEachValue = _ref3.appendImportantToEachValue;
  var config = _ref3.config;
  var cssRuleSetToString = _ref3.cssRuleSetToString;
  var getComponentField = _ref3.getComponentField;
  var getGlobalState = _ref3.getGlobalState;
  var hash = _ref3.hash;
  var isNestedStyle = _ref3.isNestedStyle;
  var mergeStyles = _ref3.mergeStyles;
  var props = _ref3.props;
  var setState = _ref3.setState;
  var style = _ref3.style;
  // eslint-disable-line no-shadow
  var newStyle = _removeMediaQueries(style);
  var mediaQueryClassNames = _topLevelRulesToCSS({
    addCSS: addCSS,
    appendImportantToEachValue: appendImportantToEachValue,
    cssRuleSetToString: cssRuleSetToString,
    hash: hash,
    isNestedStyle: isNestedStyle,
    style: style,
    userAgent: config.userAgent
  });

  var newProps = mediaQueryClassNames ? {
    className: mediaQueryClassNames + (props.className ? ' ' + props.className : '')
  } : null;

  var matchMedia = config.matchMedia || _getWindowMatchMedia(ExecutionEnvironment);

  if (!matchMedia) {
    return {
      props: newProps,
      style: newStyle
    };
  }

  var listenersByQuery = _extends({}, getComponentField('_radiumMediaQueryListenersByQuery'));
  var mediaQueryListsByQuery = getGlobalState('mediaQueryListsByQuery') || {};

  Object.keys(style).filter(function (name) {
    return name.indexOf('@media') === 0;
  }).map(function (query) {
    var nestedRules = _filterObject(style[query], isNestedStyle);

    if (!Object.keys(nestedRules).length) {
      return;
    }

    var mql = _subscribeToMediaQuery({
      listener: function listener() {
        return setState(query, mql.matches, '_all');
      },
      listenersByQuery: listenersByQuery,
      matchMedia: matchMedia,
      mediaQueryListsByQuery: mediaQueryListsByQuery,
      query: query
    });

    // Apply media query states
    if (mql.matches) {
      newStyle = mergeStyles([newStyle, nestedRules]);
    }
  });

  return {
    componentFields: {
      _radiumMediaQueryListenersByQuery: listenersByQuery
    },
    globalState: { mediaQueryListsByQuery: mediaQueryListsByQuery },
    props: newProps,
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = visited;
function visited(_ref) {
  var addCSS = _ref.addCSS;
  var appendImportantToEachValue = _ref.appendImportantToEachValue;
  var config = _ref.config;
  var cssRuleSetToString = _ref.cssRuleSetToString;
  var hash = _ref.hash;
  var props = _ref.props;
  var style = _ref.style;
  // eslint-disable-line no-shadow
  var className = props.className;

  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (key === ':visited') {
      value = appendImportantToEachValue(value);
      var ruleCSS = cssRuleSetToString('', value, config.userAgent);
      var visitedClassName = 'rad-' + hash(ruleCSS);
      var css = '.' + visitedClassName + ':visited' + ruleCSS;

      addCSS(css);
      className = (className ? className + ' ' : '') + visitedClassName;
    } else {
      newStyleInProgress[key] = value;
    }

    return newStyleInProgress;
  }, {});

  return {
    props: className === props.className ? null : { className: className },
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(21);

var invariant = __webpack_require__(19);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ?  true ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(44);

var ReactChildren = __webpack_require__(307);
var ReactComponent = __webpack_require__(67);
var ReactPureComponent = __webpack_require__(311);
var ReactClass = __webpack_require__(308);
var ReactDOMFactories = __webpack_require__(309);
var ReactElement = __webpack_require__(20);
var ReactPropTypes = __webpack_require__(310);
var ReactVersion = __webpack_require__(312);

var onlyChild = __webpack_require__(314);
var warning = __webpack_require__(12);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (true) {
  var ReactElementValidator = __webpack_require__(121);
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (true) {
  var warned = false;
  __spread = function () {
     true ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(305);
var ReactElement = __webpack_require__(20);

var emptyFunction = __webpack_require__(58);
var traverseAllChildren = __webpack_require__(315);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(21),
    _assign = __webpack_require__(44);

var ReactComponent = __webpack_require__(67);
var ReactElement = __webpack_require__(20);
var ReactPropTypeLocationNames = __webpack_require__(70);
var ReactNoopUpdateQueue = __webpack_require__(69);

var emptyObject = __webpack_require__(59);
var invariant = __webpack_require__(19);
var warning = __webpack_require__(12);

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (true) {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (true) {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (true) {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
       true ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ?  true ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ?  true ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (true) {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

       true ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ?  true ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ?  true ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ?  true ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (true) {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ?  true ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ?  true ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ?  true ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ?  true ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (true) {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
         true ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
         true ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (true) {
         true ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (true) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ?  true ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (true) {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ?  true ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (true) {
       true ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
       true ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(20);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (true) {
  var ReactElementValidator = __webpack_require__(121);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(20);
var ReactPropTypeLocationNames = __webpack_require__(70);
var ReactPropTypesSecret = __webpack_require__(122);

var emptyFunction = __webpack_require__(58);
var getIteratorFn = __webpack_require__(72);
var warning = __webpack_require__(12);

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

function createChainableTypeChecker(validate) {
  if (true) {
    var manualPropTypeCallCache = {};
  }
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (true) {
      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
        var cacheKey = componentName + ':' + propName;
        if (!manualPropTypeCallCache[cacheKey]) {
           true ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
          manualPropTypeCallCache[cacheKey] = true;
        }
      }
    }
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
        }
        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!ReactElement.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
     true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
     true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(44);

var ReactComponent = __webpack_require__(67);
var ReactNoopUpdateQueue = __webpack_require__(69);

var emptyObject = __webpack_require__(59);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.4.2';

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(21);

var ReactPropTypeLocationNames = __webpack_require__(70);
var ReactPropTypesSecret = __webpack_require__(122);

var invariant = __webpack_require__(19);
var warning = __webpack_require__(12);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && __webpack_require__.i({"NODE_ENV":"development"}) && "development" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(68);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ?  true ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
       true ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (true) {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(68);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

         true ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(21);

var ReactElement = __webpack_require__(20);

var invariant = __webpack_require__(19);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ?  true ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(21);

var ReactCurrentOwner = __webpack_require__(45);
var REACT_ELEMENT_TYPE = __webpack_require__(120);

var getIteratorFn = __webpack_require__(72);
var invariant = __webpack_require__(19);
var KeyEscapeUtils = __webpack_require__(304);
var warning = __webpack_require__(12);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (true) {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
           true ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (true) {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ?  true ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;

/***/ }),
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */
/***/ (function(module, exports) {

/*!
* screenfull
* v3.0.0 - 2015-11-24
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();


/***/ }),
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(165);

__webpack_require__(164);

__webpack_require__(163);

__webpack_require__(166);

__webpack_require__(167);

__webpack_require__(168);

__webpack_require__(169);

__webpack_require__(170);

__webpack_require__(171);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(55);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(29);

var _app = __webpack_require__(161);

var _app2 = _interopRequireDefault(_app);

var _App = __webpack_require__(162);

var _App2 = _interopRequireDefault(_App);

__webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.ReactDom = _reactDom2.default;

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _App2.default },
  _react2.default.createElement(_app2.default, null)
), document.getElementById('react'));

/***/ })
],[479]);