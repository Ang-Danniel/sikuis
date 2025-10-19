const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id");
const questionContainer = document.getElementById("question-container");
let questions = [];
let currentPage = 0;
let answers = {};

fetch(`assets/${quizId}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    showPage();
  });

function showPage() {
  const pageQuestions = questions.slice(currentPage * 5, (currentPage + 1) * 5);
  questionContainer.innerHTML = "";
  pageQuestions.forEach(q => {
    const div = document.createElement("div");
    div.className = "mb-6 border-b pb-4";
    div.innerHTML = `
      <h2 class="text-lg font-semibold mb-2">${q.nomor}. ${q.pertanyaan}</h2>
      ${q.ada_gambar ? `<img src="${q.gambar}" class="mb-2 rounded" />` : ""}
      <div class="space-y-2">
        ${["a","b","c","d"].map(opt => `
          <label class="block">
            <input type="radio" name="q${q.nomor}" value="${opt}" ${answers[q.nomor] === opt ? "checked" : ""}>
            ${q[opt]}
          </label>`).join("")}
      </div>
    `;
    questionContainer.appendChild(div);
  });

  document.getElementById("prev").disabled = currentPage === 0;
}

document.getElementById("next").addEventListener("click", () => {
  saveAnswers();
  if ((currentPage + 1) * 5 >= questions.length) {
    localStorage.setItem(`${quizId}_answers`, JSON.stringify(answers));
    window.location.href = `result.html?id=${quizId}`;
  } else {
    currentPage++;
    showPage();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  saveAnswers();
  if (currentPage > 0) currentPage--;
  showPage();
});

function saveAnswers() {
  document.querySelectorAll("input[type='radio']:checked").forEach(input => {
    const qNum = input.name.replace("q", "");
    answers[qNum] = input.value;
  });
}
