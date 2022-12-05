import express from 'express';
import { getWorkouts, createWorkout, getDays, createDay, getSets, createSet, getReps, createRep } from '../controllers/workouts.js';

const router = express.Router();

// localhost:5000/
router.get('/workouts', getWorkouts);
router.post('/workouts', createWorkout);

router.get('/days', getDays);
router.post('/days', createDay);

router.get('/sets', getSets);
router.post('/sets', createSet);

router.get('/reps', getReps);
router.post('/reps', createRep);

export default router;