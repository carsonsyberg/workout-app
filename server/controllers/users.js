import { db } from "../index.js";

export const getUsers = async (req, res) => {
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    console.log(result);
    res.status(200).json(result);
  });
};

export const createUser = async (req, res) => {
  const user = req.body;
  db.query(
    `INSERT INTO USERS (username, passwordHash, email, colorScheme, weightUnits) VALUES (?, ?, ?, ?)`,
    [user.username, user.passwordHash, user.user.colorScheme, user.weightUnits],
    (err, result) => {
      if (err) {
        res.status(409).json(err);
      }

      db.query(
        `SELECT * FROM USERS WHERE _id = ?`,
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

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  db.query(
    `UPDATE USERS SET username=?, passwordHash=?, email=?, colorScheme=?, weightUnits=? WHERE _id = ?`,
    [user.username, user.passwordHash, user.email, user.colorScheme, user.weightUnits, _id], 
    (err, result) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;

  db.query(`DELETE FROM USERS WHERE _id = ?`, [_id], (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ message: "User deleted successfully" });
  });
};
