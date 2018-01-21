import ReactDOM from 'react-dom';
import React from 'react';
import ControlBox from './ControlBox.js';
import TileContainer from './TileContainer.js';
import TimeHover from './TimeHover.js';
import data from '../data/data.json';
import data2 from '../data/wcs_complete.json';
import { format } from '../utils/utils.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            selectedDay: '15',
            selectedMonth: 'january',
            selectedYear: '2018',
            displayMode: 'week',
            selectedTime: '05:30',
            viewFullDay: true,
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

        format(data2);
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

