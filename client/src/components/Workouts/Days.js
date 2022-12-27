// workoutId, dayOfWeek, dayName
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Workout/Day";
import DisplayDayForm from "./DisplayWorkoutForms/DisplayDayForm";
import Card from "../UI/Card";
import DayForm from "./WorkoutForms/DayForm";

const Days = ({ currentWorkoutId, currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const days = useSelector((state) => {
    return state.days;
  });

  const filteredDays = days.filter((day) => {
    return day.workoutId === currentWorkoutId;
  });

  return (
    <Card>
      {!filteredDays.length ? (
        <h2>No days.</h2>
      ) : (
        <>
          <h2>Days</h2>
          {/* {days.map((day) => {
            return <Day key={day._id} day={day} setCurrentId={setCurrentId} />
          })} */}
          {filteredDays.map((day) => {
            return (
              <DisplayDayForm
                key={day._id}
                day={day}
                updateFunction={updateFunction}
              />
            );
          })}
        </>
      )}
      {formToggled ? (
        <>
          <DayForm
            currentWorkoutId={currentWorkoutId}
            currentId={currentId}
            setCurrentId={setCurrentId}
            formToggle={setFormToggled}
          />
          <button onClick={() => setFormToggled(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setFormToggled(true)}>Add New Day</button>
      )}
    </Card>
  );
};

export default Days;
