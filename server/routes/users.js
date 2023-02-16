import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

// localhost:5000/
router.get("/users", getWorkouts);
router.post("/users", createWorkout);
router.patch("/users/:id", updateWorkout);
router.delete("/users/:id", deleteWorkout);

export default router;
