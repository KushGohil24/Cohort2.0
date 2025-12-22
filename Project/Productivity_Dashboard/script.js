import WEATHER_API_KEY from "./config.js";
function openFeatures() {
  let allElem = document.querySelectorAll(".elem");
  let allFullElem = document.querySelectorAll(".fullElem");
  let allFullElemBackBtn = document.querySelectorAll(".fullElem .back");
  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElem[elem.id].style.display = "block";
    });
  });
  allFullElemBackBtn.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      allFullElem[index].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  var currentTasks = [];
  if (localStorage.getItem("currentTasks")) {
    currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
  } else {
    console.log("Task list is empty.");
  }
  function renderTasks() {
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTasks.forEach(function (taskObj, idx) {
      sum += `
                        <div class="task">
                            <h5>${taskObj.task} ${
        taskObj.important ? "<span>imp</span>" : ""
      }</h5>
                        <div>
                            <button id="${idx}">Mark as completed</button>
                            <i class="ri-arrow-down-s-line" id="${idx}"></i>
                        </div>
                        </div>
                        <div class="details" id="${idx}">
                            <p>${taskObj.details}</p>
                        </div>
                        `;
    });
    allTask.innerHTML = sum;
    var itag = document.querySelectorAll(".task div i");
    var detailsBox = document.querySelectorAll(".allTask .details");
    itag.forEach(function (elem) {
      elem.addEventListener("click", function (elem) {
        let content = detailsBox[elem.target.id];
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          itag[elem.target.id].style.rotate = 0 + "deg";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          itag[elem.target.id].style.rotate = -180 + "deg";
        }
      });
    });
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTasks.splice(btn.id, 1);
        renderTasks();
      });
    });
  }
  renderTasks();
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let taskInput = document.querySelector(".addTask form input#task-input");
    let taskDetailsInput = document.querySelector(".addTask form textarea");
    let checkbox = document.querySelector(".addTask form .imp #imp");
    currentTasks.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      important: checkbox.checked,
    });
    renderTasks();
    taskInput.value = "";
    taskDetailsInput.value = "";
    checkbox.checked = false;
  });
}
todoList();
function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var startHour = document.querySelector(".day-start-with .start-hour");

  if (localStorage.getItem("startHour") === null) {
    startHour.value = 6;
    localStorage.setItem("startHour", 6);
  } else {
    startHour.value = Number(localStorage.getItem("startHour"));
  }

  renderDayPlanner();

  startHour.addEventListener("input", function (e) {
    let num = Number(e.target.value);

    if (!isNaN(num) && num >= 0 && num <= 23) {
      startHour.value = num;
      localStorage.setItem("startHour", num);
    }

    renderDayPlanner();
  });

  function renderDayPlanner() {
    let start = Number(startHour.value) || 6;

    let hours = Array.from({ length: 18 }, function (_, idx) {
      return `${(start + idx) % 24}:00 - ${(start + idx + 1) % 24}:00`;
    });

    let wholeDaySum = "";

    hours.forEach(function (elem, idx) {
      wholeDaySum += `
        <div class="day-planner-time">
          <p>${elem}</p>
          <input 
            type="text"
            id="${idx}"
            placeholder="..."
            value="${dayPlanData[idx] || ""}"
          >
        </div>
      `;
    });

    document.querySelector(".day-planner").innerHTML = wholeDaySum;

    attachPlannerInputListeners();
  }

  function attachPlannerInputListeners() {
    document.querySelectorAll(".day-planner input").forEach(function (elem) {
      elem.addEventListener("input", function () {
        dayPlanData[elem.id] = elem.value;
        localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
      });
    });
  }

  let dayPlanDataClearBtn = document.querySelector(".day-start-with button");

  dayPlanDataClearBtn.addEventListener("click", function () {
    dayPlanData = {};
    localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    renderDayPlanner();
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");
  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = "~ " + data.author;
  }
  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let sessionTag = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSec = 25 * 60;
  let timerInterval = null;

  function updateTime() {
    let minutes = Math.floor(totalSec / 60);
    let seconds = totalSec % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    const ringSound = new Audio("./assets/achievement-bell.wav");
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSec > 0) {
          totalSec--;
        } else {
          clearInterval(timerInterval);
          isWorkSession = false;
          totalSec = 5 * 60;
          sessionTag.innerText = "Take a Break";
          sessionTag.style.backgroundColor = "var(--blue)";
          ringSound.play();
        }
        updateTime();
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSec > 0) {
          totalSec--;
        } else {
          clearInterval(timerInterval);
          isWorkSession = true;
          totalSec = 25 * 60;
          sessionTag.innerText = "Work Session";
          sessionTag.style.backgroundColor = "var(--green)";
          ringSound.play();
        }
        updateTime();
      }, 1000);
    }
  }
  function pauseTimer() {
    if (timerInterval === null && totalSec !== 25 * 60 && totalSec !== 5 * 60) {
      pauseBtn.innerText = "Pause";
      startTimer();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      if (totalSec !== 25 * 60 && totalSec !== 5 * 60) {
        pauseBtn.innerText = "Resume";
      }
      updateTime();
    }
  }
  function clearTimer() {
    clearInterval(timerInterval);
    totalSec = 25 * 60;
    pauseBtn.innerText = "Pause";
    updateTime();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", clearTimer);
}
pomodoroTimer();

