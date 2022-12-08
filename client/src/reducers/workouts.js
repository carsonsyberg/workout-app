export default (workouts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_WORKOUTS":
      return action.payload;
    case "CREATE_WORKOUT":
      return [...workouts, action.payload];
    case "UPDATE_WORKOUT":
      return workouts.map((workout) =>
        workout._id === action.payload ? action.payload : workout
      );
    case "DELETE_WORKOUT":
      return workouts.filter((workout) => workout._id !== action.payload);
    default:
      return workouts;
  }
};
