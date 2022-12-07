import React from "react";
import Card from "../../UI/Card";
import { useDispatch } from 'react-redux';
import { deleteRep } from "../../../actions/workouts";

const Rep = ({ rep, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <h2>Weight: {rep.weight}</h2>
      <h3>Num Reps: {rep.numReps}</h3>
      <h4>Set Id: {rep.setId}</h4>
      <h4>Rep Id: {rep._id}</h4>
      <button onClick={() => setCurrentId(rep._id)}>Edit Rep</button>
      <button onClick={() => dispatch(deleteRep(rep._id))}>Delete Rep</button>
    </Card>
  );
};

export default Rep;
