document.addEventListener('DOMContentLoaded', () => {
  if (!getToken()) {
    window.location.href = 'login.html';
    return;
  }

  fetchTasks();

  document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value.trim();
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
      alert('Task title is required!');
      return;
    }

    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify({ title, category, dueDate, priority })
    });

    document.getElementById('taskForm').reset();
    fetchTasks();
  });

  document.getElementById('searchTask').addEventListener('input', fetchTasks);
  document.getElementById('filterCategory').addEventListener('change', fetchTasks);
  document.getElementById('filterStatus').addEventListener('change', fetchTasks);
});

async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { 'Authorization': getToken() }
  });
  const tasks = await res.json();

  const searchValue = document.getElementById('searchTask').value.toLowerCase();
  const selectedCategory = document.getElementById('filterCategory').value;
  const selectedStatus = document.getElementById('filterStatus').value;

  const container = document.getElementById('tasksContainer');
  container.innerHTML = '';

  const categorySet = new Set();
  let completedCount = 0, pendingCount = 0, dueSoonCount = 0;

  tasks.forEach(task => {
    if (task.category) categorySet.add(task.category);
    if (task.completed) completedCount++;
    else pendingCount++;

    const dueDate = new Date(task.dueDate);
    if (!task.completed && task.dueDate && (dueDate - new Date() < 3 * 24 * 60 * 60 * 1000)) {
      dueSoonCount++;
    }
  });

  document.getElementById('totalTasks').innerText = `Total Tasks: ${tasks.length}`;
  document.getElementById('completedTasks').innerText = `Completed: ${completedCount}`;
  document.getElementById('pendingTasks').innerText = `Pending: ${pendingCount}`;
  document.getElementById('dueSoon').innerText = `Due Soon: ${dueSoonCount}`;

  const categoryDropdown = document.getElementById('filterCategory');
  categoryDropdown.innerHTML = `<option value="">All Categories</option>`;
  categorySet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });

  tasks
    .filter(task => task.title.toLowerCase().includes(searchValue))
    .filter(task => selectedCategory ? task.category === selectedCategory : true)
    .filter(task => {
      if (selectedStatus === 'completed') return task.completed;
      if (selectedStatus === 'pending') return !task.completed;
      return true;
    })
    .forEach(task => {
      const div = document.createElement('div');
      div.className = 'task' + (task.completed ? ' completed' : '');

      div.innerHTML = `
        <strong>${task.title}</strong> (${task.category || 'No category'})<br>
        <small>Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</small><br>
        <small>Priority: ${task.priority || 'Normal'}</small><br>
        Status: ${task.completed ? 'Completed' : 'Pending'}<br>
        <button onclick="toggleComplete(${task.id}, ${!task.completed})">
          Mark as ${task.completed ? 'Pending' : 'Completed'}
        </button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
      container.appendChild(div);
    });
}

async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify({ completed })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': getToken() }
  });
  fetchTasks();
}
