const quizFormEl = document.getElementById("quiz-form");
const courseCdEl = document.getElementById("crs-code");
const quesNumEl = document.getElementById("ques-num");

const questionFormEl = document.getElementById("ques-quiz");
const counterEl = document.getElementById("counter");
const questionEl = document.getElementById("question");
const optionTxtA = document.getElementById("opt-txt-a");
const optionTxtB = document.getElementById("opt-txt-b");
const optionTxtC = document.getElementById("opt-txt-c");
const optionTxtD = document.getElementById("opt-txt-d");
const optionChkA = document.getElementById("opt-chk-a");
const optionChkB = document.getElementById("opt-chk-b");
const optionChkC = document.getElementById("opt-chk-c");
const optionChkD = document.getElementById("opt-chk-d");

let questions;

let courseCdVal;
let quesNumVal;

let counterNum = 0;

let score = 0;

quizFormEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  courseCdVal = courseCdEl.value;
  quesNumVal = +quesNumEl.value;

  if (!courseCdVal || !quesNumVal) {
    alert("Invalid input entered");
    return;
  }

  const res = await fetch("http://127.0.0.1:3000/question/get-one", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseCode: courseCdVal,
    }),
  });

  const decodedRes = await res.json();

  if (decodedRes.message) {
    alert(decodedRes.message);
    return;
  }

  if (!(decodedRes.question < 1)) {
    questions = decodedRes.question;
    console.log(questions);
    startQuiz();
    return;
  }

  alert("Unidentified error occurred");
});

questionFormEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "A" &&
    optionChkA.checked === true
  ) {
    score++;
    optionChkA.checked === false;
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "B" &&
    optionChkB.checked === true
  ) {
    score++;
    optionChkB.checked === false;
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "C" &&
    optionChkC.checked === true
  ) {
    score++;
    optionChkC.checked === false;
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "D" &&
    optionChkD.checked === true
  ) {
    score++;
    optionChkD.checked === false;
  }

  showQuestion(++counterNum);
});

function startQuiz() {
  quizFormEl.style.display = "none";
  questionFormEl.style.display = "flex";

  showQuestion(++counterNum);
}

function showQuestion(numToShow) {
  if (numToShow > questions.length) {
    alert(`You scored ${score}/${questions.length}`);
    window.location = "http://127.0.0.1:5555/frontend/student";
  }

  questionEl.textContent = questions[numToShow - 1].question;
  optionTxtA.textContent = questions[numToShow - 1].optionA;
  optionTxtB.textContent = questions[numToShow - 1].optionB;
  optionTxtC.textContent = questions[numToShow - 1].optionC;
  optionTxtD.textContent = questions[numToShow - 1].optionD;
}
