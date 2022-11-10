import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Form.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

const Form = () => {
  const [postData, setPostData] = useState({
    workDay: "",
    excName: "",
    repNum: "",
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setPostData({
      workDay: "",
      excName: "",
      repNum: "",
    });
    dispatch(createPost(postData));
  };

  return (
    <Card className={classes.form}>
      <h2>Add New Set</h2>
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
    </Card>
  );
};

export default Form;
