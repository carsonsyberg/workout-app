import React from "react";
import Card from "../../UI/Card";

const Rep = (props) => {
  return (
    <Card>
      <h2>Weight: {props.weight}</h2>
      <h3>Num Reps: {props.numReps}</h3>
      <h4>Set Id: {props.setId}</h4>
      <h4>Rep Id: {props.repId}</h4>
    </Card>
  );
};

export default Rep;
