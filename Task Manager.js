function calculatePriority(task) {
    const now = new Date().getTime();
    const deadline = new Date(task.deadline).getTime();
    const remainingTime = (deadline - now) / 1000; // in seconds

    return task.importance - (6 / remainingTime) + (task.type === 'teamwork' ? 2 : 0);
}

function sortTasks(tasks) {
    return tasks.sort((a, b) => calculatePriority(b) - calculatePriority(a));
}

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskName = document.getElementById('taskName').value.trim();
    const taskDeadline = document.getElementById('taskDeadline').value;
    const taskImportance = parseInt(document.getElementById('taskImportance').value, 10);
    const taskType = document.getElementById('taskType').value;
    const taskDescription = document.getElementById('taskDescription').value.trim();

    if (!taskName || !taskDeadline || isNaN(taskImportance) || !taskType || !taskDescription) {
        alert('Please fill out all fields!');
        return;
    }

    const task = {
        name: taskName,
        deadline: taskDeadline,
        importance: taskImportance,
        type: taskType,
        description: taskDescription,
    };

    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => JSON.parse(li.dataset.task));
    tasks.push(task);

    const sortedTasks = sortTasks(tasks);

    taskList.innerHTML = '';
    sortedTasks.forEach(t => {
        const listItem = document.createElement('li');
        listItem.dataset.task = JSON.stringify(t);

        listItem.innerHTML = `
            <strong>${t.name}</strong>
            <div class="task-meta">
                Deadline: ${new Date(t.deadline).toLocaleString()} | 
                Importance: ${t.importance} | 
                Type: ${t.type} | 
                Description: ${t.description}
            </div>
            <button>Delete</button>
        `;

        listItem.querySelector('button').addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        taskList.appendChild(listItem);
    });

    document.getElementById('taskName').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskImportance').value = '';
    document.getElementById('taskType').value = 'personal';
    document.getElementById('taskDescription').value = '';
});
