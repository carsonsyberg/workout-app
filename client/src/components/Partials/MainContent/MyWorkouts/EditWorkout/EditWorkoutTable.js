import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWeek } from "../../../../../actions/workouts";
import {
  deleteWeek,
  createDay,
  deleteDay,
  getDaysByWeekId,
} from "../../../../../actions/workouts";
import classes from "./EditWorkoutTable.module.css";

// TODO: need to get days by week ID then map days into editWorkoutRows

const EditWorkoutTable = ({
  pageState,
  setPageState,
  days,
  setEditingWeek,
  week,
}) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [addingDay, setAddingDay] = useState(false);
  const [weekData, setWeekData] = useState({ weekName: week.weekName });
  const [weekDataChanged, setWeekDataChanged] = useState(false);

  const dispatch = useDispatch();

  const daysUsed = days.map((day) => day.dayOfWeek);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const submitDayHandler = (day) => {
    dispatch(createDay({ weekId: week._id, dayOfWeek: day }));
    setAddingDay(false);
  };

  const submitWeekUpdateHandler = () => {
    dispatch(updateWeek(week._id, weekData));
    setWeekDataChanged(false);
  };

  return (
    <div className={classes.editWorkoutTable}>
      <input
        className={classes.weekName}
        value={weekData.weekName}
        onChange={(e) => {
          setWeekDataChanged(true);
          setWeekData({ ...weekData, weekName: e.target.value });
        }}
      />
      {weekDataChanged && (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => submitWeekUpdateHandler()}
          >
            Update Week Name
          </button>
          <button
            onClick={() => {
              setWeekData({
                weekName: week.weekName,
              });
              setWeekDataChanged(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {days.map((day) => {
        return (
          <div key={day._id} className={classes.editWorkoutRow}>
            <h3>{day.dayOfWeek}</h3>
            <button
              className={classes.deleteButton}
              onClick={() => dispatch(deleteDay(day._id))}
            >
              <img src="https://i.imgur.com/Uq6TyUD.png" alt="trashcan icon" />
            </button>
          </div>
        );
      })}
      {addingDay ? (
        <div className={classes.editWorkoutRow}>
          {daysOfWeek
            .filter((day) => !daysUsed.includes(day))
            .map((day) => (
              <button
                className={classes.dayOfWeekButton}
                onClick={() => submitDayHandler(day)}
              >
                {daysOfWeek.filter((day) => !daysUsed.includes(day)).length > 4
                  ? day.substring(0, 3)
                  : day}
              </button>
            ))}
          <button onClick={() => setAddingDay(false)}>
            <img src="https://i.imgur.com/Uq6TyUD.png" />
          </button>
        </div>
      ) : (
        <div
          className={classes.editWorkoutButton}
          onClick={() => setAddingDay(true)}
        >
          <button>Add Day</button>
        </div>
      )}
      <div className={classes.editWorkoutButton}>
        <button
          onClick={() => {
            setEditingWeek(week._id);
            setPageState("EditWeek");
          }}
        >
          Edit Week
        </button>
      </div>
      {confirmingDelete ? (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => dispatch(deleteWeek(week._id))}
          >
            Confirm Delete
          </button>
          <button onClick={() => setConfirmingDelete(false)}>
            Cancel Delete
          </button>
        </div>
      ) : (
        <div className={classes.editWorkoutButton}>
          <button onClick={() => setConfirmingDelete(true)}>Delete Week</button>
        </div>
      )}
    </div>
  );
};

export default EditWorkoutTable;
