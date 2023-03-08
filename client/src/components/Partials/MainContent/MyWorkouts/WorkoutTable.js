import React, { useState } from "react";
import { deleteWorkout } from "../../../../actions/workouts";
import { useDispatch } from "react-redux";
import classes from "./WorkoutTable.module.css";

// TODO: make the workout name change-able
//       add timer function that starts countdown upon changes to workout name
//       once enough time has passed and we're sure the person is done typing
//       then send the PUT request to update the backend so it doesn't send requests for each keystroke / change

// TODO: add functionality to edit button
//       edit button changes the page to EditWorkout

const WorkoutTable = ({ workout, setEditingWorkout }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className={classes.workoutTable}>
      <h2>{workout.workoutName}</h2>
      <div className={classes.workoutRow}>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Weeks</p>
          </div>
          <div className={classes.rightCol}>
            <p>{workout.numWeeks}</p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Days</p>
          </div>
          <div className={classes.rightCol}>
            <p>{workout.numDays}</p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <p>Sets</p>
          </div>
          <div className={classes.rightCol}>
            <p>{workout.numSets}</p>
          </div>
        </div>
      </div>
      <button onClick={() => setEditingWorkout(workout._id)}>
        Edit Workout
      </button>
      {confirmingDelete ? (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => dispatch(deleteWorkout(workout._id))}
          >
            Confirm Delete
          </button>
          <button onClick={() => setConfirmingDelete(false)}>
            Cancel Delete
          </button>
        </div>
      ) : (
        <button onClick={() => setConfirmingDelete(true)}>
          Delete Workout
        </button>
      )}
    </div>
  );
};

export default WorkoutTable;
