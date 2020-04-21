import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* electionsSagas() {
    yield takeLatest('INPUT_NEW_ELECTION', postNewElection);
    yield takeLatest('FETCH_ELECTION', fetchElection);
    yield takeLatest('DELETE_ELECTION', deleteElection)
}

// POST to create new election row in elections table of DB
// response provides the RETURNING newElection id which is used
// to dispay on next page
function* postNewElection(action) {
    console.log('in postNewElection Saga', action);
    try {
        let response = yield Axios.post('/api/elections/newElection', action.payload);
        let election = response.data.rows[0];
        // console.log('election response', response);
        console.log('election', election);
        yield put({
            type: 'SET_ELECTION', payload: election
        })
    }
    catch (error) {
        console.log(error);
    }
}

//this function will GET all the info for an election and put it 
//the elections reducer
function* fetchElection(action){
    console.log('payload from AdminElectionListItem', action.payload);
    let response = yield Axios({
        method: 'GET',
        url: `/api/elections/${action.payload.id}`
    })
    console.log(response.data);
    yield put({type:'SET_ELECTION', payload: response.data})
}

function* deleteElection(action) {
    console.log('in deleteElection saga, ID:', action.payload);
    try {
        yield Axios.delete(`/api/elections/deleteElection/${action.payload.electionId}`);
        // yield put({ type: 'FETCH_ELECTION', payload: action.payload.electionId })
    } catch (error) {
        console.log(error);
    }
}

export default electionsSagas;
