// HTML element variables
const currentDayEl = document.getElementById("currentDay");

// Global Day object
let currentDay = {
    day: dayjs().format("dddd"),
    dayNum: Number(dayjs().format("D")),
    month: dayjs().format("MMMM"),
    monthNum: Number(dayjs().format("M")),
    year: Number(dayjs().format("YYYY")),
    hours: Number(dayjs().format("H")),
    minutes: Number(dayjs().format("m")),
    seconds: Number(dayjs().format("s")),
}

let workDay = {
    start: 9,
    end: 18,
}

let checks = {
    day: 0,
    hours: 0,
}

let eventsObj = []

createTimeSlots();

// Timed function to update date & time every second
setInterval(() => {

    // Update currentDay object
    currentDay = {
        day: dayjs().format("dddd"),
        dayNum: Number(dayjs().format("D")),
        month: dayjs().format("MMMM"),
        monthNum: dayjs().format("M"),
        year: Number(dayjs().format("YYYY")),
        hours: Number(dayjs().format("H")),
        minutes: Number(dayjs().format("m")),
        seconds: Number(dayjs().format("s")),
    }

    // only update the DOM if the day is changed
    if (checks.day !== currentDay.dayNum) {

        // Update sup tag
        ordinalTag();

        // Render date and sup tag  
        $(currentDayEl).text(`${currentDay.day}, ${currentDay.month} ${currentDay.dayNum}`).append($('<sup>').text(sup));

    };

    // refresh DOM (rows) every hour
    if (checks.hours !== currentDay.hours) {

        // Update rows
        createTimeSlots();

    }

    checks = {
        day: currentDay.dayNum,
        hours: currentDay.hours,
    }

}, 1000);

// Create ordinal sup tag
function ordinalTag() {

    switch (Number(currentDay.dayNum)) {
        case (1):
        case (21):
        case (31):
            sup = "st";
            break;
        case (2):
        case (22):
            sup = "nd";
            break;
        case (3):
        case (23):
            sup = "rd";
            break;
        default:
            sup = "th";
            break;
    }

}

// Create and Render Time Slots for the current work day
function createTimeSlots() {

    const agendaContainer = document.querySelector(".container");
    // clear the container everytime the function runs
    $(agendaContainer).empty();

    for (let i = workDay.start; i <= workDay.end; i++) {

        let row = $('<div>').addClass('row');

        // convert i value to AM/PM time and add label to the timeblock div-- eg: convert 9 to 9AM
        let date = new Date(currentDay.year, currentDay.monthNum, currentDay.dayNum, i)
        let timeBlockLabel = dayjs(date).format('h A');
        let timeBlock = $('<div>').addClass('time-block').text(timeBlockLabel);

        // create description div and style accordingly
        let description = $('<input>').addClass('description');

        if (currentDay.hours < i) {
            description.addClass('future');
        } else if (currentDay.hours == i) {
            description.addClass('present');
        } else {
            description.addClass('past');
        }

        // create saveBtn
        let saveBtn = $('<div>').addClass('saveBtn');
        let saveIcon = $('<i>').addClass('far fa-save');

        saveBtn.append(saveIcon);

        saveIcon.on('click', (e) => {

            // Return if input field is blank
            if (description.val()) {

                eventsObj.push(
                    {
                        hour: $(e.target).parent().siblings('.time-block').text(),
                        event: $(e.target).parent().siblings('.description').val()
                    }
                )
                saveEvent(eventsObj);

            } else {
                return;
            }
        });

        // append all the elements inside row, and append row inside container
        $(agendaContainer)
            .append(row);

        $(row)
            .append(timeBlock)
            .append(description)
            .append(saveBtn);
    }
}