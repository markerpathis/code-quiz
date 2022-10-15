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


// Hooks to the UI
var startQuizEl = document.querySelector("#startQuiz");

// Quiz state
var startStatus = false;
