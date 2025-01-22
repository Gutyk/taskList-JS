const inputNewTask = document.querySelector('.input-new-task');
const btnAddTask = document.querySelector('.btn-new-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

inputNewTask.addEventListener('keypress' ,function(e){
    if (e.keyCode === 13) {
        if (!inputNewTask.value) return;
        createTask(inputNewTask.value);
    }
});

btnAddTask.addEventListener('click', function(e) {
    if (!inputNewTask.value) return;
    createTask(inputNewTask.value);
});

function clearInput(){
    inputNewTask.value = '';
    inputNewTask.focus();
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    deleteTask(li);
    saveTasks();
}

function deleteTask(li){
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.setAttribute('class', 'delete')
    li.appendChild(btnDelete);
}

document.addEventListener('click', function(e){
    const el = e.target; 
    console.log(el)
    if(el.classList.contains('delete')){
        el.parentElement.remove();
        saveTasks()
    }
});

function saveTasks(){
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks){
        let taskText = task.innerText.slice(0,-7);
        taskList.push(taskText);
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks(){
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);
    

    for (let task of taskList) {
        createTask(task);
    }
}

addSavedTasks();