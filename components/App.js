import ReactDOM from 'react-dom';
import React from 'react';
import ControlBox from './ControlBox.js';
import TileContainer from './TileContainer.js';
import data from '../data/testData.json';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            selectedDay: '01',
            selectedMonth: 'october',
            selectedYear: '2016',
            displayMode: 'week',
            selectedTime: '00:00',
        };
    }
    updateDay(day) {
        this.setState({selectedDay : day});
        // console.log(this.state)
    }
    updateMonth(month) {
        this.setState({selectedMonth : month});
        // console.log(this.state)
    }
    updateSelectedTime(time) {
        this.setState({selectedTime : time});
        console.log(this.state)
    }
    render() {
        var that = this;

        function updateSelectedDay(day) {
            that.updateDay(day);
        }
        function updateSelectedMonth(month) {
            that.updateMonth(month);
        }
        function updateSelectedTime(time) {
            that.updateSelectedTime(time);
        }

        // console.log(this.state);
        return (
            <div>
                <ControlBox
                    data={ this.state }
                    updateSelectedDay={ updateSelectedDay }
                    updateSelectedMonth={ updateSelectedMonth }
                    updateSelectedTime={ updateSelectedTime }
                />
                <div>
                    <TileContainer
                        data={ this.state }
                        displayMode={ this.state.displayMode }
                    />
                </div>
            </div>
        );
    }
}

