import { db } from "../index.js";

// ----------------------------------------------------------
//                      WORKOUTS CONTROLLER
// ----------------------------------------------------------
export const getWorkouts = async (req, res) => {
  db.query("SELECT * FROM WORKOUTS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getWorkoutsByUserId = async (req, res) => {
  const { id: userId } = req.params;
  db.query(`SELECT * FROM WORKOUTS WHERE userId = ${userId}`, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const createWorkout = async (req, res) => {
  const workout = req.body;
  db.query(
    `INSERT INTO WORKOUTS (userId, workoutName, isDefault, description) VALUES (?, ?, ?, ?)`,
    [
      workout.userId,
      workout.workoutName,
      workout.isDefault,
      workout.description,
    ],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM WORKOUTS WHERE _id = ?`,
        [result.insertId],
        (err_, result_) => {
          if (err_) {
            res.status(404).send(err_);
          }
          res.status(201).json(result_[0]);
        }
      );
    }
  );
};

export const updateWorkout = async (req, res) => {
  const { id: _id } = req.params;
  const workout = req.body;

  db.query(
    `UPDATE WORKOUTS SET workoutName=?, isDefault=?, description=? WHERE _id = ?`,
    [workout.workoutName, workout.isDefault, workout.description, _id],
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteWorkout = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM WORKOUTS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "Workout deleted successfully" });
  });
};
// ----------------------------------------------------------

// ----------------------------------------------------------
//                      WEEKS CONTROLLER
// ----------------------------------------------------------
export const getWeeks = async (req, res) => {
  db.query("SELECT * FROM WEEKS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getWeeksByWorkoutId = async (req, res) => {
  const { id: workoutId } = req.params;
  db.query(
    `SELECT * FROM WEEKS WHERE workoutId = ?`,
    [workoutId],
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      }

      console.log(result);
      res.status(200).json(result);
    }
  );
};

export const createWeek = async (req, res) => {
  const week = req.body;
  db.query(
    `INSERT INTO WEEKS (workoutId, weekName) VALUES (?, ?)`,
    [week.workoutId, week.weekName],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM WEEKS WHERE _id = ?`,
        [result.insertId],
        (err_, result_) => {
          if (err_) {
            res.status(404).send(err_);
          }
          res.status(201).json(result_[0]);
        }
      );
    }
  );
};

export const updateWeek = async (req, res) => {
  const { id: _id } = req.params;
  const week = req.body;

  db.query(
    `UPDATE WEEKS SET weekName=? WHERE _id = ?`,
    [week.weekName, _id],
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteWeek = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM WEEKS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "Week deleted successfully" });
  });
};
// ----------------------------------------------------------

// ----------------------------------------------------------
//                      DAYS CONTROLLER
// ----------------------------------------------------------

export const getDays = async (req, res) => {
  db.query("SELECT * FROM DAYS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getDaysByWorkoutId = async (req, res) => {
  const { id: workoutId } = req.params;

  console.log("GETTING DAYS BY WORKOUTID");
  const weekIds = [];
  db.query(
    "SELECT _id FROM WEEKS WHERE workoutId = ?",
    [workoutId],
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      }

      result.map((week) => weekIds.push(week._id));

      if (weekIds.length != 0) {
        const getDayByWorkoutQuery =
          "SELECT * FROM DAYS WHERE weekId =" +
          " ? OR weekId =".repeat(weekIds.length - 1) +
          " ?";

        db.query(getDayByWorkoutQuery, weekIds, (err, result) => {
          if (err) {
            res.status(404).send(err);
          }

          res.status(200).json(result);
        });
      } else {
        res.status(200).json([]);
      }
    }
  );
};

export const getDaysByWeekId = async (req, res) => {
  const { id: weekId } = req.params;
  db.query(`SELECT * FROM DAYS WHERE weekId = ?`, [weekId], (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const createDay = async (req, res) => {
  const day = req.body;
  db.query(
    `INSERT INTO DAYS (weekId, dayOfWeek) VALUES (?, ?)`,
    [day.weekId, day.dayOfWeek],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM DAYS WHERE _id = ?`,
        [result.insertId],
        (err_, result_) => {
          if (err_) {
            res.status(404).send(err_);
          }
          res.status(201).json(result_[0]);
        }
      );
    }
  );
};

export const updateDay = async (req, res) => {
  const { id: _id } = req.params;
  const day = req.body;

  db.query(
    `UPDATE DAYS SET dayOfWeek=? WHERE _id = ?`,
    [day.dayOfWeek, _id],
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteDay = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM DAYS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "Day deleted successfully" });
  });
};
// ----------------------------------------------------------

// ----------------------------------------------------------
//                      SETS CONTROLLER
// ----------------------------------------------------------
export const getSets = async (req, res) => {
  db.query("SELECT * FROM SETS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getSetsByDayId = async (req, res) => {
  const { id: dayId } = req.params;
  db.query(`SELECT * FROM SETS WHERE dayId = ?`, [dayId], (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const createSet = async (req, res) => {
  const set = req.body;
  db.query(
    `INSERT INTO SETS (dayId, setName, notes) VALUES (?, ?, ?)`,
    [set.dayId, set.setName, set.notes],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM SETS WHERE _id = ?`,
        [result.insertId],
        (err_, result_) => {
          if (err_) {
            res.status(404).send(err_);
          }
          res.status(201).json(result_[0]);
        }
      );
    }
  );
};

export const updateSet = async (req, res) => {
  const { id: _id } = req.params;
  const set = req.body;

  db.query(
    `UPDATE SETS SET setName=?, notes=? WHERE _id = ?`,
    [set.setName, set.notes, _id],
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteSet = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM SETS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "Set deleted successfully" });
  });
};
// ----------------------------------------------------------

// ----------------------------------------------------------
//                      REPS CONTROLLER
// ----------------------------------------------------------
export const getReps = async (req, res) => {
  db.query("SELECT * FROM REPS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getRepsBySetId = async (req, res) => {
  const { id: setId } = req.params;
  db.query(`SELECT * FROM REPS WHERE setId = ?`, [setId], (err, result) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const getRepsByDayId = async (req, res) => {
  const { id: dayId } = req.params;

  const setIds = [];
  db.query("SELECT _id FROM SETS WHERE dayId = ?", [dayId], (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    if (result.length != 0) {
      result.map((set) => setIds.push(set._id));

      const getRepByDayQuery =
        "SELECT * FROM REPS WHERE setId =" +
        " ? OR setId =".repeat(setIds.length - 1) +
        " ?";

      db.query(getRepByDayQuery, setIds, (err, result2) => {
        if (err) {
          res.status(404).send(err);
        }

        res.status(200).json(result2);
      });
    } else {
      res.status(200).json([]);
    }
  });
};

export const createRep = async (req, res) => {
  const rep = req.body;
  db.query(
    `INSERT INTO REPS (setId, weight, numReps) VALUES (?, ?, ?)`,
    [rep.setId, rep.weight, rep.numReps],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM REPS WHERE _id = ?`,
        [result.insertId],
        (err_, result_) => {
          if (err_) {
            res.status(404).send(err_);
          }
          res.status(201).json(result_[0]);
        }
      );
    }
  );
};

export const updateRep = async (req, res) => {
  const { id: _id } = req.params;
  const set = req.body;

  db.query(
    `UPDATE REPS SET weight=?, numReps=? WHERE _id = ?`,
    [set.weight, set.numReps, _id],
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteRep = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM REPS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "Rep deleted successfully" });
  });
};
// ----------------------------------------------------------
