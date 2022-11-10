import React from "react";
import Day from "./Day";

const Workout = (props) => {
    return (<><h2>{props.name}</h2>
        <Day day="Monday" />
        <Day day="Tuesday" />
        <Day day="Wednesday" />
        <Day day="Thursday" />
        <Day day="Friday" />
    </>)
};

export default Workout;