var quizData = [
  {
    question: 'How old is Florin?',
    a: '10',
    b: '17',
    c: '26',
    d: '110',
    correct: 'c',
  },
  {
    question: 'What is the most used programming language in 2019?',
    a: 'Java',
    b: 'Java',
    c: 'Python',
    d: 'Javascript',
    correct: 'd',
  },
  {
    question: 'What does HTML stand for?',
    a: 'Hypertext Markup Language',
    b: 'Cascading Style Sheet',
    c: 'Jason Object Notation',
    d: 'Helicopters Termianls Motorboats Lamborghini',
    correct: 'a',
  },
  {
    question: 'What year was Javascript launched?',
    a: '1996',
    b: '1995',
    c: '1994',
    d: 'None of above',
    correct: 'd',
  },
];
var questionEl = document.getElementById('question');
var a_text = document.getElementById('a_text');
var b_text = document.getElementById('b_text');
var c_text = document.getElementById('c_text');
var d_text = document.getElementById('d_text');
var submitBtn = document.getElementById('submit');

var currentQuiz = 0;

loadQuiz();


function loadQuiz() {
  var currentQuizData = quizData[currentQuiz];
  questionEl.innerHTML = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

submitBtn.addEventListener('click', function todo() {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    // todo: show result
    alert('You finished! Get yourself an Lemonade')
  }
});