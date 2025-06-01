let questions = [];
let current = 0;
let correct = 0;
let wrong = 0;
let timer;
let timePerQuestion = 60;
let timeUsed = 0;

const category = localStorage.getItem("quiz_category") || "9";
const difficulty = localStorage.getItem("quiz_difficulty") || "easy";

async function fetchQuestions() {
  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();
  questions = data.results;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  document.getElementById("next-btn").style.display = "none";

  const q = questions[current];
  document.getElementById("question-count").innerText = `Question ${current + 1}/10`;
  document.getElementById("question-text").innerHTML = q.question;

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffle(answers);

  const buttons = answers.map(ans => {
    const btn = document.createElement("button");
    btn.innerHTML = ans;
    btn.onclick = () => handleAnswer(btn, ans === q.correct_answer, q.correct_answer);
    return btn;
  });

  const container = document.getElementById("answer-buttons");
  container.innerHTML = "";
  buttons.forEach(btn => container.appendChild(btn));

  startTimer();
}

function handleAnswer(button, isCorrect, correctAnswer) {
  clearInterval(timer);
  const buttons = document.querySelectorAll("#answer-buttons button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerHTML === correctAnswer) btn.style.backgroundColor = "green";
    else if (btn !== button) btn.style.opacity = 0.5;
  });
  if (!isCorrect) button.style.backgroundColor = "red";
  else correct++;
  wrong = current + 1 - correct;
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-area").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";
  document.getElementById("final-score").innerText = `${correct}/10`;
  document.getElementById("summary-text").innerText = `Great job! You scored ${Math.round((correct / 10) * 100)}%`;
  document.getElementById("correct-count").innerText = correct;
  document.getElementById("wrong-count").innerText = wrong;
  document.getElementById("time-used").innerText = formatTime(timeUsed);
}

function startTimer() {
  let time = timePerQuestion;
  document.getElementById("time-left").innerText = time;
  timer = setInterval(() => {
    time--;
    timeUsed++;
    document.getElementById("time-left").innerText = time;
    if (time === 0) {
      clearInterval(timer);
      handleAnswer(document.createElement("button"), false, questions[current].correct_answer);
    }
  }, 1000);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

window.onload = () => {
  fetchQuestions();
};