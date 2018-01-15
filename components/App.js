import ReactDOM from 'react-dom';
import React from 'react';
import ControlBox from './ControlBox.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <ControlBox/>
      </div>
    );
  }
}

