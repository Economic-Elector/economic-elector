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
    yield put({ type: 'SET_CURRENT', payload: action.payload });
}

function* addCategory(action){
    console.log(action.payload);
    let info = action.payload;
    try{
        yield axios.post(`/api/category/add/${action.payload.election_id}`, {name: info.name, amount: info.amount, candidates: action.payload.candidates})
        yield put({ type: 'FETCH_BUDGET', payload: action.payload.election_id })

    }catch(error){
        console.log('error in addCategory saga', error);
    }
}

function* removeCategory(action){
    console.log(action.payload);
    try{
        yield axios.post(`/api/category/delete/${action.payload.budget_category_id}`, {candidates: action.payload.candidates});
        yield put({ type: 'FETCH_CANDIDATES', payload: action.payload.election_id })

    }catch (error) {
        console.log('error removeCategory in budgetSaga', error);
    }
}
function* userSaga() {
    yield takeLatest('FETCH_BUDGET', fetchBudget);
    yield takeLatest('CURRENT_ELECTION', currentElection);
    yield takeLatest('FIND_CANDIDATE', findResults);
    yield takeLatest('SET_USER_BUDGET', userBudget);
    yield takeLatest('ADD_NEW_CATEGORY', addCategory);
    yield takeLatest('REMOVE_CATEGORY', removeCategory);

}

export default userSaga;