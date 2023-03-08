import React, { useState } from "react";

import DateTime from "./DateTime";
import Hamburger from "./Hamburger";
import classes from "./NavBar.module.css";

const NavBar = ({ showMenu, setShowMenu, pageState, setPageState }) => {
  const toggleShowMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.mainbar}>
        <Hamburger showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        <DateTime pageState={pageState} />
        <button
          onClick={() => {
            setShowMenu(false);
            setPageState("Login");
          }}
        >
          Login
        </button>
      </div>
      {showMenu && (
        <div className={classes.hamburgerMenu}>
          <ul>
            <li
              onClick={() => {
                toggleShowMenu();
                setPageState("CurrWorkout");
              }}
            >
              Current Workout
            </li>
            <li
              onClick={() => {
                toggleShowMenu();
                setPageState("MyWorkouts");
              }}
            >
              My Workouts
            </li>
            <li
              onClick={() => {
                toggleShowMenu();
                setPageState("PopWorkouts");
              }}
            >
              Popular Workouts
            </li>
            <li
              onClick={() => {
                toggleShowMenu();
                setPageState("Settings");
              }}
            >
              Settings
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
