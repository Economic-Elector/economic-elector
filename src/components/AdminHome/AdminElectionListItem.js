import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class AdminElectionListItem extends Component {
  state = {

  }

  handleClick = (election) => {
    console.log(election.id)
    this.props.dispatch({
      type: 'FETCH_BUDGET',
      payload: election.id
    })
    this.props.dispatch({
      type: 'FETCH_ELECTION',
      payload: election
    })
    this.props.history.push(`/adminElection`);
  }

  
  render = () => {
    let election = this.props.election;
    return (
      <div onClick={() => this.handleClick(election)} className="Election">
        {election.name}
        <br/>
        {election.date}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(AdminElectionListItem));