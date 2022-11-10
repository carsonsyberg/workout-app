import express from 'express';
import { getWorkouts, createWorkout } from '../controllers/workouts.js';

const router = express.Router();

// localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);

export default router;