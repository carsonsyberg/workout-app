export default (workouts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_WORKOUTS':
            return action.payload;
        case 'CREATE_WORKOUT':
            return [...workouts, action.payload];
        default:
            return workouts;
    }
};