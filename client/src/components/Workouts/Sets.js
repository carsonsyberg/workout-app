// dayId, setName
import React from "react";
import { useSelector } from "react-redux";
import Set from "./Workout/Set";
import Card from "../UI/Card";

const Sets = ({ setCurrentId }) => {
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
      {sets.map((set) => {
        return <Set key={set._id} set={set} setCurrentId={setCurrentId} />;
      })}
    </Card>
  );
};

export default Sets;
