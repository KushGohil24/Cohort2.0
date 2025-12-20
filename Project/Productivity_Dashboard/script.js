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
}
todoList();