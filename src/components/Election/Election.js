import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Election extends Component {
  state = {

  }

  handleClick = (a) => {
    console.log(a.props.election.id)
    let election_id = a.props.election.id
    this.a(election_id);
    this.props.history.push(`/Budget/${a.props.election.id}`);
  }

  a = (id) => {
    this.props.dispatch({
      type: 'FETCH_BUDGET',
      payload: id
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

const mapStateToProps = (state) => ({
    
});

export default withRouter(connect(mapStateToProps)(Election));