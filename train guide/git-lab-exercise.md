# Git Workflow Lab Exercise: Feature Development & Code Review

## Overview
This lab exercise simulates a real-world software development workflow where participants will develop a new feature, create a pull request, conduct code review, and merge changes using Git and GitHub.

## Prerequisites
- Git installed on your machine
- GitHub account
- Basic knowledge of Git commands
- Text editor or IDE

---

## Part 1: Setup Instructions

### Step 1: Create the Initial Repository

1. **Create a new repository on GitHub:**
   - Go to GitHub and click "New Repository"
   - Name: `task-manager-app`
   - Description: "A simple task management application"
   - Initialize with README
   - Add .gitignore (Node)
   - Choose MIT License

2. **Clone the repository locally:**
```bash
git clone https://github.com/YOUR_USERNAME/task-manager-app.git
cd task-manager-app
```

### Step 2: Create Initial Project Structure

Create the following files:

**`index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>My Task Manager</h1>
        <div id="task-list"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

**`styles.css`**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    margin-bottom: 20px;
}
```

**`app.js`**
```javascript
// Task Manager Application
console.log('Task Manager initialized');
```

3. **Commit and push initial files:**
```bash
git add .
git commit -m "Initial project setup with HTML, CSS, and JS files"
git push origin main
```

---

## Part 2: Feature Development Workflow

### Step 3: Create a Feature Branch

1. **Create and switch to a new branch:**
```bash
git checkout -b feature/add-task-form
```

2. **Verify you're on the new branch:**
```bash
git branch
```

### Step 4: Develop the Feature

Update the following files to add task creation functionality:

**Update `index.html`** - Add this inside the container div, before task-list:
```html
<div class="task-form">
    <h2>Add New Task</h2>
    <input type="text" id="task-input" placeholder="Enter task description">
    <select id="priority-select">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
    </select>
    <button id="add-task-btn">Add Task</button>
</div>
```

**Update `styles.css`** - Add these styles:
```css
.task-form {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}

.task-form h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #555;
}

#task-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

#priority-select {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

#add-task-btn {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

#add-task-btn:hover {
    background-color: #45a049;
}

.task-item {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-left: 4px solid #4CAF50;
    border-radius: 4px;
}

.task-item.high {
    border-left-color: #f44336;
}

.task-item.medium {
    border-left-color: #ff9800;
}

.task-item.low {
    border-left-color: #2196F3;
}
```

**Update `app.js`** - Replace with:
```javascript
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
            completed: false
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
                    Priority: ${task.priority.toUpperCase()}
                </small>
            `;
            taskList.appendChild(taskElement);
        });
    }
}

// Initialize the app
const app = new TaskManager();
```

### Step 5: Commit Your Changes

```bash
git add .
git commit -m "Add task creation form with priority levels"
```

### Step 6: Push Feature Branch to GitHub

```bash
git push origin feature/add-task-form
```

---

## Part 3: Creating a Pull Request

### Step 7: Open a Pull Request on GitHub

1. Go to your repository on GitHub
2. Click "Compare & pull request" button (appears after pushing)
3. Fill in the PR details:

**Title:** `Add task creation feature`

**Description:**
```markdown
## What does this PR do?
Adds a task creation form that allows users to add tasks with priority levels.

## Changes made
- Added task input form with description field
- Added priority dropdown (Low, Medium, High)
- Implemented TaskManager class to handle task logic
- Added styling for form and task items with color-coded priorities
- Tasks display with priority indicators

## Testing
- [x] Task form appears correctly
- [x] Tasks can be added with Enter key or button click
- [x] Priority levels display with different colors
- [x] Empty tasks are rejected with alert

## Screenshots
(You would add screenshots here)
```

4. Assign yourself as reviewer (or a teammate if working in pairs)
5. Add labels: `enhancement`, `feature`
6. Click "Create pull request"

---

## Part 4: Code Review Process

### Step 8: Conduct Code Review

As a reviewer, examine the code and leave comments. Here are example review comments to add:

**Good practices to note:**
- ✅ Code is well-organized with clear class structure
- ✅ Event listeners properly set up
- ✅ Input validation included
- ✅ CSS follows consistent naming conventions

**Suggestions for improvement:**

1. **On `app.js` line with `Date.now()`:**
   ```
   💡 Suggestion: Consider using a more robust ID generation method for 
   production, such as UUID, to avoid potential collisions in rapid succession.
   ```

2. **On the `addTask` method:**
   ```
   ✨ Enhancement: Could we add a timestamp to tasks to show when they were created?
   This would help users track their task history.
   ```

3. **On `styles.css` color choices:**
   ```
   ♿ Accessibility: The color contrast for medium priority (orange) might not meet 
   WCAG standards. Consider testing with a contrast checker.
   ```

### Step 9: Address Review Comments

Create commits addressing the feedback:

**Switch back to your feature branch:**
```bash
git checkout feature/add-task-form
```

**Update `app.js`** to add timestamps:
```javascript
// In the addTask method, update the task object:
const task = {
    id: Date.now(),
    description: description,
    priority: prioritySelect.value,
    completed: false,
    createdAt: new Date().toLocaleString()
};

