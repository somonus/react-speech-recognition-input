# Speech To Text

A speech recognition module to convert speech into text.

## Install

`npm install speech-to-text`

## Usage

This module implements 2 use cases:

1. If you only want the speech recognition service to listen when you request it to, and for it to return an accurate transcription.

```
// code for use case 1
import SpeechToText from 'speech-to-text';

const onFinalised = text => console.log(`Finalised text: ${text}`);

try {
  const listener = new SpeechToText(onFinalised);
  listener.startListening();
} catch (error) {
  console.log(error);
}
```

2. Start the speech recognition service to continuously listen to speech input, and return the interim text results as well as the finalised text.

```
// code for use case 2
import SpeechToText from 'speech-to-text';

const onFinalised = text => console.log(`Finalised text: ${text}`);
const onAnythingSaid = text => console.log(`Interim text: ${text}`);

try {
  const listener = new SpeechToText(onFinalised, onAnythingSaid);
  listener.startListening();
} catch (error) {
  console.log(error);
}
```

Use case 2 demo [here](http://apps.golightlyplus.com/speech-to-text-demo/).

## API

### The constructor

- onFinalised - a callback that will be passed the finalised transcription from the cloud. Slow, but accuate.
- onAnythingSaid - Passing in this function will get the module to continuously listen. This passed in callback will be passed interim transcriptions. These transcriptions are generated quickly, but are less accurate than the finalised text.
- language - the language to interpret against. Default is US English.

The constructor will throw an error if speech recognition is not supported by the browser. [Currently only Chrome is supported](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Browser_compatibility).

```
if (!('webkitSpeechRecognition' in window)) {
  throw new Error("This browser doesn't support speech recognition. Try Google Chrome.");
}
```

### startListening

Initiates listening to speech input.

### stopListening

Does just that. Stops listening.

### restart

This will restart the speech recognition service.

motivation: There is a known issue where the speech recognition service randomly stops listening. The simplest solution is to restart the service. The restart implementation is inspired by [this thread](https://stackoverflow.com/a/40676839/2813041).

So for robustness, maybe you want to restart the speech recognition in your app every 11 seconds. You could do that with this code:

```
const listener = new SpeechToText(onFinalised, onAnythingSaid);
listener.startListening();

setInterval(() => {
  listener.restart();
}, 11000);
```

## License

MIT
