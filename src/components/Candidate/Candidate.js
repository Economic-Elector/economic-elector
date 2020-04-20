import React, { Component } from 'react';

import { connect } from 'react-redux';

// Item that displays things about the clicked on election
// item is the election past budget information from the pastElection reducer

class Candidate extends Component {

    totalDiff = () => {
        for( let i=0; i<this.props.diff.length; i++){
            if(this.props.candidate.difference == this.props.diff[i].diff){
                return this.props.diff[i].diff
            }
        }
    }


    render() {
        console.log('candidate:', this.props.candidate.budget[1]);
        console.log('item', this.props.item)
        return (
            <>
                <td>{this.props.candidate.name}</td>
                <td>{this.totalDiff()}</td>
                <td>Total Budget</td>
                <td>{this.props.candidate.budget[1]}</td>
                <td>{this.props.candidate.budget[2]}</td>
                <td>{this.props.candidate.budget[3]}</td>
                <td>{this.props.candidate.budget[4]}</td>
                <td>{this.props.candidate.budget[5]}</td>
                <td>{this.props.candidate.budget[6]}</td>
                <td>{this.props.candidate.budget[7]}</td>
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Candidate);