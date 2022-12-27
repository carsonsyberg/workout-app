import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createRep, updateRep } from "../../../actions/workouts";

const RepForm = ({ currentSetId, currentRepId, setCurrentRepId, formToggle }) => {
  const [repData, setRepData] = useState({
    setId: currentSetId,
    weight: 0,
    numReps: 0,
  });

  const clear = () => {
    setCurrentRepId(null);
    setRepData({
      setId: currentSetId,
      weight: 0,
      numReps: 0,
    });
  };

  const rep = useSelector((state) =>
    currentRepId ? state.reps.find((r) => r._id === currentRepId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (rep) setRepData(rep);
  }, [rep]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    formToggle(false);

    if (currentRepId) {
      dispatch(updateRep(currentRepId, repData));
    } else {
      dispatch(createRep(repData));
    }
    
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
            readOnly: true,
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
