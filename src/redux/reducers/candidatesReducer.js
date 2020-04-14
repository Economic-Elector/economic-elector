import { combineReducers } from 'redux';


const newReducer = (state = [], action) => {
    switch (action.type) {
        case '':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    newReducer,
});