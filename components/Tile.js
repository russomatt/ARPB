import ReactDOM from 'react-dom';
import React from 'react';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var gradientNodes = this.props.gradients.map(function(gradient, i) {

            var styles = { background: gradient };

            return (
                <div className="tile-gradient" key={'key-' + i} style={ styles }>
                </div>
            );
        })

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
                { gradientNodes }
            </div>
            );
    }
}

