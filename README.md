# react-speech-recognition-input
A react speech recognition component for chrome browser 

## install
```
$ npm install react-speech-recognition-input --save
```
## Usage

```
import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-speech-recognition-input';

ReactDOM.render((
  <Input className="test" onChange={(value) => console.log(value)} onEnd={(value) => console.log(value)} />
), document.getElementById('chart'));

```

## Example

*run demo*

```
npm install
npm start
```
open [http://localhost:8080/](http://localhost:8080/)

## props

* `lang`: the speak language, default value is 'cmn-Hans-CN'. 
* `className`: the css class name of the wrapper.
* `onChange`: run when you start speaking, the value is what you say.
* `onEnd`: run when you stop speaking, the value is what you say.

## License

react-speech-recognition-input is released under the MIT license.
