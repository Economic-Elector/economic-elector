import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class AdminElectionListItem extends Component {
  state = {

  }

  handleClick = (a) => {
    console.log(a.props.election.id)
    let election_id = a.props.election.id
    this.a(election_id);
    this.props.history.push(`/adminElection`);
  }

  a = (id) => {
    this.props.dispatch({
      type: 'FETCH_BUDGET',
      payload: id
    })
    this.props.dispatch({
      type: 'SET_NEW_ELECTION_ID',
      payload: this.props.election
    })
  }

  render = () => {
    let election = this.props.election;
    return (
      <div onClick={() => this.handleClick(this)} className="Election">
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