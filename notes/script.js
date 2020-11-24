var editBtn = document.querySelector('.edit');
var deleteBtn = document.querySelector('.delete');
var notesEl = document.querySelector('.notes');

var main = notesEl.querySelector('.main');
var textArea = notesEl.querySelector('textarea');

editBtn.addEventListener('click', () => {
  main.classList.toggle('hidden');
  textArea.classList.toggle('hidden');
});

textArea.addEventListener('input', function todo(e) {
  var { value } = e.target;
  main.innerHTML = marked(value);
});