var vangen = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1) {
      return true;
    } else {
      return false;
    }
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.onload = resolve;

      script.onerror = function (error) {
        return reject(new Error('Unable to load ' + src + ': ' + error));
      };

      document.body.appendChild(script);
    });
  }
  function loadLink(href) {
    return new Promise(function (resolve, reject) {
      var link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      link.onload = resolve;

      link.onerror = function (error) {
        return reject(new Error('Unable to load ' + href + ': ' + error));
      };

      document.body.appendChild(link);
    });
  }
  var MyLoopQueue = /*#__PURE__*/function () {
    function MyLoopQueue() {
      var capacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      classCallCheck(this, MyLoopQueue);

      this.front = 0;
      this.tail = 0;
      this.size = 0;
      this.Queue = new Array(capacity);
    }

    createClass(MyLoopQueue, [{
      key: "getSize",
      value: function getSize() {
        return this.size;
      }
    }, {
      key: "enqueue",
      value: function enqueue(E) {
        var queueLength = this.Queue.length;
        var tail = this.tail % queueLength; // 如果队列满了，那么就将"第一位"变成"最后一位"

        if (this.tail === this.front && this.getSize() !== 0) {
          this.front = (this.front + 1) % queueLength;
        }

        this.tail = (this.tail + 1) % queueLength;
        this.Queue[tail] = E;
        this.size++;
      }
    }, {
      key: "dequeue",
      value: function dequeue() {
        var queueLength = this.Queue.length; // 如果队列为空，就不能出列了

        if (this.getSize() === 0 && this.front % queueLength === this.tail) {
          throw new Error("Can't get empty queue");
        }

        var ret = this.Queue[this.front];
        this.Queue[this.front] = null;
        this.front = (this.front + 1) % queueLength;
        this.size--;
        return ret;
      }
    }, {
      key: "getQueue",
      value: function getQueue() {
        var newQueue = [];
        var length = this.Queue.length;

        if (this.getSize() < length) {
          newQueue = this.Queue.slice(0, this.tail);
        } else if (this.font === 0) {
          newQueue = this.Queue;
        } else {
          var frontQueue = this.Queue.slice(this.front);
          var tailQueue = this.Queue.slice(0, this.front);
          newQueue = [].concat(toConsumableArray(frontQueue), toConsumableArray(tailQueue));
        }

        return newQueue;
      }
    }]);

    return MyLoopQueue;
  }();
  function isDiff(newValue, oldValue) {
    var newKeyArr = Object.keys(newValue);
    var oldKeyArr = Object.keys(oldValue);
    if (newKeyArr.length !== oldKeyArr.length) return true;

    for (var _i = 0, _newKeyArr = newKeyArr; _i < _newKeyArr.length; _i++) {
      var key = _newKeyArr[_i];
      if (_typeof_1(newValue[key]) === 'object' || _typeof_1(oldValue[key]) === 'object') continue;

      if (newValue[key] !== oldValue[key]) {
        return true;
      }
    }

    return false;
  }

  var _preError = null;

  function report(reportUrl, dataObj) {
    // 对同一个错误不进行重复发送
    if (_preError && !isDiff(dataObj, _preError)) {
      return;
    } else {
      _preError = dataObj;
    }

    var data = JSON.stringify(dataObj);

    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon(reportUrl + "FromBeacon", data); // IE的URL长度限制为2083，其余浏览器更大，支持最小且主流的Chrome长度限制为8182
    } else if (isIE() && encodeURIComponent(data).length < 2083 || !isIE() && encodeURIComponent(data).length < 8182) {
      var image = new Image();
      image.src = reportUrl + "?error=" + encodeURIComponent(data);
    } else if (window.fetch) {
      fetch(reportUrl, {
        body: data,
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      });
    } else {
      var XHR = null;

      if (window.XMLHttpRequest) {
        XHR = new window.XMLHttpRequest();
      } else if (window.ActiveXObject) {
        XHR = new window.ActiveXObject("vangen");
      } // XHR.withCredentials = true


      XHR.open("POST", reportUrl, true);
      XHR.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      XHR.send(data);
    }
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function reportNetworkError(error, options) {
    var errorObj = handleNetwork(error);
    errorObj = _objectSpread(_objectSpread({}, errorObj), {}, {
      url: window.location.href,
      framework: options.isFramework || false
    });
    report(options.BASE_URL + "/errorRequest", errorObj);
  }

  function handleNetwork(error) {
    var type = error.type,
        status = error.status,
        responseURL = error.responseURL,
        statusText = error.statusText,
        responseText = error.responseText,
        headers = error.headers,
        method = error.method;
    return {
      type: type,
      status: status,
      requestUrl: responseURL,
      message: statusText,
      errorInfo: responseText,
      headers: headers,
      method: method
    };
  }

  var assignmentsFn = ["onload", "onreadystatechange", "onloadstart", "onloadend", "onprogress", "onerror", "onabort"];
  var oXMLHttpRequest = window.XMLHttpRequest;

  var XMLHttpRequestProxy = /*#__PURE__*/function () {
    function XMLHttpRequestProxy() {
      classCallCheck(this, XMLHttpRequestProxy);

      this._xmlRequest = new oXMLHttpRequest();
      this._headers = {};
      this.method = "get";
      this.readyState = 0;
      this.type = "network";
      this.status = 0;
      this._coverAttr = {
        open: this.open,
        send: this.send,
        setRequestHeader: this.setRequestHeader
      };
      this.initCover();
    }

    createClass(XMLHttpRequestProxy, [{
      key: "initCover",
      value: function initCover() {
        var _this = this;

        var _loop = function _loop(key) {
          var isCoverAttr = _this._coverAttr.hasOwnProperty(key);

          Object.defineProperty(_this, key, {
            get: function get() {
              return isCoverAttr ? _this._coverAttr[key] : _this._xmlRequest[key];
            },
            set: function set(newValue) {
              if (assignmentsFn.includes(key)) {
                _this._xmlRequest[key] = newValue;
              } else {
                isCoverAttr ? _this._coverAttr[key] : _this._xmlRequest[key];
              }
            }
          });
        };

        for (var key in this._xmlRequest) {
          _loop(key);
        }
      }
    }, {
      key: "open",
      value: function open(method, url) {
        var _this$_xmlRequest;

        this.method = method;

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        (_this$_xmlRequest = this._xmlRequest).open.apply(_this$_xmlRequest, [method, url].concat(args));
      }
    }, {
      key: "send",
      value: function send(data) {
        if (!data) data = null;

        this._xmlRequest.send(data);

        if (this.readyState === 4 && !/2\d{2}/.test(this.status)) {
          reportNetworkError(this, XMLHttpRequestProxy._options);
        }
      }
    }, {
      key: "setRequestHeader",
      value: function setRequestHeader(header, value) {
        this._headers[header] = value;

        this._xmlRequest.setRequestHeader(header, value);
      }
    }]);

    return XMLHttpRequestProxy;
  }();

  Object.defineProperty(XMLHttpRequestProxy, "_options", {
    enumerable: true,
    writable: true,
    value: undefined
  });
  window.XMLHttpRequest = XMLHttpRequestProxy;

  function initXMLHttpRequest(options) {
    XMLHttpRequestProxy._options = options;
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var fetchProxy = window.fetch;

  var fetchRequestProxy = function fetchRequestProxy(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return fetchProxy(url, options).then(function (res) {
      var status = res.status,
          statusText = res.statusText,
          url = res.url;

      if (!/2\d{2}/.test(status)) {
        var errorObj = {
          status: status,
          statusText: statusText,
          type: "network",
          url: url,
          method: "get",
          headers: {}
        };

        if (options) {
          var headers = {};
          options.headers.keys(function (key) {
            headers[key] = options.headers.get(key);
          });
          errorObj = _objectSpread$1(_objectSpread$1({}, errorObj), {}, {
            method: options.method,
            headers: headers
          });
        }

        reportNetworkError(errorObj, fetchRequestProxy._config);
      }
    });
  };

  function createFetchRequest(config) {
    fetchRequestProxy._config = config;
    return fetchRequestProxy;
  }

  function initHttpProxy(options) {
    window.XMLHttpRequest = initXMLHttpRequest(options);
    window.fetch = createFetchRequest(options);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

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
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
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
        define(genFun, toStringTagSymbol, "GeneratorFunction");
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

    function AsyncIterator(generator, PromiseImpl) {
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
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
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
          return new PromiseImpl(function(resolve, reject) {
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
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
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
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
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
          context.arg = undefined$1;
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

    define(Gp, toStringTagSymbol, "Generator");

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

            next.value = undefined$1;
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
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
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
            context.arg = undefined$1;
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
          this.arg = undefined$1;
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
     module.exports 
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
  });

  var regenerator = runtime_1;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var CONFIG_COUNT = 50;
  var MAX_COUNT = CONFIG_COUNT ;
  var queue =  new MyLoopQueue(MAX_COUNT);
  function initRecord() {
    window.rrweb.record({
      emit: function emit(event) {
        if (queue.getSize() >= MAX_COUNT) {
          queue.dequeue();
        }

        queue.enqueue(event);
      }
    });
  }
  function getEventRecord() {
    return _getEventRecord.apply(this, arguments);
  }

  function _getEventRecord() {
    _getEventRecord = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", queue.getQueue());

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getEventRecord.apply(this, arguments);
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var ErrorMonitor = /*#__PURE__*/function () {
    function ErrorMonitor(options) {
      classCallCheck(this, ErrorMonitor);

      this.creatcErrorFactory();
      this._options = options;
      this.isFramework = options.isFramework;
      this.reportErrorUrl = options.BASE_URL + "/errorRequest";
    }

    createClass(ErrorMonitor, [{
      key: "creatcErrorFactory",
      value: function creatcErrorFactory() {
        var _self = this; // window.onerror = (
        //   message: any,
        //   path?: string,
        //   lineNo?: number,
        //   columnNo?: number,
        //   error?: Error
        // ): any => {
        //   _self.reportError(
        //     { message, path, lineNo, columnNo, error },
        //     false,
        //     _self._options
        //   );
        // };


        window.addEventListener("error", function (event) {
          _self.reportError(event.error, false, _self._options);
        }, true);
        window.addEventListener("unhandledrejection", function (event) {
          event.preventDefault();
          var type = event.type,
              reason = event.reason;

          _self.reportError({
            type: type,
            message: reason
          }, false, _self._options);
        });
      }
    }, {
      key: "vueErrorProxy",
      value: function vueErrorProxy() {
        return function install(Vue) {
          Vue.config.errorHandler = function (err) {
            this.reportError(err, true, this._options);
          };
        };
      }
    }, {
      key: "reactErrorProxy",
      value: function reactErrorProxy(React) {
        return /*#__PURE__*/function (_React$Component) {
          inherits(Error, _React$Component);

          var _super = _createSuper(Error);

          function Error() {
            classCallCheck(this, Error);

            return _super.apply(this, arguments);
          }

          createClass(Error, [{
            key: "componentDidCatch",
            value: function componentDidCatch(err) {
              this.reportError(err, true, this._options);
            }
          }, {
            key: "render",
            value: function render() {
              return this.props.children;
            }
          }]);

          return Error;
        }(React.Component);
      }
      /**
       * 手动上报错误
       * @param {Object} err 错误对象
       * @param {Boolean} isFramework 是否是框架，即代码是否被编译
       */

    }, {
      key: "reportError",
      value: function () {
        var _reportError = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(error) {
          var isFramework,
              options,
              errorObj,
              eventsRecord,
              _args = arguments;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isFramework = _args.length > 1 && _args[1] !== undefined ? _args[1] : this.isFramework;
                  options = _args.length > 2 ? _args[2] : undefined;
                  errorObj = error.type === "unhandledrejection" ? {
                    type: error.type,
                    msg: error.reason
                  } : this._handleError(error);

                  if (!options.isNeedRecord) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 6;
                  return getEventRecord();

                case 6:
                  _context.t0 = _context.sent;
                  _context.next = 10;
                  break;

                case 9:
                  _context.t0 = [];

                case 10:
                  eventsRecord = _context.t0;
                  errorObj = _objectSpread$2(_objectSpread$2({}, errorObj), {}, {
                    eventsRecord: eventsRecord,
                    url: window.location.href,
                    framework: isFramework
                  });
                  report(this.reportErrorUrl, errorObj);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function reportError(_x) {
          return _reportError.apply(this, arguments);
        }

        return reportError;
      }()
    }, {
      key: "_handleError",
      value: function _handleError(error) {
        var msg = error.message;
        var errorStack = error.stack && error.stack.split("\n") || [];
        var pattern = window.location.origin;
        var errorStackPosition = errorStack.find(function (errorItem) {
          return new RegExp(pattern).test(errorItem);
        });

        if (errorStackPosition) {
          var index = errorStackPosition.lastIndexOf("/");

          var _errorStackPosition$s = errorStackPosition.substr(index + 1).split(":"),
              _errorStackPosition$s2 = slicedToArray(_errorStackPosition$s, 3),
              path = _errorStackPosition$s2[0],
              _errorStackPosition$s3 = _errorStackPosition$s2[1],
              lineNoStr = _errorStackPosition$s3 === void 0 ? "" : _errorStackPosition$s3,
              _errorStackPosition$s4 = _errorStackPosition$s2[2],
              columnNoStr = _errorStackPosition$s4 === void 0 ? "" : _errorStackPosition$s4;

          var lineNo = Number((lineNoStr.match(/\d+/) || [])[0]);
          var columnNo = Number((columnNoStr.match(/\d+/) || [])[0]);
          return {
            path: path,
            lineNo: lineNo,
            columnNo: columnNo,
            msg: msg,
            error: error
          };
        }

        return false;
      }
    }]);

    return ErrorMonitor;
  }();

  var defaultConfig = {
    BASE_URL: "http://localhost:3090",
    isFramework: true,
    isNeedRecord: true
  };

  function createMonitor(options) {
    var lastConfig = Object.assign(defaultConfig, options);

    if (lastConfig.isNeedRecord) {
      loadLink("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css");
      loadScript("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js").then(function () {
        initRecord();
      });
    }

    initHttpProxy(lastConfig);
    var errorMonitor = new ErrorMonitor(lastConfig);
    var install = errorMonitor.vueErrorProxy();
    var ErrorWatch = errorMonitor.reactErrorProxy;
    return {
      install: install,
      ErrorWatch: ErrorWatch
    };
  } // export const URL_GROUP = {
  //   error: BASE_URL + "/errorRequest",
  //   performance: BASE_URL + "/performance"
  // };


  var Vangen = {};
  Vangen.init = createMonitor;

  return Vangen;

}());
