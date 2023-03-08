import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWeek } from "../../../../../actions/workouts";
import classes from "./EditWorkoutTable.module.css";

// TODO: need to get days by week ID then map days into editWorkoutRows

const EditWorkoutTable = ({ week }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className={classes.editWorkoutTable}>
      <h2 className={classes.weekName}>{week.weekName}</h2>
      <div className={classes.editWorkoutRow}>
        <h3>Monday</h3>
        <button>
          <img src="https://i.imgur.com/Uq6TyUD.png" />
        </button>
      </div>
      <div className={classes.editWorkoutButton}>
        <button>Add Day</button>
      </div>
      <div className={classes.editWorkoutButton}>
        <button>Edit Week</button>
      </div>
      {confirmingDelete ? (
        <div className={classes.deleteButtons}>
          <button
            className={classes.confirmDeleteButton}
            onClick={() => dispatch(deleteWeek(week._id))}
          >
            Confirm Delete
          </button>
          <button onClick={() => setConfirmingDelete(false)}>
            Cancel Delete
          </button>
        </div>
      ) : (
        <div className={classes.editWorkoutButton}>
          <button onClick={() => setConfirmingDelete(true)}>Delete Week</button>
        </div>
      )}
    </div>
  );
};

export default EditWorkoutTable;
