import React from "react";
import { useSelector } from "react-redux";
import Workout from "./Workout/Workout";
import Card from "../UI/Card";

// workoutName, isDefault

const Workouts = () => {
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
        return <Workout name={workout.workoutName} isDefault={workout.isDefault} id={workout._id} />
      })}
    </Card>
  );
};

export default Workouts;
