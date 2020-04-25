import { combineReducers } from 'redux';



// makes returning ID from newElection POST avail in reduxStore
const electionId = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NEW_ELECTION_ID':
            return action.payload;
        default:
            return state;
    }
};

const election = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ELECTION':
            return action.payload;
        default:
            return state;
    }
};

const allElections = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_ELECTIONS':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    electionId,
    election,
    allElections
});