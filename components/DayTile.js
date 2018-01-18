import ReactDOM from 'react-dom';
import React from 'react';

export default class DayTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    day :  this.props.day,
                    month :  this.props.month,
                    year :  this.props.year,
        };
    }

    render() {
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
                </div>
                { this.props.children }
            </div>
            );
    }
}

