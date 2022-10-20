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
var questionTextEl = document.querySelector("h2");
var scoreTextEl = document.querySelector("#scoreText");
var answerOneEl = document.querySelector("#answer-one");
var answerTwoEl = document.querySelector("#answer-two");
var answerThreeEl = document.querySelector("#answer-three");
var answerFourEl = document.querySelector("#answer-four");
var clickedAnswerEl = document.querySelector(".answerButtons");

// Quiz state
var selectedAnswer = "";
var buttonClicked = "";
var quizProgress = 0;
// Placeholder value for score
var scoreValue = 0;

function hideQuiz() {
  document.getElementById("answer-one").style.display = "none";
  document.getElementById("answer-two").style.display = "none";
  document.getElementById("answer-three").style.display = "none";
  document.getElementById("answer-four").style.display = "none";
}

function renderQuiz() {
  if (quizProgress < listQuestions.length) {
    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("answer-one").style.display = "block";
    document.getElementById("answer-two").style.display = "block";
    document.getElementById("answer-three").style.display = "block";
    document.getElementById("answer-four").style.display = "block";
    questionTextEl.textContent = listQuestions[quizProgress].question;
    answerOneEl.textContent = listQuestions[quizProgress].answerone;
    answerTwoEl.textContent = listQuestions[quizProgress].answertwo;
    answerThreeEl.textContent = listQuestions[quizProgress].answerthree;
    answerFourEl.textContent = listQuestions[quizProgress].answerfour;
  } else {
    hideQuiz();
    questionTextEl.textContent = "All Done!";
    scoreTextEl.textContent = "Your score is " + scoreValue + "!";
  }
}

function validateAnswer() {
  if (selectedAnswer == listQuestions[quizProgress].correctAnswer) {
    console.log("CORRECT");
    scoreValue += 5;
  } else {
    console.log("INCORRECT");
  }
  quizProgress++;
}

// Funtion will be called when the page loads
function init() {
  hideQuiz();
}

///////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////////////////////////////////////////////

// Listens for clicks on the start button to begin the quiz
startQuizEl.addEventListener("click", function () {
  renderQuiz();
});

// Listens for clicks and saves the selected answer to validate in the answer function
clickedAnswerEl.addEventListener("click", function (event) {
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
///////////////////////////////////////////////////////////////////////////////////////

// Calls init to hide the quiz when the page is loaded
init();
