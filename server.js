const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
const users = [];


app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }
  users.push({ username, email, password });
  console.log("Registered:", users);
  res.json({ success: true, message: "User registered successfully" });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
  res.json({ success: true, message: "Login successful", username: user.username });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});