const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('#todos');
let todos = [];

if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
  for (todo of todos) {
    createTodoListItem(todo);
  }
}

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!todoInput.value) return;
  const newTodo = {todo: todoInput.value, done: false};
  createTodoListItem(newTodo);
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.value = '';
});

todoList.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('done');
    for (item of todos) {
      if (event.target.innerText.slice(-event.target.innerText.length, -2) === item.todo) {
        item.done = !item.done;
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  } else if (event.target.tagName === 'BUTTON') {
    const todoParentText = event.target.parentElement.innerText;
    let removeTodoIndex = null;
    for (const [index, item] of todos.entries()) {
      if (todoParentText.slice(-todoParentText.length, -2) === item.todo) {
        removeTodoIndex = index;
      }
    }
    todos.splice(removeTodoIndex, 1);
    event.target.parentElement.remove();
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});

function createTodoListItem(item) {
  const todoItem = document.createElement('li');
  const btn = document.createElement('button');
  todoItem.className = 'todo';
  if (item.done) {
    todoItem.classList.add('done');
  }
  todoItem.innerText = item.todo;
  btn.innerText = 'x';
  todoItem.append(btn);
  todoList.append(todoItem);
}