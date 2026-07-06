export function startOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    var daycalno = 0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (Number(currday) === 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 7) + 1;
    }

    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (Number(currday) === 6) {
            currday = -1;
        }

        daycalno = (7 - currday - 7) - 1
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 3) {
        if (currday < 3) {
            // If today is Sunday (6), Monday (1), or Tuesday (2), go to the previous Wednesday
            daycalno = - (currday + (7 - 3));
        } else {
            // If today is Wednesday or after, find the last Wednesday
            daycalno = 3 - currday;
        }
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 2) {
        if (currday < 2) {
            // Sunday or Monday -> go to previous Tuesday
            daycalno = -(currday + (7 - 2));
        } else {
            // Tuesday or later -> find the last Tuesday
            daycalno = 2 - currday;
        }
    }

    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}

export function getDayBeforeToday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0]; // YYYY-MM-DD format
}
/*export function startOfWeek() {
    const curr = new Date();
    const currday = curr.getDay(); // Get current day (0 = Sunday, 6 = Saturday)
    const loanStartDate = Number(process.env.REACT_APP_LOAN_APP_STARTDATE);

    let dayOffset = 0;

    if (loanStartDate === 0) {
        // If start day is Monday (0), move to the previous Monday
        dayOffset = currday === 0 ? -6 : 1 - currday;
    } else if (loanStartDate === 6) {
        // If start day is Saturday (6), move to the previous Saturday
        dayOffset = currday === 6 ? 0 : -currday - 1;
    }
    else if (loanStartDate === 3) {

        dayOffset = currday === 6 ? 0 : 3 - currday;
    }

    // Calculate the start date
    const start = new Date(curr);
    start.setDate(curr.getDate() + dayOffset);

    // Format date as YYYY-MM-DD
    return start.toISOString().split("T")[0];
}*/

export function endOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    var daycalno = 0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (Number(currday) === 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 7) + 6;
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (Number(currday) === 6) {
            currday = -1;
        }
        daycalno = (7 - currday - 7) + 4;
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 3) {
        if (Number(currday) === 6) {
            currday = 7;
        }
        daycalno = (8 - currday) % 7;
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 2) {
        const endDay = 0; // Sunday
        daycalno = (endDay - currday + 7) % 7;
        if (currday === 1) {
            // Monday -> yesterday (previous Sunday)
            daycalno = -1;
        } else {
            // Tuesday to Sunday -> upcoming/current Sunday
            daycalno = (0 - currday + 7) % 7;
        }

    }
    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}
export function notRunningOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    var daycalno = 0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (Number(currday) === 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 8 - 7 - 7 - 7);
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (Number(currday) === 6) {
            currday = -1;
        }
        daycalno = (7 - currday - 10 - 7 - 7 - 7);
    }



    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}
export function dateFormat(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datesformat;
}
export function dateFormatdd(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).split("/").join("-");
    return datesformat;
}
export function dateFormatddmmyyyy(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").join("-");
    return datesformat;
}
export function dateFormatoneweek(datevalue) {
    var curr = new Date(datevalue);

    var start = new Date(new Date(curr).setDate(curr.getDate() + 7));

    /*const datesformat=new Date(start).toLocaleDateString('en-GB',{
        year:'2-digit',
        month:'2-digit',
        day:'2-digit',
    }).split("/").join("-");*/
    return start;
}
export const getPreviousMonday = (currentDate) => {

    const previousMonday = new Date(currentDate);
    previousMonday.setDate(previousMonday.getDate() - 7); // Subtract 7 days
    return previousMonday.toISOString().split("T")[0];

};
