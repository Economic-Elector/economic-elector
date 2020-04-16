import { combineReducers } from 'redux';


const candidateAllocations = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALLOCATIONS':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    candidateAllocations,
});