import React, {Component} from 'react';

import {connect} from 'react-redux';

// Item that displays things about the clicked on election
// item is the election past budget information from the pastElection reducer

class Candidate extends Component {


    render() {
        console.log('item', this.props.item)
      return (
          <div>
            {this.props.candidate.name}{this.props.candidate.id}
          </div>
    )}
  }
  
  const mapStateToProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(mapStateToProps)(Candidate);