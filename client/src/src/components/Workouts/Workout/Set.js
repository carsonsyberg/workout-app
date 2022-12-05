import React from "react";
import Card from "../../UI/Card";

const Set = (props) => {
  return (
    <Card>
      <h2>{props.setName}</h2>
      <h4>Day Id: {props.dayId}</h4>
      <h4>Set Id: {props.setId}</h4>
    </Card>
  );
};

export default Set;
