import React from "react";
import Card from "../../UI/Card";
import { useDispatch } from 'react-redux';
import { deleteDay } from "../../../actions/workouts";

const Day = ({ day, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <h2>{day.dayOfWeek}</h2>
      <h3>{day.dayName}</h3>
      <h4>Workout Id: {day.workoutId}</h4>
      <h4>Day Id: {day._id}</h4>
      <button onClick={() => setCurrentId(day._id)}>Edit Day</button>
      <button onClick={() => dispatch(deleteDay(day._id))}>Delete Day</button>
    </Card>
  );
};

export default Day;
