const bodyElement = document.getElementsByTagName("body")[0];

const divElement = document.createElement("div");
const h1Element = document.createElement("h1");
const inputElement = document.createElement("input");

divElement.classList.add("centerCounter");
h1Element.setAttribute("id", "time");
inputElement.setAttribute("type", "date");

bodyElement.appendChild(divElement);

divElement.appendChild(h1Element);
divElement.appendChild(inputElement);

let currentDate = new Date();
let programDate = new Date("11/24/2024");

let difference = programDate - currentDate;
let interval;

function counter() {
  let remainingSeconds = Math.trunc(difference / 1000) - 7204;

  let seconds = Math.trunc(remainingSeconds % 60);
  let minutes = Math.trunc((remainingSeconds / 60) % 60);
  let hours = Math.trunc((remainingSeconds / 3600) % 24);
  let days = Math.trunc((remainingSeconds / 86400) % 30);
  let months = Math.trunc(remainingSeconds / 2592000);
  let years = Math.trunc(remainingSeconds / 31536000);

  let timeText = "";

  if (years > 0) { timeText += years + " year(s), "; }
  if (months > 0) { timeText += months + " month(s), "; }
  if (days > 0) { timeText += days + " day(s), "; }
  if (hours > 0) { timeText += hours + " hour(s), "; }
  if (minutes > 0) { timeText += minutes + " minute(s), "; }
  if (seconds > 0) { timeText += seconds + " second(s)"; }

  if (months === 1 || months > 1) {
      h1Element.classList.remove("orangeColor", "redColor");
      h1Element.classList.add("greenColor");
  } else if (days >= 7) {
      h1Element.classList.remove("greenColor", "redColor");
      h1Element.classList.add("orangeColor");
  } else if (days < 7) {
      h1Element.classList.remove("greenColor", "orangeColor");
      h1Element.classList.add("redColor");
  }

    h1Element.innerText = timeText;

  if (difference <= 0) {
      clearInterval(interval);
      h1Element.classList.remove("greenColor", "orangeColor", "redColor");
      h1Element.innerText = "🎉🎈 Happy Birthday!!!!! 🎉🎈";
  }

  difference -= 1000;
}

interval = setInterval(counter, 1000);

let selectedDate;

inputElement.addEventListener("change", () => {
    selectedDate = new Date(inputElement.value);

    if (selectedDate < currentDate) {
        alert("You cannot select a date earlier than the current date.");
        selectedDate = programDate;
    }

    difference = selectedDate - currentDate;
});

counter();
