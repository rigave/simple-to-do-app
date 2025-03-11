// Select elements
const addTaskBtn = document.querySelector(".row button");
const taskInput = document.getElementById("input-box");
const taskListContainer = document.getElementById("list__container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskListContainer.innerHTML = ""; // Clear list before re-rendering

  tasks.forEach((task, index) => {
    const newItem = document.createElement("li");
    newItem.textContent = task.text;

    // Apply "checked" class if the task is checked
    if (task.checked) {
      newItem.classList.add("checked");
    }

    // Toggle "checked" class and update the task's state when clicked
    newItem.addEventListener("click", () => {
      newItem.classList.toggle("checked");
      tasks[index].checked = newItem.classList.contains("checked"); // Update the task's checked state
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
    });

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    newItem.appendChild(deleteBtn);
    taskListContainer.appendChild(newItem);
  });

  // Save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const newTask = taskInput.value.trim();
  if (!newTask) {
    alert("Enter the task!!!");
    return;
  }

  tasks.push({ text: newTask, checked: false }); // Store task as an object
  taskInput.value = ""; // Clear input field
  renderTasks(); // Re-render list
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(); // Update list
}

// Event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);

// Event listener for "Enter" key press
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

// Render tasks when page loads (for localStorage support)
renderTasks();
