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
  host: "workout-app.ce69noofzlgk.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "346muscle!821?grower",
});

// const PORT = process.env.PORT || 443;
const PORT = 443;

db.connect((err) => {
  if (err) {
    console.log("DATABASE CONNECTION ERROR")
    throw err;
  }

  console.log("MySql Connected");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

db.query("USE workoutappDB", (err) => {
  if (err) throw err;
  console.log("using workoutappDB");
});
// databaseReset();
