'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('style!css?modules!./index.css');

var _index2 = _interopRequireDefault(_index);

var _mic = require('file!./mic.gif');

var _mic2 = _interopRequireDefault(_mic);

var _micAnimate = require('file!./mic-animate.gif');

var _micAnimate2 = _interopRequireDefault(_micAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      inputValue: '',
      supportVoice: 'webkitSpeechRecognition' in window
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.supportVoice) {
        var WebkitSpeechRecognition = window.webkitSpeechRecognition;
        this.recognition = new WebkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'cmn-Hans-CN';
        this.recognition.onresult = function (event) {
          var interimTranscript = '';
          var finalTranscript = '';
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
              _this2.setState({
                inputValue: finalTranscript
              });
              if (_this2.props.onChange) _this2.props.onChange(finalTranscript);
              if (_this2.props.onEnd) _this2.props.onEnd(finalTranscript);
            } else {
              interimTranscript += event.results[i][0].transcript;
              _this2.setState({
                inputValue: interimTranscript
              });
              if (_this2.props.onChange) _this2.props.onChange(interimTranscript);
            }
          }
        };
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(event) {
      this.setState({
        inputValue: event.target.value
      });
    }
  }, {
    key: 'say',
    value: function say() {
      if (this.state.supportVoice) {
        if (!this.state.speaking) {
          // start listening
          this.recognition.start();
        } else {
          this.recognition.stop();
          var question = this.state.inputValue;
        }
        this.setState({
          speaking: !this.state.speaking,
          inputValue: ''
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _index2.default.chatInputWrapper + " " + this.props.className },
        this.state.supportVoice && _react2.default.createElement('img', {
          src: this.state.speaking ? _micAnimate2.default : _mic2.default,
          className: _index2.default.micImg,
          onClick: this.say.bind(this) }),
        _react2.default.createElement('input', {
          value: this.state.inputValue,
          onChange: this.changeValue.bind(this),
          className: _index2.default.chatMessageInput,
          placeholder: 'Type your message' })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;