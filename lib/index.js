'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeechToText = function () {

  /*
  Arguments for the constructor.
   onAnythingSaid - a callback that will be passed interim transcriptions
  (fairly immediate, less accurate)
   onFinalised - a callback that will be passed the finalised transcription from the cloud
  (slow, much more accuate)
   language - the language to interpret against. Default is US English.
  */
  function SpeechToText(onAnythingSaid, onFinalised) {
    var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en-US';

    _classCallCheck(this, SpeechToText);

    // Check to see if this browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error("This browser doesn't support speech recognition. Try Google Chrome.");
    }

    var WebkitSpeechRecognition = window.webkitSpeechRecognition;
    this.recognition = new WebkitSpeechRecognition();

    //  Keep listening even if the speaker pauses, and return interim results.
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language;

    // process both interim and finalised results
    this.recognition.onresult = function (event) {
      var interimTranscript = '';
      var finalTranscript = '';
      // concatenate all the transcribed pieces together (SpeechRecognitionResult)
      for (var i = event.resultIndex; i < event.results.length; i += 1) {
        var transcriptionPiece = event.results[i][0].transcript;
        // check for a finalised transciption in the cloud
        if (event.results[i].isFinal) {
          finalTranscript += transcriptionPiece;
          onAnythingSaid(finalTranscript);
          onFinalised(finalTranscript);
        } else {
          interimTranscript += transcriptionPiece;
          onAnythingSaid(interimTranscript);
        }
      }
    };
  }

  /*
  Explicitly start listening.
  Listening will need to be started again after a finalised result is returned.
  */


  _createClass(SpeechToText, [{
    key: 'startListening',
    value: function startListening() {
      this.recognition.start();
    }
  }]);

  return SpeechToText;
}();

exports.default = SpeechToText;