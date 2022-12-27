import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import Days from "../Days";
import { useSelector, useDispatch } from "react-redux";
import { deleteWorkout, updateWorkout, getDays } from "../../../actions/workouts";

// What pieces form should have usually
// [workoutName] [isDefault]
// upon changing fields add submit edit / cancel edit buttons

const DisplayWorkoutForm = ({ workout, updateFunction }) => {

  const currentId = workout._id;

  const [workoutData, setWorkoutData] = useState(workout);
  const [formChanged, setFormChanged] = useState(false);
  const [currentDayId, setCurrentDayId] = useState(null);

  const dayUpdate = () => {
    dispatch(getDays());
  };

  const cancelEdit = () => {
    setWorkoutData(workout);
    setFormChanged(false);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormChanged(false);
    dispatch(updateWorkout(currentId, workoutData));

    updateFunction();
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "workout_name",
            type: "text",
            value: workoutData.workoutName,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, workoutName: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Workout Name"
        />
        <Input
          input={{
            id: "is_default",
            type: "text",
            value: workoutData.isDefault,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, isDefault: e.target.value });
              setFormChanged(true);
            },
          }}
          label="Is Default"
        />
        {formChanged && <button type="submit">Update Workout</button>}
      </form>
      {formChanged && <button onClick={cancelEdit} >Cancel Update</button>}
      <Days
        currentWorkoutId={currentId}
        currentId={currentDayId}
        setCurrentId={setCurrentDayId}
        updateFunction={dayUpdate}
      />
      {!formChanged && <button onClick={() => dispatch(deleteWorkout(workout._id))}>Delete Workout</button>}
    </Card>
  );
};

export default DisplayWorkoutForm;
