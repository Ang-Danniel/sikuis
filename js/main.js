const quizList = document.getElementById("quiz-list");

quizzes.forEach(q => {
  const card = document.createElement("div");
  card.className = "bg-white shadow-lg p-4 rounded-xl hover:scale-105 transition";
  card.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${q.title}</h2>
    <p class="text-gray-600 mb-4">${q.description}</p>
    <a href="quiz.html?id=${q.id}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Mulai</a>
  `;
  quizList.appendChild(card);
});
