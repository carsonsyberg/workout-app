import axios from 'axios';

const url = 'http://localhost:5000/posts';
const workoutUrl = 'http://localhost:5000/workouts';
const dayUrl = 'http://localhost:5000/days';
const setUrl = 'http://localhost:5000/sets';
const repUrl = 'http://localhost:5000/reps';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); 

export const fetchWorkouts = () => axios.get(workoutUrl);
export const createWorkout = (newWorkout) => axios.post(workoutUrl, newWorkout); 

export const fetchDays = () => axios.get(dayUrl);
export const createDay = (newDay) => axios.post(dayUrl, newDay); 

export const fetchSets = () => axios.get(setUrl);
export const createSet = (newSet) => axios.post(setUrl, newSet); 

export const fetchReps = () => axios.get(repUrl);
export const createRep = (newRep) => axios.post(repUrl, newRep); 