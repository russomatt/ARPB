import ReactDOM from 'react-dom';
import React from 'react';
import { getSelectedYear } from '../utils/utils.js';
import { getSelectedMonth } from '../utils/utils.js';
import { splitDate } from '../utils/utils.js';

export default class ControlBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
        this.state.minimize = false;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ 
                data: nextProps.data.data,
                displayMode: nextProps.displayMode,
                selectedDay: nextProps.data.selectedDay,
                selectedMonth: nextProps.data.selectedMonth,
                selectedYear: nextProps.data.selectedYear,
                selectedTime: nextProps.data.selectedTime,
                viewFullDay: nextProps.data.viewFullDay,
                minimize: this.state.minimize
            });  
    }
    render() {
        var SelectedYearData = getSelectedYear(this.state.data.data, this.state.selectedYear);
        var daysArr = getSelectedMonth(SelectedYearData, this.state.selectedMonth);
        var that = this;

        function onDayChange(event) {
            that.props.updateSelectedDay(event.target.value);
        }
        function onMonthChange(event) {
            that.props.updateSelectedMonth(event.target.value);
        }

        function click() {
            that.setState({minimize: !that.state.minimize});
        }

        var selectDayNode = (<select onChange={ onDayChange }> {

                            daysArr.map(function(day) {
                                var dateObj = splitDate(day.day);
                                if(day == that.state.selectedDay) {
                                    return (
                                        <option key={'select-' + dateObj.day }value={ dateObj.day } selected>
                                            { dateObj.day }
                                        </option>
                                    )
                                } else {
                                    return (
                                        <option key={'select-' + dateObj.day }value={ dateObj.day }>
                                            { dateObj.day }
                                        </option>
                                    )
                                }
                            })
                        }
                    </select>);

        var selectMonthNode = (<select onChange={ onMonthChange }> {

                            SelectedYearData.months.map(function(month) {
                                // var dateObj = splitDate(day.day);
                                if(month == that.state.selectedMonth) {
                                    return (
                                        <option key={'select-' + month.month } value={ month.month } selected>
                                            { month.month }
                                        </option>
                                    )
                                } else {
                                    return (
                                        <option key={'select-' + month.month } value={ month.month }>
                                            { month.month }
                                        </option>
                                    )
                                }
                            })
                        }
                    </select>);

        var times = ['00:00', '00:10', '00:20', '00:30','00:40', '00:50',
                     '01:00', '01:10', '01:20', '01:30','01:40', '01:50',
                     '02:00', '02:10', '02:20', '02:30','02:40', '02:50',
                     '03:00', '03:10', '03:20', '03:30','03:40', '03:50',
                     '04:00', '04:10', '04:20', '04:30','04:40', '04:50',
                     '05:00', '05:10', '05:20', '05:30','05:40', '05:50',
                     '06:00', '06:10', '06:20', '06:30','06:40', '06:50',
                     '07:00', '07:10', '07:20', '07:30','07:40', '07:50',
                     '08:00', '08:10', '08:20', '08:30','08:40', '08:50',
                     '09:00', '09:10', '09:20', '09:30','09:40', '09:50',
                     '10:00', '10:10', '10:20', '10:30','10:40', '10:50',
                     '11:00', '11:10', '11:20', '11:30','11:40', '11:50',
                     '12:00', '12:10', '12:20', '12:30','12:40', '12:50',
                     '13:00', '13:10', '13:20', '13:30','13:40', '13:50',
                     '14:00', '14:10', '14:20', '14:30','14:40', '14:50',
                     '15:00', '15:10', '15:20', '15:30','15:40', '15:50',
                     '16:00', '16:10', '16:20', '16:30','16:40', '16:50',
                     '17:00', '17:10', '17:20', '17:30','17:40', '17:50',
                     '18:00', '18:10', '18:20', '18:30','18:40', '18:50',
                     '19:00', '19:10', '19:20', '19:30','19:40', '19:50',
                     '20:00', '20:10', '20:20', '20:30','20:40', '20:50',
                     '21:00', '21:10', '21:20', '21:30','21:40', '21:50',
                     '22:00', '22:10', '22:20', '22:30','22:40', '22:50',
                     '23:00', '23:10', '23:20', '23:30','23:40', '23:50'
                     ];

        var timeIdx = times.indexOf(this.state.selectedTime)
        var that = this;

        function sliderFunction(event) {
            var newTimeIdx = event.target.value;
            var newSelectedTime = times[newTimeIdx];
            that.props.updateSelectedTime(newSelectedTime);
        }

        function viewByDay(event) {
            if(event.target.value == 'true') {
                that.props.updateViewByDay(event.target.value);
            } else {
                that.props.updateViewByDay(event.target.value);
            }
        }

        var lol = this.state.viewFullDay;

        var timeSlider = (
                <div className="slider">
                    <input
                        onChange={ sliderFunction }
                        className="time-slider"
                        type="range"
                        min="0"
                        value={ timeIdx }
                        max="143"
                        step="1"
                    />
                    <hr/>
                </div>
            );

        function onDisplayChange(event) {
            that.props.updateDisplayMode(event.target.value);
        }

        return (
            <div className={ this.state.minimize ? 'control-box minimized' : 'control-box' }>
                <h1 className="min-button" onClick={ click }>
                    <span>
                        +
                    </span>
                </h1>
                <div className="controls">
                    <div className="title">
                        <h1>
                            Time As Color
                        </h1>
                        <h2>
                            visualization of the sky
                        </h2>
                    </div>
                    <div className="view-option">
                        <button className={ this.state.viewFullDay ? "option" : "option selected" } onClick={ viewByDay } value={ 'false' }>
                            View Point in Time
                        </button>
                        <button className={ this.state.viewFullDay ? "option selected" : "option" } onClick={ viewByDay } value={ 'true' }>
                            View Full Day
                        </button>
                        <hr className={ this.state.viewFullDay ? "right" : "left" }/>
                    </div>
                    <div className="selects">
                        <div className="select-holder select-day">
                            <span>
                                Date:
                            </span>
                            { selectDayNode }
                        </div>
                        <div className="select-holder select-month">
                            { selectMonthNode }
                        </div>
                        <span>
                            2017
                        </span>
                        <br/>
                        <div className="select-holder select-display">
                            <span>
                                Display by:
                            </span>
                            <select onChange={ onDisplayChange }>
                                <option value="week" defaultValue>
                                    Week
                                </option>
                                <option value="day">
                                    Day
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="time-slider">
                        { !this.state.viewFullDay && timeSlider }
                        { !this.state.viewFullDay && 
                            <span className="display-time">
                                { this.state.selectedTime }
                            </span>

                        }
                    </div>
                </div>
            </div>
            );
    }
}

