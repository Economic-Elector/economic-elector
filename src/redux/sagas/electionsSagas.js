import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* electionsSagas() {
    yield takeLatest('INPUT_NEW_ELECTION', postNewElection);

}

// POST to create new election row in elections table of DB
// response provides the RETURNING newElection id which is used
// to dispay on next page
function* postNewElection(action) {
    console.log('in postNewElection Saga', action);
    try {
        let response = yield Axios.post('/api/elections/newElection', action.payload);
        let electionId = response.data.rows[0].id;
        // console.log('election response', response);
        console.log('election id', electionId);
        yield put({
            type: 'SET_NEW_ELECTION_ID', payload: electionId
        })
    }
    catch (error) {
        console.log(error);
    }
}

export default electionsSagas;
