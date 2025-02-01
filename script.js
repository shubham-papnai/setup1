// script.js

// Select DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Add event listener to the "Add" button
addBtn.addEventListener('click', addTodo);

// Function to add a new todo item
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new list item
  const li = document.createElement('li');

  // Add task text
  li.textContent = taskText;

  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
  });

  // Mark task as completed when clicked
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Append delete button to the list item
  li.appendChild(deleteBtn);

  // Append the list item to the todo list
  todoList.appendChild(li);

  // Clear the input field
  todoInput.value = '';
}

// Allow pressing "Enter" key to add a task
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});