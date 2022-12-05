export default (days = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DAYS':
            return action.payload;
        case 'CREATE_DAY':
            return [...days, action.payload];
        default:
            return days;
    }
};