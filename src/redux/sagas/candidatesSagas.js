import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* candidatesSagas() {
    yield takeLatest('ADD_CANDIDATE', postCandidate);

}

function* postCandidate(action) {
   
    try {
        console.log(action.payload);
        //the response should be the candidate id
        let response = yield axios.post('/api/candidates', action.payload)
        console.log(response.data.rows[0].id, "should be the candidate ID");
        let candidate_id = response.data.rows[0].id
        let categoryInfo = {};
        //we loop through the object that was sent from the AddCandidate view
        //using a "for... in" loop. this loop will send a post request for each budget allocation 
        // to the server.
        for (const category in action.payload.budget) {
            //inside the for in loop, we build a new object to send to the server
            //it holds the category name, the amount of money the candidate is allocating, and the candidate id
            categoryInfo = {category: category, amount: action.payload.budget[category], candidate_id: candidate_id}
            console.log(categoryInfo);
            //then we send it to be posted
            yield axios.post('/api/candidates/budget', categoryInfo);
        }
    } catch (error) {
        console.log(error);
    }
}

export default candidatesSagas;