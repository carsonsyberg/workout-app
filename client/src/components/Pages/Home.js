import React, { useState } from "react";
import Workouts from "../Workouts/Workouts";
import DefaultWorkout from "./Home/DefaultWorkout";

const Home = ({ currentId, setCurrentId, updateFunction }) => {
  return (
    <>
      <h1>Home Page</h1>
      <DefaultWorkout
        currentId={currentId}
        setCurrentId={setCurrentId}
        updateFunction={updateFunction}
      />
    </>
  );
};

export default Home;
