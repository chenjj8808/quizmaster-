let selectedDifficulty = "";

document.querySelectorAll(".difficulty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".difficulty-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedDifficulty = btn.dataset.difficulty;
  });
});

document.getElementById("startQuizBtn").addEventListener("click", () => {
  const category = document.getElementById("category").value;

  if (!selectedDifficulty) {
    alert("Please select a difficulty.");
    return;
  }

 
  localStorage.setItem("quiz_category", category);
  localStorage.setItem("quiz_difficulty", selectedDifficulty);

  
  window.location.href = "quiz-play.html";
});
