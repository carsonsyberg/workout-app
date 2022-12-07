export default (days = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DAYS':
            return action.payload;
        case 'CREATE_DAY':
            return [...days, action.payload];
        case 'UPDATE_DAY':
            return days.map((day) => day._id === action.payload ? action.payload : day);
        case 'DELETE_DAY':
            return days.filter((day) => day._id !== action.payload);
        default:
            return days;
    }
};