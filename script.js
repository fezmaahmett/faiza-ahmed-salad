// --- Timers ---
const form = document.getElementById("timerForm");
const timersDiv = document.getElementById("timers");
const preset = document.getElementById("preset");
const alarm = document.getElementById("alarm");

// Array to track names of timers
let timerNames = [];

form.addEventListener("submit", addTimer);
preset.addEventListener("change", presetTimer);

function addTimer(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const minutes = parseInt(document.getElementById("minutes").value);

  if (title === "" || isNaN(minutes) || minutes <= 0) {
    alert("Please enter valid timer data");
    return;
  }

  // Hubi in title uu yahay cunto sax ah (letters iyo spaces kaliya)
  const foodRegex = /^[A-Za-z\s]+$/;
  if (!foodRegex.test(title)) {
    alert("Wax cunto ah ma aha");
    return;
  }

  // Hubi haddii magaca hore loo daray
  if (timerNames.includes(title.toLowerCase())) {
    alert("Waxaa hore u jiray");
    return;
  }

  timerNames.push(title.toLowerCase()); // save name
  createTimer(title, minutes * 60);
  form.reset();
}

function presetTimer() {
  if (this.value === "") return;

  const data = this.value.split("|");
  const title = data[0];
  const seconds = data[1] * 60;

  if (timerNames.includes(title.toLowerCase())) {
    alert("Waxaa hore u jiray");
    this.value = "";
    return;
  }

  timerNames.push(title.toLowerCase());
  createTimer(title, seconds);
  this.value = "";
}

function createTimer(title, seconds) {
  let interval = null;
  let timeLeft = seconds;

  const div = document.createElement("div");
  div.className = "timer";

  const h3 = document.createElement("h3");
  h3.textContent = title;

  const time = document.createElement("p");
  time.textContent = formatTime(timeLeft);

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.background = "red";

  startBtn.addEventListener("click", function () {
    if (interval !== null) return;

    interval = setInterval(() => {
      timeLeft--;
      time.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        interval = null;
        alarm.play();
        div.classList.add("finished");
        time.textContent = "Done!";
      }
    }, 1000);
  });

  deleteBtn.addEventListener("click", function () {
    clearInterval(interval);
    div.remove();
    // Remove from array
    timerNames = timerNames.filter(name => name !== title.toLowerCase());
  });

  div.append(h3, time, startBtn, deleteBtn);
  timersDiv.appendChild(div);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + (s < 10 ? "0" : "") + s;
}

// --- Navigation ---
const homeLink = document.getElementById("homeLink");
const timersLink = document.getElementById("timersLink");
const aboutLink = document.getElementById("aboutLink");

const homeSection = document.getElementById("homeSection");
const timersSection = document.getElementById("timersSection");
const aboutSection = document.getElementById("aboutSection");

function hideAllSections() {
  homeSection.style.display = "none";
  timersSection.style.display = "none";
  aboutSection.style.display = "none";
}

homeLink.addEventListener("click", function(e){
  e.preventDefault();
  hideAllSections();
  homeSection.style.display = "block";
});

timersLink.addEventListener("click", function(e){
  e.preventDefault();
  hideAllSections();
  timersSection.style.display = "block";
});

aboutLink.addEventListener("click", function(e){
  e.preventDefault();
  hideAllSections();
  aboutSection.style.display = "block";
});