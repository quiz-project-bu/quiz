const userId = localStorage.getItem("id");
const type = localStorage.getItem("type");

if (type.toLowerCase() != "lecturer") {
  window.location = "/";
}

if (!userId) {
  alert("User not found");
  gotoSigninPage();
} else {
  getQuestions();
}

async function getQuestions() {
  const res = await fetch("http://127.0.0.1:3000/question/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ownerId: userId,
    }),
  });

  const decodedRes = await res.json();

  if (decodedRes.message) {
    alert(decodedRes.message);
    return;
  }

  displayResult(decodedRes.result || []);
}

function displayResult(result) {
  const contentEl = document.getElementById("content-box");

  console.log(result);

  result.map(function ({ courseCode, courseTitle, _, question }) {
    const toInsertEl = `
      <div id="course-box">
        <p>${courseCode}</p><div id="divider"></div>
        <p>${
          courseTitle.length < 10
            ? courseTitle
            : `${courseTitle.substring(0, 9)}...`
        }</p><div id="divider"></div>
        <p>Questions: ${question.length}</p>
      </div>
    `;

    contentEl.insertAdjacentHTML("beforeend", toInsertEl);
  });
}

function gotoSigninPage() {
  window.location.href = "/frontend/";
}
