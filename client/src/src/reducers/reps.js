export default (reps = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_REPS':
            return action.payload;
        case 'CREATE_REP':
            return [...reps, action.payload];
        default:
            return reps;
    }
};