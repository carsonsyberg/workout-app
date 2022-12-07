import React, { useState, useEffect } from "react";
import memories from "./images/memories.png";

// import Posts from "./components/Posts/Posts";
import Workouts from "./components/Workouts/Workouts";
import Days from "./components/Workouts/Days";
import Sets from "./components/Workouts/Sets";
import Reps from "./components/Workouts/Reps";

// import Form from "./components/Form/Form";
import WorkoutForm from "./components/Forms/WorkoutForm";
import DayForm from "./components/Forms/DayForm";
import SetForm from "./components/Forms/SetForm";
import RepForm from "./components/Forms/RepForm";

// import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";

import classes from "./App.module.css";
// import posts from "./reducers/posts";
import { getWorkouts, getDays, getSets, getReps } from "./actions/workouts";
// import Post from "./components/Posts/Post/Post";

const App = () => {
  // const [currentPostId, setCurrentPostId] = useState(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);
  const [currentDayId, setCurrentDayId] = useState(null);
  const [currentSetId, setCurrentSetId] = useState(null);
  const [currentRepId, setCurrentRepId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getPosts());
    dispatch(getWorkouts());
    dispatch(getDays());
    dispatch(getSets());
    dispatch(getReps());
  }, [currentWorkoutId, currentDayId, currentSetId, currentRepId, dispatch]);

  return (
    <div className={classes.app}>
      <div className={classes.headerBar}>
        <h2 className={classes.headerText}>Workout App</h2>
        <img className={classes.headerImg} src={memories} alt="memories" />
      </div>
      <div className={classes.contentBar}>
        {/* <Posts setCurrentId={setCurrentPostId} />
        <Form currentId={currentPostId} setCurrentId={setCurrentPostId} /> */}
        <WorkoutForm
          currentId={currentWorkoutId}
          setCurrentId={setCurrentWorkoutId}
        />
        <DayForm currentId={currentDayId} setCurrentId={setCurrentDayId} />
        <SetForm currentId={currentSetId} setCurrentId={setCurrentSetId} />
        <RepForm currentId={currentRepId} setCurrentId={setCurrentRepId} />
        <Workouts setCurrentId={setCurrentWorkoutId} />
        <Days setCurrentId={setCurrentDayId} />
        <Sets setCurrentId={setCurrentSetId} />
        <Reps setCurrentId={setCurrentRepId} />
      </div>
    </div>
  );
};

export default App;