const apiUrl = "http://localhost:8080/tasks";
let editingTaskId=null;
function addTask() {
    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value
    };

    // UPDATE
    if (editingTaskId !== null) {
        fetch(`${apiUrl}/${editingTaskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            editingTaskId = null;
            clearForm();
            loadTasks();
        });
    }
    // CREATE
    else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            clearForm();
            loadTasks();
        });
    }
}

function loadTasks() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <b>${task.title}</b><br>
                    ${task.description}<br>
                    Status: ${task.status}<br>
                    <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')">
                        Edit
                    </button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                list.appendChild(li);
            });
        });
}

function editTask(id, title, description, status) {
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("status").value = status;

    editingTaskId = id;
}

function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    }).then(() => loadTasks());
}

loadTasks();

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "PENDING";
}