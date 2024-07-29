document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');

    // Show preloader and hide the main content initially
    const preloader = document.getElementById('preloader');
    const container = document.getElementById('todo-container');

    // Simulate a loading delay
    setTimeout(() => {
        preloader.style.display = 'none';
        container.style.display = 'block';
    }, 1000); 

    // Load tasks from localStorage
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;
        
        if (isTaskDuplicate(taskText)) {
            message.textContent = 'This task already exists!';
            setTimeout(() => message.textContent = '', 3000);
        } else {
            addTask(taskText);
            input.value = '';
            message.textContent = '';
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function addTask(taskText) {
        const task = { text: taskText };
        createTaskElement(task);
        saveTask(task);
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.addEventListener('click', () => {
            li.remove();
            removeTask(task);
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.text !== task.text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function isTaskDuplicate(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks.some(task => task.text === taskText);
    }

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.title = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        
        const listItems = document.querySelectorAll('li');
        listItems.forEach(li => {
            li.classList.toggle('dark-mode', isDarkMode);
        });
    });
});
