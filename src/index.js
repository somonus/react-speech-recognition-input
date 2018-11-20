export default class SpeechToText {
  /*
    Arguments for the constructor:

    - onFinalised - a callback that will be passed the finalised transcription from the cloud. Slow, but accuate.
    - onAnythingSaid - a callback that will be passed interim transcriptions. Fairly immediate, but less accurate than finalised text.
    - language - the language to interpret against. Default is US English.

    */
  constructor(onFinalised, onAnythingSaid, language = 'en-US') {
    // Check to see if this browser supports speech recognition
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Browser_compatibility
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error(
        "This browser doesn't support speech recognition. Try Google Chrome."
      );
    }

    let continuouslyListen = !!onAnythingSaid;

    const SpeechRecognition = window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    //  if to continuously listen, get interim results too
    this.recognition.continuous = continuouslyListen;
    this.recognition.interimResults = continuouslyListen;
    this.recognition.lang = language;

    let finalTranscript = '';

    // process both interim and finalised results
    this.recognition.onresult = event => {
      let interimTranscript = '';

      // concatenate all the transcribed pieces together (SpeechRecognitionResult)
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcriptionPiece = event.results[i][0].transcript;
        // check for a finalised transciption in the cloud
        if (event.results[i].isFinal) {
          finalTranscript += transcriptionPiece;
          onFinalised(finalTranscript);
          finalTranscript = '';
        } else if (continuouslyListen) {
          interimTranscript += transcriptionPiece;
          onAnythingSaid(interimTranscript);
        }
      }
    };

    // if speech recognition ends, and it's flagged to restart, then restart!
    this.recognition.onend = () => {
      if (this.shouldRestart) {
        this.startListening();
        this.shouldRestart = false;
      }
    };

    this.recognition.onerror = evt => {
      console.log(
        `Error with speech recognition: ${evt.error}. Restarting service...`
      );

      this.restart();
    };
  }

  startListening() {
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }

  // to restart the speech recognition engine, stop it, then flag that it should restart.
  restart() {
    this.stopListening();
    this.shouldRestart = true;
  }
}
