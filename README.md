IndProTask — Task Management Web Application

A modern, responsive task management web application built with Node.js, Express, SQLite, and vanilla HTML/CSS/JavaScript. The application allows users to register, log in, and manage tasks efficiently with categories, priorities, due dates, and a dynamic dashboard.

Features:

1.User registration and login with authentication
2.Create, read, update, and delete (CRUD) tasks
3.Assign categories/tags to tasks
4.Mark tasks as completed or pending
5.Filter tasks by category and completion status
6.Search tasks by title
7.Set due dates and priorities for each task
8.Dashboard with task summaries and statistics
9.Task details include:
Due date
Priority level
Reminders
Dashboard with task statistics (total, completed, pending, by category, and upcoming due)


Technologies and Libraries Used

Frontend:
1.HTML5
2.CSS3
3.JavaScript (vanilla)

Backend:
1.Node.js
2.Express.js
3.Sequelize ORM

Database:
1.SQLite3

Other Dependencies:
1.bcrypt (for password hashing)
2.JSON Web Tokens (for authentication)
3.cors
4.body-parser

Project Setup and Running Instructions:

1.Prerequisites

Node.js (version 18 or above recommended)
npm

2.Clone the repository
git clone https://github.com/isamiyamanha/IndProTask.git
cd IndProTask

3.Install Dependencies
npm install

4.Initialize the Database
npx sequelize-cli db:migrate

5.Start the Server
node server.js or npm start

6.Open in Browser
Open tasks.html in your browser

Assumptions Made:

-A simple token-based authentication is sufficient for securing the task routes.
-SQLite is adequate for local development and small-scale usage.
-The task reminders and due dates are for display only, no real-time notifications.
-Deployment link is optional as per submission requirements.

Challenges Faced & How They Were Addressed:

CHALLENGES:
1.Sequelize CLI errors during migration.
2.Managing task filters dynamically.
3.Styling layout to look professional.
4.Handling task due dates and priorities cleanly
5.GitHub branch mismatch issue

HOW THEY WERE ADDRESSED:
1.Ensured correct config/config.json setup and ran sequelize init.
2.Created live filters for category and status with event listeners.
3.Designed a clean, modern CSS layout for forms, task cards, and dashboard.
4.Enhanced task model and form structure, updated frontend rendering logic.
5.Renamed master to main using git branch -M main

Author
Samiya Manha
GitHub: isamiyamanha