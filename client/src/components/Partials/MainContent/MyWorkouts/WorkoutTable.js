import React, { useState } from "react";
import { deleteWorkout } from "../../../../actions/workouts";
import { useDispatch } from "react-redux";
import classes from "./WorkoutTable.module.css";
import { updateWorkout } from "../../../../actions/workouts";

// TODO: make the workout name change-able
//       add timer function that starts countdown upon changes to workout name
//       once enough time has passed and we're sure the person is done typing
//       then send the PUT request to update the backend so it doesn't send requests for each keystroke / change

// TODO: add functionality to edit button
//       edit button changes the page to EditWorkout

const WorkoutTable = ({ setPageState, workout, setEditingWorkout }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [workoutDataChanged, setWorkoutDataChanged] = useState(false);

  const [workoutData, setWorkoutData] = useState({
    userId: 1,
    workoutName: workout.workoutName,
    isDefault: workout.isDefault,
    description: workout.description,
  });

  const dispatch = useDispatch();

  const submitWorkoutUpdateHandler = () => {
    dispatch(updateWorkout(workout._id, workoutData));
    setWorkoutDataChanged(false);
  };

  return (
    <div
      className={`${classes.workoutTable} ${
        workoutDataChanged && classes.workoutTableChanged
      }`}
    >
      <input
        onChange={(e) => {
          setWorkoutDataChanged(true);
          setWorkoutData({ ...workoutData, workoutName: e.target.value });
        }}
        value={workoutData.workoutName}
      />
      <textarea
        value={workoutData.description}
        className={classes.description}
        onChange={(e) => {
          setWorkoutDataChanged(true);
          setWorkoutData({ ...workoutData, description: e.target.value });
        }}
      />
      {workoutDataChanged && (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => submitWorkoutUpdateHandler()}
          >
            Update Workout
          </button>
          <button
            onClick={() => {
              setWorkoutData({
                userId: 1,
                workoutName: workout.workoutName,
                isDefault: workout.isDefault,
                description: workout.description,
              });
              setWorkoutDataChanged(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setPageState("EditWorkout");
          setEditingWorkout(workout._id);
        }}
      >
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
