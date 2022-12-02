export default (reps = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...reps, action.payload];
        default:
            return reps;
    }
};