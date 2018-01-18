import ReactDOM from 'react-dom';
import React from 'react';
import { getTimeFromPercent } from '../utils/utils.js';

export default class TimeHover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x : -100, y : -100};
    }
    updateCoord(newX, newY) {
        this.setState({x : newX, y : newY});
    }
    render() {
        var that = this;

        function onMouseUpdate(event) {
            var x = event.pageX;
            var y = event.pageY;
            that.updateCoord(x, y);
        }
        function test(event) {
            alert('omfg');
        }
        var height = window.innerHeight;
        var posnPercent = this.state.y / height;
        var time = getTimeFromPercent(posnPercent);
        var styles = {  position : 'absolute',
                        top : this.state.y,
                        right : 0
                    };
        return (
            <div className="time-hover" onMouseMove={ onMouseUpdate }>
                <div className="time" style={ styles }>
                    <span className="time-text">{ time }</span>
                    <div className="time-background">
                    </div>
                </div>
            </div>
            );
    }
}

