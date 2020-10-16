var days = document.querySelector('.days');
var h2 = document.querySelector('h2');
var selectedDay = '';

days.addEventListener('click', function (event) {
  if (event.target===days){
    return
  } else {
    selectedDay = event.target.textContent;
    h2.textContent = 'Scheduled Events for ' + selectedDay;
  }
});
