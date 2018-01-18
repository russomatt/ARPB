import ReactDOM from 'react-dom';
import React from 'react';
import ControlBox from './ControlBox.js';
import TileContainer from './TileContainer.js';
import TimeHover from './TimeHover.js';
import data from '../data/testData.json';
// import img from '../img/sky4.jpeg';

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
            viewFullDay: false,
        };
    }
    updateDay(day) {
        this.setState({selectedDay : day});
    }
    updateMonth(month) {
        this.setState({selectedMonth : month});
    }
    updateSelectedTime(time) {
        this.setState({selectedTime : time});
    }
    updateDisplayMode(display) {
        this.setState({displayMode : display});
    }
    updateViewByDay(bool) {
        if( bool == 'true') {
            this.setState({viewFullDay : true});
        } else {
            this.setState({viewFullDay : false});
        }
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
        function updateDisplayMode(display) {
            that.updateDisplayMode(display);
        }
        function updateViewByDay(bool) {
            that.updateViewByDay(bool);
        }

        var timeHover = this.state.viewFullDay ? (<TimeHover/>) : "";

        return (
            <div>
                <ControlBox
                    data={ this.state }
                    updateSelectedDay={ updateSelectedDay }
                    updateSelectedMonth={ updateSelectedMonth }
                    updateSelectedTime={ updateSelectedTime }
                    updateDisplayMode={ updateDisplayMode }
                    updateViewByDay={ updateViewByDay }
                />
                <div>
                    <TileContainer
                        data={ this.state }
                        displayMode={ this.state.displayMode }
                    />
                </div>
               { timeHover }
            </div>
        );
    }
}

