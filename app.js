// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

const categorySelect = document.getElementById('category-select');

// Store tasks in an object with categories as keys
const tasks = {
  work: [],
  personal: [],
  shopping: [],
  study: [],
};

// Function to scroll to the bottom of the container
function scrollToBottom(box) {
  box.scrollTop = box.scrollHeight;
}

// Handle form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskTitle = todoInput.value.trim();
  const selectedCategory = categorySelect.value;

  if (taskTitle !== '' && selectedCategory in tasks) {
    addTask(selectedCategory, taskTitle);
    todoInput.value = '';
    scrollToBottom(document.querySelector(`.${selectedCategory}-box`)); // Pass the corresponding box
  }
});

// Function to add a task
function addTask(category, title) {
  const task = {
    title: title,
    completed: false,
  };

  tasks[category].push(task);
  renderTasks(category);
}

// Render tasks in the list
function renderTasks(category) {
  const ul = document.getElementById(`${category}-list`);
  ul.innerHTML = '';

  tasks[category].forEach(function(task, index) {
    const li = document.createElement('li');
    li.textContent = task.title;

    if (task.completed) {
      li.classList.add('completed');
    }

    li.addEventListener('click', function() {
      task.completed = !task.completed;
      renderTasks(category);
    });

    ul.appendChild(li);
  });
}

// event listener for all "Clear" buttons
document.querySelectorAll('.clear').forEach(function(clearButton) {
  clearButton.addEventListener('click', function() {
    const category = clearButton.getAttribute('data-category');
    clearCategory(category);
  });
});

// Function to clear a specific category
function clearCategory(category) {
  tasks[category] = []; // Clear the tasks in the specified category
  renderTasks(category); // Re-render the tasks (which will be empty)
}