import React from "react";
import Card from "../../UI/Card";

const Workout = (props) => {
  return (
    <Card>
      <h2>{props.name}</h2>
      <h3>{props.isDefault}</h3>
    </Card>
  );
};

export default Workout;
