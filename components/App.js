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
        };
    }
    updateDay(day) {
        this.setState({selectedDay : day});
        console.log(this.state)
    }
    render() {
        var that = this;

        function updateSelected(day) {
            that.updateDay(day);
        }

        // console.log(this.state);
        return (
            <div>
                <ControlBox
                    data={ this.state }
                    update={ updateSelected }
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

