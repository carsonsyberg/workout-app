import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWeek,
  getWeeksByWorkoutId,
} from "../../../../../actions/workouts";
import EditWorkoutTable from "./EditWorkoutTable";
import classes from "./EditWorkout.module.css";

// TODO: GET weeks by current workout id then each week gets mapped to an EditWorkoutTable

const EditWorkout = ({ workout }) => {
  const [weekData, setWeekData] = useState({
    weekName: "Week X",
    workoutId: workout._id,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeksByWorkoutId(workout._id));
  }, [workout._id, dispatch]);

  const weeks = useSelector((state) => {
    return state.weeks;
  });

  const addWeekHandler = () => {
    dispatch(createWeek(weekData));
  };

  return (
    <div className={classes.editWorkout}>
      <div className={classes.editWorkoutHeader}>
        <h1>{workout.workoutName}</h1>
        <hr />
      </div>
      {weeks.map((week) => (
        <EditWorkoutTable key={week._id} week={week} />
      ))}
      <button onClick={() => addWeekHandler()}>
        <p>Add Week</p>
      </button>
    </div>
  );
};

export default EditWorkout;
