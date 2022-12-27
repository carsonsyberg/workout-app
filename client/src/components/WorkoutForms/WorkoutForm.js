import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createWorkout, updateWorkout } from "../../actions/workouts";

const WorkoutForm = ({ currentId, setCurrentId, formToggle }) => {
  const [workoutData, setWorkoutData] = useState({
    workoutName: "",
    isDefault: "",
  });

  const clear = () => {
    setCurrentId(null);
    setWorkoutData({
      workoutName: "",
      isDefault: "",
    });
  };

  const workout = useSelector((state) =>
    currentId ? state.workouts.find((w) => w._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (workout) setWorkoutData(workout);
  }, [workout]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    formToggle(false);

    if (currentId) {
      dispatch(updateWorkout(currentId, workoutData));
    } else {
      dispatch(createWorkout(workoutData));
    }

    clear();
  };

  return (
    <Card>
      <h2>Add New Workout</h2>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: "workout_name",
            type: "text",
            value: workoutData.workoutName,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, workoutName: e.target.value });
            },
          }}
          label="Workout Name"
        />
        <Input
          input={{
            id: "is_default",
            type: "radio",
            value: workoutData.isDefault,
            onChange: (e) => {
              setWorkoutData({ ...workoutData, isDefault: e.target.value });
            },
          }}
          label="Is Default"
        />
        <button type="submit">Add Workout</button>
      </form>
      <button onClick={clear}>Clear</button>
    </Card>
  );
};

export default WorkoutForm;
