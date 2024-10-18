//Selecting the DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

//Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

//Event Listener for adding tasks
addTaskBtn. addEventListener('click', addTask);

//Function to add a new task
function addTask(){
    const taskValue = taskInput.value.trim();

    if(taskValue === ''){
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskValue,
        completed: false
    };

    //Add task to the UI and local storage
    createTaskElement(task);
    saveTask(task);

    taskInput.value = ''; //Clear the input field
}

//Function to create a task element in the DOM
function createTaskElement(task){
    const li = document.createElement('li');
    li.dataset.id =task.id;
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
        <span>${task.name}</span>
        <div>
            <button class = "complete-btn">${task.completed ? 'Undo' : 'Done'}</button>
            <button class = "delete-btn">Delete</button>
        </div>
    `;

    //Event listeners for making as completed or deletinting task
    li.querySelector('.complete-btn').addEventListener('click', toggleComplete);
    li.querySelector('.delete-btn').addEventListener('click', deleteTask);

    todoList.appendChild(li);
}

//Toggle task completion
function toggleComplete(e) {
    const taskElement = e.target.closest('li');
    taskElement.classList.toggle('completed');

    const taskId = taskElement.dataset.id;
    updateTaskStatus(taskId, taskElement.classList.contains('completed'));
}

//Function to delete a task
function deleteTask(e) {
    const taskElement = e.target.closest('li');
    const taskId = taskElement.dataset.id;

    //Remove from the UI and Local storage
    taskElement.remove();
    removeTask(taskId);
}

//Save task to local storage
function saveTask(task){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
  }
  
  // Update task completion status in local storage
  function updateTaskStatus(id, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
      if (task.id == id) {
        task.completed = completed;
      }
      return task;
    });
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  
  // Remove task from local storage
  function removeTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }