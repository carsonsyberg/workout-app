// workoutId, dayOfWeek, dayName
import React from "react";
import { useSelector } from "react-redux";
import Day from "./Workout/Day";
import Card from "../UI/Card";

const Days = ({ setCurrentId }) => {

    const days = useSelector((state) => {
      return state.days;
    });

    return !days.length ? (
        <Card>
          <h2>No days.</h2>
        </Card>
      ) : (
        <Card>
          <h2>Days</h2>
          {days.map((day) => {
            return <Day key={day._id} day={day} setCurrentId={setCurrentId} />
          })}
        </Card>
      );
};

export default Days;
