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


    render = () => {
        let election = this.props.election;
        return (
            <div onClick={() => this.handleClick(election)} className="Election">
                {election.location}
                <br />
                {election.name}
                <br />
                {election.date}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(AdminElectionListItem));