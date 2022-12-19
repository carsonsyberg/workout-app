// workoutId, dayOfWeek, dayName
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Workout/Day";
import DisplayDayForm from "./DisplayWorkoutForms/DisplayDayForm";
import Card from "../UI/Card";
import DayForm from "../WorkoutForms/DayForm";

const Days = ({ currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const days = useSelector((state) => {
    return state.days;
  });

  return (
    <Card>
      {!days.length ? (
        <h2>No days.</h2>
      ) : (
        <>
          <h2>Days</h2>
          {/* {days.map((day) => {
            return <Day key={day._id} day={day} setCurrentId={setCurrentId} />
          })} */}
          {days.map((day) => {
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
            currentId={currentId}
            setCurrentId={setCurrentId}
            updateFunction={updateFunction}
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
