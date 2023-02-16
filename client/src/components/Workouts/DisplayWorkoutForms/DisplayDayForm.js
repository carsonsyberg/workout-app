import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import Sets from "../Sets";
import { useSelector, useDispatch } from "react-redux";
import { deleteDay, updateDay, getSets } from "../../../actions/workouts";
import classes from "./DisplayDayForm.module.css";

// What pieces form should have usually
// [dayOfWeekDropDown] [dayName] [deleteButton]
// upon changing dayOfWeekDropDown or dayName -> change deleteButton to submit edit / cancel edit buttons

const DisplayDayForm = ({ day, updateFunction }) => {

  const currentId = day._id;

  const [dayData, setDayData] = useState(day);
  const [formChanged, setFormChanged] = useState(false);
  const [currentSetId, setCurrentSetId] = useState(null);

  const setUpdate = () => {
    dispatch(getSets());
  };

  const cancelEdit = () => {
    setDayData(day);
    setFormChanged(false);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormChanged(false);
    dispatch(updateDay(currentId, dayData));

    updateFunction();
  };

  return (
    <div className={classes.dayCard}>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          input={{
            id: "day_of_week",
            type: "text",
            value: dayData.dayOfWeek,
            onChange: (e) => {
              setDayData({ ...dayData, dayOfWeek: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Day of Week"
        />
        <Input
          input={{
            id: "day_name",
            type: "text",
            value: dayData.dayName,
            onChange: (e) => {
              setDayData({ ...dayData, dayName: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Day Name"
        />
        {formChanged && <button type="submit">Update Day</button>}
        {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
        {!formChanged && <button onClick={() => dispatch(deleteDay(day._id))}>Delete Day</button>}
      </form>
      <Sets
        currentDayId={currentId}
        currentSetId={currentSetId}
        setCurrentId={setCurrentSetId}
        updateFunction={setUpdate} />
      
    </div>
  );
};

export default DisplayDayForm;
