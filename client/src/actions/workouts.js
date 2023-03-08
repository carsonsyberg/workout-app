import * as api from "../api";

// Action Creators

/***********************************************************
 *                   Workout Actions
 ***********************************************************/
export const getWorkouts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchWorkouts();
    dispatch({ type: "FETCH_ALL_WORKOUTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createWorkout = (post) => async (dispatch) => {
  try {
    const { data } = await api.createWorkout(post);
    dispatch({ type: "CREATE_WORKOUT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateWorkout = (id, workout) => async (dispatch) => {
  try {
    const { data } = await api.updateWorkout(id, workout);

    dispatch({ type: 'UPDATE_WORKOUT', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteWorkout = (id) => async (dispatch) => {
  try {
    await api.deleteWorkout(id);
    dispatch({ type: 'DELETE_WORKOUT', payload: id });
  } catch (error) {
    console.log(error);
  }
}

/***********************************************************
 *                      Week Actions
 ***********************************************************/
export const getWeeks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchWeeks();
    dispatch({ type: "FETCH_ALL_WEEKS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getWeeksByWorkoutId = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchWeeksByWorkoutId(id);
    dispatch({ type: "FETCH_ALL_WEEKS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createWeek = (post) => async (dispatch) => {
  try {
    const { data } = await api.createWeek(post);
    dispatch({ type: "CREATE_WEEK", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateWeek = (id, week) => async (dispatch) => {
  try {
    const { data } = await api.updateWeek(id, week);

    dispatch({ type: 'UPDATE_WEEK', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteWeek = (id) => async (dispatch) => {
  try {
    await api.deleteWeek(id);
    dispatch({ type: 'DELETE_WEEK', payload: id });
  } catch (error) {
    console.log(error);
  }
}

/***********************************************************
 *                      Day Actions
 ***********************************************************/
export const getDays = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDays();
    dispatch({ type: "FETCH_ALL_DAYS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDay = (post) => async (dispatch) => {
  try {
    const { data } = await api.createDay(post);
    dispatch({ type: "CREATE_DAY", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDay = (id, day) => async (dispatch) => {
  try {
    const { data } = await api.updateDay(id, day);

    dispatch({ type: 'UPDATE_DAY', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteDay = (id) => async (dispatch) => {
  try {
    await api.deleteDay(id);
    dispatch({ type: 'DELETE_DAY', payload: id });
  } catch (error) {
    console.log(error);
  }
}

/***********************************************************
 *                      Set Actions
 ***********************************************************/
export const getSets = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSets();
    dispatch({ type: "FETCH_ALL_SETS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createSet = (post) => async (dispatch) => {
  try {
    const { data } = await api.createSet(post);
    dispatch({ type: "CREATE_SET", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSet = (id, set) => async (dispatch) => {
  try {
    const { data } = await api.updateSet(id, set);

    dispatch({ type: 'UPDATE_SET', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteSet = (id) => async (dispatch) => {
  try {
    await api.deleteSet(id);
    dispatch({ type: 'DELETE_SET', payload: id });
  } catch (error) {
    console.log(error);
  }
}

/***********************************************************
 *                      Rep Actions
 ***********************************************************/
export const getReps = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReps();
    dispatch({ type: "FETCH_ALL_REPS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRep = (post) => async (dispatch) => {
  try {
    const { data } = await api.createRep(post);
    dispatch({ type: "CREATE_REP", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRep = (id, rep) => async (dispatch) => {
  try {
    const { data } = await api.updateRep(id, rep);

    dispatch({ type: 'UPDATE_REP', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteRep = (id) => async (dispatch) => {
  try {
    await api.deleteRep(id);
    dispatch({ type: 'DELETE_REP', payload: id });
  } catch (error) {
    console.log(error);
  }
}
