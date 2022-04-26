const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const saveButton = document.getElementById("save-btn");
const questionContainerElement = document.getElementById("question-container");
const saveForm = document.getElementById("saveForm");

const unHideForm = document.getElementById("allScores");

let scoreList = document.getElementById("scoreList");

let score = 0;

let savedScores = JSON.parse(localStorage.getItem("highScore"));
if (savedScores === null) {
  savedScores = [];
}
console.log(savedScores);

let shuffledQuestions, currentQuestionsIndex;

const questionElement = document.getElementById("question");

const answerButtonsElement = document.getElementById("answer-buttons");

let timer;

let timeRemaining = 60;

const timeView = document.getElementById("timeDisplay");

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionsIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started quiz, good luck!");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  questionContainerElement.classList.remove("hide");
  currentQuestionsIndex = 0;
  setNextQuestion();
  startTimer();
}

function setNextQuestion() {
  resetState();

  showQuestion(shuffledQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionsIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    gameOver();
  }

  if (correct) {
    score += 1;
  } else {
    onAsnwerWrong();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeRemaining--;
  timeView.innerHTML = timeRemaining + " seconds";
  if (timeRemaining <= 0) {
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(timer);
  gameOver();
}

function onAsnwerWrong() {
  timeRemaining -= 10;
  if (timeRemaining < 0) {
    timeRemaining = 0;
  }
  timeView.innerHTML = timeRemaining + " seconds";
}

function gameOver() {
  startButton.classList.add("hide");
  nextButton.classList.add("hide");
  saveButton.classList.remove("hide");
  saveForm.classList.remove("hide");
  unHideForm.classList.remove("hide");

  questionContainerElement.classList.add("hide");

  document.getElementById("scoreDisplay").innerText =
    "Your score was: " + score;
}

saveButton.addEventListener("click", saveScore);

function saveScore() {
  console.log("hey");
  const scoresAndInitials = {
    initials: document.getElementById("initialsInput").value,
    score: score,
  };

  savedScores.push(scoresAndInitials);
  localStorage.setItem("highScore", JSON.stringify(savedScores));
}

function updateScoreList() {
  savedScores.forEach(function (savedScore) {
    const scoreChild = document.createElement("li");
    scoreList.appendChild(scoreChild);
    console.log(savedScore);
    scoreChild.innerText = savedScore.initials + " " + savedScore.score;
  });
}

updateScoreList();

const questions = [
  {
    question: "what does HTML stand for",
    answers: [
      { text: "hefty tomato man limping", correct: false },
      { text: "hairy manchild taco lounge", correct: false },
      { text: "Hypertext Markup Language", correct: true },
      { text: "help Terence meet ladies", correct: false },
    ],
  },
  {
    question: "Do you have to be good at math to be a developer?",
    answers: [
      { text: "yes", correct: false },
      { text: "no", correct: true },
    ],
  },
  {
    question: "Java is short for JavaScript the programming language",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
    ],
  },
  {
    question: "How do you change directory in the console",
    answers: [
      { text: "cd", correct: true },
      { text: "switch", correct: false },
      { text: "migrate", correct: false },
      { text: "change-Directory", correct: false },
    ],
  },
  {
    question: "How you look for an element in the DOM using JS",
    answers: [
      { text: "queryselector", correct: false },
      { text: "getElementByID", correct: false },
      { text: "getElementByClass", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];
