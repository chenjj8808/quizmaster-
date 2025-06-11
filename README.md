# quizmaster-
Online Quiz 
An interactive web-based quiz application built with HTML, CSS, and JavaScript.  
Users can register, log in, select quiz difficulty, answer timed multiple-choice questions, and see their results.

# Project Structure

```
QuizMaster/
├── server.js              # Backend API (Express.js)
├── .gitignore
├── package.json
├── frontend/
│   ├── index.html         # Home page
│   ├── signup.html        # Signup page
│   ├── login.html         # Login page
│   ├── quiz.html          # Quiz setup
│   ├── quiz-play.html     # Quiz interface
│   ├── leaderboard.html   # Leaderboard
│   ├── style.css          # App styling
│   └── js/
│       ├── login.js           # Handles login logic
│       ├── signup.js          # Handles signup logic
│       ├── quiz-setup.js      # Manages difficulty/category
│       ├── quiz-play.js       # Quiz logic and score submission
│       └── leaderboard.js     # Renders leaderboard and user info
```

# Technologies Used
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **API**: [Open Trivia DB](https://opentdb.com)  
- **Other**: LocalStorage, CORS, REST API

# Features
- User Registration & Login  
- Quiz with timed questions and difficulty options  
- Score submission and tracking  
- Global Leaderboard  
- Frontend served via Express static hosting

---

## Getting Started

> Run in Visual Studio Code or your terminal:

```bash
npm init -y                            # Generate package.json with default settings
npm install express mongoose cors dotenv  # Install required backend dependencies
npm install                           # Install all listed packages in package.json
node server.js                        # Start the backend server on http://localhost:3006
```

---

##  Frontend Logic Overview

- `login.js` – Sends login credentials, stores user in `localStorage`  
- `signup.js` – Handles registration, stores user profile  
- `quiz-setup.js` – Manages category/difficulty selection  
- `quiz-play.js` – Loads questions, handles timer and score submission  
- `leaderboard.js` – Loads leaderboard and user profile from MongoDB  

---

# Team Apple 
- Jie Jun Chen  
- Demi Standish  
- Kenny Leung  
- Sergey Barzul
