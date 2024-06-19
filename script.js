document.addEventListener('DOMContentLoaded', () => {
    let addTaskBtn = document.getElementById('add-task-btn');
    let deleteSelectedBtn = document.getElementById('delete-selected-btn');
    let deleteAllBtn = document.getElementById('delete-all-btn');
    let newTaskInput = document.getElementById('new-task');
    let taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);
    deleteSelectedBtn.addEventListener('click', deleteSelectedTasks);
    deleteAllBtn.addEventListener('click', deleteAllTasks);

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        let taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        let taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        let taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        let actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        let editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(actionsDiv);

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskSpan.addEventListener('click', () => {
            taskItem.classList.toggle('done');
        });

        editBtn.addEventListener('click', () => {
            editTask(taskSpan);
        });

        taskList.appendChild(taskItem);
        newTaskInput.value = '';
        newTaskInput.focus();
    }

    function editTask(taskSpan) {
        let currentText = taskSpan.textContent;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';

        taskSpan.textContent = '';
        taskSpan.appendChild(input);

        input.focus();
        input.select();

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                updateTask(taskSpan, input);
            }
        });

        input.addEventListener('blur', () => {
            updateTask(taskSpan, input);
        });
    }

    function updateTask(taskSpan, input) {
        let updatedText = input.value.trim();
        if (updatedText) {
            taskSpan.textContent = updatedText;
        } else {
            taskSpan.textContent = input.placeholder;
        }
    }

    function deleteSelectedTasks() {
        let taskItems = document.querySelectorAll('.task-item.done');
        taskItems.forEach(task => {
            taskList.removeChild(task);
        });
    }

    function deleteAllTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
});
