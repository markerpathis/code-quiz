///////////////////////////////////////////////////////////////////////////////////////
// Questions and Answers for the Quiz
///////////////////////////////////////////////////////////////////////////////////////
// Array used for the quiz text and correct answer
var listQuestions = [
  {
    question:
      "JavaScript is a programming language that adds __________ to your sebsite.",
    answerone: "structure",
    answertwo: "style",
    answerthree: "interactivity",
    answerfour: "none of the above",
    correctAnswer: "answer-three",
  },
  {
    question:
      "Where is the best place to link a JavaScript file to your web application?",
    answerone: "index.html - before the css style sheet",
    answertwo: "CSS stylesheet - listed at the top",
    answerthree: "terminal - using JS clone",
    answerfour: "index.html - before the closing body tag",
    correctAnswer: "answer-four",
  },
  {
    question:
      "Which of the following expressions uses an incorrect logical operator?",
    answerone: "var expression1 = (a === b)",
    answertwo: "var expression1 = (a !== b)",
    answerthree: "var expression1 = (a ~ b)",
    answerfour: "var expression1 = (a % b)",
    correctAnswer: "answer-three",
  },
  {
    question:
      "The Document methods querySelector() and querySelectorAll(), use __________ to specify what you would like to hook to in your HTML file.",
    answerone: "CSS selectors",
    answertwo: "data attributes",
    answerthree: "local storage",
    answerfour: "none of the above",
    correctAnswer: "answer-one",
  },
  {
    question:
      "__________ is a JavaScript method that you could use to make something happen on the page if the user clicks a specific element.",
    answerone: "querySelector()",
    answertwo: "addEventListener()",
    answerthree: "innerHTML()",
    answerfour: "push()",
    correctAnswer: "answer-two",
  },
];

///////////////////////////////////////////////////////////////////////////////////////
// Hooks to the UI
///////////////////////////////////////////////////////////////////////////////////////
// Container for the quiz content and leaderboard
var containerEl = document.querySelector(".container");
// Buttons
var startQuizEl = document.querySelector("#startQuiz");
var restartQuizEl = document.querySelector("#restartQuiz");
var answerButtonsEl = document.querySelector(".answerButtons");
// Question text, answer text, message to print to user
var questionTextEl = document.querySelector("#questionText");
var answerOneEl = document.querySelector("#answer-one");
var answerTwoEl = document.querySelector("#answer-two");
var answerThreeEl = document.querySelector("#answer-three");
var answerFourEl = document.querySelector("#answer-four");
// Other text the user will see (intro, score, leaderboard, finished message)
var scoreTextEl = document.querySelector("#scoreText");
var leaderboardListEl = document.querySelector("#leaderboard-list");
var finishedMessageEl = document.querySelector("#finishedMessage");
var scoreMessageEl = document.querySelector("#scoreMessage");
var introTextEl = document.querySelector("#introText");
// Timer
var timerEl = document.querySelector("#timer");
// Initials form for leaderboard
var initialsInputEl = document.querySelector("#initials-input");
var initialsFormEl = document.querySelector("#initials-form");

///////////////////////////////////////////////////////////////////////////////////////
// JavaScript Variables
///////////////////////////////////////////////////////////////////////////////////////
// Quiz state variables
var quizProgress = 0;
var selectedAnswer = "";
// Placeholder value for score, which will later take the value of secondsLeft after the quiz ends
var scoreValue = 0;
// Starting time for the timer
var secondsLeft = 61;
// Array to populate the leaderboard using local storage
var leaderboard = [];

///////////////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////////////
// When called, the quiz content will be hidden (before the quiz starts or after it ends)
function hideQuiz() {
  answerButtonsEl.style.display = "none";
  timerEl.style.display = "none";
  restartQuizEl.style.display = "none";
}

// When called, the initials form will be hidden
function hideInitialsForm() {
  initialsFormEl.style.display = "none";
  questionTextEl.textContent = "";
  scoreTextEl.textContent = "";
}

// When called, the initials form will be shown to the user along with their score
function renderInitialsForm() {
  initialsFormEl.style.display = "block";
  questionTextEl.textContent = "";
  finishedMessageEl.textContent = "All Done!";
  scoreValue = secondsLeft;
  scoreTextEl.textContent = "Your score is " + scoreValue + "!";
}

