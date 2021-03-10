var taskIdCounter = 0;
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
};

function createTaskEl(taskDataObj)
{
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    taskIdCounter++;

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(createTaskActions(taskIdCounter));
    tasksToDoEl.appendChild(listItemEl); 
    
};

function createTaskActions(taskId)
{
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++)
    {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.value = statusChoices[i];
        statusSelectEl.appendChild(statusOptionEl);        
    }

    return actionContainerEl;
};



function createTaskObjFromInput()
{
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    if(!taskTypeInput || !taskTypeInput){ return false; }
        
    var taskDataObj = {name: taskNameInput, type: taskTypeInput};

    return taskDataObj;
};

formEl.addEventListener("submit", taskFormHandler);
