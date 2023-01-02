// setId, weight, numReps
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rep from "./Workout/Rep";
import RepForm from "./WorkoutForms/RepForm";
import DisplayRepForm from "./DisplayWorkoutForms/DisplayRepForm";
import Card from "../UI/Card";

const Reps = ({ currentSetId, currentRepId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const reps = useSelector((state) => {
    return state.reps;
  });

  const filteredReps = reps.filter((rep) => {
    return rep.setId === currentSetId;
  });

  return (<>{!filteredReps.length ? (
    <h2>No reps.</h2>
  ) : (
    <>
      {/* <h2>Reps</h2> */}
      {/* {reps.map((rep) => {
        return <Rep key={rep._id} rep={rep} setCurrentId={setCurrentId} />;
      })} */}
      {filteredReps.map((rep) => {
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
          currentSetId={currentSetId}
          currentRepId={currentRepId}
          setCurrentRepId={setCurrentId}
          formToggle={setFormToggled}
        />
        <button onClick={() => setFormToggled(false)}>Cancel</button>
      </>
    ) : (
      <button onClick={() => setFormToggled(true)}>Add New Rep</button>
    )}
  </>)
};

export default Reps;
