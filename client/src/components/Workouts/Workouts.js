import React, { useState } from "react";
import { useSelector } from "react-redux";
import Workout from "./Workout/Workout";
import WorkoutForm from "./WorkoutForms/WorkoutForm";
import DisplayWorkoutForm from "./DisplayWorkoutForms/DisplayWorkoutForm";
import Card from "../UI/Card";

// workoutName, isDefault

const Workouts = ({ currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const workouts = useSelector((state) => {
    return state.workouts;
  });

  return (
    <Card>
      {!workouts.length ? (
        <h2>No workouts.</h2>
      ) : (
        <>
          <h2>Workouts</h2>
          {/* {workouts.map((workout) => {
        return <Workout workout={workout} key={workout._id} setCurrentId={setCurrentId}/>
      })} */}
          {workouts.map((workout) => {
            return (
              <DisplayWorkoutForm
                key={workout._id}
                workout={workout}
                updateFunction={updateFunction}
              />
            );
          })}
        </>)}
      {formToggled ? (
        <>
          <WorkoutForm
            currentId={currentId}
            setCurrentId={setCurrentId}
            formToggle={setFormToggled}
          />
          <button onClick={() => setFormToggled(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setFormToggled(true)}>Add New Workout</button>
      )}
    </Card>
  );
};

export default Workouts;
