// dayId, setName
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Set from "./Workout/Set";
import DisplaySetForm from "./DisplayWorkoutForms/DisplaySetForm";
import Card from "../UI/Card";

const Sets = ({ currentId, setCurrentId, updateFunction }) => {
  const [formToggled, setFormToggled] = useState(false);
  
  const sets = useSelector((state) => {
    return state.sets;
  });

  return !sets.length ? (
    <Card>
      <h2>No sets.</h2>
    </Card>
  ) : (
    <Card>
      <h2>Sets</h2>
      {/* {sets.map((set) => {
        return <Set key={set._id} set={set} setCurrentId={setCurrentId} />;
      })} */}
      {sets.map((set) => {
        return (
          <DisplaySetForm
            key={set._id}
            set={set}
            updateFunction={updateFunction}
          />
        );
      })}
    </Card>
  );
};

export default Sets;
