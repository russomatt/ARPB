import ReactDOM from 'react-dom';
import React from 'react';
import Tile from './Tile.js';
import { getSelectedYear } from '../utils/utils.js';
import { getSelectedMonth } from '../utils/utils.js';
import { getDisplayedDates } from '../utils/utils.js';
import { splitDate } from '../utils/utils.js';

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

         });  
    }
    render() {
        // console.log(this.state);
        // var containerClasses = 'tile-container ';
        // console.log(this.props.data.selectedDay)

        var containerClasses = 'tile-container ' + this.props.displayMode;
        var that = this;
        var days = that.state.data.data[0].data.months[0].data;
        // console.log(this.state.test);
        var SelectedYearData = getSelectedYear(that.state.data.data, this.state.selectedYear);
        var SelectedMonthData = getSelectedMonth(SelectedYearData, this.state.selectedMonth);
        var displayData = getDisplayedDates(SelectedMonthData, this.props.displayMode, this.state.selectedDay, this.state.selectedMonth, this.state.selectedYear);

        var tileNodes = displayData.map(function(day,i) {

            var colors = day.times[0].colors;
            var date = splitDate(day.day);
            var selectedTime = day.times[0].time;

            return (
                <Tile
                    key={ 'tile-' + i }
                    gradients={ colors }
                    day={ date.day }
                    month={ date.month }
                    year={ date.year }
                    selectedTime={ selectedTime }
                />
            )
        });
        return (
            <div className={ containerClasses }>
                { tileNodes }
            </div>
        );
    }
}

