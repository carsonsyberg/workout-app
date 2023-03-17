import axios from "axios";

const url = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/posts";
const workoutUrl = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/workouts";
const weekUrl = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/weeks";
const dayUrl = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/days";
const setUrl = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/sets";
const repUrl = "http://ec2-3-235-11-171.compute-1.amazonaws.com:443/reps";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const fetchWorkouts = () => axios.get(workoutUrl);
export const createWorkout = (newWorkout) => axios.post(workoutUrl, newWorkout);
export const updateWorkout = (id, updatedWorkout) =>
  axios.patch(`${workoutUrl}/${id}`, updatedWorkout);
export const deleteWorkout = (id) => axios.delete(`${workoutUrl}/${id}`);

export const fetchWeeks = () => axios.get(weekUrl);
export const fetchWeeksByWorkoutId = (id) => axios.get(`${weekUrl}/${id}`);
export const createWeek = (newDay) => axios.post(weekUrl, newDay);
export const updateWeek = (id, updatedWeek) =>
  axios.patch(`${weekUrl}/${id}`, updatedWeek);
export const deleteWeek = (id) => axios.delete(`${weekUrl}/${id}`);

export const fetchDays = () => axios.get(dayUrl);
export const fetchDaysByWorkoutId = (id) =>
  axios.get(`${dayUrl}/workout/${id}`);
export const fetchDaysByWeekId = (id) => axios.get(`${dayUrl}/${id}`);
export const createDay = (newDay) => axios.post(dayUrl, newDay);
export const updateDay = (id, updatedDay) =>
  axios.patch(`${dayUrl}/${id}`, updatedDay);
export const deleteDay = (id) => axios.delete(`${dayUrl}/${id}`);

export const fetchSets = () => axios.get(setUrl);
export const fetchSetsByDayId = (id) => axios.get(`${setUrl}/${id}`);
export const createSet = (newSet) => axios.post(setUrl, newSet);
export const updateSet = (id, updatedSet) =>
  axios.patch(`${setUrl}/${id}`, updatedSet);
export const deleteSet = (id) => axios.delete(`${setUrl}/${id}`);

export const fetchReps = () => axios.get(repUrl);
export const fetchRepsBySetId = (id) => axios.get(`${repUrl}/${id}`);
export const fetchRepsByDayId = (id) => axios.get(`${repUrl}/day/${id}`);
export const createRep = (newRep) => axios.post(repUrl, newRep);
export const updateRep = (id, updatedRep) =>
  axios.patch(`${repUrl}/${id}`, updatedRep);
export const deleteRep = (id) => axios.delete(`${repUrl}/${id}`);
