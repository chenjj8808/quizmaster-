const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3006;

mongoose.connect('mongodb+srv://kleung36:FNSzSQqredv1cof5@cluster0.ejnstds.mongodb.net/quizmaster?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  rank: { type: String, default: "#-" },
  points: { type: Number, default: 0 },
  quizzesCompleted: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
  quizHistory: [
    {
      score: Number,
      correct: Number,
      wrong: Number,
      timeUsed: Number,
      date: { type: Date, default: Date.now }
    }
  ]
}));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
});

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        joinedAt: user.joinedAt,
        rank: user.rank || "#--",
        points: user.points || 0,
        quizzes: user.quizzesCompleted || 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/user', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'the user is not found' });

    res.json({
      username: user.username,
      email: user.email,
      quizzes: user.quizzesCompleted || 0,
      points: user.points || 0,
      rank: user.rank || "#-",
      joinedAt: user.joinedAt || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find({}).sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
});
app.post('/api/submit-score', async (req, res) => {
  const { email, score, correct, wrong, timeUsed } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'the user is not found' });

    user.quizHistory.push({ score, correct, wrong, timeUsed });
    user.points += score;
    user.quizzesCompleted += 1;

    await user.save();

    res.json({ success: true, message: 'Score submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});