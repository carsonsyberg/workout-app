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

const EditWorkout = ({
  pageState,
  setPageState,
  setEditingWorkout,
  workout,
  editingWeek,
  setEditingWeek,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeksByWorkoutId(workout._id));
    dispatch(getDaysByWorkoutId(workout._id));
  }, [workout._id, dispatch]);

  const weeks = useSelector((state) => {
    return state.weeks;
  });

  const [weekData, setWeekData] = useState({
    weekName: "Week Name",
    workoutId: workout._id,
  });
  const [changedWeekData, setChangedWeekData] = useState(false);

  const days = useSelector((state) => {
    return state.days;
  });

  const addWeekHandler = () => {
    dispatch(createWeek(weekData));
  };

  return pageState === "EditWeek" ? (
    <EditWeek
      pageState={pageState}
      setPageState={setPageState}
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
          pageState={pageState}
          setPageState={setPageState}
          days={days.filter((day) => day.weekId === week._id)}
          setEditingWeek={setEditingWeek}
          key={week._id}
          week={week}
        />
      ))}
      <div className={classes.addWeekForm}>
        <input
          className={
            changedWeekData ? classes.changedInput : classes.regularInput
          }
          type="text"
          value={weekData.weekName}
          onChange={(e) => {
            setChangedWeekData(true);
            setWeekData({ ...weekData, weekName: e.target.value });
          }}
          onClick={() => {
            setChangedWeekData(true);
            setWeekData({ ...weekData, weekName: "" });
          }}
        />
        <button onClick={() => addWeekHandler()}>
          <p>Add Week</p>
        </button>
        {changedWeekData && (
          <button
            className={classes.cancelAddSetButton}
            onClick={() => {
              setWeekData({
                weekName: "Week Name",
              });
              setChangedWeekData(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      <button
        className={classes.returnButton}
        onClick={() => setPageState("MyWorkouts")}
      >
        Return to My Workouts
      </button>
    </div>
  );
};

export default EditWorkout;
