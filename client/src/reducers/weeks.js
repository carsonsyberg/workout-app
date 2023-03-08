export default (weeks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_WEEKS":
      return action.payload;
    case "CREATE_WEEK":
      return [...weeks, action.payload];
    case "UPDATE_WEEK":
      return weeks.map((week) =>
        week._id === action.payload ? action.payload : week
      );
    case "DELETE_WEEK":
      return weeks.filter((week) => week._id !== action.payload);
    default:
      return weeks;
  }
};
