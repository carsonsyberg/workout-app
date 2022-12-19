import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createRep, updateRep } from "../../actions/workouts";

const RepForm = ({ currentId, setCurrentId, updateFunction }) => {
  const [repData, setRepData] = useState({
    setId: "",
    weight: 0,
    numReps: 0,
  });

  const clear = () => {
    setCurrentId(null);
    setRepData({
      setId: "",
      weight: 0,
      numReps: 0,
    });
  };

  const rep = useSelector((state) =>
    currentId ? state.reps.find((r) => r._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (rep) setRepData(rep);
  }, [rep]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateRep(currentId, repData));
    } else {
      dispatch(createRep(repData));
    }

    updateFunction();
    
    clear();
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
      <button onClick={clear}>Clear</button>
    </Card>
  );
};

export default RepForm;
