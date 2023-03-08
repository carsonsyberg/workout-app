import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../../../actions/workouts";
import classes from "./WorkoutTable.module.css";

const WorkoutTableForm = ({ setAddingWorkout }) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [workoutNameChanged, setWorkoutNameChanged] = useState(false);

  const [workoutData, setWorkoutData] = useState({
    workoutName: "Workout Name",
    isDefault: false,
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createWorkout(workoutData));

    setWorkoutData({ isDefault: false, workoutName: "" });
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
      <div className={classes.workoutRow}>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Weeks</p>
          </div>
          <div className={classes.rightCol}>
            <p>0</p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Days</p>
          </div>
          <div className={classes.rightCol}>
            <p>0</p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Sets</p>
          </div>
          <div className={classes.rightCol}>
            <p>0</p>
          </div>
        </div>
      </div>
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
