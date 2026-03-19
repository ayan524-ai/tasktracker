const API = "http://localhost:8080/tasks";

async function fetchTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>No tasks available</p>";
    return;
  }

  data.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
  <span class="${task.status === 'done' ? 'done' : ''}">
    ${task.title}
  </span>

  <div class="actions">
    <button class="toggle" onclick="toggleTask(${task.id})">&#10003;</button>
    <button class="delete" onclick="deleteTask(${task.id})">&#10005;</button>
  </div>
`;

    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") {
    alert("Task cannot be empty");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  fetchTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: "PUT" });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();

