// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"a6f8f82869e5379e45d83e6687fa7388":[function(require,module,exports) {
var define;
/**
 * bootstrap-switch - Turn checkboxes and radio buttons into toggle switches.
 *
 * @version v3.3.4
 * @homepage https://bttstrp.github.io/bootstrap-switch
 * @author Mattia Larentis <mattia@larentis.eu> (http://larentis.eu)
 * @license Apache-2.0
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jquery);
    global.bootstrapSwitch = mod.exports;
  }
})(this, function (_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var $ = _jquery2.default || window.jQuery || window.$;

  var BootstrapSwitch = function () {
    function BootstrapSwitch(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BootstrapSwitch);

      this.$element = $(element);
      this.options = $.extend({}, $.fn.bootstrapSwitch.defaults, this._getElementOptions(), options);
      this.prevOptions = {};
      this.$wrapper = $('<div>', {
        class: function _class() {
          var classes = [];
          classes.push(_this.options.state ? 'on' : 'off');

          if (_this.options.size) {
            classes.push(_this.options.size);
          }

          if (_this.options.disabled) {
            classes.push('disabled');
          }

          if (_this.options.readonly) {
            classes.push('readonly');
          }

          if (_this.options.indeterminate) {
            classes.push('indeterminate');
          }

          if (_this.options.inverse) {
            classes.push('inverse');
          }

          if (_this.$element.attr('id')) {
            classes.push('id-' + _this.$element.attr('id'));
          }

          return classes.map(_this._getClass.bind(_this)).concat([_this.options.baseClass], _this._getClasses(_this.options.wrapperClass)).join(' ');
        }
      });
      this.$container = $('<div>', {
        class: this._getClass('container')
      });
      this.$on = $('<span>', {
        html: this.options.onText,
        class: this._getClass('handle-on') + ' ' + this._getClass(this.options.onColor)
      });
      this.$off = $('<span>', {
        html: this.options.offText,
        class: this._getClass('handle-off') + ' ' + this._getClass(this.options.offColor)
      });
      this.$label = $('<span>', {
        html: this.options.labelText,
        class: this._getClass('label')
      });
      this.$element.on('init.bootstrapSwitch', this.options.onInit.bind(this, element));
      this.$element.on('switchChange.bootstrapSwitch', function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (_this.options.onSwitchChange.apply(element, args) === false) {
          if (_this.$element.is(':radio')) {
            $('[name="' + _this.$element.attr('name') + '"]').trigger('previousState.bootstrapSwitch', true);
          } else {
            _this.$element.trigger('previousState.bootstrapSwitch', true);
          }
        }
      });
      this.$container = this.$element.wrap(this.$container).parent();
      this.$wrapper = this.$container.wrap(this.$wrapper).parent();
      this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off);

      if (this.options.indeterminate) {
        this.$element.prop('indeterminate', true);
      }

      this._init();

      this._elementHandlers();

      this._handleHandlers();

      this._labelHandlers();

      this._formHandler();

      this._externalLabelHandler();

      this.$element.trigger('init.bootstrapSwitch', this.options.state);
    }

    _createClass(BootstrapSwitch, [{
      key: 'setPrevOptions',
      value: function setPrevOptions() {
        this.prevOptions = _extends({}, this.options);
      }
    }, {
      key: 'state',
      value: function state(value, skip) {
        if (typeof value === 'undefined') {
          return this.options.state;
        }

        if (this.options.disabled || this.options.readonly || this.options.state && !this.options.radioAllOff && this.$element.is(':radio')) {
          return this.$element;
        }

        if (this.$element.is(':radio')) {
          $('[name="' + this.$element.attr('name') + '"]').trigger('setPreviousOptions.bootstrapSwitch');
        } else {
          this.$element.trigger('setPreviousOptions.bootstrapSwitch');
        }

        if (this.options.indeterminate) {
          this.indeterminate(false);
        }

        this.$element.prop('checked', Boolean(value)).trigger('change.bootstrapSwitch', skip);
        return this.$element;
      }
    }, {
      key: 'toggleState',
      value: function toggleState(skip) {
        if (this.options.disabled || this.options.readonly) {
          return this.$element;
        }

        if (this.options.indeterminate) {
          this.indeterminate(false);
          return this.state(true);
        } else {
          return this.$element.prop('checked', !this.options.state).trigger('change.bootstrapSwitch', skip);
        }
      }
    }, {
      key: 'size',
      value: function size(value) {
        if (typeof value === 'undefined') {
          return this.options.size;
        }

        if (this.options.size != null) {
          this.$wrapper.removeClass(this._getClass(this.options.size));
        }

        if (value) {
          this.$wrapper.addClass(this._getClass(value));
        }

        this._width();

        this._containerPosition();

        this.options.size = value;
        return this.$element;
      }
    }, {
      key: 'animate',
      value: function animate(value) {
        if (typeof value === 'undefined') {
          return this.options.animate;
        }

        if (this.options.animate === Boolean(value)) {
          return this.$element;
        }

        return this.toggleAnimate();
      }
    }, {
      key: 'toggleAnimate',
      value: function toggleAnimate() {
        this.options.animate = !this.options.animate;
        this.$wrapper.toggleClass(this._getClass('animate'));
        return this.$element;
      }
    }, {
      key: 'disabled',
      value: function disabled(value) {
        if (typeof value === 'undefined') {
          return this.options.disabled;
        }

        if (this.options.disabled === Boolean(value)) {
          return this.$element;
        }

        return this.toggleDisabled();
      }
    }, {
      key: 'toggleDisabled',
      value: function toggleDisabled() {
        this.options.disabled = !this.options.disabled;
        this.$element.prop('disabled', this.options.disabled);
        this.$wrapper.toggleClass(this._getClass('disabled'));
        return this.$element;
      }
    }, {
      key: 'readonly',
      value: function readonly(value) {
        if (typeof value === 'undefined') {
          return this.options.readonly;
        }

        if (this.options.readonly === Boolean(value)) {
          return this.$element;
        }

        return this.toggleReadonly();
      }
    }, {
      key: 'toggleReadonly',
      value: function toggleReadonly() {
        this.options.readonly = !this.options.readonly;
        this.$element.prop('readonly', this.options.readonly);
        this.$wrapper.toggleClass(this._getClass('readonly'));
        return this.$element;
      }
    }, {
      key: 'indeterminate',
      value: function indeterminate(value) {
        if (typeof value === 'undefined') {
          return this.options.indeterminate;
        }

        if (this.options.indeterminate === Boolean(value)) {
          return this.$element;
        }

        return this.toggleIndeterminate();
      }
    }, {
      key: 'toggleIndeterminate',
      value: function toggleIndeterminate() {
        this.options.indeterminate = !this.options.indeterminate;
        this.$element.prop('indeterminate', this.options.indeterminate);
        this.$wrapper.toggleClass(this._getClass('indeterminate'));

        this._containerPosition();

        return this.$element;
      }
    }, {
      key: 'inverse',
      value: function inverse(value) {
        if (typeof value === 'undefined') {
          return this.options.inverse;
        }

        if (this.options.inverse === Boolean(value)) {
          return this.$element;
        }

        return this.toggleInverse();
      }
    }, {
      key: 'toggleInverse',
      value: function toggleInverse() {
        this.$wrapper.toggleClass(this._getClass('inverse'));
        var $on = this.$on.clone(true);
        var $off = this.$off.clone(true);
        this.$on.replaceWith($off);
        this.$off.replaceWith($on);
        this.$on = $off;
        this.$off = $on;
        this.options.inverse = !this.options.inverse;
        return this.$element;
      }
    }, {
      key: 'onColor',
      value: function onColor(value) {
        if (typeof value === 'undefined') {
          return this.options.onColor;
        }

        if (this.options.onColor) {
          this.$on.removeClass(this._getClass(this.options.onColor));
        }

        this.$on.addClass(this._getClass(value));
        this.options.onColor = value;
        return this.$element;
      }
    }, {
      key: 'offColor',
      value: function offColor(value) {
        if (typeof value === 'undefined') {
          return this.options.offColor;
        }

        if (this.options.offColor) {
          this.$off.removeClass(this._getClass(this.options.offColor));
        }

        this.$off.addClass(this._getClass(value));
        this.options.offColor = value;
        return this.$element;
      }
    }, {
      key: 'onText',
      value: function onText(value) {
        if (typeof value === 'undefined') {
          return this.options.onText;
        }

        this.$on.html(value);

        this._width();

        this._containerPosition();

        this.options.onText = value;
        return this.$element;
      }
    }, {
      key: 'offText',
      value: function offText(value) {
        if (typeof value === 'undefined') {
          return this.options.offText;
        }

        this.$off.html(value);

        this._width();

        this._containerPosition();

        this.options.offText = value;
        return this.$element;
      }
    }, {
      key: 'labelText',
      value: function labelText(value) {
        if (typeof value === 'undefined') {
          return this.options.labelText;
        }

        this.$label.html(value);

        this._width();

        this.options.labelText = value;
        return this.$element;
      }
    }, {
      key: 'handleWidth',
      value: function handleWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.handleWidth;
        }

        this.options.handleWidth = value;

        this._width();

        this._containerPosition();

        return this.$element;
      }
    }, {
      key: 'labelWidth',
      value: function labelWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.labelWidth;
        }

        this.options.labelWidth = value;

        this._width();

        this._containerPosition();

        return this.$element;
      }
    }, {
      key: 'baseClass',
      value: function baseClass(value) {
        return this.options.baseClass;
      }
    }, {
      key: 'wrapperClass',
      value: function wrapperClass(value) {
        if (typeof value === 'undefined') {
          return this.options.wrapperClass;
        }

        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.wrapperClass;
        }

        this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(' '));
        this.$wrapper.addClass(this._getClasses(value).join(' '));
        this.options.wrapperClass = value;
        return this.$element;
      }
    }, {
      key: 'radioAllOff',
      value: function radioAllOff(value) {
        if (typeof value === 'undefined') {
          return this.options.radioAllOff;
        }

        var val = Boolean(value);

        if (this.options.radioAllOff === val) {
          return this.$element;
        }

        this.options.radioAllOff = val;
        return this.$element;
      }
    }, {
      key: 'onInit',
      value: function onInit(value) {
        if (typeof value === 'undefined') {
          return this.options.onInit;
        }

        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onInit;
        }

        this.options.onInit = value;
        return this.$element;
      }
    }, {
      key: 'onSwitchChange',
      value: function onSwitchChange(value) {
        if (typeof value === 'undefined') {
          return this.options.onSwitchChange;
        }

        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onSwitchChange;
        }

        this.options.onSwitchChange = value;
        return this.$element;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var $form = this.$element.closest('form');

        if ($form.length) {
          $form.off('reset.bootstrapSwitch').removeData('bootstrap-switch');
        }

        this.$container.children().not(this.$element).remove();
        this.$element.unwrap().unwrap().off('.bootstrapSwitch').removeData('bootstrap-switch');
        return this.$element;
      }
    }, {
      key: '_getElementOptions',
      value: function _getElementOptions() {
        return {
          state: this.$element.is(':checked'),
          size: this.$element.data('size'),
          animate: this.$element.data('animate'),
          disabled: this.$element.is(':disabled'),
          readonly: this.$element.is('[readonly]'),
          indeterminate: this.$element.data('indeterminate'),
          inverse: this.$element.data('inverse'),
          radioAllOff: this.$element.data('radio-all-off'),
          onColor: this.$element.data('on-color'),
          offColor: this.$element.data('off-color'),
          onText: this.$element.data('on-text'),
          offText: this.$element.data('off-text'),
          labelText: this.$element.data('label-text'),
          handleWidth: this.$element.data('handle-width'),
          labelWidth: this.$element.data('label-width'),
          baseClass: this.$element.data('base-class'),
          wrapperClass: this.$element.data('wrapper-class')
        };
      }
    }, {
      key: '_width',
      value: function _width() {
        var _this2 = this;

        var $handles = this.$on.add(this.$off).add(this.$label).css('width', '');
        var handleWidth = this.options.handleWidth === 'auto' ? Math.round(Math.max(this.$on.width(), this.$off.width())) : this.options.handleWidth;
        $handles.width(handleWidth);
        this.$label.width(function (index, width) {
          if (_this2.options.labelWidth !== 'auto') {
            return _this2.options.labelWidth;
          }

          if (width < handleWidth) {
            return handleWidth;
          }

          return width;
        });
        this._handleWidth = this.$on.outerWidth();
        this._labelWidth = this.$label.outerWidth();
        this.$container.width(this._handleWidth * 2 + this._labelWidth);
        return this.$wrapper.width(this._handleWidth + this._labelWidth);
      }
    }, {
      key: '_containerPosition',
      value: function _containerPosition() {
        var _this3 = this;

        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.state;
        var callback = arguments[1];
        this.$container.css('margin-left', function () {
          var values = [0, '-' + _this3._handleWidth + 'px'];

          if (_this3.options.indeterminate) {
            return '-' + _this3._handleWidth / 2 + 'px';
          }

          if (state) {
            if (_this3.options.inverse) {
              return values[1];
            } else {
              return values[0];
            }
          } else {
            if (_this3.options.inverse) {
              return values[0];
            } else {
              return values[1];
            }
          }
        });
      }
    }, {
      key: '_init',
      value: function _init() {
        var _this4 = this;

        var init = function init() {
          _this4.setPrevOptions();

          _this4._width();

          _this4._containerPosition();

          setTimeout(function () {
            if (_this4.options.animate) {
              return _this4.$wrapper.addClass(_this4._getClass('animate'));
            }
          }, 50);
        };

        if (this.$wrapper.is(':visible')) {
          init();
          return;
        }

        var initInterval = window.setInterval(function () {
          if (_this4.$wrapper.is(':visible')) {
            init();
            return window.clearInterval(initInterval);
          }
        }, 50);
      }
    }, {
      key: '_elementHandlers',
      value: function _elementHandlers() {
        var _this5 = this;

        return this.$element.on({
          'setPreviousOptions.bootstrapSwitch': this.setPrevOptions.bind(this),
          'previousState.bootstrapSwitch': function previousStateBootstrapSwitch() {
            _this5.options = _this5.prevOptions;

            if (_this5.options.indeterminate) {
              _this5.$wrapper.addClass(_this5._getClass('indeterminate'));
            }

            _this5.$element.prop('checked', _this5.options.state).trigger('change.bootstrapSwitch', true);
          },
          'change.bootstrapSwitch': function changeBootstrapSwitch(event, skip) {
            event.preventDefault();
            event.stopImmediatePropagation();

            var state = _this5.$element.is(':checked');

            _this5._containerPosition(state);

            if (state === _this5.options.state) {
              return;
            }

            _this5.options.state = state;

            _this5.$wrapper.toggleClass(_this5._getClass('off')).toggleClass(_this5._getClass('on'));

            if (!skip) {
              if (_this5.$element.is(':radio')) {
                $('[name="' + _this5.$element.attr('name') + '"]').not(_this5.$element).prop('checked', false).trigger('change.bootstrapSwitch', true);
              }

              _this5.$element.trigger('switchChange.bootstrapSwitch', [state]);
            }
          },
          'focus.bootstrapSwitch': function focusBootstrapSwitch(event) {
            event.preventDefault();

            _this5.$wrapper.addClass(_this5._getClass('focused'));
          },
          'blur.bootstrapSwitch': function blurBootstrapSwitch(event) {
            event.preventDefault();

            _this5.$wrapper.removeClass(_this5._getClass('focused'));
          },
          'keydown.bootstrapSwitch': function keydownBootstrapSwitch(event) {
            if (!event.which || _this5.options.disabled || _this5.options.readonly) {
              return;
            }

            if (event.which === 37 || event.which === 39) {
              event.preventDefault();
              event.stopImmediatePropagation();

              _this5.state(event.which === 39);
            }
          }
        });
      }
    }, {
      key: '_handleHandlers',
      value: function _handleHandlers() {
        var _this6 = this;

        this.$on.on('click.bootstrapSwitch', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this6.state(false);

          return _this6.$element.trigger('focus.bootstrapSwitch');
        });
        return this.$off.on('click.bootstrapSwitch', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this6.state(true);

          return _this6.$element.trigger('focus.bootstrapSwitch');
        });
      }
    }, {
      key: '_labelHandlers',
      value: function _labelHandlers() {
        var _this7 = this;

        var handlers = {
          click: function click(event) {
            event.stopPropagation();
          },
          'mousedown.bootstrapSwitch touchstart.bootstrapSwitch': function mousedownBootstrapSwitchTouchstartBootstrapSwitch(event) {
            if (_this7._dragStart || _this7.options.disabled || _this7.options.readonly) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            _this7._dragStart = (event.pageX || event.originalEvent.touches[0].pageX) - parseInt(_this7.$container.css('margin-left'), 10);

            if (_this7.options.animate) {
              _this7.$wrapper.removeClass(_this7._getClass('animate'));
            }

            _this7.$element.trigger('focus.bootstrapSwitch');
          },
          'mousemove.bootstrapSwitch touchmove.bootstrapSwitch': function mousemoveBootstrapSwitchTouchmoveBootstrapSwitch(event) {
            if (_this7._dragStart == null) {
              return;
            }

            var difference = (event.pageX || event.originalEvent.touches[0].pageX) - _this7._dragStart;
            event.preventDefault();

            if (difference < -_this7._handleWidth || difference > 0) {
              return;
            }

            _this7._dragEnd = difference;

            _this7.$container.css('margin-left', _this7._dragEnd + 'px');
          },
          'mouseup.bootstrapSwitch touchend.bootstrapSwitch': function mouseupBootstrapSwitchTouchendBootstrapSwitch(event) {
            if (!_this7._dragStart) {
              return;
            }

            event.preventDefault();

            if (_this7.options.animate) {
              _this7.$wrapper.addClass(_this7._getClass('animate'));
            }

            if (_this7._dragEnd) {
              var state = _this7._dragEnd > -(_this7._handleWidth / 2);
              _this7._dragEnd = false;

              _this7.state(_this7.options.inverse ? !state : state);
            } else {
              _this7.state(!_this7.options.state);
            }

            _this7._dragStart = false;
          },
          'mouseleave.bootstrapSwitch': function mouseleaveBootstrapSwitch() {
            _this7.$label.trigger('mouseup.bootstrapSwitch');
          }
        };
        this.$label.on(handlers);
      }
    }, {
      key: '_externalLabelHandler',
      value: function _externalLabelHandler() {
        var _this8 = this;

        var $externalLabel = this.$element.closest('label');
        $externalLabel.on('click', function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();

          if (event.target === $externalLabel[0]) {
            _this8.toggleState();
          }
        });
      }
    }, {
      key: '_formHandler',
      value: function _formHandler() {
        var $form = this.$element.closest('form');

        if ($form.data('bootstrap-switch')) {
          return;
        }

        $form.on('reset.bootstrapSwitch', function () {
          window.setTimeout(function () {
            $form.find('input').filter(function () {
              return $(this).data('bootstrap-switch');
            }).each(function () {
              return $(this).bootstrapSwitch('state', this.checked);
            });
          }, 1);
        }).data('bootstrap-switch', true);
      }
    }, {
      key: '_getClass',
      value: function _getClass(name) {
        return this.options.baseClass + '-' + name;
      }
    }, {
      key: '_getClasses',
      value: function _getClasses(classes) {
        if (!$.isArray(classes)) {
          return [this._getClass(classes)];
        }

        return classes.map(this._getClass.bind(this));
      }
    }]);

    return BootstrapSwitch;
  }();

  $.fn.bootstrapSwitch = function (option) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    function reducer(ret, next) {
      var $this = $(next);
      var existingData = $this.data('bootstrap-switch');
      var data = existingData || new BootstrapSwitch(next, option);

      if (!existingData) {
        $this.data('bootstrap-switch', data);
      }

      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }

      return ret;
    }

    return Array.prototype.reduce.call(this, reducer, this);
  };

  $.fn.bootstrapSwitch.Constructor = BootstrapSwitch;
  $.fn.bootstrapSwitch.defaults = {
    state: true,
    size: null,
    animate: true,
    disabled: false,
    readonly: false,
    indeterminate: false,
    inverse: false,
    radioAllOff: false,
    onColor: 'primary',
    offColor: 'default',
    onText: 'ON',
    offText: 'OFF',
    labelText: '&nbsp',
    handleWidth: 'auto',
    labelWidth: 'auto',
    baseClass: 'bootstrap-switch',
    wrapperClass: 'wrapper',
    onInit: function onInit() {},
    onSwitchChange: function onSwitchChange() {}
  };
});
},{}],"d347dc37b6ca23899ffbbc32fd87b43f":[function(require,module,exports) {
var global = arguments[3];
var __PARCEL_HMR_ENV_HASH = "d751713988987e9331980363e24189ce";var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function(fn) {
      this._acceptCallbacks.push(fn || function() {});
    },
    dispose: function(fn) {
      this._disposeCallbacks.push(fn);
    },
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = location.hostname;
  var port = location.port ? ':' + location.port : '';
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + port + '/');
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();

      let assets = data.assets.filter(
        // eslint-disable-next-line no-undef
        asset => asset.envHash === __PARCEL_HMR_ENV_HASH,
      );

      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();

        assets.forEach(function(asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe
          ? ansiDiagnostic.codeframe
          : ansiDiagnostic.stack;

        console.error(
          '🚨 [parcel]: ' +
            ansiDiagnostic.message +
            '\n' +
            stack +
            '\n\n' +
            ansiDiagnostic.hints.join('\n'),
        );
      }

      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function(e) {
    console.error(e.message);
  };
  ws.onclose = function(e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  let errorHTML =
    '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;

    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';

  overlay.innerHTML = errorHTML;

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

      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push([bundle, k]);
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
    var fn = new Function('require', 'module', 'exports', asset.output);
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

  return getParents(global.parcelRequire, id).some(function(v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function(cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function(cb) {
      var assetsToAlsoAccept = cb(function() {
        return getParents(global.parcelRequire, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}]},{},["d347dc37b6ca23899ffbbc32fd87b43f","a6f8f82869e5379e45d83e6687fa7388"], null)

//# sourceMappingURL=bootstrap-switch.0c885674.js.map
