import React, { useState } from "react";
import { useSelector } from "react-redux";
import WorkoutTable from "./WorkoutTable";
import classes from "./MyWorkouts.module.css";
import WorkoutTableForm from "./WorkoutTableForm";
import EditWorkout from "./EditWorkout/EditWorkout";

const MyWorkouts = ({ pageState, setPageState }) => {
  const [addingWorkout, setAddingWorkout] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(false);
  const [editingWeek, setEditingWeek] = useState(false);

  const workouts = useSelector((state) => {
    return state.workouts;
  });

  // TODO: filter workouts for the current default workout
  // TODO: store current default workout one place and have list of other workouts seperate
  //       so that the current default can be placed at the top
  //       possibly sort the others in order of date created / edited (or have fields to sort)

  return pageState === "EditWorkout" || pageState === "EditWeek" ? (
    <EditWorkout
      setEditingWorkout={setEditingWorkout}
      pageState={pageState}
      setPageState={setPageState}
      editingWeek={editingWeek}
      setEditingWeek={setEditingWeek}
      workout={workouts.filter((workout) => workout._id === editingWorkout)[0]}
    />
  ) : (
    <div className={classes.currWorkout}>
      <h1>Current Workout</h1>
      <hr />
      {workouts.map((workout) => (
        <WorkoutTable
          key={workout._id}
          workout={workout}
          setPageState={setPageState}
          setEditingWorkout={setEditingWorkout}
        />
      ))}
      {addingWorkout ? (
        <WorkoutTableForm
          setPageState={setPageState}
          setAddingWorkout={setAddingWorkout}
        />
      ) : (
        <button onClick={() => setAddingWorkout(true)}>
          <p>Add Workout</p>
        </button>
      )}
    </div>
  );
};

export default MyWorkouts;