// When called, the quiz questions and answer buttons will be shown to the user. The content will update based on quizProgress
function renderQuiz() {
  if (quizProgress < listQuestions.length && secondsLeft > 0) {
    startQuizEl.style.display = "none";
    restartQuizEl.style.display = "none";
    answerButtonsEl.style.display = "block";
    timerEl.style.display = "block";
    questionTextEl.textContent = listQuestions[quizProgress].question;
    answerOneEl.textContent = listQuestions[quizProgress].answerone;
    answerTwoEl.textContent = listQuestions[quizProgress].answertwo;
    answerThreeEl.textContent = listQuestions[quizProgress].answerthree;
    answerFourEl.textContent = listQuestions[quizProgress].answerfour;
  } else {
    hideQuiz();
    renderInitialsForm();
  }
}

// When called, if the selected answer does not match correct Answer in the array, 10 seconds will be lost on the timer. Regardless of correct or incorrect, this progresses the quizProgress
function validateAnswer() {
  if (selectedAnswer == listQuestions[quizProgress].correctAnswer) {
  } else {
    secondsLeft = secondsLeft - 10;
  }
  quizProgress++;
}

// Timer for the quiz, hides quiz content if timer reaches 0 and renders the initials form
function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    if (secondsLeft > 0 && quizProgress < listQuestions.length) {
      timerEl.style.display = "block";
      timerEl.textContent = "Time remaining: " + secondsLeft;
    } else if (secondsLeft < 1) {
      hideQuiz();
      clearInterval(timerInterval);
      renderInitialsForm();
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Stringify and set key in localStorage to leaderboard array
function storeLeaderboardEntry() {
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Retreives leaderboard entries from local storage and sorts in descending order
function retreiveLeaderboard() {
  var storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
  if (storedLeaderboard !== null) {
    leaderboard = storedLeaderboard;
    leaderboard.sort(function (a, b) {
      return b.score - a.score;
    });
  }
}

// When called, shows the high score leaderboard on the screen
function renderLeaderboard() {
  leaderboardListEl.style.display = "block";
  finishedMessageEl.textContent = "High Score Leaderboard";
  leaderboardListEl.innerHTML = "";
  for (var i = 0; i < leaderboard.length; i++) {
    var entry = leaderboard[i].initials + " - " + leaderboard[i].score;
    var li = document.createElement("li");
    li.textContent = entry;
    leaderboardListEl.appendChild(li);
  }
  restartQuizEl.style.display = "block";
}

///////////////////////////////////////////////////////////////////////////////////////
// Init Function
///////////////////////////////////////////////////////////////////////////////////////
// Will be called when the page loads
function init() {
  hideQuiz();
  hideInitialsForm();
  retreiveLeaderboard();
}

///////////////////////////////////////////////////////////////////////////////////////
// Event Listeners
///////////////////////////////////////////////////////////////////////////////////////

// Listens for clicks on the start button to begin the quiz
startQuizEl.addEventListener("click", function () {
  introTextEl.textContent = "";
  timerEl.textContent = "Great ready, timer starting now!";
  timer();
  renderQuiz();
});

// Listens for clicks and saves the selected answer to validate in the validateAnswer function
answerButtonsEl.addEventListener("click", function (event) {
  var buttonClicked = event.target;

  if (buttonClicked.matches("button")) {
    selectedAnswer = buttonClicked.id;
    // Checks if the selected answer is correct or not
    validateAnswer();
    // Updates the quiz questions being shown
    renderQuiz();
  }
});

// Listens for if the user submits their initials on the initals form
initialsFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  var initialsText = initialsInputEl.value.trim();
  if (initialsText === "") {
    return;
  }
  var leaderboardEntry = { initials: initialsText, score: scoreValue };
  leaderboard.push(leaderboardEntry);
  // stores the entry, retreives other entries from local storage, then hides the form and renders the leaderboard
  storeLeaderboardEntry();
  retreiveLeaderboard();
  hideInitialsForm();
  renderLeaderboard();
});

// Listens for clicks to restart the quiz
restartQuizEl.addEventListener("click", function () {
  quizProgress = 0;
  secondsLeft = 61;
  leaderboardListEl.style.display = "none";
  finishedMessageEl.textContent = "";
  timerEl.textContent = "Great ready, timer starting now!";
  timer();
  renderQuiz();
});

// Calls the init function for when the page is loaded
init();
