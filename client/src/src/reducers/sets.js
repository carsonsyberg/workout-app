export default (sets = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_SETS':
            return action.payload;
        case 'CREATE_SET':
            return [...sets, action.payload];
        default:
            return sets;
    }
};