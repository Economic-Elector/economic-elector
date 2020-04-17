import React, { Component } from 'react';

import { connect } from 'react-redux';

// Item that displays things about the clicked on election
// item is the election past budget information from the pastElection reducer

class Candidate extends Component {


    render() {
        console.log('item', this.props.item)
        return (
            <>
                <td>{this.props.candidate.name}</td>
                <td>Total Difference</td>
                <td>Total Budget</td>
                <td>{this.props.budget.lawEnforcement}</td>
                <td>{this.props.budget.parksRec}</td>
                <td>{this.props.budget.publicWorks}</td>
                <td>{this.props.budget.firstResponders}</td>
                <td>{this.props.budget.communityDev}</td>
                <td>{this.props.budget.administration}</td>
                <td>{this.props.budget.education}</td>
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Candidate);