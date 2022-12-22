import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createSet, updateSet } from "../../actions/workouts";

const SetForm = ({ currentId, setCurrentId, updateFunction, formToggle }) => {
  const [setData, setSetData] = useState({
    dayId: "",
    setName: "",
  });

  const clear = () => {
    setCurrentId(null);
    setSetData({
      dayId: "",
      setName: "",
    });
  };

  const set = useSelector((state) =>
    currentId ? state.sets.find((s) => s._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (set) setSetData(set);
  }, [set]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    formToggle(false);

    if (currentId) {
      dispatch(updateSet(currentId, setData));
    } else {
      dispatch(createSet(setData));
    }

    updateFunction();
    
    clear();
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
      <button onClick={clear}>Clear</button>
    </Card>
  );
};

export default SetForm;
