let $input = document.getElementById('input');
let $add = document.getElementById('add-task');
let $myDiv = document.getElementById('tasks');
let arrayOfTask = []



$add.onclick = function () {
    if ($input.value !== "") {
        addTaskToArray($input.value);
        $input.value = "";
    }
}

$myDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("del")) {
        deletee(e.target.parentElement.getAttribute('data-id'))
        // deletFromlocal(e.target.classList.getAttribute('data-id'))
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains('task')) {
        TOGGLE(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})


if (localStorage.getItem('task')) {
    arrayOfTask = JSON.parse(localStorage.getItem('task'))
}

getdataFromLocal();

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    }
    arrayOfTask.push(task);
    addTaskToPage(arrayOfTask)
    addDataTolocal(arrayOfTask);
}


function addTaskToPage(tasks) {
    $myDiv.innerHTML = ""
    tasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.className = "task done";
        }
        div.appendChild(document.createTextNode(task.title))
        div.setAttribute('data-id', task.id)
        let span = document.createElement('span')
        span.appendChild(document.createTextNode("X"))
        span.className = "del";
        div.appendChild(span)
        $myDiv.appendChild(div)
    })
}

function addDataTolocal(tasks) {
    window.localStorage.setItem('task', JSON.stringify(tasks))
}

function getdataFromLocal() {
    let data = window.localStorage.getItem('task');
    if (data) {
        let task = JSON.parse(data)
        addTaskToPage(task)
    }
}

function deletee(taskid) {
    arrayOfTask = arrayOfTask.filter((task) => task.id != taskid)
    addDataTolocal(arrayOfTask);
}

function TOGGLE(taskid) {
    for (let i = 0; i < arrayOfTask.length; i++) {
        if (arrayOfTask[i].id == taskid) {
            arrayOfTask[i].completed == false ? (arrayOfTask[i].completed = true) : (arrayOfTask[i].completed = false);
        }
    }
    addDataTolocal(arrayOfTask);
}









