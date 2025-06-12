console.log("signup.js is loaded");
// Attach an event listener to the signup form when it's submitted
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); 
// Get values from the input fields
  const username = document.getElementById("username").value;
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.success) {
       // If signup is successful, save basic user info to localStorage
      localStorage.setItem("quizUser", JSON.stringify({
        username,
        email,
        joinedAt: new Date().toISOString(),
        rank: "#0",
        points: 0,
        quizzes: 0
      }));

      alert("Registration successful!");
      window.location.href = "login.html";
    } else {
      alert("Registration failed: " + data.message);
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("⚠️ Server error, please try again later.");
  }
});
