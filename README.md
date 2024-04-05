# Logic-Lakshan-2345

### Introduction
This project is a comprehensive quiz application designed to provide users with an engaging platform to test their knowledge across various subjects. It encompasses features for user authentication, quiz creation, management, and taking, as well as result tracking and performance analysis.

### Project Type
Fullstack

### Deployed App
Frontend: https://quizme-teal.vercel.app/

Backend: https://logic-lakshan-2345.onrender.com/

### Directory Structure
logic-lakshan-2345 ├─ backend/ ├─ frontend/

### Video Walkthrough of the project
https://drive.google.com/file/d/1Z9j_ybn6fuU40asOGoF7BCqlozjTTEHi/view?usp=drive_link

### Features

User authentication (signup, login, logout)

Quiz creation, management, and taking

Result tracking and analysis

Multi-level sorting of users

CRUD operations for questions 

Multi-level user access control

Implemented role-based access control to differentiate between user roles.

### Technology Stack
Node.js: Server-side JavaScript runtime environment.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database used for data storage.

bcrypt: Library for hashing passwords.

jwt: Library for generating JSON Web Tokens.

## User Routes
- `POST /register`: Register a new user
- `POST /login`: Log in an existing user
- `GET /`: Get all users
- `DELETE /:id`: Delete a user by ID
- `PATCH /:id`: Update a user by ID

## Admin Routes
- `POST /admin/questions`: Create a new question
- `GET /admin/questions`: Get all questions (with optional category filter)
- `GET /admin/questions/:id`: Get a specific question by ID
- `POST /admin/quizzes/:quizId/questions`: Add questions to a quiz
- `POST /admin/quizzes`: Create a new quiz
- `GET /admin/quizzes`: Get all quizzes (with optional category and title filter)
- `PATCH /admin/quizzes/:id`: Update a quiz by ID
- `DELETE /admin/quizzes/:id`: Delete a quiz by ID
- `GET /admin/quizzes/:id`: Get a specific quiz by ID


## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running.

```bash
git clone 
cd logic-lakshan-2345
## For Backend
cd backend
npm i
npm run server
## For Frontend
cd frontend
npm i
npm start
```

### Credentials
 Credentials for admin
## UserName:- admin@gmail.com
## Password:- admin123

### Team Members
- Nidhi <a href="https://github.com/Nidhis2608" alt="...">Github Profile</a>
- Kundan Kumar Suraj <a href="https://github.com/kundan761" alt="...">Github Profile</a>
- Mohd Asif <a href="https://github.com/heyasif" alt="...">Github Profile</a>


- Home Page
![image](https://github.com/Nidhis2608/Logic-Lakshan-2345/assets/147683595/5f2c5272-d4f5-46eb-a6fe-922190205366)

- Login/Signup
![image](https://github.com/Nidhis2608/Logic-Lakshan-2345/assets/147683595/0fd34b57-2703-48ec-89e0-026c04027dbe)

- User Dashboard
![image](https://github.com/Nidhis2608/Logic-Lakshan-2345/assets/147683595/9dbdc4be-a64f-4bec-8957-b9dfee9385b5)

- Admin Dashboard
![image](https://github.com/Nidhis2608/Logic-Lakshan-2345/assets/147683595/9179886b-a020-45d7-a7ab-783792def280)

