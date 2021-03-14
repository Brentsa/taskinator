var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed")
var pageContentEl = document.querySelector("#page-content");

function taskFormHandler(event)
{
    event.preventDefault();

    var isEdit = formEl.hasAttribute("data-task-id");

    if(isEdit)
    {
        taskId = formEl.getAttribute("data-task-id");
        var taskData = createTaskObjFromInput()
        completeEditTask(taskData, taskId);
        formEl.reset();
    }
    else
    {
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
};

function createTaskEl(taskDataObj)
{
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(createTaskActions(taskIdCounter));
    tasksToDoEl.appendChild(listItemEl); 

    taskIdCounter++;
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

function taskButtonHandler(event)
{
    if(event.target.matches(".delete-btn")){
        var deleteTaskIdEl = event.target.getAttribute("data-task-id");
        deleteTask(deleteTaskIdEl);
    }

    if(event.target.matches(".edit-btn")){
        var editTaskIdEl = event.target.getAttribute("data-task-id");
        editTask(editTaskIdEl);
    }
}

function deleteTask(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");
    taskSelected.remove();
}

function editTask(taskId)
{
    console.log("Editing task: " + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType)

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

function completeEditTask(taskDataObj,taskId)
{
    //Store the correct task
    var taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");

    //Locate the name and type in the correct task and update their text
    taskSelected.querySelector("h3.task-name").textContent = taskDataObj.name;
    taskSelected.querySelector("span.task-type").textContent = taskDataObj.type;

    //Remove the task-id from the form and change the form button back
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

function taskStatusChangeHandler(event)
{
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id = '"+taskId+"']");

    console.log(taskId);
    console.log(statusValue);
    console.log(taskSelected);

    switch (statusValue)
    {
        case "to do":
            tasksToDoEl.appendChild(taskSelected);
            break;
        case "in progress":
            tasksInProgressEl.appendChild(taskSelected);
            break;
        case "completed":
            tasksCompletedEl.appendChild(taskSelected);
            break;
    }
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
