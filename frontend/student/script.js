const quizFormEl = document.getElementById("quiz-form");
const courseCdEl = document.getElementById("crs-code");

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

let questions, lecturerID;

let courseCdVal;

let counterNum = 0;

let score = 0;

const studentID = localStorage.getItem("id") || "";
const type = localStorage.getItem("type");

if (!type || type.toLowerCase() != "student") {
  window.location = "/";
}

quizFormEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  courseCdVal = courseCdEl.value;

  if (!courseCdVal) {
    alert("Invalid input entered");
    return;
  }

  // TODO:
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
    lecturerID = decodedRes.ownerId;
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
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "B" &&
    optionChkB.checked === true
  ) {
    score++;
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "C" &&
    optionChkC.checked === true
  ) {
    score++;
  }

  if (
    questions[counterNum - 1].correctAns.toUpperCase() === "D" &&
    optionChkD.checked === true
  ) {
    score++;
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
    saveResultToDB();
    alert(`You scored ${score}/${questions.length}`);
    window.location = "/frontend/student";
    return;
  }

  optionChkA.checked = false;
  optionChkB.checked = false;
  optionChkC.checked = false;
  optionChkD.checked = false;

  counterEl.textContent = `${numToShow}/${questions.length}`;

  questionEl.textContent = questions[numToShow - 1].question;
  optionTxtA.textContent = questions[numToShow - 1].optionA;
  optionTxtB.textContent = questions[numToShow - 1].optionB;
  optionTxtC.textContent = questions[numToShow - 1].optionC;
  optionTxtD.textContent = questions[numToShow - 1].optionD;
}

async function saveResultToDB() {
  // TODO:
  const res = await fetch("http://127.0.0.1:3000/question/save-result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseCode: courseCdVal,
      score: score,
      studentID: studentID,
      lecturerID: lecturerID,
    }),
  });

  const decodedRes = await res.json();
  if (decodedRes.message) {
    alert(decodedRes.message);
    return;
  }
}
