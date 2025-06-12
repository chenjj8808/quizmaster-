console.log("login.js is loaded");
// Add a listener to handle the login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  // Get input values from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
// Basic validation: check if fields are filled
  if (!email || !password) {
    alert("Please fill in both email and password");
    return;
  }

  try {
    // Send login request to the backend
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),// Send credentials in JSON format
    });

    const data = await res.json();
    if (data.success) {
      // If login is successful, save user info to localStorage
      localStorage.setItem("username", data.user.username); 
      localStorage.setItem("quizUser", JSON.stringify(data.user)); 


      alert("Welcome, " + data.user.username);
      window.location.href = "quiz.html";
    } else {
      // If login failed, show error message
      alert("Login failed: " + data.message);
    }
  } catch (err) {
     // Catch network or server errors
    console.error("Login error:", err);
    alert("⚠️ Server error, please try again later.");
  }
});
