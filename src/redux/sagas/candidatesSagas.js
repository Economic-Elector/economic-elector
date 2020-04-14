import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* candidatesSagas() {
    yield takeLatest('ADD_CANDIDATE', postCandidate);

}

function* postCandidate(action) {
   
    try {
        console.log(action.payload);
        let response = yield axios.post('/api/candidates', action.payload)
        console.log(response.data.rows[0].id, "should be the candidate ID");
        let candidate_id = response.data.rows[0].id
        let categoryInfo = {};
        for (const category in action.payload.budget) {
            categoryInfo = {category: category, amount: action.payload.budget[category], candidate_id: candidate_id}
            console.log(categoryInfo);
            
            yield axios.post('/api/candidates/budget', categoryInfo);
        }
    } catch (error) {
        console.log(error);
    }
}

export default candidatesSagas;