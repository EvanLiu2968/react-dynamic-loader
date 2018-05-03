"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = asyncLoader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function asyncLoader(options) {
  options = _extends({
    loader: null,
    loading: _react2.default.createElement(
      "div",
      { className: "async-loading" },
      "loading..."
    ),
    error: _react2.default.createElement(
      "div",
      { className: "async-error" },
      "some error occurred."
    ),
    delay: 200
  }, options);

  var AsyncLoader = function (_React$Component) {
    _inherits(AsyncLoader, _React$Component);

    function AsyncLoader(props) {
      _classCallCheck(this, AsyncLoader);

      var _this = _possibleConstructorReturn(this, (AsyncLoader.__proto__ || Object.getPrototypeOf(AsyncLoader)).call(this, props));

      _this.state = {
        error: false,
        loading: true,
        component: null
      };
      return _this;
    }

    _createClass(AsyncLoader, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        options.loader().then(function (e) {
          if (!e || !e.default) {
            _this2.setState({
              error: true
            });
            return;
          }
          setTimeout(function () {
            _this2.setState({
              loading: false,
              component: e.default
            });
          }, options.delay);
        }).catch(function (e) {
          _this2.setState({
            error: true
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var C = this.state.component;
        var E = options.error;
        var L = options.loading;

        return C ? _react2.default.createElement(C, this.props) : this.state.error ? this.state.error && E ? E : null : this.state.loading && L ? L : null;
      }
    }]);

    return AsyncLoader;
  }(_react2.default.Component);

  return AsyncLoader;
}