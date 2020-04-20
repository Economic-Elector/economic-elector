import axios from 'axios';
import { put, takeLatest, takeEvery} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchBudget(action) {
    console.log(action.payload) 
    try {       
        const response = yield axios.get(`/api/elections/budget/${action.payload}`);
        console.log('past budget coming from the server:', response.data)
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
    yield put({ type: 'SET_USER_BUDGET', payload: action.payload })
}

function* currentElection(action) {
    yield put({ type: 'SET_CURRENT', payload: action.payload });
}

function* userSaga() {
    yield takeEvery('FETCH_BUDGET', fetchBudget);
    yield takeEvery('CURRENT_ELECTION', currentElection);
    yield takeEvery('FIND_CANDIDATE', findResults);
    yield takeEvery('SET_USER_BUDGET', userBudget);
}

export default userSaga;