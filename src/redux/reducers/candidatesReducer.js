import { combineReducers } from 'redux';


const allCandidates = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_CANDIDATES':
            return action.payload;
        default:
            return state;
    }
};

const sortCandidates = (state = [], action) => {
    switch (action.type) {
        case 'SORT_CANDIDATES':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    allCandidates,
    sortCandidates,
});