import React from "react";
import { useSelector } from "react-redux";
import Workout from "./Workout/Workout";
import Card from "../UI/Card";

// workoutName, isDefault

const Workouts = ({ setCurrentId }) => {
  const workouts = useSelector((state) => {
    return state.workouts;
  });

  return !workouts.length ? (
    <Card>
      <h2>No workouts.</h2>
    </Card>
  ) : (
    <Card>
      <h2>Workouts</h2>
      {workouts.map((workout) => {
        return <Workout workout={workout} key={workout._id} setCurrentId={setCurrentId}/>
      })}
    </Card>
  );
};

export default Workouts;
