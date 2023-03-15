import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSet } from "../../../../../../actions/workouts.js";
import {
  deleteSet,
  deleteRep,
  createRep,
} from "../../../../../../actions/workouts.js";
import RepRow from "./RepRow.js";
import classes from "./SetTable.module.css";

export const SetTable = ({ set, reps }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [addingRep, setAddingRep] = useState(false);

  const [changedSetName, setChangedSetName] = useState(false);
  const [changedNotes, setChangedNotes] = useState(false);
  const [setData, setSetData] = useState({
    setName: set.setName,
    notes: set.notes,
  });

  const [changedWeight, setChangedWeight] = useState(false);
  const [changedNumReps, setChangedNumReps] = useState(false);
  const [repData, setRepData] = useState({
    setId: set._id,
    weight: 0,
    numReps: 0,
  });

  const dispatch = useDispatch();

  const submitRepHandler = () => {
    dispatch(createRep(repData));
    setRepData({ setId: set._id, weight: 0, numReps: 0 });
    setAddingRep(false);
  };

  const updateSetHandler = (fieldUpdated) => {
    dispatch(updateSet(set._id, setData));
    if (fieldUpdated === "notes") setChangedNotes(false);
    else setChangedSetName(false);
  };

  return (
    <div className={classes.setTable}>
      <input
        value={setData.setName}
        onChange={(e) => {
          setChangedSetName(true);
          setSetData({ ...setData, setName: e.target.value });
        }}
      />
      {changedSetName && (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => updateSetHandler("name")}
          >
            Update Set Name
          </button>
          <button
            onClick={() => {
              setSetData({
                setName: set.setName,
                notes: set.notes,
              });
              setChangedSetName(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {reps
        .filter((rep) => rep.setId === set._id)
        .map((rep) => (
          <RepRow key={rep._id} rep={rep} />
        ))}
      {addingRep ? (
        <div className={classes.addingRep}>
          <input
            className={
              changedWeight ? classes.changedInput : classes.originalInput
            }
            value={repData.weight}
            onClick={() => {
              setChangedWeight(true);
              setRepData({ ...repData, weight: "" });
            }}
            onChange={(e) => {
              setChangedWeight(true);
              setRepData({ ...repData, weight: e.target.value });
            }}
          />
          <label>lbs.</label>
          <input
            className={
              changedNumReps ? classes.changedInput : classes.originalInput
            }
            value={repData.numReps}
            onClick={() => {
              setChangedNumReps(true);
              setRepData({ ...repData, numReps: "" });
            }}
            onChange={(e) => {
              setChangedNumReps(true);
              setRepData({ ...repData, numReps: e.target.value });
            }}
          />
          <label>X</label>
          <button onClick={() => submitRepHandler()}>
            <img src="https://i.imgur.com/dNNoOXV.png" alt="add" />
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => {
              setChangedNumReps(false);
              setChangedWeight(false);
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
      <textarea
        className={changedNotes ? classes.changedNotes : classes.notes}
        value={setData.notes}
        onChange={(e) => {
          setChangedNotes(true);
          setSetData({ ...setData, notes: e.target.value });
        }}
      />
      {changedNotes && (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => updateSetHandler("notes")}
          >
            Update Notes
          </button>
          <button
            onClick={() => {
              setSetData({
                setName: set.setName,
                notes: set.notes,
              });
              setChangedNotes(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
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
