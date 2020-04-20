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
        console.log('pastBudget:', this.props.reduxState.budget.pastBudget)
        console.log('userData:', this.props.reduxState.budget.userBudget.budget)
        
        const pastData = this.props.reduxState.budget.pastBudget
        const thing = pastData[0].past_allocation.substr(1)
        const betterthing = thing.substr(0 , 5)
        const num = parseInt(betterthing)
        console.log('thing:', num)
        const userStuff = this.props.reduxState.budget.userBudget.budget
        // const pastData = this.props.reduxState.budget.userBudget.budget
        // const for bar graphs using react-vis
        const userData = [{ x: 'Law Enforc', y: Number(userStuff.lawEnforcement)}, { x: 'Parks/Rec', y: Number(userStuff.parksRec) }, { x: 'PublicWorks', y: Number(userStuff.publicWorks) }, { x: 'First Responders', y: Number(userStuff.firstResponders) }, { x: 'Community Dev', y: Number(userStuff.communityDev) }, { x: 'Administration', y: Number(userStuff.administration) }, { x: 'Education', y: Number(userStuff.education) }];

        // const currentData = [{ x: 'Law Enforc', y: parseInt(pastData[0].past_allocation) }, { x: 'Parks/Rec', y: parseInt(pastData[1].past_allocation) }, { x: 'PublicWorks', y: parseInt(pastData[2].past_allocation) }, { x: 'First Responders', y: parseInt(pastData[3].past_allocation) }, { x: 'Community Dev', y: parseInt(pastData[4].past_allocation) }, { x: 'Administration', y: parseInt(pastData[5].past_allocation) }, { x: 'Education', y: parseInt(pastData[6].past_allocation) }];
        const currentData = [{ x: 'Law Enforc', y: 3000 }, { x: 'Parks/Rec', y: 2020 }, { x: 'PublicWorks', y: 6400 }, { x: 'First Responders', y: 1000 }, { x: 'Community Dev', y: 1000 }, { x: 'Administration', y: 1000 }, { x: 'Education', y: 1000 }];

        const labelData = userData.map((d, idx) => ({
            x: d.x,
            y: Math.max(userData[idx].y, currentData[idx].y)
        }));
        const BarSeries = VerticalBarSeries;
        console.log('USERBUDGET:', this.props.reduxState.budget.userBudget.budget)
        return (
            <div className="CandidateList">
                <h2>Your Results</h2>
                <table class="graph_just">
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
                        {this.props.reduxState.candidates.allCandidates.map(candidate => (<tr key={candidate.id}><Candidate candidate={candidate} /></tr>))}
                    </tbody>
                </table>
                <div class="graph_just">
                    <XYPlot xType="ordinal" width={700} height={700}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={-20} />
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