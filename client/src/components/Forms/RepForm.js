import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { createRep } from "../../actions/workouts";

const RepForm = () => {
  const [repData, setRepData] = useState({
    setId: "",
    weight: 0,
    numReps: 0,
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setRepData({
        setId: "",
        weight: 0,
        numReps: 0,
    });
    dispatch(createRep(repData));
  };

  return (
    <Card>
      <h2>Add New Rep</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "set_id",
            type: "text",
            value: repData.setId,
            onChange: (e) => {
              setRepData({ ...repData, setId: e.target.value });
            },
          }}
          label="Set Id"
        />
        <Input
          input={{
            id: "weight",
            type: "number",
            value: repData.weight,
            onChange: (e) => {
              setRepData({ ...repData, weight: e.target.value });
            },
          }}
          label="Weight"
        />
        <Input
          input={{
            id: "num_reps",
            type: "number",
            value: repData.numReps,
            onChange: (e) => {
              setRepData({ ...repData, numReps: e.target.value });
            },
          }}
          label="Number of Reps"
        />
        <button type="submit">Add Rep</button>
      </form>
    </Card>
  );
};

export default RepForm;
