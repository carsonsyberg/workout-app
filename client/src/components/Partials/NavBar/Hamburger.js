import React from "react";
import classes from "./Hamburger.module.css";

const Hamburger = ({ showMenu, toggleShowMenu }) => {
  return (
    <img
      className={classes.image}
      tabIndex="1"
      src="https://i.imgur.com/vG7AAsQ.png"
      alt="hamburger selector"
      onClick={toggleShowMenu}
    />
  );
};

export default Hamburger;
