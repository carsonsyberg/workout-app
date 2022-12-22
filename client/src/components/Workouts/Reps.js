// setId, weight, numReps
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rep from "./Workout/Rep";
import RepForm from "../WorkoutForms/RepForm";
import DisplayRepForm from "./DisplayWorkoutForms/DisplayRepForm";
import Card from "../UI/Card";

const Reps = ({ currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const reps = useSelector((state) => {
    return state.reps;
  });

  return (<Card>{!reps.length ? (
    <h2>No reps.</h2>
  ) : (
    <>
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
    </>
  )}
    {formToggled ? (
      <>
        <RepForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          updateFunction={updateFunction}
          formToggle={setFormToggled}
        />
        <button onClick={() => setFormToggled(false)}>Cancel</button>
      </>
    ) : (
      <button onClick={() => setFormToggled(true)}>Add New Rep</button>
    )}
  </Card>)
};

export default Reps;
