import React, { useState } from "react";
import classes from "./NaviBar.module.css";
import memories from "../../images/memories.png";
import DateTime from "./DateTime";

const NaviBar = ({ currPage, setPage }) => {
  return (
    <div className={classes.navbar}>
      <ul>
        {/* <li>
          <button  className={classes.headerImg}>
            <img src={memories} alt="memories" onClick={() => setPage("home")}/>
          </button>
        </li> */}
        <li>
          <button onClick={() => setPage("home")}>Home</button>
        </li>
        <li>
          <button onClick={() => setPage("workout")}>Workouts</button>
        </li>
        <li>
          <button onClick={() => setPage("admin")}>Admin</button>
        </li>
        <li>
          <button>
            <DateTime />
          </button>
        </li>
        <li>
          <button className={classes.login_button}>Login</button>
        </li>
        <li>
          <button
            className={classes.profile_button}
            onClick={() => setPage("profile")}
          >
            Profile
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NaviBar;
