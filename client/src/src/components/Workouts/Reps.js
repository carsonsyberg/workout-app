// setId, weight, numReps
import React from "react";
import { useSelector } from "react-redux";
import Rep from "./Workout/Rep";
import Card from "../UI/Card";

const Reps = () => {
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
      {reps.map((rep) => {
        return <Rep setId={rep.setId} weight={rep.weight} numReps={rep.numReps} repId={rep._id} />;
      })}
    </Card>
  );
};

export default Reps;
