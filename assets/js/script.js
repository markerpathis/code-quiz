///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//WELCOME TO FULL STACK FUED! The coding quiz game.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML container to be set up that holds the main content on the page (centered)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Timer should be available at the top right corner of the page
// Timer starts when Start Quiz is selected (75 seconds)
// Time on the timer naturally counts down at 1 second (1000ms)
// Tiem on the timer is subtracted when a question is answered incorrectly (unspecified amount)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Highscores link should be available at the top left corner of the page

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// When start quiz is selected, the h1 text changes to the question text
// When start quiz is selected, content is aligned on the left, instead of in the center
// When start quiz is selected, the buttons with the answer options are displayed in a list (block?)
// Question text and header text are saved in an array or object, defaulting to index 0 when quiz status isn't started
// Logic is needed to validate if the correct answer is selected
// Message is shown below the answers if you got the answer correct or not
// If correct, go to the next question and points are awarded
// If incorrect, time subtracts (unspecified)
// When time is 0, show message that the quiz is over with the score and text box to submit initials
// High scores page will be shown after initials are submitted

// Questions
var listQuestions = [
  {
    question: "Text goes here 0",
    answerone: "answer one 0",
    answertwo: "answer two 0",
    answerthree: "answer three 0",
    answerfour: "answer four 0",
    correctAnswer: "answer-one",
  },
  {
    question: "Text goes here 1",
    answerone: "answer one 1",
    answertwo: "answer two 1",
    answerthree: "answer three 1",
    answerfour: "answer four 1",
    correctAnswer: "answer-two",
  },
  {
    question: "Text goes here 2",
    answerone: "answer one 2",
    answertwo: "answer two 2",
    answerthree: "answer three 2",
    answerfour: "answer four 2",
    correctAnswer: "answer-three",
  },
];

// Hooks to the UI
// var containerEl = document.querySelector(".container");
var startQuizEl = document.querySelector("#startQuiz");
var restartQuizEl = document.querySelector("#restartQuiz");
var questionTextEl = document.querySelector("#questionText");
var scoreTextEl = document.querySelector("#scoreText");
var answerButtonsEl = document.querySelector(".answerButtons");
var answerOneEl = document.querySelector("#answer-one");
var answerTwoEl = document.querySelector("#answer-two");
var answerThreeEl = document.querySelector("#answer-three");
var answerFourEl = document.querySelector("#answer-four");
var timerEl = document.querySelector("#timer");
var initialsInputEl = document.querySelector("#initials-input");
var initialsFormEl = document.querySelector("#initials-form");
var leaderboardListEl = document.querySelector("#leaderboard-list");

// Quiz state
var selectedAnswer = "";
var buttonClicked = "";
var quizProgress = 0;
// Placeholder value for score
var scoreValue = 0;
// var secondsLeft = 101;
var secondsLeft = 21;
var leaderboard = [];

function hideQuiz() {
  answerButtonsEl.style.display = "none";
  timerEl.style.display = "none";
  restartQuizEl.style.display = "none";
}

function hideInitialsForm() {
  initialsFormEl.style.display = "none";
  questionTextEl.textContent = "";
  scoreTextEl.textContent = "";
}

function renderInitialsForm() {
  initialsFormEl.style.display = "block";
  questionTextEl.textContent = "All Done!";
  scoreValue = secondsLeft;
  scoreTextEl.textContent = "Your score is " + scoreValue + "!";
}

function renderQuiz() {
  if (quizProgress < listQuestions.length) {
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

function validateAnswer() {
  if (selectedAnswer == listQuestions[quizProgress].correctAnswer) {
  } else {
    secondsLeft = secondsLeft - 10;
  }
  quizProgress++;
}

function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    if (secondsLeft > 0 && quizProgress < listQuestions.length) {
      timerEl.style.display = "block";
      timerEl.textContent = "Time remaining: " + secondsLeft;
    } else if (secondsLeft === 0) {
      hideQuiz();
      clearInterval(timerInterval);
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function storeLeaderboardEntry() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function retreiveLeaderboard() {
  var storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
  if (storedLeaderboard !== null) {
    leaderboard = storedLeaderboard;
    // Sorts the array in descending order based on score
    leaderboard.sort(function (a, b) {
      return b.score - a.score;
    });
    console.log(leaderboard);
  }
}

function renderLeaderboard() {
  leaderboardListEl.innerHTML = "";
  for (var i = 0; i < leaderboard.length; i++) {
    var entry = leaderboard[i].initials + " - " + leaderboard[i].score;
    var li = document.createElement("li");
    li.textContent = entry;
    leaderboardListEl.appendChild(li);
  }
  restartQuizEl.style.display = "block";
}

// Funtion will be called when the page loads
function init() {
  hideQuiz();
  hideInitialsForm();
  retreiveLeaderboard();
}

///////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////////////////////////////////////////////

// Listens for clicks on the start button to begin the quiz
startQuizEl.addEventListener("click", function () {
  timerEl.textContent = "Great ready, timer starting now!";
  timer();
  renderQuiz();
});

// Listens for clicks and saves the selected answer to validate in the answer function
answerButtonsEl.addEventListener("click", function (event) {
  var buttonClicked = event.target;

  if (buttonClicked.matches("button")) {
    console.log("Answer Selected ID: " + buttonClicked.id);
    selectedAnswer = buttonClicked.id;
    // Checks if the selected answer is correct or not
    validateAnswer();
    // Updates the quiz questions being shown
    renderQuiz();
  }
});

initialsFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  var initialsText = initialsInputEl.value.trim();
  console.log(initialsText);
  if (initialsText === "") {
    return;
  }
  var leaderboardEntry = { initials: initialsText, score: scoreValue };
  console.log(leaderboardEntry);
  leaderboard.push(leaderboardEntry);
  console.log(leaderboard);
  storeLeaderboardEntry();
  retreiveLeaderboard();
  hideInitialsForm();
  renderLeaderboard();
});

restartQuizEl.addEventListener("click", function () {
  quizProgress = 0;
  secondsLeft = 21;
  leaderboardListEl.style.display = "none";
  timerEl.textContent = "Great ready, timer starting now!";
  timer();
  renderQuiz();
});

///////////////////////////////////////////////////////////////////////////////////////

// Calls init to hide the quiz when the page is loaded
init();
