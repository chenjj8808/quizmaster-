console.log("✅ signup.js is loaded");

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page refresh

  // Get form values
  const username = document.getElementById("username").value;
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send POST request to backend
    const res = await fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Registration successful!");
      window.location.href = "login.html";
    } else {
      alert("❌ Registration failed: " + data.message);
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("⚠️ Server error, please try again later.");
  }
});