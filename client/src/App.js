import React, { useState, useEffect } from "react";
import classes from "./App.module.css";

import { useDispatch } from "react-redux";

import { getWorkouts, getWeeks, getDays, getSets, getReps } from "./actions/workouts";

import NavBar from "./components/Partials/NavBar/NavBar";
import MainContent from "./components/Partials/MainContent/MainContent";
import Footer from "./components/Partials/Footer/Footer";

const App = () => {
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);
  const [pageState, setPageState] = useState("MyWorkouts");
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Rerendering");
    dispatch(getWorkouts());
  }, [currentWorkoutId, dispatch]);

  const workoutUpdate = () => {
    dispatch(getWorkouts());
  };

  return (
    <div className={classes.app}>
      <NavBar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        pageState={pageState}
        setPageState={setPageState}
      />
      <MainContent
        setShowMenu={setShowMenu}
        pageState={pageState}
        setPageState={setPageState}
      />
      {/* <Footer /> */}
    </div>
  );
};

export default App;

// Possible Page States
// Current Workout
// My Workouts
// Edit Workout
// Edit Week
// Settings
// Login (& create user)
// Popular Workouts
