import React from "react";
import Card from "../../UI/Card";
import { useDispatch } from 'react-redux';
import { deleteWorkout } from "../../../actions/workouts";

const Workout = ({ workout, setCurrentId }) => {

  const dispatch = useDispatch();
  
  return (
    <Card>
      <h2>{workout.workoutName}</h2>
      <h3>{workout.isDefault}</h3>
      <button onClick={() => setCurrentId(workout._id)}>Edit Workout</button>
      <button onClick={() => dispatch(deleteWorkout(workout._id))}>Delete Workout</button>
    </Card>
  );
};

export default Workout;
