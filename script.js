document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">削除</button>
  `;

  taskItem.addEventListener("click", toggleComplete);
  taskItem.querySelector(".delete-btn").addEventListener("click", deleteTask);

  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = "";
}

function toggleComplete(event) {
  if (event.target.classList.contains("delete-btn")) return;
  event.currentTarget.classList.toggle("completed");
  saveTasks();
}

function deleteTask(event) {
  event.currentTarget.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((taskItem) => {
    tasks.push({
      text: taskItem.querySelector(".task-text").textContent,
      completed: taskItem.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">削除</button>
    `;

    if (task.completed) taskItem.classList.add("completed");

    taskItem.addEventListener("click", toggleComplete);
    taskItem.querySelector(".delete-btn").addEventListener("click", deleteTask);

    taskList.appendChild(taskItem);
  });
}
