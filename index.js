require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// Create the connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();

app.use(cors());

app.get("/helloworld", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM `users`", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
