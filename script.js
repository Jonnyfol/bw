const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];


let questionTimer;

// avvia il timer per ogni domanda
function startQuestionTimer() {
  questionTimer = setTimeout(() => {
    nextQuestion();//passo alla prossima, ma non funziona!!!
  }, 5000); // 5 secondi
}


// Aggiungi questa funzione per resettare il timer ad ogni nuova domanda
function resetQuestionTimer() {
  clearTimeout(questionTimer);
  startQuestionTimer();
}



//le due veriabili principali
let score = 0;
let questionNumber = 0;

//parte premendo il tasto procedi
function startTest() {
if (document.getElementById("trusty").checked) {
document.getElementById("main").style.display = "none";
document.getElementById("quiz").style.display = "block";
showQuest();
startQuestionTimer(); // Avvia il timer per la prima domanda
}
}



//la funzione principlae che mostra le domande e le risposte
function showQuest () {
let question = document.getElementById("question");
let answer1 = document.getElementById("primo");
let answer2 = document.getElementById("secondo");
let answer3 = document.getElementById("terzo");
let answer4 = document.getElementById("quarto");


if (questionNumber < questions.length) {
  question.innerText = questions[questionNumber].question;

  let correctAnswer = questions[questionNumber].correct_answer;
  //let incorrectAnswers = questions[questionNumber].incorrect_answers;

  // Combina le risposte corrette e sbagliate in un array
  let allAnswers = [correctAnswer].concat(questions[questionNumber].incorrect_answers);

  //mescola random le risposte
  allAnswers = toRandomArray(allAnswers);

  //gestione caso in cui la domanda preveda solo due risposte
  if (questions[questionNumber].type === "multiple") {
    answer3.style.display = "block"; //impostiamo il block così qualora la domanda mostrata precedentemente era ELSE, le opzioni tornano visibili
    answer4.style.display = "block";
    answer1.innerText = allAnswers[0];
    answer2.innerText = allAnswers[1];
    answer3.innerText = allAnswers[2];
    answer4.innerText = allAnswers[3];
  } else {
    answer1.innerText = allAnswers[0];
    answer2.innerText = allAnswers[1];
    answer3.style.display = "none";
    answer4.style.display = "none";
  }  

  startQuestionTimer();

  resetQuestionTimer();

   // Aggiungi un evento di ascolto per gestire la risposta dell'utente
  let answerInputs = document.getElementsByClassName("answer");
    // tolgo un listener per ogni input di classe 'answer'
    for (let i = 0; i < answerInputs.length; i++) {
      answerInputs[i].checked = false;
    }

    // Aggiungi un listener per ogni input di classe 'answer'   
    for (let i = 0; i < answerInputs.length; i++) {
    answerInputs[i].addEventListener("click", checkAnswer); // do un evento di ascolto a ogni input di classe answer QUI CE IL BUG
    }
  } else {
  showResult()
}
}




// Funzione per mescolare casualmente un array utilizzando la funzione sort con logica di confronto casuale
function toRandomArray(array) {
  let mixedArray = [];
  while (array.length > 0) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomElement = array.splice(randomIndex, 1)[0];
    mixedArray.push(randomElement);
  }
  return mixedArray;
}

//funzione per vedere se la risposta è corretta
function checkAnswer(event) {
let userAnswer = event.target.nextElementSibling.textContent; // Ottieni la risposta selezionata dall'utente

// Verifica se la risposta dell'utente è corretta
if (userAnswer === questions[questionNumber].correct_answer) {
score ++; // Incrementa il punteggio se la risposta è corretta
}

questionNumber++; // Passa alla prossima domanda

resetQuestionTimer();

let nextButton = document.getElementById("nextQuestion");
nextButton.style.display = "block"; // Mostra il pulsante "Next Question"

resetQuestionTimer();
}

//quando premi il tasto next question scompare il bottone e fa ripartire la funzione principale delle domande e risposte
function nextQuestion() {
let nextButton = document.getElementById("nextQuestion");
nextButton.style.display = "none"; // Nascondi il pulsante "Next Question"
if (questionNumber < questions.length - 1) {
  questionNumber++; // Passa alla prossima domanda
  showQuest(); // Mostra la prossima domanda
} else {
  showResult(); // Mostriamo il risultato finale se abbiamo completato tutte le domande
}
}
showQuest(); // Mostra la prossima domanda
resetQuestionTimer(); // Resetta il timer per la domanda successiva



//funzione del risultato
function showResult() {
document.getElementById("quiz").style.display = "none";

// Mostra solo il punteggio finale
let result = document.createElement("h2");
result.innerText = "This is your finale score: " + score;
result.classList.add("newH2");
document.body.appendChild(result);
}












/*

il bottone
lo score
mettere 2 a 2 le risp e adattarle alla lung della domanda

*/