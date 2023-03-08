import express from "express";
import {
  getRepsBySetId,
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
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workouts.js";

const router = express.Router();

// localhost:5000/
router.get("/workouts", getWorkouts);
router.post("/workouts", createWorkout);
router.patch("/workouts/:id", updateWorkout);
router.delete("/workouts/:id", deleteWorkout);

router.get("/weeks", getWeeks);
router.get("/weeks/:id", getWeeksByWorkoutId);
router.post("/weeks", createWeek);
router.patch("/weeks/:id", updateWeek);
router.delete("/weeks/:id", deleteWeek);

router.get("/days", getDays);
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
router.get("/reps/:id", getRepsBySetId);
router.post("/reps", createRep);
router.patch("/reps/:id", updateRep);
router.delete("/reps/:id", deleteRep);

export default router;
