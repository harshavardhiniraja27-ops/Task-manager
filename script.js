let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");

    if (taskInput.value.trim() === "") return;

    let task = {
        id: Date.now(),
        text: taskInput.value,
        date: dueDate.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    dueDate.value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(t => {
        if (t.id === id) {
            t.completed = !t.completed;
        }
        return t;
    });
    saveTasks();
    renderTasks();
}

function editTask(id) {
    let newText = prompt("Edit task:");
    if (!newText) return;

    tasks = tasks.map(t => {
        if (t.id === id) {
            t.text = newText;
        }
        return t;
    });

    saveTasks();
    renderTasks();
}

function renderTasks() {

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;
    let pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    tasks.forEach(task => {

        let div = document.createElement("div");
        div.classList.add("task");

        div.innerHTML = `
<div class="task-info">
<strong class="${task.completed ? 'completed' : ''}">
${task.text}
</strong>
<small>📅 ${task.date || "No date"} | ⚡ ${task.priority}</small>
</div>

<div class="actions">
<button class="done" onclick="toggleTask(${task.id})">✔</button>
<button class="edit" onclick="editTask(${task.id})">✏</button>
<button onclick="deleteTask(${task.id})">🗑</button>
</div>
`;

        list.appendChild(div);

    });

}

renderTasks();