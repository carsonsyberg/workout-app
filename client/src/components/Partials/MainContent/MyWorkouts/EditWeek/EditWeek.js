import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSetsByDayId,
  getRepsByDayId,
  createSet,
} from "../../../../../actions/workouts";
import classes from "./EditWeek.module.css";
import SetTable from "./SetTable/SetTable";

// TODO: allow users to change order of sets

const EditWeek = ({ setEditingWeek, days, week, workout }) => {
  const dispatch = useDispatch();
  // TODO: set shown day to the day of the workout that matches the current day of the week
  const [shownDayIndex, setShownDayIndex] = useState(0);
  const [setData, setSetData] = useState({
    dayId: days[shownDayIndex]._id,
    setName: "Set Name",
    notes: "",
  });
  const [changedSetData, setChangedSetData] = useState(false);

  useEffect(() => {
    setSetData({
      dayId: days[shownDayIndex]._id,
      setName: "Set Name",
      notes: "",
    });
    setChangedSetData(false);
    dispatch(getSetsByDayId(days[shownDayIndex]._id));
    dispatch(getRepsByDayId(days[shownDayIndex]._id));
  }, [shownDayIndex, dispatch]);

  const sets = useSelector((state) => {
    return state.sets;
  });

  const reps = useSelector((state) => {
    return state.reps;
  });

  const shownDayUpdateHandler = (leftOrRight) => {
    if (leftOrRight === "left") {
      setShownDayIndex((prevState) => {
        if (prevState === 0) {
          prevState = days.length - 1; // wrap around to last index in days array
        } else {
          prevState = prevState - 1;
        }
        return prevState;
      });
    } else {
      setShownDayIndex((prevState) => {
        if (prevState === days.length - 1) {
          prevState = 0; // wrap around to first index in days array
        } else {
          prevState = prevState + 1;
        }
        return prevState;
      });
    }
  };

  const addSetHandler = () => {
    setSetData({
      dayId: days[shownDayIndex]._id,
      setName: "Set Name",
      notes: "",
    });
    setChangedSetData(false);
    dispatch(createSet(setData));
  };

  return (
    <>
      <div className={classes.editWeek}>
        <h1>{workout.workoutName}</h1>
        <hr />
        <div className={classes.daySelector}>
          <img
            src="https://i.imgur.com/7nIxy8r.png"
            alt="left arrow"
            onClick={() => shownDayUpdateHandler("left")}
          />
          <h2>{`${days[shownDayIndex].dayOfWeek}, ${week.weekName}`}</h2>
          <img
            src="https://i.imgur.com/QPOuCc8.png"
            alt="right arrow"
            onClick={() => shownDayUpdateHandler("right")}
          />
        </div>
      </div>
      <div className={classes.setTables}>
        {sets.map((set) => {
          return <SetTable key={set._id} set={set} reps={reps} />;
        })}
        <div className={classes.addSetForm}>
          <input
            className={
              changedSetData ? classes.changedInput : classes.regularInput
            }
            type="text"
            value={setData.setName}
            onChange={(e) => {
              setChangedSetData(true);
              setSetData({ ...setData, setName: e.target.value });
            }}
            onClick={() => setSetData({ ...setData, setName: "" })}
          />
          <button
            className={classes.addSetButton}
            onClick={() => addSetHandler()}
          >
            Add Set
          </button>
        </div>
        <button
          className={classes.returnButton}
          onClick={() => setEditingWeek(false)}
        >
          Return to Edit Weeks
        </button>
      </div>
    </>
  );
};

export default EditWeek;

// Wokrout Name
// hr line
// < Monday, March 5th >
// map sets
// inside each set map reps

// need to get all sets by dayId
// need to get all reps by dayId as well
