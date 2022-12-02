import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { createDay } from "../../actions/workouts";

const DayForm = () => {
  const [dayData, setDayData] = useState({
    workoutId: "",
    dayOfWeek: "",
    dayName: "",
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setDayData({
        workoutId: "",
        dayOfWeek: "",
        dayName: "",
    });
    dispatch(createDay(dayData));
  };

  return (
    <Card>
      <h2>Add New Day</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "workout_id",
            type: "text",
            value: dayData.workoutId,
            onChange: (e) => {
              setDayData({ ...dayData, workoutId: e.target.value });
            },
          }}
          label="Workout Id"
        />
        <Input
          input={{
            id: "day_of_week",
            type: "text",
            value: dayData.dayOfWeek,
            onChange: (e) => {
              setDayData({ ...dayData, dayOfWeek: e.target.value });
            },
          }}
          label="Day of Week"
        />
        <Input
          input={{
            id: "day_name",
            type: "text",
            value: dayData.dayName,
            onChange: (e) => {
              setDayData({ ...dayData, dayName: e.target.value });
            },
          }}
          label="Day Name"
        />
        <button type="submit">Add Day</button>
      </form>
    </Card>
  );
};

export default DayForm;
