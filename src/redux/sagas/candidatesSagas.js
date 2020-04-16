import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* candidatesSagas() {
    yield takeLatest('ADD_CANDIDATE', postCandidate);
    yield takeLatest('FETCH_CANDIDATES', fetchCandidates)
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

function* fetchCandidates(action){
    console.log('election id for candidate fetch:', action.payload)
    //get all their candidates
    let response = yield axios.get(`/api/candidates/all/${action.payload}`);
    let candidates = response.data;
    console.log(candidates, 'all candidates');
    //get their budgets
    response = yield axios.get(`/api/candidates/allBudgets/${action.payload}`);
    let candidateBudgets = response.data
    console.log('candidate budgets', candidateBudgets);
    //loop through candidates and add their budget onto them
    let candidateId
    //use a for loop to add the candidates budget to each candidate object in the array
    //of candidates
    for(let i = 0; i < candidates.length; i++){
        candidateId = candidates[i].id
        //here we are creating a new property for the object called 'budget'
        //and giving it the budget that has the same candidate id
        candidates[i].budget = candidateBudgets[candidateId];
        console.log('candidate budget added', candidates[i]);
    }
        
    
}
export default candidatesSagas;