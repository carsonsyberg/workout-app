import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createDay, updateDay } from "../../../actions/workouts";

const DayForm = ({ currentWorkoutId, currentId, setCurrentId, formToggle }) => {

  const [dayData, setDayData] = useState({
    workoutId: currentWorkoutId,
    dayOfWeek: "",
    dayName: "",
  });

  const clear = () => {
    setCurrentId(null);
    setDayData({
      workoutId: currentWorkoutId,
      dayOfWeek: "",
      dayName: "",
    });
  };

  const day = useSelector((state) =>
    currentId ? state.days.find((d) => d._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (day) setDayData(day);
  }, [day]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    formToggle(false);

    if (currentId) {
      dispatch(updateDay(currentId, dayData));
    } else {
      dispatch(createDay(dayData));
    }

    clear();
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
            readOnly: true,
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
      <button onClick={clear}>Clear</button>
    </Card>
  );
};

export default DayForm;
