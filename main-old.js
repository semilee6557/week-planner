var schedule = [];
// var schedule2 = {
//   monday: [],
//   tuesday: [],
//   wednesday: [],
//   thursday: [],
//   friday: [],
//   saturday: [],
//   sunday: [],
//   currentDaySelected: 'monday'
// }

// var todo = {}

// schedule2[schedule2.currentDaySelected].push(todo)

var days = document.querySelector('.days');
var modal = document.querySelector('.modal');
var addEntryBtn = document.querySelector('.add-entry');
var form = document.querySelector('form');
var scheduleTable = document.querySelector('.schedule-table');
var scheduleDay = document.querySelector('#day');
var scheduleTime = document.querySelector('#time');
var textarea = document.querySelector('textarea');
var modalHeading = document.querySelector('.modal-heading');
var headingDay = document.querySelector('span');


days.addEventListener('click', selectedDay);
addEntryBtn.addEventListener('click', showModal);
form.addEventListener('submit', setSchedule);
scheduleTable.addEventListener('click', changeSchedule);
window.addEventListener('keyup', closeModal);
textarea.addEventListener('click', clearTextarea);


function selectedDay() {
  if (event.target.className === days.className) {
    return;
  } else {
    var selectedText = event.target.textContent;

    showContent(selectedText);
  }
}

function findTodoListIdOnDay(day) {
  // debugger;
  var todoListIdOnDay = [];
  for (var n = 0; n < schedule.length; n++) {
    if (schedule[n].currentDay === day) {
      todoListIdOnDay.push(schedule[n].id);
    }
  }
  return todoListIdOnDay;
}

function findObjectIndexWithId(num) {

  for (var n = 0; n < schedule.length; n++) {
    if (schedule[n].id == num) {
      return n;
    }
  }
}


function showContent(day) {

  var todoListIdOnDay = findTodoListIdOnDay(day);
  var objArray = [];
  for (var a = 0; a < schedule.length; a++) {
    for (var n = 0; n < todoListIdOnDay.length; n++) {
      if (schedule[a].id === todoListIdOnDay[n]) {
        console.log(schedule[a]);
        objArray.push(schedule[a]);
      }
    }
  }
  console.log('objArray', objArray);
  headingDay.textContent = day;
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = "";

  for (var i = 0; i < objArray.length; i++) {

    var tr = document.createElement('tr');
    var tdTime = document.createElement('td');
    var tdDesc = document.createElement('td');
    var updateBtn = document.createElement('button');
    updateBtn.className = "update";
    updateBtn.textContent = "Update";

    tr.className = objArray[i].id;
    tdTime.textContent = objArray[i].todo.time;
    tdTime.className = "time";
    tdDesc.textContent = objArray[i].todo.description;
    tdDesc.className = "description";
    tdDesc.appendChild(updateBtn);
    tr.append(tdTime, tdDesc);
    tbody.appendChild(tr);
  }
}


function clearTextarea() {
  if (textarea.value === "Description") {
    textarea.value = "";
  }
}

function showModal() {
  modal.className = "modal";
}

function closeModal(event) {
  if (event.key === 'Escape') {
    if (modal.className === "modal") {
      scheduleDay.selectedIndex = 0;
      scheduleTime.selectedIndex = 0;
      textarea.value = "Description";
      modal.className += " hidden";
    }
  }
}

function setSchedule(event) {
  event.preventDefault();
debugger;

  var dayNum = scheduleDay.selectedIndex;
  var timeNum = scheduleTime.selectedIndex;

  var willScheduleDay = scheduleDay.options[dayNum].textContent;
  var willScheduleTime = scheduleTime.options[timeNum].textContent;
  var willScheduledesc = textarea.value;

  if (willScheduleDay === 'Day' || willScheduleTime === 'Time') {
    return;
  }

    var newObject = {};
    var newTodo = {};

    newTodo.time = willScheduleTime;
    newTodo.description = willScheduledesc;

    newObject.currentDay = willScheduleDay;
    newObject.id = schedule.length + 1;

    newObject.todo = newTodo;

    schedule.push(newObject);



    modal.className += " hidden";
    scheduleDay.selectedIndex = 0;
    scheduleTime.selectedIndex = 0;
    textarea.value = "Description";
    showContent(willScheduleDay);
}

function changeSchedule(event) {
  if (event.target.className.indexOf('update') === -1) {
    return;
  } else {
    modal.className = 'modal';
    modalHeading.textContent = "Update Entry";

    var id = parseFloat(event.target.parentElement.parentElement.className);
    console.log('id', id);
    var todoIndex = findObjectIndexWithId(id);
    var currentObject = schedule[todoIndex];
    var dayTochange = schedule[todoIndex].currentDay;

    var timeTochange = currentObject.todo.time;
    var descTochange = currentObject.todo.description;

    var dayOption = document.querySelectorAll('.day-option');
    var timeOption = document.querySelectorAll('.time-option');

    var dayOptionList = [];

    for (var i = 0; i < dayOption.length; i++) {
      dayOptionList.push(dayOption[i].textContent);
    }


    for (var n = 0; n < dayOptionList.length; n++) {
      if (dayOptionList[n] === dayTochange) {
        var dayOptionIndex = n;
      }
    }
    dayOption[dayOptionIndex].selected = 'true';

    var timeOptionList = [];

    for (var c = 0; c < timeOption.length; c++) {
      timeOptionList.push(timeOption[c].textContent);
    }

    for (var t = 0; t < timeOptionList.length; t++) {
      if (timeOptionList[t] === timeTochange) {
        var timeIndexOnSelete = t;
      }
    }


    timeOption[timeIndexOnSelete].selected = 'true';

    textarea.value = descTochange;


    form.removeEventListener('submit', setSchedule);
    form.addEventListener('submit', function () {
      updateDataObject(id);
    });


  }
}

function updateDataObject(idNum) {
  event.preventDefault();


  var dayNum = scheduleDay.selectedIndex;
  var timeNum = scheduleTime.selectedIndex;

  var willScheduleDay = scheduleDay.options[dayNum].textContent;
  var willScheduleTime = scheduleTime.options[timeNum].textContent;
  var willScheduledesc = textarea.value;

  if (willScheduleDay === 'Day' || willScheduleTime === 'Time') {
    return;
  } else {

    var indexOfObject = findObjectIndexWithId(idNum);
    schedule[indexOfObject].todo.time = willScheduleTime;
    schedule[indexOfObject].currentDay = willScheduleDay;
    schedule[indexOfObject].todo.description = willScheduledesc;

    modal.className += " hidden";
    modalHeading.textContent = "Add Entry";
    form.removeEventListener('submit', function () {
      updateDataObject();
    });
    form.addEventListener('submit', setSchedule);

    scheduleDay.selectedIndex = 0;
    scheduleTime.selectedIndex = 0;
    textarea.value = "Description";
    showContent(willScheduleDay);

  }

}
