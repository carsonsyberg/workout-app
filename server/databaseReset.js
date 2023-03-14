import { db } from "./index.js";

export const databaseReset = () => {
  db.query("DROP TABLE IF EXISTS REPS", (err) => {
    if (err) throw err;
    console.log("Dropped rep table");
  });

  db.query("DROP TABLE IF EXISTS SETS", (err) => {
    if (err) throw err;
    console.log("Dropped set table");
  });

  db.query("DROP TABLE IF EXISTS DAYS", (err) => {
    if (err) throw err;
    console.log("Dropped day table");
  });

  db.query("DROP TABLE IF EXISTS WEEKS", (err) => {
    if (err) throw err;
    console.log("Dropped week table");
  });

  db.query("DROP TABLE IF EXISTS WORKOUTS", (err) => {
    if (err) throw err;
    console.log("Dropped workout table");
  });

  db.query("DROP TABLE IF EXISTS USERS", (err) => {
    if (err) throw err;
    console.log("Dropped user table");
  });

  db.query(
    "CREATE TABLE IF NOT EXISTS USERS( _id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(40), passwordHash VARCHAR(255), email VARCHAR(255), colorScheme INT, weightUnits VARCHAR(20))",
    (err, result) => {
      if (err) throw err;
      console.log("User Table created");
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS WORKOUTS( _id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES USERS(_id) ON DELETE CASCADE, workoutName VARCHAR(255), isDefault BOOLEAN, description MEDIUMTEXT, dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) throw err;
      console.log("Workout Table created");
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS WEEKS( _id INT AUTO_INCREMENT PRIMARY KEY, workoutId INT NOT NULL, FOREIGN KEY (workoutId) REFERENCES WORKOUTS(_id) ON DELETE CASCADE, weekName VARCHAR(40))",
    (err, result) => {
      if (err) throw err;
      console.log("Week Table created");
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS DAYS( _id INT AUTO_INCREMENT PRIMARY KEY, weekId INT NOT NULL, FOREIGN KEY (weekId) REFERENCES WEEKS(_id) ON DELETE CASCADE, dayOfWeek ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'))",
    (err, result) => {
      if (err) throw err;
      console.log("Day Table created");
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS SETS( _id INT AUTO_INCREMENT PRIMARY KEY, dayId INT NOT NULL, FOREIGN KEY (dayId) REFERENCES DAYS(_id) ON DELETE CASCADE, setName VARCHAR(255), notes MEDIUMTEXT)",
    (err, result) => {
      if (err) throw err;
      console.log("Set Table created");
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS REPS( _id INT AUTO_INCREMENT PRIMARY KEY, setId INT NOT NULL, FOREIGN KEY (setId) REFERENCES SETS(_id) ON DELETE CASCADE, weight DECIMAL(10, 3), numReps INT)",
    (err, result) => {
      if (err) throw err;
      console.log("Rep Table created");
    }
  );
};
