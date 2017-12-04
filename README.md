# Speech To Text

A speech recognition module.

It's designed to listen continuously to a user (i.e. pauses are ok), and then
converts that speech to text.

## Install

`yarn add speech-to-text`

## Usage

```
import SpeechToText from 'speech-to-text';

const onAnythingSaid = text => console.log(`Interim text: ${text}`);
const onFinalised = text => console.log(`Finalised text: ${text}`);

try {
  const listener = new SpeechToText(onAnythingSaid, onFinalised);
  listener.startListening();
} catch (error) {
  console.log(error);
}
```

Demo [here](http://apps.golightlyplus.com/speech-to-text-demo/).

## API

### The constructor

* onAnythingSaid: this is a callback function that is called with text as it's
  being said
* onFinalised: this is a callback function that is called with the full text as
  it has been resolved in the cloud.
* onFinishedListening: this is a callback function that is called when the
  speech recognitions stops listening.
* language: This is an optional string that specifies the language to be
  interpreted as. Default is United States English. 'en-US'

The constructor will throw an error if speech recognition is not supported by
the browser.

```
if (
  !('webkitSpeechRecognition' in window) &&
  !('SpeechRecognition' in window)
) {
  throw new Error("This browser doesn't support speech recognition. Try Google Chrome or Firefox.");
}
```

### startListening

Initiates listening to speech input and will continue to call the callback
functions provided until the speech recognition stops listening. After which
you'll need to call this function again.

### stopListening

Does just that. Stops listening.

## License

MIT
