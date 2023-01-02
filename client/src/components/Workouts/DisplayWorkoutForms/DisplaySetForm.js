import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import Reps from "../Reps";
import { useSelector, useDispatch } from "react-redux";
import { deleteSet, updateSet, getReps } from "../../../actions/workouts";
import classes from "./DisplayDayForm.module.css";

// What pieces form should have usually
// [dayId] [setName]
// upon changing fields add submit edit / cancel edit buttons

const DisplaySetForm = ({ set, updateFunction }) => {

  const currentSetId = set._id;

  const [setData, setSetData] = useState(set);
  const [formChanged, setFormChanged] = useState(false);
  const [currentRepId, setCurrentRepId] = useState(null);

  const repUpdate = () => {
    dispatch(getReps());
  };

  const cancelEdit = () => {
    setSetData(set);
    setFormChanged(false);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormChanged(false);
    dispatch(updateSet(currentSetId, setData));

    updateFunction();
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* <Input
          input={{
            id: "day_id",
            type: "text",
            value: setData.dayId,
            readOnly: true,
            onChange: (e) => {
              setSetData({ ...setData, dayId: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Day Id"
        /> */}
        <Input
          input={{
            id: "set_name",
            type: "text",
            value: setData.setName,
            onChange: (e) => {
              setSetData({ ...setData, setName: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Set Name"
        />
        {formChanged && <button type="submit">Update Set</button>}
        {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
        {!formChanged && <button onClick={() => dispatch(deleteSet(currentSetId))}>Delete Set</button>}
      </form>
      <Reps
        currentSetId={currentSetId}
        currentRepId={currentRepId}
        setCurrentId={setCurrentRepId}
        updateFunction={repUpdate} />
    </Card>
  );
};

export default DisplaySetForm;
