import React from "react";
import Card from "../../UI/Card";
import { useDispatch } from 'react-redux';
import { deleteSet } from "../../../actions/workouts";

const Set = ({ set, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <h2>{set.setName}</h2>
      <h4>Day Id: {set.dayId}</h4>
      <h4>Set Id: {set._id}</h4>
      <button onClick={() => setCurrentId(set._id)}>Edit Set</button>
      <button onClick={() => dispatch(deleteSet(set._id))}>Delete Set</button>
    </Card>
  );
};

export default Set;
