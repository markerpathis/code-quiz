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
  },
  {
    question: "Text goes here 1",
    answerone: "answer one 1",
    answertwo: "answer two 1",
    answerthree: "answer three 1",
    answerfour: "answer four 1",
  },
  {
    question: "Text goes here 2",
    answerone: "answer one 2",
    answertwo: "answer two 2",
    answerthree: "answer three 2",
    answerfour: "answer four 2",
  },
];


// Hooks to the UI
var containerEl = document.querySelector(".container");
var startQuizEl = document.querySelector("#startQuiz");
var questionTextEl = document.querySelector("h2");
var answerOneEl = document.querySelector("#answer-one");
var answerTwoEl = document.querySelector("#answer-two");
var answerThreeEl = document.querySelector("#answer-three");
var answerFourEl = document.querySelector("#answer-four");


// Quiz state
var startStatus = false;

// Hides answer buttons before the quiz starts
if (!startStatus) {
  document.getElementById("answer-one").style.display = "none";
  document.getElementById("answer-two").style.display = "none";
  document.getElementById("answer-three").style.display = "none";
  document.getElementById("answer-four").style.display = "none";
}

// Shows the answers and question text when the quiz is started
startQuizEl.addEventListener("click", function () {
  startStatus = true;
  if (startStatus) {
    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("answer-one").style.display = "block";
    document.getElementById("answer-two").style.display = "block";
    document.getElementById("answer-three").style.display = "block";
    document.getElementById("answer-four").style.display = "block";
    questionTextEl.textContent = listQuestions[0].question;
    answerOneEl.textContent = listQuestions[0].answerone;
    answerTwoEl.textContent = listQuestions[0].answertwo;
    answerThreeEl.textContent = listQuestions[0].answerthree;
    answerFourEl.textContent = listQuestions[0].answerfour;
  }
});
