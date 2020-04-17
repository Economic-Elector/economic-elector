// Displays list of candidates most closely aligned to the user in order of lowest total difference between categories. There will also be a “Back to Budget” button which will bring 
// the user back to the budget page (2) for this election.  The results table will show each candidate’s proposed spending for these categories: Law Enforcement, Parks and Rec, Education, 
// First Responders, Public Works, Administration, and Community Development. Our wireframe software only allowed us to include three columns in the table below, but in the actual web app, each category will have a column.

import React, { Component } from 'react';
import Candidate from '../Candidate/Candidate';
import { connect } from 'react-redux';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, LabelSeries } from 'react-vis';
import './Results.css'

class Results extends Component {
    render() {
        // const for bar graphs using react-vis
        const userData = [{ x: 'Law Enforc', y: 10000 }, { x: 'Parks/Rec', y: 12000 }, { x: 'PublicWorks', y: 50000 }, { x: 'First Responders', y: 50000 }, { x: 'Community Dev', y: 50000 }, { x: 'Administration', y: 50000 }, { x: 'Education', y: 50000 }];

        const currentData = [{ x: 'Law Enforc', y: 12000 }, { x: 'Parks/Rec', y: 14000 }, { x: 'PublicWorks', y: 52000 }, { x: 'First Responders', y: 52000 }, { x: 'Community Dev', y: 51000 }, { x: 'Administration', y: 54000 }, { x: 'Education', y: 51000 }];

        const labelData = userData.map((d, idx) => ({
            x: d.x,
            y: Math.max(userData[idx].y, currentData[idx].y)
        }));
        const BarSeries = VerticalBarSeries;
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
                        {this.props.reduxState.budget.results.map(candidate => (<tr key={candidate.id}><Candidate candidate={candidate} budget={this.props.reduxState.budget.userBudget.budget} /></tr>))}
                    </tbody>
                </table>
                <div class="graph_just">
                    <XYPlot xType="ordinal" width={1000} height={500} xDistance={700}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <BarSeries data={userData} />
                        <BarSeries data={currentData} />
                        <LabelSeries data={labelData} />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Results);