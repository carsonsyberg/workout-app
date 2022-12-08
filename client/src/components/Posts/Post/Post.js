import React from "react";
import Card from "../../UI/Card";
import classes from './Post.module.css';
import { useDispatch } from 'react-redux';
import { deletePost } from "../../../actions/posts";

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

const Post = ({ post, setCurrentId }) => {
  const dayOfWeek = parseForDay(post.workDay);
  const dispatch = useDispatch();

  return (
    <Card className={classes.post}>
      <h1>{dayOfWeek}</h1>
      <h2>
        {post.excName} x{post.repNum}
      </h2>
      <h3>{post._id}</h3>
      <button onClick={() => setCurrentId(post._id)}>Edit Post</button>
      <button onClick={() => dispatch(deletePost(post._id))}>Delete Post</button>
    </Card>
  );
};

export default Post;
