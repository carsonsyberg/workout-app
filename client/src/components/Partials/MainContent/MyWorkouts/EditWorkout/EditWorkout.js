import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWeek,
  getWeeksByWorkoutId,
  getDaysByWorkoutId,
} from "../../../../../actions/workouts";
import EditWorkoutTable from "./EditWorkoutTable";
import classes from "./EditWorkout.module.css";
import EditWeek from "../EditWeek/EditWeek";

// TODO: Allow users to edit week name and auto generate week 1 / 2 / etc for default
// TODO: Allow users to rearrange week order 

const EditWorkout = ({ setEditingWorkout, workout, editingWeek, setEditingWeek }) => {
  const [weekData, setWeekData] = useState({
    weekName: "Week X",
    workoutId: workout._id,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeksByWorkoutId(workout._id));
    dispatch(getDaysByWorkoutId(workout._id));
  }, [workout._id, dispatch]);

  const weeks = useSelector((state) => {
    return state.weeks;
  });

  const days = useSelector((state) => {
    return state.days;
  });

  const addWeekHandler = () => {
    dispatch(createWeek(weekData));
  };

  return editingWeek ? (
    <EditWeek
      setEditingWeek={setEditingWeek}
      days={days.filter((day) => day.weekId === editingWeek)}
      week={weeks.filter((week) => week._id === editingWeek)[0]}
      workout={workout}
    />
  ) : (
    <div className={classes.editWorkout}>
      <div className={classes.editWorkoutHeader}>
        <h1>{workout.workoutName}</h1>
        <hr />
      </div>
      {weeks.map((week) => (
        <EditWorkoutTable
          days={days.filter((day) => day.weekId === week._id)}
          setEditingWeek={setEditingWeek}
          key={week._id}
          week={week}
        />
      ))}
      <button onClick={() => addWeekHandler()}>
        <p>Add Week</p>
      </button>
      <button className={classes.returnButton} onClick={() => setEditingWorkout(false)}>Return to My Workouts</button>
    </div>
  );
};

export default EditWorkout;
