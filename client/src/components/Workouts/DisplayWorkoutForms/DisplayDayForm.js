import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { deleteDay, updateDay } from "../../../actions/workouts";

// What pieces form should have usually
// [dayOfWeekDropDown] [dayName] [deleteButton]
// upon changing dayOfWeekDropDown or dayName -> change deleteButton to submit edit / cancel edit buttons

const DisplayDayForm = ({ day, updateFunction }) => {

  const currentId = day._id;

  const [dayData, setDayData] = useState(day);
  const [formChanged, setFormChanged] = useState(false);

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
    <Card>
      <form onSubmit={submitHandler}>
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
      </form>
      {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
      {!formChanged && <button onClick={() => dispatch(deleteDay(day._id))}>Delete Day</button>}
    </Card>
  );
};

export default DisplayDayForm;
