const taskForm = document.getElementById('addTaskForm');
const taskInput = document.querySelector('.taskInput');
const taskList = document.querySelector('.taskList');


taskList.style = ` 
list-style-type: none;
margin-top: 1rem;
font-size: 1.5rem;`;

//функция создает строку HTML с задачей

const createTaskItem = (task) => `
<li>
<input type="checkbox" id="task" name="task" value="${task}/>
<label for="task">${task}</label>
<button type="button">X</button>
</li>`

//получение задач из LocalStorage

const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

//функция рисует задачу на странице

const renderTasks = () => {
    storedTasks.forEach(task => {
        taskList.insertAdjacentHTML('beforeend', createTaskItem(task))
    });
}

//запускаем функцию при запуске окна браузера

window.onload = renderTasks;

//функция сохранения задач

const saveTasks = (event) => {
    event.preventDefault();

    const task = taskInput.value;
    const taskItem = createTaskItem(task);
    taskList.insertAdjacentHTML('beforeend', taskItem);

    storedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    taskForm.reset()
}

taskForm.addEventListener('submit', saveTasks);

//помечаем, что задача выполнена

function toggleTaskCompletion(event) {
    const taskItem = event.target.parentElement;
    const task = taskItem.querySelector('label');

    if(event.target.checked) {
        task.style.textDecoration = 'line-through';
    } else {
        task.style.textDecoration = 'none';
    }
}