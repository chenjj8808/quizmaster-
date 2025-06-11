console.log("leaderboard.js loaded");

const user = JSON.parse(localStorage.getItem("quizUser"));
if (user) {
  document.getElementById("profile-username").textContent = user.username;
  document.getElementById("profile-rank").textContent = user.rank || "#--";
  document.getElementById("profile-points").textContent = user.points || 0;
  document.getElementById("profile-quizzes").textContent = user.quizzes || 0;
  document.getElementById("header-username").textContent = user.username;

  const joinedDate = new Date(user.joinedAt);
  const monthYear = joinedDate.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  document.getElementById("profile-joined").textContent = `Joined ${monthYear}`;
} else {
  document.getElementById("profile-username").textContent = "No user";
}

if (user?.email) {
  fetch(`/api/user?email=${encodeURIComponent(user.email)}`)
    .then(res => res.json())
    .then(updated => {
      document.getElementById("profile-username").textContent = updated.username;
      document.getElementById("profile-rank").textContent = updated.rank || "#--";
      document.getElementById("profile-points").textContent = updated.points || 0;
      document.getElementById("profile-quizzes").textContent = updated.quizzes || 0;
      document.getElementById("header-username").textContent = updated.username;

      const joinedDate = new Date(updated.joinedAt);
      const monthYear = joinedDate.toLocaleDateString("en-US", { year: "numeric", month: "long" });
      document.getElementById("profile-joined").textContent = `Joined ${monthYear}`;

      localStorage.setItem("quizUser", JSON.stringify(updated));
    })
    .catch(err => console.error("Failed to update profile card from MongoDB:", err));
}
fetch("/api/leaderboard")
  .then(res => res.json())
  .then(users => {
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";

    let currentUserRank = ""; 

    users.forEach((u, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>#${index + 1}</td>
        <td>${u.username}</td>
        <td>${u.quizzesCompleted || 0}</td>
        <td>${u.points || 0}</td>
      `;
      tbody.appendChild(tr);

      if (u.email === user.email) {
        currentUserRank = `#${index + 1}`;
      }
    });

    document.getElementById("profile-rank").textContent = currentUserRank;
  })
  .catch(err => console.error(" cant load the leaderboard", err));
