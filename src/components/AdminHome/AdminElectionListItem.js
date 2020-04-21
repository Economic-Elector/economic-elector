import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AdminElectionListItem extends Component {
    state = {

    }

    handleClick = (election) => {
        console.log(election.id)
        this.props.dispatch({
            type: 'FETCH_BUDGET',
            payload: election.id
        })
        //since we already have all the info for the election, we
        //can send it straight to the election reducer
        this.props.dispatch({
            type: 'SET_ELECTION',
            payload: election
        })
        this.props.dispatch({
            type: 'FETCH_CANDIDATES',
            payload: election.id
        })
        this.props.history.push(`/adminElection`);
    }

    // handleDeleteElection deletes election and associated candidate and budget
    // call to sagas to make DELETE call to "budget_allocation", "candidates", and "elections" tables
    // must send with it the election ID, candidate ID
    handleDeleteElection = (event, id) => {
        console.log('in AdminElectionListItem page, handleDeleteElection', id);
        let obj = {
            electionId: id,
        }
        this.props.dispatch({
            type: 'DELETE_ELECTION',
            payload: obj
        });
    }


    render = () => {
        let election = this.props.election;
        
        return (
            <div onClick={() => this.handleClick(election)} className="Election">
                {election.name}
                <br />
                {election.location}
                <br />
                {election.date}
                <br />
                <button onClick={(event) => this.handleDeleteElection(event, election.id)}>Delete Election</button>
                <br /><br />
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(AdminElectionListItem));