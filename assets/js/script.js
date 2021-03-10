var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

function taskFormHandler(event)
{
    event.preventDefault();

    //Create an object to hold the input data and then pass it to a function that creates the HTML object
    var taskData = createTaskObjFromInput()
    if(!taskData.name || !taskData.type)
    {
        alert("Please enter a valid task.");
        return false;
    }
    else
    {
        createTaskEl(taskData); 
        formEl.reset();
        return true;
    }
}

function createTaskEl(taskDataObj)
{
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl); 
}

function createTaskObjFromInput()
{
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    if(!taskTypeInput || !taskTypeInput){ return false; }
        
    var taskDataObj = {name: taskNameInput, type: taskTypeInput};

    return taskDataObj;
}

formEl.addEventListener("submit", taskFormHandler);
