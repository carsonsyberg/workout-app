import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";
import workoutRoutes from "./routes/workouts.js";
import { databaseReset } from "./databaseReset.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", workoutRoutes);

export const db = mysql.createConnection({
  host: "34.106.0.249",
  user: "root",
  password: "Food5451",
  database: "workout_app",
});

const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.log("DATABASE CONNECTION ERROR")
    // throw err;
  }

  console.log("MySql Connected");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

// databaseReset();
