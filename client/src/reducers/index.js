import { combineReducers } from "redux";
import posts from "./posts";
import workouts from './workouts';
import days from './days';
import sets from './sets';
import reps from './reps';

export default combineReducers({
  posts,
  workouts,
  days,
  sets,
  reps,
});
