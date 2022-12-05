import React from "react";
import Card from "../../UI/Card";
import classes from './Post.module.css';

const parseForDay = (date) => {
  const d = new Date(date);

  switch (d.getDay()) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      return "date error";
  }
};

const Post = (props) => {
  const dayOfWeek = parseForDay(props.post.workDay);

  return (
    <Card className={classes.post}>
      <h1>{dayOfWeek}</h1>
      <h2>
        {props.post.excName} x{props.post.repNum}
      </h2>
      <h3>{props.post._id}</h3>
    </Card>
  );
};

export default Post;
