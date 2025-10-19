const quizId = new URLSearchParams(window.location.search).get("id");
let questions = [];
let answers = JSON.parse(localStorage.getItem(`${quizId}_answers`) || "{}");
const resultContainer = document.getElementById("result-container");

fetch(`assets/${quizId}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    showResults();
  });

function showResults() {
  let correct = 0;
  questions.forEach(q => {
    const userAns = answers[q.nomor];
    const isCorrect = userAns === q.kunci;
    if (isCorrect) correct++;

    const div = document.createElement("div");
    div.className = "mb-6 border-b pb-4";
    div.innerHTML = `
      <h2 class="font-semibold">${q.nomor}. ${q.pertanyaan}</h2>
      ${q.ada_gambar ? `<img src="${q.gambar}" class="my-2 rounded" />` : ""}
      <p>Jawaban Anda: <span class="${isCorrect ? 'text-green-600' : 'text-red-600'}">${userAns || '-'}</span></p>
      <p>Kunci Jawaban: <strong>${q.kunci}</strong></p>
      ${!isCorrect ? `<p class="text-gray-600 mt-2">${q.penjelasan}</p>` : ""}
    `;
    resultContainer.appendChild(div);
  });

  const score = Math.round((correct / questions.length) * 100);
  const header = document.createElement("h2");
  header.className = "text-xl font-bold mb-4 text-center";
  header.textContent = `Nilai Anda: ${score}`;
  resultContainer.prepend(header);
}