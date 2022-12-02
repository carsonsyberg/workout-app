export default (days = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...days, action.payload];
        default:
            return days;
    }
};