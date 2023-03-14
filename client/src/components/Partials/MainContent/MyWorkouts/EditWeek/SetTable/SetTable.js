import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSet,
  deleteRep,
  createRep,
} from "../../../../../../actions/workouts.js";
import RepRow from "./RepRow.js";
import classes from "./SetTable.module.css";

export const SetTable = ({ set, reps }) => {
  const [notes, setNotes] = useState("Enter notes here.");
  const [changedNotes, setChangedNotes] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [addingRep, setAddingRep] = useState(false);
  const [repData, setRepData] = useState({
    setId: set._id,
    weight: 0,
    numReps: 0,
  });

  const dispatch = useDispatch();

  const submitRepHandler = () => {
    console.log("Creating Rep...");
    dispatch(createRep(repData));
    setRepData({ setId: set._id, weight: 0, numReps: 0 });
    setAddingRep(false);
  };

  return (
    <div className={classes.setTable}>
      <h3>{set.setName}</h3>
      {reps
        .filter((rep) => rep.setId === set._id)
        .map((rep) => (
          <RepRow key={rep._id} rep={rep} />
        ))}
      {addingRep ? (
        <div className={classes.addingRep}>
          <input
            value={repData.weight}
            onChange={(e) => setRepData({ ...repData, weight: e.target.value })}
          />
          <label>lbs.</label>
          <input
            value={repData.numReps}
            onChange={(e) =>
              setRepData({ ...repData, numReps: e.target.value })
            }
          />
          <label>X</label>
          <button onClick={() => submitRepHandler()}>
            <img src="https://i.imgur.com/dNNoOXV.png" alt="add" />
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => {
              setRepData({ setId: set._id, weight: 0, numReps: 0 });
              setAddingRep(false);
            }}
          >
            <img src="https://i.imgur.com/Uq6TyUD.png" alt="add" />
          </button>
        </div>
      ) : (
        <button onClick={() => setAddingRep(true)}>Add Rep</button>
      )}
      <input
        className={changedNotes ? classes.changedNotes : ""}
        value={notes}
        onChange={(e) => {
          setChangedNotes(true);
          setNotes(e.target.value);
        }}
      />
      {confirmingDelete ? (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => dispatch(deleteSet(set._id))}
          >
            Confirm Delete
          </button>
          <button onClick={() => setConfirmingDelete(false)}>
            Cancel Delete
          </button>
        </div>
      ) : (
        <div className={classes.editWorkoutButton}>
          <button onClick={() => setConfirmingDelete(true)}>Delete Set</button>
        </div>
      )}
    </div>
  );
};

export default SetTable;
