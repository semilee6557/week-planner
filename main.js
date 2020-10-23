var schedule = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
  currentDaySelected: 'monday',
  nextId: 1
};


var days = document.querySelector('.days');
var addEntryBtn = document.querySelector('.add-entry');
var modal = document.querySelector('.modal');
var textarea = document.querySelector('textarea');
var form = document.querySelector('form');
var heading = document.querySelector('.schedule-table-heading');
var scheduleTable = document.querySelector('.schedule-table');
var dayList = document.querySelector('#day');
var timeList = document.querySelector('#time');
var tbody = document.querySelector('tbody');
var modalHeading = document.querySelector('.modal-heading');



days.addEventListener('click', scheduleOnDay);
addEntryBtn.addEventListener('click', showModal);
form.addEventListener('submit', setSchedule);
scheduleTable.addEventListener('click', showUpdateModal);

function scheduleOnDay(event) {
  debugger;
  if (event.target.className === 'days') {
    return;
  }

  schedule.currentDaySelected = event.target.className;

  displaySchedule(event.target.className);
}




function setSchedule(event) {
  event.preventDefault();
  debugger;
  var selectedDay = dayList.options[dayList.selectedIndex].value;
  var selectedTime = timeList.options[timeList.selectedIndex].value;
  var descriptionInput = textarea.value;

  if (selectedDay === 'day' || selectedTime === 'time') {
    return;
  }

  var newTodo = {};
  var currentId = schedule.nextId;
  newTodo.time = selectedTime;
  newTodo.description = descriptionInput;
  newTodo.id = currentId;
  schedule[selectedDay].push(newTodo);
  schedule.nextId++;


  closeModal();
  displaySchedule(selectedDay);
}

function showModal() {
  debugger;
  modal.className = "modal";
  // textarea.addEventListener('click', clearTextarea);

}

// function clearTextarea() {
//   if(!textarea.value=='Description'){
//     return;
//   }
//   textarea.value = '';
// }

function closeModal() {
  debugger;
  modal.className += " hidden";
  modalHeading.textContent = "Add Entry";
  dayList.value = 'day';
  timeList.value = 'time';
  textarea.value = 'Description';

}



function displaySchedule(currentDay) {
debugger;
  var fistLetterToCapital = '';
  fistLetterToCapital += currentDay[0].toUpperCase();

  for (var p = 1; p < currentDay.length; p++) {
    fistLetterToCapital += currentDay[p];
  }

  heading.textContent = "Scheduled Events for " + fistLetterToCapital;
  heading.className = currentDay;
  tbody.innerHTML = "";

  for (var i = 0; i < schedule[currentDay].length; i++) {
    var tr = document.createElement('tr');
    var tdTime = document.createElement('td');
    var tdDesc = document.createElement('td');
    var updateBtn = document.createElement('button');
    updateBtn.className = "update";
    updateBtn.textContent = "Update";
    tdTime.textContent = schedule[currentDay][i].time;
    tdDesc.textContent = schedule[currentDay][i].description;
    tdDesc.appendChild(updateBtn);
    tr.append(tdTime, tdDesc);
    tr.className = i + 1;
    tbody.append(tr);
  }


}


function showUpdateModal(event) {
  if (!event.target.className) {
    return;
  }

  debugger;

  schedule.currentDaySelected = heading.className;
  var currentDay = schedule.currentDaySelected;


  var currentDayIndex = parseFloat(event.target.parentElement.parentElement.className) - 1;
  var currentTodo = schedule[currentDay][currentDayIndex];
  var currentId = currentTodo.id;
  modalHeading.textContent = "Update Entry";
  dayList.value = currentDay;
  timeList.value = currentTodo.time;
  textarea.value = currentTodo.description;

modal.className = "modal";
form.removeEventListener('submit', setSchedule);
form.addEventListener('submit', function(){changeSchedule(currentDay, currentDayIndex, currentId);});
}

function changeSchedule(currentDay, currentDayIndex, currentId){
debugger;
  event.preventDefault();
  var selectedDay = dayList.value;
  var selectedTime = timeList.value;
  var descriptionInput = textarea.value;

  if (selectedDay === 'day' || selectedTime === 'time') {
    return;
  }
  var newTodo = {};
  newTodo.time = selectedTime;
  newTodo.description = descriptionInput;
  newTodo.id = currentId;
  schedule[currentDay].splice(currentDayIndex,1);
  schedule[selectedDay].push(newTodo);

  closeModal();
  displaySchedule(selectedDay);
  form.removeEventListener('submit', function(){changeSchedule(currentDay, currentDayIndex, currentId);});
  form.addEventListener('submit', setSchedule);

}
