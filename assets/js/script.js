var buttonEl = document.querySelector("#save-task");
var taskListEl = document.querySelector("#tasks-to-do");

function createTaskHandler(){
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskListEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);
