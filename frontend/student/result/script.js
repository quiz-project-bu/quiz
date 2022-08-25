const studentID = localStorage.getItem("id") || "";
const type = localStorage.getItem("type");

if (type.toLowerCase() != "student") {
  window.location = "/";
}

const contentEl = document.getElementById("content");

let result;

(async () => {
  const res = await fetch("http://127.0.0.1:3000/question/get-student-result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentID,
    }),
  });

  const decodedRe = await res.json();
  result = decodedRe.result;

  populateScreen();
})();

function populateScreen() {
  result.map(function ({ lecturerID, courseCode, score }) {
    const toRender = `<div id="result">
        <p>${courseCode}</p>
        <p>${
          lecturerID && lecturerID.length > 10
            ? lecturerID.substring(6, -1)
            : lecturerID
        }</p>
        <p>${score}</p>
      </div>`;

    contentEl.insertAdjacentHTML("beforeend", toRender);
  });
}
