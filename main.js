var schedule = {
  Sunday: {
    todo: []
  },
  Monday: {
    todo: []
  },
  Tuesday: {
    todo: []
  },
  Wednesday: {
    todo: []
  },
  Thursday: {
    todo: []
  },
  Friday: {
    todo: []
  },
  Saturday: {
    todo: []
  }
};







var days = document.querySelector('.days');
var modal = document.querySelector('.modal');
var addEntryBtn = document.querySelector('.add-entry');
var form = document.querySelector('form');
var scheduleTable = document.querySelector('.schedule-table');
var scheduleDay = document.querySelector('#day');
var scheduleTime = document.querySelector('#time');
var textarea = document.querySelector('textarea');
    var modalHeading = document.querySelector('.modal-heading');



days.addEventListener('click', selectedDay);
addEntryBtn.addEventListener('click', showModal);
form.addEventListener('submit', setSchedule);
scheduleTable.addEventListener('click', changeSchedule);




function selectedDay() {
  if (event.target.className === days.className) {
    return;
  } else {
    var selectedText = event.target.textContent;

    showContent(selectedText);
  }
}

function showContent(para) {
  var h2 = document.querySelector('h2');

  h2.textContent = 'Scheduled Events for ' + para;

  var savedSchedule = schedule[para].todo;
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = "";

  for (var i = 0; i < savedSchedule.length; i++) {
    var tr = document.createElement('tr');
    var tdTime = document.createElement('td');
    var tdDesc = document.createElement('td');
    var updateBtn = document.createElement('button');
    var order = i + 1;
    updateBtn.className = "update " + order + " " + para + " " + savedSchedule[i].time;
    updateBtn.textContent = "Update";

    tdTime.textContent = savedSchedule[i].time;
    tdDesc.textContent = savedSchedule[i].description;
    tdDesc.appendChild(updateBtn);
    tr.append(tdTime, tdDesc);
    tbody.appendChild(tr);

  }
}



function showModal() {
  modal.className = "modal";
}



function setSchedule(event) {
  event.preventDefault();

  var dayNum = scheduleDay.selectedIndex;
  var timeNum = scheduleTime.selectedIndex;

  var willScheduleDay = scheduleDay.options[dayNum].textContent;
  var willScheduleTime = scheduleTime.options[timeNum].textContent;
  var desc = textarea.value;


  var newTodo = {};
  newTodo.time = willScheduleTime;
  newTodo.timeIndex = dayNum;
  newTodo.description = desc;
  schedule[willScheduleDay].todo.push(newTodo);


  if (willScheduleDay === 'Day' || willScheduleTime === 'Time') {
    return;
  } else {
    modal.className += " hidden";
    scheduleDay.selectedIndex = 0;
    scheduleTime.selectedIndex = 0;

    showContent(willScheduleDay);
  }
}

function changeSchedule(event) {
  event.preventDefault();
  if (event.target.className.indexOf('update') === -1) {
    return;
  } else {
    console.log(event.target);
    modal.className = 'modal';
    modalHeading.textContent = "Update Entry";

    var updateClassName = event.target.classList;
    var todoOrderNum = parseInt(updateClassName[1]);
    var dayTochange = updateClassName[2];
    var timeTochange = updateClassName[3];

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

    var timeOptionList = [];

    for (var c = 0; c < timeOption.length; c++) {
      timeOptionList.push(timeOption[c].textContent);
    }

    dayOption[dayOptionIndex].selected = 'true';

    var timeIndex = schedule[dayTochange].todo[todoOrderNum-1].timeIndex;
    timeOption[timeIndex].selected = 'true';

    textarea.textContent = schedule[dayTochange].todo[timeTochange];
 schedule[dayTochange].todo.splice(todoOrderNum-1, 1);


}
}
