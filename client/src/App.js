import React, { useState, useEffect } from "react";

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
import NaviBar from "./components/Partials/NaviBar";
import Home from "./components/Pages/Home";
import Admin from "./components/Pages/Admin";
import WorkoutPage from "./components/Pages/WorkoutPage";
import Profile from "./components/Pages/Profile";
// import Post from "./components/Posts/Post/Post";

const App = () => {
  // const [currentPostId, setCurrentPostId] = useState(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);
  const [pageState, setPageState] = useState('home');

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

  const selectPage = () => {
    switch (pageState) {
      case 'home':
        return <Home />;
      case 'admin':
        return <Admin />;
      case 'profile':
        return <Profile />;
      case 'workout':
        return <WorkoutPage />;
      default:
        return <p>No page found.</p>
    }
  };

  return (
    <div className={classes.app}>
      <NaviBar currPage={pageState} setPage={setPageState} />
      <div className={classes.contentBar}>
        {selectPage()}
        {/* <Workouts
          currentId={currentWorkoutId}
          setCurrentId={setCurrentWorkoutId}
          updateFunction={workoutUpdate} /> */}
      </div>
    </div>
  );
};

export default App;
