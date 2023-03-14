import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRep } from "../../../../../../actions/workouts";
import classes from "./SetTable.module.css";

const RepRow = ({ rep }) => {
  const [repRowData, setRepRowData] = useState({
    weight: rep.weight,
    numReps: rep.numReps,
  });

  const dispatch = useDispatch();

  return (
    <div className={classes.repRow}>
      <input
        value={repRowData.weight}
        onChange={(e) =>
          setRepRowData({ ...repRowData, weight: e.target.value })
        }
      />
      <label>lbs.</label>
      <input
        value={repRowData.numReps}
        onChange={(e) =>
          setRepRowData({ ...repRowData, numReps: e.target.value })
        }
      />
      <label>X</label>
      <button
        className={classes.cancelButton}
        onClick={() => {
          dispatch(deleteRep(rep._id));
        }}
      >
        <img src="https://i.imgur.com/Uq6TyUD.png" alt="add" />
      </button>
    </div>
  );
};

export default RepRow;
