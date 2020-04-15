import { combineReducers } from 'redux';



// makes returning ID from newElection POST avail in reduxStore
const electionId = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NEW_ELECTION_ID':
            return action.payload;
        case 'SET_ELECTION':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    electionId,
});