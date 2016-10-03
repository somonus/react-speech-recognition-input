export default class SpeechToText {

  /*
  Arguments for the constructor.
   onAnythingSaid - a callback that will be passed interim transcriptions
  (fairly immediate, less accurate)
   onFinalised - a callback that will be passed the finalised transcription from the cloud
  (slow, much more accuate)
   language - the language to interpret against. Default is US English.
  */
  constructor(onAnythingSaid, onFinalised, language = 'en-US') {
    // Check to see if this browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error("This browser doesn't support speech recognition. Try Google Chrome.");
    }

    const WebkitSpeechRecognition = window.webkitSpeechRecognition;
    this.recognition = new WebkitSpeechRecognition();

    //  Keep listening even if the speaker pauses, and return interim results.
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language;

    // process both interim and finalised results
    this.recognition.onresult = event => {
      let interimTranscript = '';
      let finalTranscript = '';
      // concatenate all the transcribed pieces together (SpeechRecognitionResult)
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcriptionPiece = event.results[i][0].transcript;
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
  startListening() {
    this.recognition.start();
  }

}