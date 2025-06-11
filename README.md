# quizmaster-
Online Quiz 
An interactive web-based quiz application built with HTML, CSS, and JavaScript.  
Users can register, log in, select quiz difficulty, answer timed multiple-choice questions, and see their results.

# Project Structure
QuizMaster/
server.js # Backend API (Express.js)
.gitignore
frontend/
index.html # Home page
signup.html # Signup page
login.html # Login page
quiz.html # Quiz setup
quiz-play.html # Quiz interface
leaderboard.html # Leaderboard
style.css # App styling
js/
 login.js # Handles login logic
 signup.js # Handles signup logic
 quiz-setup.js # Manages difficulty/category
 quiz-play.js # Quiz logic and score submission
 leaderboard.js # Renders leaderboard and user info

# Technologies Used
*Frontend*: HTML, CSS, JavaScript 
*Backend*: Node.js, Express.js
*Database*: MongoDB 
*API*: Open Trivia DB 
*Other*: LocalStorage, CORS, REST API

# Features
- User Registration & Login  
- Quiz with timed questions and difficulty options  
- Score submission and tracking  
- Global Leaderboard  
- Frontend served via Express static hosting

# Started
run in Visual Studio Code
npm init-y # Generate package.json with default settings
npm install express mongoose cors dotenv  # Install required backend dependencies
npm install # Install all listed packages in package.json
node server.js # Start the backend server on http://localhost:3006

# Frontend Logic
login.js – sends login credentials, stores user in localStorage
signup.js – handles registration, stores mock profile
quiz-setup.js – manages difficulty/category and redirects
quiz-play.js – fetches questions from OpenTrivia, handles timer, score, and submits to /api/submit-score
leaderboard.js – fetches leaderboard and updates user profile from MongoDB

# Team Apple 
jie Jun Chen, Demi Standish, Kenny Leung, Sergey Barzul
