import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { deleteSet, updateSet } from "../../../actions/workouts";

// What pieces form should have usually
// [dayId] [setName]
// upon changing fields add submit edit / cancel edit buttons

const DisplaySetForm = ({ set, updateFunction }) => {

  const currentId = set._id;

  const [setData, setSetData] = useState(set);
  const [formChanged, setFormChanged] = useState(false);

  const cancelEdit = () => {
    setSetData(set);
    setFormChanged(false);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormChanged(false);
    dispatch(updateSet(currentId, setData));

    updateFunction();
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "day_id",
            type: "text",
            value: setData.dayId,
            onChange: (e) => {
              setSetData({ ...setData, dayId: e.target.value });
              setFormChanged(true);
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
              setFormChanged(true);
            },
          }}
          label="Set Name"
        />
        {formChanged && <button type="submit">Update Set</button>}
      </form>
      {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
      {!formChanged && <button onClick={() => dispatch(deleteSet(set._id))}>Delete Set</button>}
    </Card>
  );
};

export default DisplaySetForm;
