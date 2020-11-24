var addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote() {
  var note =document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <div class="tools">
      <button class="edit"> <i class="fas fa-edit"></i> </button>
      <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>
    <div class="main hidden"></div>
    <textarea></textarea>
  `;
  document.body.appendChild(note);

  var editBtn = note.querySelector('.edit');
  var deleteBtn = note.querySelector('.delete');

  var main = note.querySelector('.main');
  var textArea = note.querySelector('textarea');

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', function todo(e) {
    var { value } = e.target;
    main.innerHTML = marked(value);
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();
  });
}