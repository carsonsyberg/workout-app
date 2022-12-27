import React, { useState, useEffect } from "react";
import memories from "./images/memories.png";

// import Posts from "./components/Posts/Posts";
import Workouts from "./components/Workouts/Workouts";
import Reps from "./components/Workouts/Reps";

// import Form from "./components/Form/Form";
import WorkoutForm from "./components/Workouts/WorkoutForms/WorkoutForm";
import DayForm from "./components/Workouts/WorkoutForms/DayForm";
import SetForm from "./components/Workouts/WorkoutForms/SetForm";
import RepForm from "./components/Workouts/WorkoutForms/RepForm";

// import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";

import classes from "./App.module.css";
// import posts from "./reducers/posts";
import { getWorkouts, getDays, getSets, getReps } from "./actions/workouts";
// import Post from "./components/Posts/Post/Post";

const App = () => {
  // const [currentPostId, setCurrentPostId] = useState(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getPosts());
    console.log("Rerendering");
    dispatch(getWorkouts());
    dispatch(getDays());
    dispatch(getSets());
    dispatch(getReps());
  }, [
    currentWorkoutId,
    dispatch,
  ]);

  const workoutUpdate = () => {
    dispatch(getWorkouts());
  };

  return (
    <div className={classes.app}>
      <div className={classes.headerBar}>
        <h2 className={classes.headerText}>Workout App</h2>
        <img className={classes.headerImg} src={memories} alt="memories" />
      </div>
      <h1>WorkoutID: {currentWorkoutId}</h1>
      <div className={classes.contentBar}>
        {/* <Posts setCurrentId={setCurrentPostId} />
        <Form currentId={currentPostId} setCurrentId={setCurrentPostId} /> */}
        <Workouts
          currentId={currentWorkoutId}
          setCurrentId={setCurrentWorkoutId}
          updateFunction={workoutUpdate} />
      </div>
    </div>
  );
};

export default App;
