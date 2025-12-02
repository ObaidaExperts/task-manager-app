// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    init() {
        const addButton = document.getElementById('add-task-btn');
        addButton.addEventListener('click', () => this.addTask());

        const taskInput = document.getElementById('task-input');
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const taskInput = document.getElementById('task-input');
        const prioritySelect = document.getElementById('priority-select');

        const description = taskInput.value.trim();
        if (!description) {
            alert('Please enter a task description');
            return;
        }

        const task = {
            id: Date.now(),
            description: description,
            priority: prioritySelect.value,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.tasks.push(task);
        this.render();

        taskInput.value = '';
        prioritySelect.value = 'low';
    }

    render() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            taskList.innerHTML = '<p style="color: #999;">No tasks yet. Add one above!</p>';
            return;
        }

        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.priority}`;
            taskElement.innerHTML = `
    <strong>${task.description}</strong>
    <small style="display: block; margin-top: 5px; color: #666;">
        Priority: ${task.priority.toUpperCase()} | Created: ${task.createdAt}
    </small>
`;
            taskList.appendChild(taskElement);
        });


    }
}

// Initialize the app
const app = new TaskManager();