function loadDashboard() {
  var header2Temp = document.querySelector(".header2 h2");
  var header2Det = document.querySelector(".header2 h4");
  var feelsLike = document.querySelector(".header2 .feelsLike");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header1City = document.querySelector(".header1 h4");
  var heroImg = document.querySelector("header");

  const apikey = WEATHER_API_KEY;

  async function getWeatherByCoords(lat, lon) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      header2Temp.innerHTML = `${data.main.temp} °C`;
      header2Det.innerHTML = data.weather[0].description;
      feelsLike.innerHTML = `Feels like: ${data.main.feels_like}°C`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      wind.innerHTML = `Wind: ${data.wind.speed} km/h`;
    } catch {}
  }

  async function getCityFromCoords(lat, lon) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`
      );
      const data = await res.json();
      return data[0]?.name || "Unknown";
    } catch {
      return "Unknown";
    }
  }

  function getUserLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
        const city = await getCityFromCoords(lat, lon);
        header1City.innerHTML = city;
      },
      () => {
        const lat = 22.5645;
        const lon = 72.9289;
        getWeatherByCoords(lat, lon);
        header1City.innerHTML = "Anand";
      }
    );
  }

  function timeDate() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    header1Date.innerHTML = `${d.getDate()} ${
      months[d.getMonth()]
    }, ${d.getFullYear()}`;
    header1Time.innerHTML = `${days[d.getDay()]}, ${String(
      d.getHours() % 12 || 12
    ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
      d.getSeconds()
    ).padStart(2, "0")} ${d.getHours() >= 12 ? "PM" : "AM"}`;
  }

  setInterval(timeDate, 1000);

  let h = new Date().getHours();
  if (h >= 6 && h < 17) {
    heroImg.style.background =
      "url('https://images.unsplash.com/photo-1648965009366-3ae8e3bb9020?q=80')";
    heroImg.style.backgroundPosition = "30% 70%";
  } else if (h >= 17 && h <= 20) {
    heroImg.style.background = "url('./assets/heroimg.png')";
  } else {
    heroImg.style.background =
      "url('https://images.unsplash.com/photo-1654068552324-185252c098de?q=80')";
    heroImg.style.backgroundPosition = "30% 80%";
  }

  getUserLocation();
}

loadDashboard();

function changeTheme() {
  const themeBtn = document.querySelector(".allElems .theme");
  const rootElem = document.documentElement;
  const themes = [
    {
      pri: "#EAE0CF",
      sec: "#213448",
      tri1: "#456882",
      tri2: "#234C6A",
    },
    {
      pri: "#F9F8F6",
      sec: "#C9B59C",
      tri1: "#4f463d",
      tri2: "#D9CFC7",
    },
    {
      pri: "#F1EFEC",
      sec: "#030303",
      tri1: "#a2a09e",
      tri2: "#123458",
    },
    {
      pri: "#F8F4E1",
      sec: "#381c0a",
      tri1: "#feba17",
      tri2: "#74512d",
    },
  ];

  let count = parseInt(localStorage.getItem("themeIndex")) || 0;

  function applyTheme(index) {
    rootElem.style.setProperty("--pri", themes[index].pri);
    rootElem.style.setProperty("--sec", themes[index].sec);
    rootElem.style.setProperty("--tri1", themes[index].tri1);
    rootElem.style.setProperty("--tri2", themes[index].tri2);
  }

  applyTheme(count);

  themeBtn.addEventListener("click", () => {
    count = (count + 1) % themes.length;
    applyTheme(count);
    localStorage.setItem("themeIndex", count);
  });
}

changeTheme();

function dailyGoals() {
  const todaysGoalInp = document.querySelector(".add-goals input");
  const addGoalBtn = document.querySelector(".add-goals .add-goal");
  const clearBtn = document.querySelector(".add-goals .clear");
  const goalsContainer = document.querySelector(".goal-container");

  const today = new Date().toDateString();

  let data = {
    date: today,
    goals: [],
  };

  const storedData = JSON.parse(localStorage.getItem("todaysGoals"));

  if (storedData && storedData.date === today) {
    data = storedData;
  } else {
    localStorage.removeItem("todaysGoals");
  }

  function renderGoals() {
    goalsContainer.innerHTML = "";

    data.goals.forEach((goal, idx) => {
      const goalDiv = document.createElement("div");
      goalDiv.className = "goal";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = goal.completed;

      const text = document.createElement("h3");
      text.innerText = goal.text;

      if (goal.completed) {
        text.style.textDecoration = "line-through";
        text.style.opacity = "0.5";
      }

      checkbox.addEventListener("change", () => {
        goal.completed = checkbox.checked;
        saveAndRender();
      });

      goalDiv.appendChild(checkbox);
      goalDiv.appendChild(text);
      goalsContainer.appendChild(goalDiv);
    });
  }

  function saveAndRender() {
    localStorage.setItem("todaysGoals", JSON.stringify(data));
    renderGoals();
  }

  addGoalBtn.addEventListener("click", () => {
    const value = todaysGoalInp.value.trim();
    if (!value) return;

    data.goals.push({
      text: value,
      completed: false,
    });

    todaysGoalInp.value = "";
    saveAndRender();
  });

  clearBtn.addEventListener("click", () => {
    data.goals = [];
    localStorage.removeItem("todaysGoals");
    renderGoals();
  });

  renderGoals();
}

dailyGoals();
