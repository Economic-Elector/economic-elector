import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class Election extends Component {
  state = {

  }

  render = () => {
    let election = this.props.election;
    return (
      <div onClick={() => { this.props.dispatch({ type: 'INPUT_NEW_ELECTION', payload: election }) }} className="Election">
        {election.name}
        <br/>
        {election.date}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Election);