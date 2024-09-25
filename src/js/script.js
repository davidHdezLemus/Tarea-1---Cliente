const bodyElement = document.getElementsByTagName("body")[0];
const timeElement = document.getElementById("time");
const divElement = document.createElement("div");
const inputElement = document.createElement("input");

inputElement.setAttribute("type", "date");
bodyElement.appendChild(divElement);
divElement.appendChild(inputElement);

let currentDate = new Date();
let predefinedDate = new Date("11/24/2024");

let difference = predefinedDate.getTime() - currentDate.getTime();
let interval;

function calculateRemainingTime() {
  let remainingSeconds = Math.floor(difference / 1000) - 7204;

  let seconds = Math.floor(remainingSeconds % 60);
  let minutes = Math.floor((remainingSeconds / 60) % 60);
  let hours = Math.floor((remainingSeconds / 3600) % 24);
  let days = Math.floor((remainingSeconds / 86400) % 30);
  let months = Math.floor(remainingSeconds / 2592000);
  let years = Math.floor(remainingSeconds / 31536000);

  let remainingTimeText = "";

  if (years > 0) { remainingTimeText += years + " year(s), "; }
  if (months > 0) { remainingTimeText += months + " month(s), "; }
  if (days > 0) { remainingTimeText += days + " day(s), "; }
  if (hours > 0) { remainingTimeText += hours + " hour(s), "; }
  if (minutes > 0) { remainingTimeText += minutes + " minute(s), "; }
  if (seconds > 0) { remainingTimeText += seconds + " second(s)"; }

  if (months === 1 || months > 1) {
      timeElement.classList.remove("orangeColor", "redColor");
      timeElement.classList.add("greenColor");
  } else if (days >= 7) {
      timeElement.classList.remove("greenColor", "redColor");
      timeElement.classList.add("orangeColor");
  } else if (days < 7) {
      timeElement.classList.remove("greenColor", "orangeColor");
      timeElement.classList.add("redColor");
  }

  timeElement.innerText = remainingTimeText;

  if (difference <= 0) {
      clearInterval(interval);
      timeElement.classList.remove("greenColor", "orangeColor", "redColor");
      timeElement.innerText = "🎉🎈 Happy Birthday!!!!! 🎉🎈";
  }

  difference -= 1000;
}

calculateRemainingTime();
interval = setInterval(calculateRemainingTime, 1000);

inputElement.valueAsDate = predefinedDate;
inputElement.addEventListener("change", () => {
    let selectedDate = new Date(inputElement.value);

    if (isNaN(selectedDate.getTime())) {
        alert("The date format is not valid. Please try again.");
        inputElement.valueAsDate = predefinedDate;
        selectedDate = predefinedDate;
    } else if (selectedDate < currentDate) {
        alert("The selected date cannot be earlier than the current date.");
        inputElement.valueAsDate = predefinedDate;
        selectedDate = predefinedDate;
    }

    difference = selectedDate.getTime() - currentDate.getTime();
});

calculateRemainingTime();
