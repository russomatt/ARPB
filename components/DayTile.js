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
    componentWillReceiveProps(nextProps) {
        this.setState({ 
                day :  nextProps.day,
                month :  nextProps.month,
                year :  nextProps.year,
            });  
    }

    render() {
        return (
            <div className={'tile ' + this.state.day}>
                <div className="date-time-container">
                    <div className="date">
                        <span className="date-day">
                            { this.state.day}
                        </span>
                        <span className="divider">
                            .
                        </span>
                        <span className="date-month">
                            { this.state.month}
                        </span>
                        <span className="divider">
                            .
                        </span>
                        <span className="date-year">
                            { this.state.year}
                        </span>
                    </div>
                </div>
                { this.props.children }
            </div>
            );
    }
}

