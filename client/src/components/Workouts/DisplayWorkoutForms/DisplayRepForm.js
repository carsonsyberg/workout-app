import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { deleteRep, updateRep } from "../../../actions/workouts";
import classes from "./DisplayDayForm.module.css";

// What pieces form should have usually
// [setId] [weight] [numReps]
// upon changing rep fields -> change deleteButton to submit edit / cancel edit buttons

const DisplayRepForm = ({ rep, updateFunction }) => {

  const currentId = rep._id;

  const [repData, setRepData] = useState(rep);
  const [formChanged, setFormChanged] = useState(false);

  const cancelEdit = () => {
    setRepData(rep);
    setFormChanged(false);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormChanged(false);
    dispatch(updateRep(currentId, repData));

    updateFunction();
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* <Input
          input={{
            id: "set_id",
            type: "text",
            value: repData.setId,
            readOnly: true,
            onChange: (e) => {
              setRepData({ ...repData, setId: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Set Id"
        /> */}
        <Input
          input={{
            id: "weight",
            type: "text",
            value: repData.weight,
            onChange: (e) => {
              setRepData({ ...repData, weight: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Weight"
        />
        <Input
          input={{
            id: "num_reps",
            type: "text",
            value: repData.numReps,
            onChange: (e) => {
              setRepData({ ...repData, numReps: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Number of Reps"
        />
        {formChanged && <button type="submit">Update Rep</button>}
        {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
        {!formChanged && <button onClick={() => dispatch(deleteRep(rep._id))}>Delete Rep</button>}
      </form>
    </>
  );
};

export default DisplayRepForm;
