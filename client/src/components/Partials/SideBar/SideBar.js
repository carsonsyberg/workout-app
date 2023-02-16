import React from "react";
import LoginForm from "./LoginForm";
import classes from "./SideBar.module.css";

const SideBar = ({ sideState, setSideState }) => {
  return (
    <div className={classes.sideBar}>
      {sideState === "login" && <LoginForm setSideState={setSideState} />}
    </div>
  );
};

export default SideBar;
