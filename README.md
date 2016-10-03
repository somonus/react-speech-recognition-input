# speech-recognition

A [React](https://facebook.github.io/react/) speech recognition component for the Chrome Browser .

## Install

$ npm install --save react-speech-recognition

## Usage

```
import React from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition from 'react-speech-recognition';

ReactDOM.render((
  <SpeechRecognition
      className="test" onChange={(value) => console.log(value)} onEnd={(value) => console.log(value)} />
), document.getElementById('app'));

```

##Example

*run demo*

```
npm install
npm start
```
open [http://localhost:8080/](http://localhost:8080/)

## props

* `className`: the css class name of the wrapper.
* `onChange`: run when you start speaking, the value is what you say.
* `onEnd`: run when you stop speaking, the value is what you say.

## License

react-speech-recognition-input is released under the MIT license.
