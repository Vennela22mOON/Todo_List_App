const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
let incompleteTaskCount = 0;
function updateTaskCount() {
    taskCount.textContent = `Incomplete tasks: ${incompleteTaskCount}`;
}
function createTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.className = 'task-checkbox';
    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            taskItem.classList.add('completed');
            incompleteTaskCount--;
        } else {
            taskItem.classList.remove('completed');
            incompleteTaskCount++;
        }
        updateTaskCount();
    });

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-task';
    deleteButton.addEventListener('click', () => {
        if (!taskCheckbox.checked) {
            incompleteTaskCount--;
        }
        taskList.removeChild(taskItem);
        updateTaskCount();
    });
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);

    return taskItem;
}
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }
    const newTask = createTask(taskText);
    taskList.appendChild(newTask);
    incompleteTaskCount++;
    updateTaskCount();
    taskInput.value = '';
});
updateTaskCount();
