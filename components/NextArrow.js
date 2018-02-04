import ReactDOM from 'react-dom';
import React from 'react';
import { getMonthObj } from '../utils/utils.js';

export default class BackArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: this.props.selectedDay,
            selectedMonth: this.props.selectedMonth,
            selectedYear: this.props.selectedYear,
            displayMode: this.props.displayMode,
            data: this.props.data,
        };
    }
    componentDidMount() {
        var monthObj = getMonthObj(this.state.selectedMonth);

        if(parseFloat(this.state.selectedDay) >= monthObj.monthLen - 6) {
            this.setState({ disabled : true});
        } else {
            this.setState({ disabled : false});
        }
    }
    componentWillReceiveProps(nextProps) {
        var monthObj = getMonthObj(nextProps.selectedMonth);

        this.setState({ 
                selectedDay: nextProps.selectedDay,
                selectedMonth: nextProps.selectedMonth,
                selectedYear: nextProps.selectedYear,
                displayMode: nextProps.displayMode,
                data: nextProps.data,
            });


        if(parseFloat(nextProps.selectedDay) >= monthObj.monthLen - 6) {
            this.setState({ disabled : true});
        } else {
            this.setState({ disabled : false});
        }

    }

    render() {

        var that = this;
        function arrowClick(event) {
            var year = that.state.selectedYear;
            var month = that.state.selectedMonth;
            var day = parseFloat(that.state.selectedDay);
            var data = that.state.data.data;

            if (parseFloat(day) >= 1) {
 
                var newDay = day + 1 > 9 ? "" + (day + 1) : "0" + (day + 1);
                that.props.onArrowClick(newDay);

            }

        }
        return (
            <div className={ this.state.disabled ? "arrow next-arrow arrow-disabled" : "arrow next-arrow"}>
                <div className={ this.state.displayMode == "month" ? "hidden" : ""}>
                    <span className="lnr lnr-chevron-right shadow"/>
                    <span className="lnr lnr-chevron-right chevron" onClick={ this.state.disabled ? null : arrowClick }/>
                </div>
            </div>
        );
    }
}

