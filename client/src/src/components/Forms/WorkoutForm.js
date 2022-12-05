import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../actions/workouts";

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    workoutName: "",
    isDefault: "",
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setWorkoutData({
        workoutName: "",
        isDefault: "",
    });
    dispatch(createWorkout(workoutData));
  };

  return (
    <Card>
      <h2>Add New Workout</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "workout_name",
            type: "text",
            value: workoutData.workoutName,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, workoutName: e.target.value });
            },
          }}
          label="Workout Name"
        />
        <Input
          input={{
            id: "is_default",
            type: "radio",
            value: workoutData.isDefault,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, isDefault: e.target.value });
            },
          }}
          label="Is Default"
        />
        <button type="submit">Add Workout</button>
      </form>
    </Card>
  );
};

export default WorkoutForm;
