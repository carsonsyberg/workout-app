import React, { useEffect } from "react";
import memories from './images/memories.png';

import Posts from "./components/Posts/Posts";
import Workouts from "./components/Workouts/Workouts";
import Days from "./components/Workouts/Days";
import Sets from "./components/Workouts/Sets";
import Reps from "./components/Workouts/Reps";

import Form from "./components/Form/Form";
import WorkoutForm from "./components/Forms/WorkoutForm";
import DayForm from "./components/Forms/DayForm";
import SetForm from "./components/Forms/SetForm";
import RepForm from "./components/Forms/RepForm";

import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";

import classes from './App.module.css';
import posts from "./reducers/posts";
import { getWorkouts, getDays, getSets, getReps } from "./actions/workouts";
import Post from "./components/Posts/Post/Post";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getDays());
    dispatch(getSets());
    dispatch(getReps());
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <div className={classes.headerBar}>
        <h2 className={classes.headerText}>Workout App</h2>
        <img className={classes.headerImg} src={memories} alt="memories" />
      </div>
      <div className={classes.contentBar}>
        <WorkoutForm />
        <DayForm />
        <SetForm />
        <RepForm />
        <Workouts />
        <Days />
        <Sets />
        <Reps />
      </div>
    </div>
  );
};

export default App;
