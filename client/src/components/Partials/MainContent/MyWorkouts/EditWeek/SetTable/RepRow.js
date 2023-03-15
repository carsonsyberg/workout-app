import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateRep, deleteRep } from "../../../../../../actions/workouts";
import classes from "./SetTable.module.css";

const RepRow = ({ rep }) => {
  const [repRowData, setRepRowData] = useState({
    weight: rep.weight,
    numReps: rep.numReps,
  });
  const [repRowDataChanged, setRepRowDataChanged] = useState(false);

  const dispatch = useDispatch();

  const updateRepHandler = () => {
    dispatch(updateRep(rep._id, repRowData));
    setRepRowDataChanged(false);
  };

  return (
    <div className={`${classes.repRow} ${repRowDataChanged && classes.repRowChanged}`}>
      <input
        value={repRowData.weight}
        onChange={(e) => {
          setRepRowDataChanged(true);
          setRepRowData({ ...repRowData, weight: e.target.value });
        }}
      />
      <label>lbs.</label>
      <input
        value={repRowData.numReps}
        onChange={(e) => {
          setRepRowDataChanged(true);
          setRepRowData({ ...repRowData, numReps: e.target.value });
        }}
      />
      <label>X</label>
      {repRowDataChanged ? (
        <>
          <button onClick={() => updateRepHandler()}>
            <img src="https://i.imgur.com/H25zEt0.png" alt="update" />
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => {
              setRepRowDataChanged(false);
              setRepRowData({ weight: rep.weight, numReps: rep.numReps });
            }}
          >
            <img src="https://i.imgur.com/PkN4iro.png" alt="cancel" />
          </button>
        </>
      ) : (
        <button
          className={classes.cancelButton}
          onClick={() => {
            dispatch(deleteRep(rep._id));
          }}
        >
          <img src="https://i.imgur.com/Uq6TyUD.png" alt="delete" />
        </button>
      )}
    </div>
  );
};

export default RepRow;
