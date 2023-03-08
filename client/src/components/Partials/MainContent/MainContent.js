import React from "react";
import classes from "./MainContent.module.css";

import CurrentWorkout from "./CurrentWorkout/CurrentWorkout";
import Login from "./Login/Login";
import MyWorkouts from "./MyWorkouts/MyWorkouts";
import PopularWorkouts from "./PopularWorkouts/PopularWorkouts";
import Settings from "./Settings/Settings";

const MainContent = ({ pageState, setPageState }) => {
  const pageSelect = () => {
    switch (pageState) {
      case "CurrWorkout":
        return <CurrentWorkout />;
      case "Login":
        return <Login />;
      case "MyWorkouts":
        return <MyWorkouts />;
      case "PopWorkouts":
        return <PopularWorkouts />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return <div className={classes.maincontent}>{pageSelect()}</div>;
};

export default MainContent;
