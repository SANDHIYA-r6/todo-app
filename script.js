let input = document.getElementById("new-item");
let addbtn = document.getElementById("addbtn");
let list = document.getElementById("new-list");
let count = document.getElementById("task-count");

function updateCount() {
    let total = list.children.length;

    if (total === 1) {
        count.textContent = "1 Task";
    } else {
        count.textContent = total + " Tasks";
    }
}

function saveTasks() {
    let tasks = [];

    list.querySelectorAll(".task-Item").forEach(function(taskItem) {

        let tasktext = taskItem.querySelector("span");
        let checkbox = taskItem.querySelector("input");

        tasks.push({
            text: tasktext.textContent,
            completed: checkbox.checked
        });

    });

    localStorage.setItem("myTasks", JSON.stringify(tasks));
}


function createTask(task, completed = false) {

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-Item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const tasktext = document.createElement("span");
    tasktext.textContent = task;

    const dltbutton = document.createElement("button");
    dltbutton.textContent = "✘";

    if (completed) {
        tasktext.classList.add("completed");
    }

    taskItem.appendChild(checkbox);
    taskItem.appendChild(tasktext);
    taskItem.appendChild(dltbutton);

 
    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            tasktext.classList.add("completed");
        } else {
            tasktext.classList.remove("completed");
        }

        saveTasks();
    });

    
    dltbutton.addEventListener("click", function() {

        taskItem.remove();
        updateCount();
        saveTasks();

    });

    list.appendChild(taskItem);
    updateCount();
}


addbtn.addEventListener("click", function() {

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    createTask(task);
    saveTasks();

    input.value = "";

});


let savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];

savedTasks.forEach(function(task) {

    createTask(task.text, task.completed);

});
