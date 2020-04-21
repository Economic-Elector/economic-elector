import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchBudget(action) {
    try {
        const response = yield axios.get(`/api/elections/budget/${action.payload}`);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_BUDGET', payload: response.data });
    } catch (error) {
        console.log('Budget GET request failed', error);
    }
}

function* findResults(action) {
    try {
        const response = yield axios.get(`/api/candidates/all/${action.payload}`);
        yield put({ type: 'SET_RESULTS', payload: response.data });
    } catch (error) {
        console.log('error in Getting candidates', error);
    }
}

function* userBudget(action) {
    put({ type: 'SET_USER_BUDGET', payload: action.payload })
}

function* currentElection(action) {
    put({ type: 'SET_CURRENT', payload: action.payload });
}

function* userSaga() {
    yield takeLatest('FETCH_BUDGET', fetchBudget);
    yield takeLatest('CURRENT_ELECTION', currentElection);
    yield takeLatest('FIND_CANDIDATE', findResults);
    yield takeLatest('SET_USER_BUDGET', userBudget);
}

export default userSaga;