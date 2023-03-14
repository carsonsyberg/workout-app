import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../../../actions/workouts";
import classes from "./WorkoutTable.module.css";

const WorkoutTableForm = ({ setAddingWorkout }) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [workoutNameChanged, setWorkoutNameChanged] = useState(false);
  const [workoutDescChanged, setWorkoutDescChanged] = useState(false);

  const [workoutData, setWorkoutData] = useState({
    userId: 1,
    workoutName: "Workout Name",
    isDefault: false,
    description: "Some description...",
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createWorkout(workoutData));

    setWorkoutData({
      userId: 1,
      isDefault: false,
      workoutName: "",
      description: "Some description...",
    });
    setAddingWorkout(false);
  };

  return (
    <div className={classes.workoutTableForm} id="new_workout_table">
      <input
        className={
          workoutNameChanged ? classes.changedInput : classes.originalInput
        }
        onClick={() => {
          if (!workoutNameChanged)
            setWorkoutData({ ...workoutData, workoutName: "" });
        }}
        onChange={(e) => {
          setWorkoutNameChanged(true);
          setWorkoutData({ ...workoutData, workoutName: e.target.value });
        }}
        value={workoutData.workoutName}
      />
      {!isCurrent ? (
        <button
          onClick={() => {
            setIsCurrent(true);
            setWorkoutData({ ...workoutData, isDefault: true });
          }}
          className={classes.setCurrentButton}
        >
          Favorite Workout
        </button>
      ) : (
        <button
          onClick={() => {
            setIsCurrent(false);
            setWorkoutData({ ...workoutData, isDefault: false });
          }}
          className={classes.setCurrentButton}
        >
          Unfavorite Workout
        </button>
      )}
      <textarea
        value={workoutData.description}
        className={`${classes.description} ${
          workoutDescChanged ? classes.changedInput : classes.originalInput
        }`}
        onClick={() => {
          if (!workoutDescChanged)
            setWorkoutData({ ...workoutData, description: "" });
        }}
        onChange={(e) => {
          setWorkoutData({ ...workoutData, description: e.target.value });
          setWorkoutDescChanged(true);
        }}
      />
      <button onClick={submitHandler}>Save Workout</button>
      <button
        onClick={() => {
          setAddingWorkout(false);
          setWorkoutData({ isDefault: false, workoutName: "" });
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default WorkoutTableForm;
