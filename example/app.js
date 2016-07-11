import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../src';

ReactDOM.render((
  <div>
    <div>点击录音按钮开始说话，说完之后再次点击按钮结束说话</div><br/>
    <Input className="test" onChange={(value) => console.log(value)} onEnd={(value) => console.log(value)} />
  </div>
), document.getElementById('chart'));
