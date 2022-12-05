export default (sets = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...sets, action.payload];
        default:
            return sets;
    }
};