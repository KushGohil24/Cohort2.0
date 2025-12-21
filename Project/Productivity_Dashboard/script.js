import WEATHER_API_KEY from './config.js'
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
    var itag = document.querySelectorAll('.task div i');
    var detailsBox = document.querySelectorAll('.allTask .details');
    itag.forEach(function(elem){
      elem.addEventListener('click', function(elem){
          let content = detailsBox[elem.target.id];
          if(content.style.maxHeight){
              content.style.maxHeight = null;
              itag[elem.target.id].style.rotate = 0+'deg';
          }else{
              content.style.maxHeight = content.scrollHeight + "px";
              itag[elem.target.id].style.rotate = -180+'deg';
          }
          
      })
    })
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
    taskInput.value = '';
    taskDetailsInput.value = '';
    checkbox.checked = false;
  });
}
todoList();
function dailyPlanner(){
  var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};
  var startHour = document.querySelector('.day-start-with .start-hour');

  if (localStorage.getItem('startHour') === null) {
    startHour.value = 6;
    localStorage.setItem('startHour', 6);
  } else {
    startHour.value = Number(localStorage.getItem('startHour'));
  }

  renderDayPlanner();

  startHour.addEventListener('input', function (e) {
    let num = Number(e.target.value);

    if (!isNaN(num) && num >= 0 && num <= 23) {
      startHour.value = num;
      localStorage.setItem('startHour', num);
    }

    renderDayPlanner();
  });

  function renderDayPlanner() {
    let start = Number(startHour.value) || 6;

    let hours = Array.from({ length: 18 }, function (_, idx) {
      return `${(start + idx) % 24}:00 - ${(start + idx + 1) % 24}:00`;
    });

    let wholeDaySum = '';

    hours.forEach(function (elem, idx) {
      wholeDaySum += `
        <div class="day-planner-time">
          <p>${elem}</p>
          <input 
            type="text"
            id="${idx}"
            placeholder="..."
            value="${dayPlanData[idx] || ''}"
          >
        </div>
      `;
    });

    document.querySelector('.day-planner').innerHTML = wholeDaySum;

    attachPlannerInputListeners();
  }

  function attachPlannerInputListeners() {
    document.querySelectorAll('.day-planner input').forEach(function (elem) {
      elem.addEventListener('input', function () {
        dayPlanData[elem.id] = elem.value;
        localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
      });
    });
  }

  let dayPlanDataClearBtn = document.querySelector('.day-start-with button');

  dayPlanDataClearBtn.addEventListener('click', function () {
    dayPlanData = {};
    localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
    renderDayPlanner();
  });
}
dailyPlanner();

function motivationalQuote(){
  var motivationQuoteContent = document.querySelector('.motivation-2 h1');
  var motivationAuthor = document.querySelector('.motivation-3 h2');
  async function fetchQuote(){
    let response = await fetch('https://dummyjson.com/quotes/random');
    let data = await response.json();
    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = '~ '+data.author;
  }
  fetchQuote();
}
motivationalQuote();

function pomodoroTimer(){
  let timer = document.querySelector('.pomo-timer h1');
  let startBtn = document.querySelector('.pomo-timer .start-timer');
  let pauseBtn = document.querySelector('.pomo-timer .pause-timer');
  let resetBtn = document.querySelector('.pomo-timer .reset-timer');
  let sessionTag = document.querySelector('.pomodoro-fullpage .session');
  var isWorkSession = true;

  let totalSec = 25*60;
  let timerInterval = null;

  function updateTime(){
    let minutes = Math.floor(totalSec/60);
    let seconds = totalSec%60;
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  function startTimer(){
    const ringSound = new Audio('./assets/achievement-bell.wav')
    clearInterval(timerInterval);
    if(isWorkSession){
      timerInterval = setInterval(function(){
          if (totalSec > 0) {
            totalSec--;
          }else{
            clearInterval(timerInterval);
            isWorkSession = false;
            totalSec = 5*60;
            sessionTag.innerText = 'Take a Break';
            sessionTag.style.backgroundColor = 'var(--blue)';
            ringSound.play();
          }
          updateTime();
        }, 1000);
    }else{
      timerInterval = setInterval(function(){
          if (totalSec > 0) {
            totalSec--;
          }else{
            clearInterval(timerInterval);
            isWorkSession = true;
            totalSec = 25*60;
            sessionTag.innerText = 'Work Session';
            sessionTag.style.backgroundColor = 'var(--green)';
            ringSound.play();
          }
          updateTime();
        }, 1000);
    }
  }
  function pauseTimer(){
    if(timerInterval === null && totalSec !== 25*60 && totalSec !== 5*60){
      pauseBtn.innerText = 'Pause';
      startTimer();
    }else{
      clearInterval(timerInterval);
      timerInterval = null;
      if(totalSec !== 25*60 && totalSec !== 5*60){
        pauseBtn.innerText = 'Resume';
      }
      updateTime();
    }

  }
  function clearTimer(){
    clearInterval(timerInterval);
    totalSec = 25*60;
    updateTime();
  }
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', clearTimer);
}
pomodoroTimer();
function loadDashboard(){
  var header2Temp = document.querySelector('.header2 h2');
  var header2Det = document.querySelector('.header2 h4');
  var feelsLike = document.querySelector('.header2 .feelsLike');
  var humidity = document.querySelector('.header2 .humidity');
  var wind = document.querySelector('.header2 .wind');
  const apikey = WEATHER_API_KEY;
  async function getWeather(city){
      try {
          let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
          if(!rawData.ok){
              throw new Error("Invalid city name or something went wrong!");
          }
          let realData = await rawData.json();
          if(realData.main.temp<0){
              console.warn(`It's too cold out there : ${realData.main.temp}`);
          }else if(realData.main.temp>30){
              console.warn(`It's too hot out there : ${realData.main.temp}`);
          }else{
              console.log(`Temperature : ${realData.main.temp}`)
          }
          header2Temp.innerHTML = `${realData.main.temp} °C`;
          header2Det.innerHTML = `${realData.weather[0].main}`;
          feelsLike.innerHTML = `Feels like: ${realData.main.feels_like}°C`;
          humidity.innerHTML = `Humidity: ${realData.main.humidity}%`
          wind.innerHTML = `Wind: ${realData.wind.speed} km/h`
          console.log(realData)
      } catch (err) {
          console.error(err.message);
      }
      
  }
  getWeather("Anand");

  var header1Time = document.querySelector('.header1 h1');
  var header1Date = document.querySelector('.header1 h2');
  var header1City = document.querySelector('.header1 h4');
  var heroImg = document.querySelector('header');

  function timeDate(){
    const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dateMain = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    header1Date.innerHTML = `${dateMain} ${month}, ${year}`
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours%12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${hours>12 ? 'PM' : 'AM'}`
    header1City.innerHTML =  `Anand`;
  }
  setInterval(()=>{
    timeDate();
  }, 1000)
  let currHour = new Date().getHours();
  if(currHour>=6&&currHour<17){
    heroImg.style.background = "url('https://images.unsplash.com/photo-1648965009366-3ae8e3bb9020?q=80&w=2485&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    heroImg.style.setProperty(
      'background-position',
      '30% 70%',
      'important'
    );
  }else if(currHour>=17&&currHour<=20){
    heroImg.style.background = "url('./assets/heroimg.png')";
  }else{
    heroImg.style.background = "url('https://images.unsplash.com/photo-1654068552324-185252c098de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    heroImg.style.setProperty(
      'background-position',
      '30% 80%',
      'important'
    );
  }
}
loadDashboard();
