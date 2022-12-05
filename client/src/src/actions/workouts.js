import * as api from "../api";

// Action Creators
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
