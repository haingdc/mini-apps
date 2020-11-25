var form = document.getElementById('form');
var input = document.getElementById('input');
var todos = document.getElementById('todos');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  var todoText = input.value;

  if (todoText) {
    var todoEl = document.createElement('li');
    todoEl.innerText = todoText;
    todos.appendChild(todoEl);

    input.value = '';

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      todoEl.remove();
    });
  }
});