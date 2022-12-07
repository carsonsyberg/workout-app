import React, { useState } from "react";
import Post from "./Post/Post";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import classes from "./Posts.module.css";

const Posts = ({ setCurrentId }) => {
  const [dayFilter, setDayFilter] = useState("7");

  const posts = useSelector((state) => {
    return state.posts;
  });

  const dayFilterChangeHandler = (event) => {
    console.log(event.target.value);
    setDayFilter(event.target.value);
  };

  console.log(posts);

  const filteredPosts = posts.filter((post) => {
    const d = new Date(post.workDay);
    return d.getDay() == dayFilter;
  });

  console.log(filteredPosts);

  return !posts.length ? (
    <Card>
      <h2>No workouts.</h2>
    </Card>
  ) : (
    <Card>
      <select className={classes.select} name="dayFilter" id="dayFilter" onChange={dayFilterChangeHandler}>
        <option value={7}>All excercises</option>
        <option value={6}>Sunday</option>
        <option value={0}>Monday</option>
        <option value={1}>Tuesday</option>
        <option value={2}>Wednesday</option>
        <option value={3}>Thursday</option>
        <option value={4}>Friday</option>
        <option value={5}>Saturday</option>
      </select>
      <div className={classes.grid}>
        {dayFilter == 7
          ? posts.map((post) => <Post key={post._id} post={post} setCurrentId={setCurrentId} />)
          : filteredPosts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </Card>
  );
};

export default Posts;
