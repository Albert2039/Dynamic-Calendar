const currentDate = document.querySelector('.current-date'),
    daysTag = document.querySelector('.days'),
    prevNextIcons = document.querySelectorAll('.icons span');

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalendar = () => {
    let today = date.getDate(),
        this_Month = date.getMonth(),
        this_Year = date.getFullYear(),
        firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),  //finding the day of the 1st date
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),   //getting last day of this month
        firstDayOfNextMonth = new Date(currYear, currMonth + 1, 1).getDay(), //find the day of the 1st of next month
        lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = '';

    //add leftoverday from last month
    for (let i = 0; i < firstDayOfMonth; i++) {
        n = lastDateOfPrevMonth - (firstDayOfMonth - i - 1);
        liTag += `<li class='inactive'>${n}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        if (i === today && currMonth === this_Month && currYear === this_Year) {
            liTag += `<li class='active'>${i}</li>`;
        }
        else {
            liTag += `<li>${i}</li>`;
        }
    }

    //add next date of next month
    for (let i = 0; i < 7 - firstDayOfNextMonth; i++) {
        liTag += `<li class='inactive'>${i + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear} `;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0) {
            let temp_date;
            temp_date = new Date(currYear - 1, 11, 31);
            currYear = temp_date.getFullYear();
            currMonth = temp_date.getMonth();
        }
        else if (currMonth > 11) {
            let temp_date;
            temp_date = new Date(currYear + 1, 0, 1);
            currYear = temp_date.getFullYear();
            currMonth = temp_date.getMonth();
        }

        renderCalendar();
    });
});

