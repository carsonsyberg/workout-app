export default (workouts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...workouts, action.payload];
        default:
            return workouts;
    }
};