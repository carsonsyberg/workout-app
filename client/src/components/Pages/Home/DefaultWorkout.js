import React from "react";
import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import DisplayWorkoutForm from "../../Workouts/DisplayWorkoutForms/DisplayWorkoutForm";
import classes from "./DefaultWorkout.module.css";

const DefaultWorkout = ({ currentId, setCurrentId, updateFunction }) => {
  const workouts = useSelector((state) => {
    return state.workouts;
  });

  return (
    <div className={classes.defaultWorkouts}>
      <div className="margin"></div>
      <Card>
        <h2>Default Workout</h2>
        {/* {workouts.map((workout) => {
            return <Workout workout={workout} key={workout._id} setCurrentId={setCurrentId}/>
          })} */}
        {workouts.map((workout) => {
          return (
            <DisplayWorkoutForm
              key={workout._id}
              workout={workout}
              updateFunction={updateFunction}
            />
          );
        })}
      </Card>
      <div className="margin"></div>
    </div>
  );
};

export default DefaultWorkout;
