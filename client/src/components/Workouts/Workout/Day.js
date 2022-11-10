import React from "react";
import Set from "./Set";

const Day = (props) => {
  return (
    <>
      <h3>{props.day}</h3>
      <Set setName="Squats" />
      <Set setName="Deadlift" />
      <Set setName="Pullups" />
      <Set setName="Bench" />
      <Set setName="RDL" />
    </>
  );
};

export default Day;
