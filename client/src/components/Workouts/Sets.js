// dayId, setName
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Set from "./Workout/Set";
import SetForm from "./WorkoutForms/SetForm";
import DisplaySetForm from "./DisplayWorkoutForms/DisplaySetForm";
import Card from "../UI/Card";

const Sets = ({ currentDayId, currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);

  const sets = useSelector((state) => {
    return state.sets;
  });

  const filteredSets = sets.filter((set) => {
    return set.dayId === currentDayId;
  });

  return (
    <Card>
      {!filteredSets.length ? (
        <h2>No sets.</h2>
      ) : (
        <>
          {/* <h2>Sets</h2> */}
          {/* {sets.map((set) => {
            return <Set key={set._id} set={set} setCurrentId={setCurrentId} />;
          })} */}
          {filteredSets.map((set) => {
            return (
              <DisplaySetForm
                key={set._id}
                set={set}
                updateFunction={updateFunction}
              />
            );
          })}
        </>
      )}
      {formToggled ? (
        <>
          <SetForm
            currentDayId={currentDayId}
            currentId={currentId}
            setCurrentId={setCurrentId}
            formToggle={setFormToggled}
          />
          <button onClick={() => setFormToggled(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setFormToggled(true)}>Add New Set</button>
      )}
    </Card>);
}

  export default Sets;
