// setId, weight, numReps
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rep from "./Workout/Rep";
import DisplayRepForm from "./DisplayWorkoutForms/DisplayRepForm";
import Card from "../UI/Card";

const Reps = ({ currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);
  
  const reps = useSelector((state) => {
    return state.reps;
  });

  return !reps.length ? (
    <Card>
      <h2>No reps.</h2>
    </Card>
  ) : (
    <Card>
      <h2>Reps</h2>
      {/* {reps.map((rep) => {
        return <Rep key={rep._id} rep={rep} setCurrentId={setCurrentId} />;
      })} */}
      {reps.map((rep) => {
        return (
          <DisplayRepForm
            key={rep._id}
            rep={rep}
            updateFunction={updateFunction}
          />
        );
      })}
    </Card>
  );
};

export default Reps;
