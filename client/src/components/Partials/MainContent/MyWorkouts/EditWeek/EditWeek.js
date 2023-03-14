import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSetsByDayId,
  getRepsByDayId,
} from "../../../../../actions/workouts";
import classes from "./EditWeek.module.css";

const EditWeek = ({ days, week, workout }) => {
  const dispatch = useDispatch();
  // TODO: set shown day to the day of the workout that matches the current day of the week
  const [shownDay, setShownDay] = useState(
    ...days.filter((day) => day.dayOfWeek === "Monday")
  );
  const [shownDayIndex, setShownDayIndex] = useState(
    days.findIndex((day) => day.dayOfWeek === "Monday")
  );

  useEffect(() => {
    dispatch(getSetsByDayId(shownDay._id));
    dispatch(getRepsByDayId(shownDay._id));
  }, [shownDay._id, dispatch]);

  const sets = useSelector((state) => {
    return state.sets;
  });

  const reps = useSelector((state) => {
    return state.reps;
  });

  const shownDayUpdateHandler = (leftOrRight) => {
    console.log("LEFT OR RIGHT:", leftOrRight);
    if (leftOrRight === "left") {
      setShownDayIndex((prevState) => {
        console.log("PREV INDEX:", prevState);
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
    console.log("INDEX:", shownDayIndex)
    console.log("SET SHOWN DAY:", days[shownDayIndex]);
    setShownDay(days[shownDayIndex]);
  };

  return (
    <div className={classes.editWeek}>
      <h1>{workout.workoutName}</h1>
      <hr />
      <div className={classes.daySelector}>
        <img
          src="https://i.imgur.com/7nIxy8r.png"
          alt="left arrow"
          onClick={() => shownDayUpdateHandler("left")}
        />
        <h2>{`${shownDay.dayOfWeek}, ${week.weekName}`}</h2>
        <img
          src="https://i.imgur.com/QPOuCc8.png"
          alt="right arrow"
          onClick={() => shownDayUpdateHandler("right")}
        />
      </div>
    </div>
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
