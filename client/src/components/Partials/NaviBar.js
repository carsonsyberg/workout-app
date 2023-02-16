import React, { useState } from "react";
import classes from "./NaviBar.module.css";
import memories from "../../images/memories.png";
import DateTime from "./DateTime";

const NaviBar = ({ currPage, setPage, setSide, sideState }) => {
  return (
    <div className={classes.navbar}>
      <ul>
        {/* <li>
          <button  className={classes.headerImg}>
            <img src={memories} alt="memories" onClick={() => setPage("home")}/>
          </button>
        </li> */}
        <li>
          <button
            onClick={() => {
              setPage("home");
              setSide("");
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setPage("workout");
              setSide("");
            }}
          >
            Workouts
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setPage("admin");
              setSide("");
            }}
          >
            Admin
          </button>
        </li>
        <li>
          <button>
            <DateTime />
          </button>
        </li>
        <li>
          {sideState === "login" ? (
            <button
              className={classes.login_button}
              onClick={() => setSide("")}
            >
              Cancel
            </button>
          ) : (
            <button
              className={classes.login_button}
              onClick={() => setSide("login")}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NaviBar;
