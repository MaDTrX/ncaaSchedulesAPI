const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'WednesDay',
    4: 'Thursday',
    5: 'Friday',
    6: 'Sunday'
}

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

const clock = {
    0: '12',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    13: '1',
    14: '2',
    15: '3',
    16: '4',
    17: '5',
    18: '6',
    19: '7',
    20: '8',
    21: '9',
    22: '10',
    23: '11',
    24: '12',
}


module.exports = {
    day, month, time
}

function day () {
    return days
}

function month () {
    return months
}
function time(militaryTime) {

    let splitTime = militaryTime[1].split(":")
    let AmPm = splitTime[0] < 12 ? 'am' : 'pm'
    return clock[splitTime[0]] + ':' + splitTime[1] + AmPm
    
}