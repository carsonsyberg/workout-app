import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { createSet } from "../../actions/workouts";

const SetForm = () => {
  const [setData, setSetData] = useState({
    dayId: "",
    setName: "",
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setSetData({
        dayId: "",
        setName: "",
    });
    dispatch(createSet(setData));
  };

  return (
    <Card>
      <h2>Add New Set</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "day_id",
            type: "text",
            value: setData.dayId,
            onChange: (e) => {
              setSetData({ ...setData, dayId: e.target.value });
            },
          }}
          label="Day Id"
        />
        <Input
          input={{
            id: "set_name",
            type: "text",
            value: setData.setName,
            onChange: (e) => {
              setSetData({ ...setData, setName: e.target.value });
            },
          }}
          label="Set Name"
        />
        <button type="submit">Add Set</button>
      </form>
    </Card>
  );
};

export default SetForm;
