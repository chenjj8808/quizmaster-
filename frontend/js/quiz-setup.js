// Store the selected difficulty level (easy/medium/hard)
let selectedDifficulty = "";
// Add click event listeners to all difficulty buttons
document.querySelectorAll(".difficulty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".difficulty-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedDifficulty = btn.dataset.difficulty;
  });
});
// When the "Start Quiz" button is clicked
document.getElementById("startQuizBtn").addEventListener("click", () => {
  const category = document.getElementById("category").value;

  if (!selectedDifficulty) {
    alert("Please select a difficulty.");
    return;
  }

  // Save the chosen category and difficulty into localStorage
  localStorage.setItem("quiz_category", category);
  localStorage.setItem("quiz_difficulty", selectedDifficulty);

   // Redirect to the quiz play page
  window.location.href = "quiz-play.html";
});
