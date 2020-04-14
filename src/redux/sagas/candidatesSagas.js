import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* candidatesSagas() {
    yield takeLatest('ADD_CANDIDATE', postCandidate);

}

function* postCandidate(action) {
    try {
        console.log(action.payload);
        let response = yield axios.post('/candidates', action.payload)
        console.log(response.data, "should be the candidate ID");
    } catch (error) {
        console.log(error);
    }
}

export default candidatesSagas;