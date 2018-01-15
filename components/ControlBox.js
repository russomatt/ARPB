import ReactDOM from 'react-dom';
import React from 'react';

export default class ControlBox extends React.Component {

  render() {
    return (
      <div className="control-box">
        <div className="title">
            <h1>
                Time As Color
            </h1>
            <h2>
                visualization of the sky
            </h2>
        </div>
        <div className="slider">
            <input className="time-slider" type="range" />
        </div>
      </div>
    );
  }
}

