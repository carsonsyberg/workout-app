export default (reps = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_REPS":
      return action.payload;
    case "CREATE_REP":
      return [...reps, action.payload];
    case "UPDATE_REP":
      return reps.map((rep) =>
        rep._id === action.payload ? action.payload : rep
      );
    case "DELETE_REP":
      return reps.filter((rep) => rep._id !== action.payload);
    default:
      return reps;
  }
};
