import React, { useEffect } from "react";
import memories from './images/memories.png';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";

import classes from './App.module.css';
import posts from "./reducers/posts";
import Workouts from "./components/Workouts/Workouts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <div className={classes.headerBar}>
        <h2 className={classes.headerText}>Workout App</h2>
        <img className={classes.headerImg} src={memories} alt="memories" />
      </div>
      <div className={classes.contentBar}>
        <Posts />
        <Form />
      </div>
        {/* <Workouts /> */}
    </div>
  );
};

export default App;
