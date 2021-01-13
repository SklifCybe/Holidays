'use strict';

const container = document.querySelector('#container');
const btnSubmit = document.querySelector('#btnSubmit');
const fieldOfText = document.querySelector('#fieldOfText');

function clearFiled() {
    fieldOfText.value = '';
}

function getYear() {
    return (+fieldOfText.value == 0) ? 2021 : +fieldOfText.value;
}

function checkYear(holidays) {
    let year = getYear();
    if (Number.isNaN(year)) {
        alert('Ошибка. Попробуйте ещё раз!');
    }
    if (year < 1900 || year > 6000) {
        alert('Ошибка. Введите год в диапазоне от 1900 до 6000');
    }
    if (document.querySelector('#answer')) {
        changeAnswer(holidays);
    }
    else {
        createAnswer(holidays);
    }
}

function checkWeekend(date) {
    return (date.getDay() === 6 || date.getDay() === 0);
}

// Кол-во праздничных выходных в году, за исключением субботы и воскресенья
function countHollidaysInYear(holidays) {
    let count = 0;
    for (let i = 0; i < holidays.length; i++) {
        if (!checkWeekend(holidays[i])) {
            count++;
        }
    }
    return count;
}

function createAnswer(holidays) {
    let answer = document.createElement('div');
    answer.id = 'answer';
    answer.innerHTML = 'Ответ: ' + countHollidaysInYear(holidays) + ` для ${holidays[0].getFullYear()} г.`;
    container.appendChild(answer);
}

function changeAnswer(holidays) {
    let answer = document.querySelector('#answer');
    answer.innerHTML = 'Ответ: ' + countHollidaysInYear(holidays) + ` для ${holidays[0].getFullYear()} г.`;
}

function getRadonitsa(year) {
    let a = (19 * (year % 19) + 15) % 30;
    let b = ((2 * (year % 4) + 4 * (year % 7) + 6 * a + 6) % 7);
    let p = 0;
    if (a + b > 10)
        p = new Date(year, 3, a + b - 9, 0, 0, 0, 0);
    else
        p = new Date(year, 2, 22 + a + b, 0, 0, 0, 0);
    p.setDate(p.getDate() + 22);
    return p;
}

function changeRadonitsaDay() {
    let radonitsa = document.querySelector('#radonitsa');
    let day = getRadonitsa(getYear()).getDate();
    let month = getRadonitsa(getYear()).getMonth();
    let nameMonth = 0;
    if (month == 3) nameMonth = 'Апреля'
    else nameMonth = 'Мая';

    radonitsa.innerHTML = `${day} ${nameMonth}. `;
}

function backLight(holidays) {
    let holidaysHtml = document.querySelectorAll('.listHolidays');
    let clearBackground = function () {
        for (let i = 0; i < holidays.length; i++) {
            holidaysHtml[i].style.backgroundColor = 'white';
        }
    }();
    for (let i = 0; i < holidays.length; i++) {
        if (!checkWeekend(holidays[i])) {
            holidaysHtml[i].style.backgroundColor = 'green';
        }
    }
}

function getHolidays() {
    const holidays = [
        new Date(getYear(), 0, 1),          // 1 января. Новый год
        new Date(getYear(), 0, 7),          // 7 января. Православное рождество
        new Date(getYear(), 2, 8),          // 8 марта. День женщин
        new Date(getYear(), 4, 1),          // 1 мая. Праздник труда 
        new Date(getYear(), 4, 9),          // 9 мая. День победы    
        getRadonitsa(getYear()),            // Радуница
        new Date(getYear(), 6, 3),          // 3 июля. День независимости РБ
        new Date(getYear(), 10, 7),         // 7 ноября. День октябрьской революции
        new Date(getYear(), 11, 25),        // 25 декабяр. Католическое рождество
    ];
    return holidays;
}

// Handlers
btnSubmit.onclick = start;
fieldOfText.onkeypress = (event) => {
    if (event.key === 'Enter') {
        start();
    }
};

function start() {
    let holidays = getHolidays();
    checkYear(holidays);
    backLight(holidays);
    changeRadonitsaDay();
}
