var formEl = document.querySelector("#task-form");
var taskListEl = document.querySelector("#tasks-to-do");

function createTaskHandler(event){
    event.preventDefault();
    
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "New Task";
    taskListEl.appendChild(taskItemEl);
    
}

formEl.addEventListener("submit", createTaskHandler);
