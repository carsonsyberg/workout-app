import express from 'express';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout, 
         getDays, createDay, updateDay, deleteDay,
         getSets, createSet, updateSet, deleteSet,
         getReps, createRep, updateRep, deleteRep } from '../controllers/workouts.js';

const router = express.Router();

// localhost:5000/
router.get('/workouts', getWorkouts);
router.post('/workouts', createWorkout);
router.patch('/workouts/:id', updateWorkout);
router.delete('/workouts/:id', deleteWorkout);

router.get('/days', getDays);
router.post('/days', createDay);
router.patch('/days/:id', updateDay);
router.delete('/days/:id', deleteDay);

router.get('/sets', getSets);
router.post('/sets', createSet);
router.patch('/sets/:id', updateSet);
router.delete('/sets/:id', deleteSet);

router.get('/reps', getReps);
router.post('/reps', createRep);
router.patch('/reps/:id', updateRep);
router.delete('/reps/:id', deleteRep);

export default router;