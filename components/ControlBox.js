import ReactDOM from 'react-dom';
import React from 'react';
import { getSelectedYear } from '../utils/utils.js';
import { getSelectedMonth } from '../utils/utils.js';
import { splitDate } from '../utils/utils.js';

export default class ControlBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ 
                data: nextProps.data.data,
                displayMode: nextProps.displayMode,
                selectedDay: nextProps.data.selectedDay,
                selectedMonth: nextProps.data.selectedMonth,
                selectedYear: nextProps.data.selectedYear,
            });  
    }
    render() {
        // console.log(this.state.data);
        var SelectedYearData = getSelectedYear(this.state.data.data, this.state.selectedYear);
        var daysArr = getSelectedMonth(SelectedYearData, this.state.selectedMonth);
        // console.log(daysArr)
        var that = this;

        function onChange(event) {
            that.props.update(event.target.value);
        }

        var selectNode = (<select onChange={ onChange }> {

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
                    </select>)
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
                    { selectNode }
                </div>
            </div>
            );
    }
}

