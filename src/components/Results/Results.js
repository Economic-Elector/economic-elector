// Displays list of candidates most closely aligned to the user in order of lowest total difference between categories. There will also be a “Back to Budget” button which will bring 
// the user back to the budget page (2) for this election.  The results table will show each candidate’s proposed spending for these categories: Law Enforcement, Parks and Rec, Education, 
// First Responders, Public Works, Administration, and Community Development. Our wireframe software only allowed us to include three columns in the table below, but in the actual web app, each category will have a column.

import React, { Component } from 'react';
import Candidate from '../Candidate/Candidate';
import { connect } from 'react-redux';
import './Results.css'

class Results extends Component {
    render() {
        console.log('USERBUDGET:', this.props.reduxState.budget.userBudget.budget)
        return (
            <div className="CandidateList">
                <h2>Your Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Total Difference</th>
                            <th>Total Budget</th>
                            <th>Law Enforcement</th>
                            <th>Parks and Rec</th>
                            <th>Public Works</th>
                            <th>First Responders</th>
                            <th>Community Dev</th>
                            <th>Admin</th>
                            <th>Education</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.budget.results.map(candidate => (<tr key={candidate.id}><Candidate candidate={candidate} budget={this.props.reduxState.budget.userBudget.budget}/></tr>))}
                    </tbody>    
                </table>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Results);