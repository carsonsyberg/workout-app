import React from "react";
import Card from "../../UI/Card";

const Day = (props) => {
  return (
    <Card>
      <h2>{props.dayOfWeek}</h2>
      <h3>{props.dayName}</h3>
      <h4>Workout Id: {props.workoutId}</h4>
      <h4>Day Id: {props.dayId}</h4>
    </Card>
  );
};

export default Day;
