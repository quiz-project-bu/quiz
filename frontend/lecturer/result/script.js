const type = localStorage.getItem("type");

if (!type || type.toLowerCase() != "lecturer") {
  window.location = "/";
}

const lecturerID = localStorage.getItem("id") || "";

const contentEl = document.getElementById("content");

let result;

(async () => {
  const res = await fetch(
    "http://127.0.0.1:3000/question/get-lecturer-result",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lecturerID,
      }),
    }
  );

  const decodedRe = await res.json();
  result = decodedRe.result;

  populateScreen();
})();

function populateScreen() {
  result.map(function ({ studentID, courseCode, score }) {
    const toRender = `<div id="result">
        <p>${courseCode}</p>
        <p>${
          studentID && studentID.length > 10
            ? studentID.substring(6, -1)
            : studentID
        }</p>
        <p>${score}</p>
      </div>`;

    contentEl.insertAdjacentHTML("beforeend", toRender);
  });
}
