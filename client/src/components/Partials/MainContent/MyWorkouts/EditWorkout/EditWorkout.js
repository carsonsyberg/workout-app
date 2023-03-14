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

// INFO: In the future, if you want to display a bunch of tables AND the child-tables of those tables on the same screen
//       you need to get all the tables AND get all the child tables at the same time, then filter down the child tables into the parents

const EditWorkout = ({ workout }) => {
  const [editingWeek, setEditingWeek] = useState(false);

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
    </div>
  );
};

export default EditWorkout;
