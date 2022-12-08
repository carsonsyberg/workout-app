// setId, weight, numReps
import React from "react";
import { useSelector } from "react-redux";
import Rep from "./Workout/Rep";
import Card from "../UI/Card";

const Reps = ({ setCurrentId }) => {
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
        return <Rep key={rep._id} rep={rep} setCurrentId={setCurrentId} />;
      })}
    </Card>
  );
};

export default Reps;
