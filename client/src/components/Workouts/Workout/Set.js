import React from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import Rep from "./Rep";

const Set = (props) => {
  return (
    <>
      <h4>{props.setName}</h4>
      <ul>
        <Rep weight="145" units="lbs" />
        <Rep weight="145" units="lbs" />
        <Rep weight="145" units="lbs" />
        <Rep weight="145" units="lbs" />
      </ul>
    </>
  );
};

export default Set;
