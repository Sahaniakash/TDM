// DOM Elements
const taskList = document.getElementById("taskList")
const addTaskBtn = document.getElementById("addTaskBtn")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("closeModal")
const taskForm = document.getElementById("taskForm")
const filterTasks = document.getElementById("filterTasks")

// Task array to store all tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// Event Listeners
addTaskBtn.addEventListener("click", openModal)
closeModal.addEventListener("click", closeModalFunction)
taskForm.addEventListener("submit", addTask)
filterTasks.addEventListener("change", filterTaskList)

// Functions
function openModal() {
  modal.style.display = "block"
}

function closeModalFunction() {
  modal.style.display = "none"
  taskForm.reset()
}

function addTask(e) {
  e.preventDefault()

  const newTask = {
    id: Date.now(),
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    dueDate: document.getElementById("taskDueDate").value,
    priority: document.getElementById("taskPriority").value,
    status: "pending",
  }

  tasks.push(newTask)
  saveTasks()
  renderTasks()
  closeModalFunction()
}

function renderTasks() {
  taskList.innerHTML = ""
  tasks.forEach((task) => {
    const taskCard = document.createElement("div")
    taskCard.classList.add("task-card", `status-${task.status}`, `priority-${task.priority}`)
    taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <p>Status: ${task.status}</p>
            <div class="task-actions">
                <button onclick="changeStatus(${task.id})">Change Status</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `
    taskList.appendChild(taskCard)
  })
}

function changeStatus(id) {
  const task = tasks.find((task) => task.id === id)
  const statuses = ["pending", "in-progress", "completed"]
  const currentIndex = statuses.indexOf(task.status)
  task.status = statuses[(currentIndex + 1) % statuses.length]
  saveTasks()
  renderTasks()
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id)
  saveTasks()
  renderTasks()
}

function filterTaskList() {
  const filter = filterTasks.value
  if (filter === "all") {
    renderTasks()
  } else {
    const filteredTasks = tasks.filter((task) => task.status === filter)
    taskList.innerHTML = ""
    filteredTasks.forEach((task) => {
      const taskCard = document.createElement("div")
      taskCard.classList.add("task-card", `status-${task.status}`, `priority-${task.priority}`)
      taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Priority: ${task.priority}</p>
                <p>Status: ${task.status}</p>
                <div class="task-actions">
                    <button onclick="changeStatus(${task.id})">Change Status</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `
      taskList.appendChild(taskCard)
    })
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Initial render
renderTasks()

