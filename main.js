// class weekSchedule {
//   constructor{
// this.day = {}
//   }
// }

var schedule = {
  Sunday: {},
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {}
}


var days = document.querySelector('.days');
var h2 = document.querySelector('h2');
var selectedText = '';
var addEntryBtn = document.querySelector('.add-entry')
var modal = document.querySelector('.modal')
var scheduleDay = document.querySelector('#day')
var scheduleTime = document.querySelector('#time')
var dayOption = document.querySelectorAll('.day-option')
var form = document.querySelector('form')
var submit = document.querySelector('#submit')
var textarea = document.querySelector('textarea');
var dayNum = ''
var timeNum = ''
var willscheduleDay = ''
var selectedTime = ''
var tr = document.querySelectorAll('tr')
var td = document.querySelectorAll('td')

days.addEventListener('click', function () {
  selectedDay(event)
});
addEntryBtn.addEventListener('click', scheduleEvent);
form.addEventListener('change', selectedSchedule);
submit.addEventListener('click', update);

function selectedDay(event) {
  if (event.target === days) {
    return
  } else {
    selectedText = event.target.textContent;
    h2.textContent = 'Scheduled Events for ' + selectedText;
  }
}

function scheduleEvent() {
  modal.className = "modal"
  console.log(modal.className)
}




function selectedSchedule() {

  dayNum = scheduleDay.selectedIndex;
  timeNum = scheduleTime.selectedIndex;
  willscheduleDay = scheduleDay.options[dayNum].textContent;
  selectedTime = scheduleTime.options[timeNum].textContent;
  description = textarea.textContent
  console.log(willscheduleDay, selectedTime, description)
}


function update() {
  modal.className += " hidden"
  // schedule[willscheduleDay][selectedTime]=description;
  // console.log(willscheduleDay, selectedTime, description)
  // console.log(schedule[willscheduleDay])
td[0].textContent=selectedTime
td[1].textContent=description

}
