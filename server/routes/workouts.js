import express from "express";
import {
  getRepsBySetId,
  getRepsByDayId,
  getReps,
  createRep,
  updateRep,
  deleteRep,
} from "../controllers/workouts.js";
import {
  getSetsByDayId,
  getSets,
  createSet,
  updateSet,
  deleteSet,
} from "../controllers/workouts.js";
import {
  getDaysByWeekId,
  getDaysByWorkoutId,
  getDays,
  createDay,
  updateDay,
  deleteDay,
} from "../controllers/workouts.js";
import {
  getWeeksByWorkoutId,
  getWeeks,
  createWeek,
  updateWeek,
  deleteWeek,
} from "../controllers/workouts.js";
import {
  getWorkoutsByUserId,
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workouts.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

// localhost:5000/
router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/workouts", getWorkouts);
router.get("/workouts/:id", getWorkoutsByUserId);
router.post("/workouts", createWorkout);
router.patch("/workouts/:id", updateWorkout);
router.delete("/workouts/:id", deleteWorkout);

router.get("/weeks", getWeeks);
router.get("/weeks/:id", getWeeksByWorkoutId);
router.post("/weeks", createWeek);
router.patch("/weeks/:id", updateWeek);
router.delete("/weeks/:id", deleteWeek);

router.get("/days", getDays);
router.get("/days/workout/:id", getDaysByWorkoutId);
router.get("/days/:id", getDaysByWeekId);
router.post("/days", createDay);
router.patch("/days/:id", updateDay);
router.delete("/days/:id", deleteDay);

router.get("/sets", getSets);
router.get("/sets/:id", getSetsByDayId);
router.post("/sets", createSet);
router.patch("/sets/:id", updateSet);
router.delete("/sets/:id", deleteSet);

router.get("/reps", getReps);
router.get("/reps/day/:id", getRepsByDayId);
router.get("/reps/:id", getRepsBySetId);
router.post("/reps", createRep);
router.patch("/reps/:id", updateRep);
router.delete("/reps/:id", deleteRep);

export default router;
