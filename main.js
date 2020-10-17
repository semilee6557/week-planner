var days = document.querySelector('.days');
var h2 = document.querySelector('h2');

days.addEventListener('click', selectedDay);

function selectedDay() {
  if (event.target.className === days.className) {
    return;
  } else {
    var selectedText = event.target.textContent;
    h2.textContent = 'Scheduled Events for ' + selectedText;
  }
}

// days.addEventListener('click', function (event) {
//   if (event.target===days){
//     return
//   } else {
//     selectedDay = event.target.textContent;
//     h2.textContent = 'Scheduled Events for ' + selectedDay;
//   }
// });
