var appendChild = R.invoker(1, 'appendChild');

var form = document.getElementById('form');
var input = document.getElementById('input');
var todosWrapper = document.getElementById('todos');

getLS();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodoFromInput();
});

function addTodo(text = '', completed = false) {
  var todoEl = document.createElement('li');
  todoEl.innerText = text;

  if (completed) {
    todoEl.classList.add('completed');
  }
  todoEl.addEventListener('click', () => {
    todoEl.classList.toggle('completed')
    updateLS();
  });

  todoEl.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    todoEl.remove();
    updateLS();
  });

  return todoEl;
}

var addTodoFromInput = R.pipe(
  R.partial( R.prop )(['value', input]),
  addTodo,
  appendChild( R.__, todosWrapper ),
  updateLS,
  clearInput
);

function updateLS() {
  var todosEl = document.querySelectorAll('li');
  var todos = [];
  todosEl.forEach(noteEl => {
    todos.push({
      text: noteEl.innerText,
      completed: noteEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLS() {
  var todos = JSON.parse( localStorage.getItem('todos') ) || [];
  todos.forEach(todo => {
    var todoEl = addTodo(todo.text, todo.completed);
    todosWrapper.appendChild(todoEl);
  });
}

function clearInput() {
  input.value = '';
}