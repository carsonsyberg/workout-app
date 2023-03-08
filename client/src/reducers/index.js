import { combineReducers } from "redux";
import workouts from "./workouts";
import weeks from "./weeks";
import days from "./days";
import sets from "./sets";
import reps from "./reps";

export default combineReducers({
  workouts,
  weeks,
  days,
  sets,
  reps,
});
