import ReactDOM from 'react-dom';
import React from 'react';
import { getSelectedYear } from '../utils/utils.js';
import { getSelectedMonth } from '../utils/utils.js';

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
        if(parseFloat(this.state.selectedDay) <= 1) {
            this.setState({ disabled : true});
        } else {
            this.setState({ disabled : false});
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ 
                selectedDay: nextProps.selectedDay,
                selectedMonth: nextProps.selectedMonth,
                selectedYear: nextProps.selectedYear,
                displayMode: nextProps.displayMode,
                data: nextProps.data,
            });

        if(parseFloat(nextProps.selectedDay) <= 1) {
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

            if (parseFloat(day) > 1) {

                var newDay = day - 1 > 9 ? "" + (day - 1) : "0" + (day - 1);
                that.props.onArrowClick(newDay);

            }

        }
        return (
            <div className={ this.state.disabled ? "arrow back-arrow arrow-disabled" : "arrow back-arrow"}>
                <div className={ this.state.displayMode == "month" ? "hidden" : ""}>
                    <span className="lnr lnr-chevron-left shadow"/>
                    <span className="lnr lnr-chevron-left chevron" onClick={ this.state.disabled ? null : arrowClick }/>
                </div>                
           </div>
        );
    }
}

