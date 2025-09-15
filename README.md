# Cost Manager - RESTful API

Cost Manager is a RESTful API built with Express.js and Mongoose, using MongoDB Atlas to manage user expenses efficiently.
The API allows users to categorize expenses, retrieve monthly reports, and access user details.


## 🔍 **Project Overview**
CostTracker allows users to manage and track their expenses efficiently. The application provides various functionalities, including adding cost items, generating monthly reports, and retrieving user details. It is built with **Express.js** for the backend, **Mongoose** for MongoDB interactions, and offers a RESTful API for smooth communication between the client and the server.

---

## 🚀 Features

- ✔ **Add Expenses** – Categorize expenses into *food, health, housing, sport or education*.  
- ✔ **Monthly Reports** – Generate expense summaries grouped by category for a specific month and year.  
- ✔ **User Details** – Retrieve user information along with total expenses.  
- ✔ **Developer Info (about)** – Fetch details about the project team.
- ✔ **Logs (Server-side)** – HTTP requests/events captured via middleware; queryable with limit and userid.
- ✔ **Validation & Errors** – Clear 400 for bad requests and 404 for not-found user, with JSON error shape.
- ✔ **Test-Friendly Behavior** – In NODE_ENV=test the app doesn’t listen/connect itself; tests run against an in-memory MongoDB and clean collections between tests.

The project follows **RESTful design principles**, implements the **computed pattern** in MongoDB, and maintains clean code architecture with a dedicated `models` folder for database operations.

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Atlas/Compass)**
- **Mongoose**
- **MongoDB-memory-server**
- **Pino**

---

## ✨ **Features**
+ **Add Cost Items**: Allows users to add new cost items with descriptions, categories, and amounts.
+ **Monthly Report**: Retrieve a report for a specific user, with costs categorized by food, health, housing, sport, and education for a given month and year.
+ **User Details**: Get details for a specific user, including their name and total costs.
+ **Developer Team Info**: View the developers who worked on the project.
+ **Logs**: Server logs of requests/actions (for debugging and tracing).

---

## 🧪 **Testing**
+ **npm test**: Run all tests (unit + integration).
+  **How tests are isolated**: 
   - When npm test runs, NODE_ENV=test is set.
   - The app does not connect or listen in test mode.
   - Instead, tests/test-db.setup.js starts mongodb-memory-server, connects Mongoose to it, cleans collections after each test, and shuts down cleanly.
   - Seed data helpers (in tests/seed.js) create deterministic fixtures (users, costs, logs).

---

## 👥 **Authors**
+ **Ben Manteka** - [GitHub Profile](https://github.com/BenManteka)
+ **Priel Tarrab** - [GitHub Profile](https://github.com/prie123)