// In the render method, add timestamp display:
taskElement.innerHTML = `
    <strong>${task.description}</strong>
    <small style="display: block; margin-top: 5px; color: #666;">
        Priority: ${task.priority.toUpperCase()} | Created: ${task.createdAt}
    </small>
`;
```

**Commit the changes:**
```bash
git add app.js
git commit -m "Add timestamp to tasks based on code review feedback"
git push origin feature/add-task-form
```

### Step 10: Approve the Pull Request

1. Go back to the PR on GitHub
2. Click "Files changed" tab
3. Review the new commits
4. Click "Review changes" button
5. Select "Approve"
6. Add comment: "LGTM! Great work addressing the feedback. Ready to merge."
7. Submit review

---

## Part 5: Merging Changes

### Step 11: Merge the Pull Request

1. Go to the "Conversation" tab of the PR
2. Click "Squash and merge" (or "Merge pull request")
3. Edit the commit message if needed
4. Click "Confirm merge"
5. Delete the feature branch on GitHub (button appears after merge)

### Step 12: Update Local Repository

```bash
# Switch back to main branch
git checkout main

# Pull the merged changes
git pull origin main

# Delete local feature branch (optional cleanup)
git branch -d feature/add-task-form
```

### Step 13: Verify the Merge

```bash
# Check commit history
git log --oneline -5

# Confirm all files are present
ls -la
```

---

## Deliverables Checklist

### 1. Description Document
Create a file named `LAB_REPORT.md` with:
- Summary of the workflow followed
- Features implemented
- Commands executed
- Challenges faced and solutions

### 2. Screenshots to Capture

Required screenshots:
1. Initial repository structure on GitHub
2. Feature branch creation in terminal
3. Code changes in your editor
4. Git commit and push commands
5. Pull request creation page
6. Pull request description
7. Code review comments
8. Files changed view on GitHub
9. Pull request approval
10. Merge confirmation
11. Final application running in browser
12. Git log showing merge commit

### 3. Reflection Paragraph

Write a reflection covering:
- What you learned about Git branching workflows
- The importance of code review in team development
- How pull requests improve code quality
- Challenges you encountered
- How this applies to real-world development

**Example Reflection:**
```
This lab exercise provided hands-on experience with professional Git workflows 
that are used in real software development teams. I learned how feature branches 
isolate work and prevent conflicts with the main codebase. The code review process 
demonstrated how collaborative feedback improves code quality and helps catch 
issues before they reach production. Creating detailed pull request descriptions 
and responding to review comments taught me the importance of clear communication 
in asynchronous collaboration. The most challenging part was understanding when 
to commit and how to write meaningful commit messages, but this improved with 
practice. This workflow directly applies to my team projects where multiple 
developers work on the same codebase, ensuring organized and reviewable changes.
```

### 4. Git Repository

Your final repository should include:
- All source code files
- Complete commit history showing feature development
- Merged pull request in GitHub history
- README.md explaining the project
- LAB_REPORT.md with your documentation

---

## Bonus Challenges

If you complete the basic exercise, try these:

1. **Add a delete feature**: Create another feature branch to add task deletion
2. **Implement local storage**: Save tasks so they persist on page refresh
3. **Add conflict resolution**: Have two people work on the same file simultaneously
4. **Set up branch protection**: Require reviews before merging to main
5. **Create a GitHub Actions workflow**: Automate testing or linting

---

## Common Issues and Solutions

**Issue: Can't push to GitHub**
```bash
# Solution: Ensure you're authenticated
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Issue: Merge conflicts**
```bash
# Solution: Pull latest changes first
git pull origin main
# Resolve conflicts in editor, then:
git add .
git commit -m "Resolve merge conflicts"
```

**Issue: Wrong branch**
```bash
# Solution: Switch branches
git checkout correct-branch-name
```

---

## Assessment Criteria

Your submission will be evaluated on:
- ✅ Proper use of Git branching strategy
- ✅ Quality of commit messages
- ✅ Completeness of pull request description
- ✅ Thoughtful code review comments
- ✅ Professional communication in PR discussions
- ✅ Complete deliverables (description, screenshots, reflection, repo)
- ✅ Working application with implemented feature

---

## Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Git Documentation](https://git-scm.com/doc)
- [Pull Request Best Practices](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
- [Code Review Guidelines](https://google.github.io/eng-practices/review/)

---

**Time Estimate:** 2-3 hours for complete exercise
**Difficulty Level:** Intermediate
**Team Size:** Can be done solo or in pairs