import ReactDOM from 'react-dom';
import React from 'react';
import Tile from './Tile.js';
import DayTile from './DayTile.js';
import { getSelectedYear } from '../utils/utils.js';
import { getSelectedMonth } from '../utils/utils.js';
import { getDisplayedDates } from '../utils/utils.js';
import { getDisplayedColors } from '../utils/utils.js';
import { splitDate } from '../utils/utils.js';
import { displayFullDayData } from '../utils/utils.js';
import { getSelectedDay } from '../utils/utils.js';
import { displayFullDayNodes } from '../utils/utils.js';

export default class TileContainer extends React.Component {
    constructor(props) {
        super(props);
        // this.state = this.props.state;
        this.state = {
                data: this.props.data.data,
                displayMode: this.props.displayMode,
                selectedDay: this.props.data.selectedDay,
                selectedMonth: this.props.data.selectedMonth,
                selectedYear: this.props.data.selectedYear,
                selectedTime: this.props.data.selectedTime,
                viewFullDay: this.props.data.viewFullDay,
            };
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setState({ 
                data: nextProps.data.data,
                displayMode: nextProps.displayMode,
                selectedDay: nextProps.data.selectedDay,
                selectedMonth: nextProps.data.selectedMonth,
                selectedYear: nextProps.data.selectedYear,
                selectedTime: nextProps.data.selectedTime,
                viewFullDay: nextProps.data.viewFullDay,

         });  
    }
    render() {

        var containerClasses = 'tile-container ' + this.props.displayMode;
        var that = this;
        var days = that.state.data.data[0].data.months[0].data;
        var SelectedYearData = getSelectedYear(that.state.data.data, this.state.selectedYear);
        var SelectedMonthData = getSelectedMonth(SelectedYearData, this.state.selectedMonth);
        var displayData = getDisplayedDates(SelectedMonthData, this.props.displayMode, this.state.selectedDay, this.state.selectedMonth, this.state.selectedYear);
        var selectedDayData = getSelectedDay(days, this.state.selectedDay)

        var tileNodes = !this.state.viewFullDay ? displayData.map(function(day,i) {
            var hasColors = true;
            var colorsAtTime = getDisplayedColors(day.times, that.state.selectedTime);
            if(colorsAtTime.length == 0) {
                hasColors = false;
                colorsAtTime = ['rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)'];
            }
            var date = splitDate(day.day);
            var selectedTime = that.state.selectedTime;

            return (
                <Tile
                    key={ 'tile-' + i }
                    gradients={ colorsAtTime }
                    day={ date.day }
                    month={ date.month }
                    year={ date.year }
                    selectedTime={ that.state.selectedTime }
                    hasColors={ hasColors }
                />
            )
            }) : ( 

                displayData.map(function(day,i) {
                    var hasColors = true;
                    var colorsAtTime = getDisplayedColors(day.times, that.state.selectedTime);

                    if(colorsAtTime.length == 0) {
                        hasColors = false;
                        colorsAtTime = ['rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)','rgb(255, 0, 0),rgb(255, 0, 0)'];
                    }

                    var date = splitDate(day.day);

                    if (day.times.length > 0) {
                        var fullDayData = displayFullDayData(day);
                        var fullDayNodes = displayFullDayNodes(fullDayData);
                    } else {
                        var fullDayNodes = (
                            <span>
                            <div className='no-data-screen'>
                            </div>
                            <div className='no-data'>
                                <p>No Data</p>
                            </div>
                            </span>
                        )
                    }

                    return (
                        <DayTile
                            key={ 'tile-' + i }
                            day={ date.day }
                            month={ date.month }
                            year={ date.year }
                        >
                            { fullDayNodes }
                        </DayTile>
                    )
                })

        );
        return ( 
            <div className={ containerClasses }>
                { tileNodes }
            </div>
        );
    }
}

