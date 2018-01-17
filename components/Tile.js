import ReactDOM from 'react-dom';
import React from 'react';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    colors :  this.props.gradients,
                    day :  this.props.day,
                    month :  this.props.month,
                    year :  this.props.year,
                    selectedTime :  this.props.selectedTime,
                    hasColors :  this.props.hasColors
        };
    }

    render() {
        var that = this;
        var gradientNodes = this.props.gradients.map(function(colors, i) {
            var gradient = 'linear-gradient('+colors+')';
            var styles = { background: gradient };
            if(that.props.hasColors) {
                return (
                    <div className="tile-gradient" key={'key-' + i} style={ styles }>
                    </div>
                );
            } else {
                return ("");
            }

        });

        return (
            <div className="tile">
                <div className="date-time-container">
                    <div className="date">
                        <span>
                            { this.props.day}
                        </span>
                        <span className="divider">
                            .
                        </span>
                        <span>
                            { this.props.month}
                        </span>
                        <span className="divider">
                            .
                        </span>
                        <span>
                            { this.props.year}
                        </span>
                    </div>
                    <div className="time">
                        { this.props.selectedTime}
                    </div>
                </div>
                <div className={this.props.hasColors ? 'hidden' : 'no-data'}>
                    No Data
                </div>
                { gradientNodes }
            </div>
            );
    }
}

