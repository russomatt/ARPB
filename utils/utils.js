import React from 'react';

export var timeArray = ['00:00', '00:10', '00:20', '00:30','00:40', '00:50',
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

// return the day's colors at the selected time
export function getDisplayedColors(data, time){
	for (var i = 0; i < data.length; i++ ) {
		if(data[i].time == time) {
			return data[i].colors;
		} 
	}
	return [];
}

export function displayFullDayData(day) {

	var dataLen = day.times.length;
	var startIdx = 0;
	var endIdx = dataLen - 1;

	var startTime = day.times[startIdx].time
	var endTime = day.times[endIdx].time

	var startTimeIdx = timeArray.indexOf(startTime);
	var endTimeIdx = timeArray.indexOf(endTime);
	var diff =  (startTimeIdx - endTimeIdx) * -1;
	var timeLength = timeArray.length;

	// make sure there are no gaps in the time
	if(endIdx == diff) {
		var startChunk = startTimeIdx / timeLength;
		var endChunk = (144 - endTimeIdx) / timeLength;
		var colorChunk =  100 - ((startChunk + endChunk)*100);
		var startPercent = (startChunk * 100)+ '%';
		var endPercent = (endChunk * 100) + '%';
		var colorPercent = colorChunk + '%';
		var colors = getCombinedColors(day.times);

		return [{ percent : startPercent, missingData : true},
				{ percent : colorPercent, missingData : false, colors: colors },
				{ percent : endPercent, missingData : true}];
	} else {
		// no gaps, return whole chunk'
		var colors = getCombinedColors(day.times);

		return [{ percent : '100%', missingData : false, colors: colors }]
	}

	// TODO: add case for tiles with gaps within the chunks
}

export function displayFullDayNodes(fullDayData) {
	var prevPercent = 0;
	var chunkLen = fullDayData.length - 1;
	var nodes = fullDayData.map(function(chunk, i) {
			if(chunk.missingData) {
				var styles = chunkLen == i ? 
								{bottom: 0,
								height: chunk.percent} :
								{top: prevPercent,
								height: chunk.percent};
				prevPercent = chunk.percent;

                return (
                    <div className="tile-chunk empty-chunk" key={'key-' + i} style={ styles }>
                    </div>
                );
			} else {
				var styles = chunkLen == i ? 
								{bottom: 0,
								height: chunk.percent} :
								{top: prevPercent,
								height: chunk.percent};
				prevPercent = chunk.percent;

				var gradient1 = 'linear-gradient('+chunk.colors[0]+')';
				var gradient2 = 'linear-gradient('+chunk.colors[1]+')';
				var gradient3 = 'linear-gradient('+chunk.colors[2]+')';
				var gradient4 = 'linear-gradient('+chunk.colors[3]+')';

                return (
                    <div className="tile-chunk" key={'key-' + i} style={ styles }>
                    	<div className="tile-gradient" style={{ background : gradient1 }}>
                    	</div>
                    	<div className="tile-gradient" style={{ background : gradient2 }}>
                    	</div>
                    	<div className="tile-gradient" style={{ background : gradient3 }}>
                    	</div>
                    	<div className="tile-gradient" style={{ background : gradient4 }}>
                    	</div>
                    </div>
                );
			}
	});

	return nodes;
}

export function getCombinedColors(timesArr) {
	var colorsArr = [];

	for (var i = 0; i < timesArr.length; i++) {
			var x1 = timesArr[i].colors[0];
			var x2 = timesArr[i].colors[1];
			var x3 = timesArr[i].colors[2];
			var x4 = timesArr[i].colors[3];

			if(i > 0) {
				colorsArr[0] = colorsArr[0] + ', ' + x1;
				colorsArr[1] = colorsArr[1] + ', ' + x2;
				colorsArr[2] = colorsArr[2] + ', ' + x3;
				colorsArr[3] = colorsArr[3] + ', ' + x4;
			} else {
				colorsArr[0] = x1;
				colorsArr[1] = x2;
				colorsArr[2] = x3;
				colorsArr[3] = x4;
			}
	}

	return colorsArr;
}


export function getSelectedDay(data, day) {
	var selectedDateIdx = -1;
	for (var i = 0; i < data.length; i++ ) {
	var dateObj = splitDate(data[i].day)
		if( dateObj.day == day ) {
			selectedDateIdx = i;
		}
	}
	return data[selectedDateIdx];
}


// take date in form of dd.mm.yy and split it into a date object
export function splitDate(date){

	var dateArr = date.split('.');
	var dateObj = { "day" : dateArr[0], "month" : dateArr[1], "year" : dateArr[2] };

	return dateObj;
}

export function getTimeFromPercent(percent){
	var timeIdx = Math.floor(percent * 144);
	var time = timeArray[timeIdx];

	return time;
}
