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

function* userSaga() {
  yield takeLatest('FETCH_BUDGET', fetchBudget);
}

export default userSaga;