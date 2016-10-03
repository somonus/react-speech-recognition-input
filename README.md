# Speech To Text

A speech recognition module.

It's designed to listen continuously to a user (i.e. pauses are ok), and then converting the speech to text.

## Install

`npm install --save speech-to-text`

## Usage

````
import SpeechToText from 'speech-to-text';

const onAnythingSaid = text => console.log(`Interim text: ${text}`);
const onFinalised = text => console.log(`Finalised text: ${text}`);

try {
  const listener = new SpeechToText(onAnythingSaid, onFinalised);
  listener.startListening();
} catch (error) {
  console.log(error);
}
````

## API

### The constructor

- onAnythingSaid: this is a callback function that is called with text as it's being said
- onFinalised: this is a callback function that is called with the full text as it has been resolved in the cloud.
- language: This is an optional string that specifies the language to be interpreted as. Default is United States English. 'en-US'

The constructor will throw an error if speech recognition is not supported by the browser.
````
// Check to see if this browser supports speech recognition
if (!('webkitSpeechRecognition' in window)) {
  throw new Error("This browser doesn't support speech recognition. Try Google Chrome.");
}
````

### startListening

Initiates listening to speech input and will continue to call the callback functions provided until the speech is finalised. After which you'll need to call this function again.

## License

MIT
