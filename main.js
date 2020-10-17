// class weekSchedule {
//   constructor{
// this.day = {}
//   }
// }

var schedule = {
  Sunday: {
    day: 'Sunday',
    isSelected: false,
    todo: {
    }
  },
  Monday: {
    day: 'Monday',
    isSelected: false,
    todo: {
    }


  },
  Tuesday: {
    day: 'Tuesday',
    isSelected: false,
    todo: {
    }


  },
  Wednesday: {
    day: 'Wednesday',
    isSelected: false,
    todo: {
    }


  },
  Thursday: {
    day: 'Thursday',
    isSelected: false,
    todo: {
    }


  },
  Friday: {
    day: 'Friday',
    isSelected: false,
    todo: {
    }


  },
  Saturday: {
    day: 'Saturday',
    isSelected: false,
    todo: {
    }


  }
};



var days = document.querySelector('.days');
var modal = document.querySelector('.modal');
var addEntryBtn = document.querySelector('.add-entry');
var form = document.querySelector('form');


var scheduleDay = document.querySelector('#day');
var scheduleTime = document.querySelector('#time');
var textarea = document.querySelector('textarea');


days.addEventListener('click', selectedDay);
addEntryBtn.addEventListener('click', showModal);
form.addEventListener('change', setSchedule);


function selectedDay() {
  if (event.target.className === days.className) {
    return;
  } else {
    var selectedText = event.target.textContent;
    var h2 = document.querySelector('h2');

    h2.textContent = 'Scheduled Events for ' + selectedText;

      var td = document.querySelectorAll('td');


  td[0].textContent = schedule[selectedText].todo.time;
  td[1].textContent = schedule[selectedText].todo.description;

  }
}

function showModal() {
  modal.className = "modal";
}

function setSchedule() {

  var dayNum = scheduleDay.selectedIndex;
  var timeNum = scheduleTime.selectedIndex;
  var willScheduleDay = scheduleDay.options[dayNum].textContent;
  var willScheduleTime = scheduleTime.options[timeNum].textContent;
  var description = textarea.textContent;

  schedule[willScheduleDay].todo.time = willScheduleTime;
  schedule[willScheduleDay].todo.description = description;
  var submit = document.querySelector('#submit');

submit.addEventListener('click', update);

}

function update() {
  modal.className += " hidden";

}
