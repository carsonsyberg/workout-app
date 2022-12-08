import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    workDay: "",
    excName: "",
    repNum: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const submitHandler = (e) => {

    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      workDay: "",
      excName: "",
      repNum: "",
    });
  };

  return (
    <Card className={classes.form}>
      <h2>{currentId ? "Edit " : "Add New "}Set</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "workout_day",
            type: "date",
            value: postData.workDay,
            onChange: (e) => {
              setPostData({ ...postData, workDay: e.target.value });
            },
          }}
          label="Workout Day"
        />
        <Input
          input={{
            id: "exc_name",
            type: "text",
            value: postData.excName,
            onChange: (e) => {
              setPostData({ ...postData, excName: e.target.value });
            },
          }}
          label="Excercise Name"
        />
        <Input
          input={{
            id: "rep_num",
            type: "Number",
            value: postData.repNum,
            onChange: (e) => {
              setPostData({ ...postData, repNum: e.target.value });
            },
          }}
          label="Number of Reps"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={clear}>Clear</button>
    </Card>
  );
};

export default Form;
