var schedule = {
  Sunday: {
    day: 'Sunday',
    todo: []
  },
  Monday: {
    day: 'Monday',
    todo: []
  },
  Tuesday: {
    day: 'Tuesday',
    todo: []
  },
  Wednesday: {
    day: 'Wednesday',
    todo: []
  },
  Thursday: {
    day: 'Thursday',
    todo: []
  },
  Friday: {
    day: 'Friday',
    todo: []
  },
  Saturday: {
    day: 'Saturday',
    todo: []
  }
};



var days = document.querySelector('.days');
var modal = document.querySelector('.modal');
var addEntryBtn = document.querySelector('.add-entry');



var form = document.querySelector('form');

days.addEventListener('click', selectedDay);
addEntryBtn.addEventListener('click', showModal);
form.addEventListener('submit', setSchedule);


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


    tdTime.textContent = savedSchedule[i].time;
    tdDesc.textContent = savedSchedule[i].description;
    tr.append(tdTime, tdDesc);
    tbody.appendChild(tr);
  }
}



function showModal() {
  modal.className = "modal";
}


function setSchedule(event) {
  event.preventDefault();

  var scheduleDay = document.querySelector('#day');
  var scheduleTime = document.querySelector('#time');
  var textarea = document.querySelector('textarea');

  var dayNum = scheduleDay.selectedIndex;
  var timeNum = scheduleTime.selectedIndex;

  var willScheduleDay = scheduleDay.options[dayNum].textContent;
  var willScheduleTime = scheduleTime.options[timeNum].textContent;
  var description = textarea.textContent;


  var newTodo = {};
  newTodo.time = willScheduleTime;
  newTodo.description = description;
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
