const type = localStorage.getItem("type");

if (type.toLowerCase() != "lecturer") {
  window.location = "/";
}

const queList = [];

class Question {
  constructor(question, optionA, optionB, optionC, optionD, correctAns) {
    this.question = question;
    this.optionA = optionA;
    this.optionB = optionB;
    this.optionC = optionC;
    this.optionD = optionD;
    this.correctAns = correctAns;
  }
}

const formDtEL = document.getElementById("form-data");
const cCEl = document.getElementById("course-code");
const cTEl = document.getElementById("course-title");
const numEL = document.getElementById("num");
const dataEL = document.getElementById("data-btn");

const formQueEl = document.getElementById("form-question");
const counterEl = document.getElementById("counter");
const quesEl = document.getElementById("ques");
const optAEL = document.getElementById("opt-a");
const optBEl = document.getElementById("opt-b");
const optCEl = document.getElementById("opt-c");
const optDEl = document.getElementById("opt-d");
const optCrtEl = document.getElementById("opt-crt");
const queBtnEl = document.getElementById("que-btn");

let counterCurrVal = 0;

let cCval, cTval;
let numVal;

formDtEL.addEventListener("submit", function (e) {
  e.preventDefault();

  cCval = cCEl.value;
  cTval = cTEl.value;
  numVal = +numEL.value;

  if (!cCval || !numVal || !cCval) {
    alert("Invalid information entered");
    return;
  }

  formDtEL.style.display = "none";
  formQueEl.style.display = "flex";

  nextQues();
});

formQueEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (counterCurrVal === numVal) {
    saveQues();
    submitQue();
    gotoAllQuePage();
    return;
  }

  saveQues();
});

function saveQues() {
  const quesVal = quesEl.value;
  const optionAVal = optAEL.value;
  const optionBVal = optBEl.value;
  const optionCVal = optCEl.value;
  const optionDVal = optDEl.value;
  const optionCorrectVal = optCrtEl.value;

  if (
    !quesVal ||
    !optionAVal ||
    !optionBVal ||
    !optionCVal ||
    !optionDVal ||
    !optionCorrectVal ||
    !["A", "B", "C", "D"].includes(optionCorrectVal.toUpperCase())
  ) {
    alert("Invalid input entered");
    return;
  }

  queList.push(
    new Question(
      quesVal,
      optionAVal,
      optionBVal,
      optionCVal,
      optionDVal,
      optionCorrectVal
    )
  );

  if (counterCurrVal != numVal) clearFields();
}

function clearFields() {
  quesEl.value = "";
  optAEL.value = "";
  optBEl.value = "";
  optCEl.value = "";
  optDEl.value = "";
  optCrtEl.value = "";

  nextQues();
}

function nextQues() {
  counterEl.textContent = `${++counterCurrVal}/${numVal}`;
}

async function submitQue() {
  const userId = localStorage.getItem("id");

  if (!userId) {
    alert("User not found");
    gotoSigninPage();
    return;
  }

  const res = await fetch("http://127.0.0.1:3000/question/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseCode: cCval,
      courseTitle: cTval,
      ownerId: userId,
      question: queList,
    }),
  });

  const decodedRes = await res.json();

  if (res.message === "success") {
    gotoAllQuePage();
    return;
  }
}

function gotoAllQuePage() {
  window.location.href = "/frontend/lecturer";
}

function gotoSigninPage() {
  window.location.href = "/frontend/";
}
