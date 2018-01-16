import React from 'react';

// return correct data for the select year, takes in data as an array of year objects,
// and the selected year
export function getSelectedYear(data, year){

	// find index of year
	for (var i = 0; i < data.length; i++) {

		if (data[i].year == year) {
			// return data at this year
			return data[i].data;
		}
	}

	// if function reaches this there is an issue
	// and the year doesnt exist and shouldn't be selectable
	throw 'Error: Selected year does not exist and should not be selectable';

}

// takes the years data as an object of months, containing an array of months 
// returns the array of days from the month
export function getSelectedMonth(data, month){
	// extract months
	var monthArr = data.months;
	// find index of month
	for (var i = 0; i < monthArr.length; i++) {

		if ( monthArr[i].month == month ) {
			// return array of days from month
			return monthArr[i].data;
		}
	}
	// if function reaches this there is an issue
	// and the year doesnt exist and shouldn't be selectable
	throw 'Error: Selected month does not exist and should not be selectable';
}

// takes in a display mode, month, week, day, as well as the data, 
// the array of days in the month, and the selected day, month, and year
export function getDisplayedDates(data, displayMode, day, month, year){
		// console.log(day);
		var dataLen = data.length;
		var monthNumber = -1;
		var monthArr = [{'month': 'january','monthNum': '01'},
							{'month': 'february','monthNum': '02'},
							{'month': 'march','monthNum': '03'},
							{'month': 'april','monthNum': '04'},
							{'month': 'may','monthNum': '05'},
							{'month': 'june','monthNum': '06'},
							{'month': 'july','monthNum': '07'},
							{'month': 'august','monthNum': '08'},
							{'month': 'september','monthNum': '09'},
							{'month': 'october','monthNum': '10'},
							{'month': 'november','monthNum': '11'},
							{'month': 'december','monthNum': '12'}
							];

		var monthObj = monthArr.find(function(singleMonth) {
			if(singleMonth.month == month) {
				return singleMonth.month;
			}
		})

		if(monthObj != undefined) {
			monthNumber = monthObj.monthNum;
		} else {
			throw 'Error: Trying to match an incorrect month';
		}

		var selectedDate = day + '.' + monthNumber + '.' + year;
		var selectedDateIdx = -1;

		for (var i = 0; i < dataLen; i++) {
			if( data[i].day == selectedDate ) {
				selectedDateIdx = i;
			}
		}

		if( displayMode == 'week') {

			if( selectedDateIdx + 7 <= dataLen ) {
				var endIdx = selectedDateIdx + 7;
				return  data.slice(selectedDateIdx, endIdx);

			} else if( selectedDateIdx + 7 > dataLen ) {
				var diff = dataLen - (selectedDateIdx + 7);
				var endIdx = 7 + diff;
				endIdx = endIdx + selectedDateIdx;
				var startIdx = selectedDateIdx + diff;

				if (startIdx >= 0) {
					return data.slice(startIdx, endIdx);
				}

			} else {
				// TODO: WIll this case ever be reached?
				throw 'figure out whats going on here';
			};
		} else if( displayMode == 'day') {
				return [data[selectedDateIdx]];
		} else {
			// return all data; 
			return
		}

}

// take date in form of dd.mm.yy and split it into a date object
export function splitDate(date){

	var dateArr = date.split('.');
	var dateObj = { "day" : dateArr[0], "month" : dateArr[1], "year" : dateArr[2] };

	return dateObj;
}

