import React, { useState, useEffect } from "react";
import classes from "./DateTime.module.css";

// TODO: change pageState to display with better looking things (get rid of extra spaces)

const DateTime = ({ pageState }) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <p className={classes.datetime}>
      {pageState === "CurrWorkout" ? date.toLocaleTimeString() : pageState}
    </p>
  );
};

export default DateTime;
