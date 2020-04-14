import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';





//below is example of a new function and how it's added to the electionsSagas() for export
function* newFunction(action) {
    
}

function* electionsSagas() {
    yield takeLatest('above function goes here', newFunction);
    
}

export default electionsSagas;