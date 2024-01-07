// HTML element variables
const currentDayEl = document.getElementById("currentDay");

// Global Day object
let currentDay = {
    day: dayjs().format("dddd"),
    dayNum: Number(dayjs().format("D")),
    month: dayjs().format("MMMM"),
    monthNum: dayjs().format("M"),
    year: Number(dayjs().format("YYYY")),
    hours: Number(dayjs().format("H")),
    minutes: Number(dayjs().format("m")),
    seconds: Number(dayjs().format("s")),
}

let workDay = {
    start: 9,
    end: 18,
}

createTimeSlots();

// Timed function to update date & time every second
setInterval(() => {

    // Update currentDay object
    currentDay = {
        day: dayjs().format("dddd"),
        dayNum: Number(dayjs().format("D")),
        month: dayjs().format("MMMM"),
        year: Number(dayjs().format("YYYY")),
        hours: Number(dayjs().format("H")),
        minutes: Number(dayjs().format("m")),
        seconds: Number(dayjs().format("s")),
    }

    // Update sup tag
    ordinalTag();

    // Render date and sup tag  
    $(currentDayEl).text(`${currentDay.day}, ${currentDay.month} ${currentDay.dayNum}`).append($('<sup>').text(sup));

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
    for (let i = workDay.start; i <= workDay.end; i++) {

        const agendaContainer = document.querySelector(".container");
        let row = $('<div>').addClass('row');
        
        let date = new Date(currentDay.year, currentDay.monthNum, currentDay.dayNum, i)
        let timeBlockLabel = dayjs(date).format('h A');
        let timeBlock = $('<div>').addClass('time-block').text(timeBlockLabel);

        let description = $('<div>').addClass('description');
        let saveBtn = $('<div>').addClass('saveBtn');

        $(agendaContainer)
        .append(row);

        $(row)
        .append(timeBlock)
        .append(description)
        .append(saveBtn);

        $(saveBtn)
        .append($('<i>').addClass('far fa-save'));

    }
}