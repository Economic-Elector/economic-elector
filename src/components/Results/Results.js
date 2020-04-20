// Displays list of candidates most closely aligned to the user in order of lowest total difference between categories. There will also be a “Back to Budget” button which will bring 
// the user back to the budget page (2) for this election.  The results table will show each candidate’s proposed spending for these categories: Law Enforcement, Parks and Rec, Education, 
// First Responders, Public Works, Administration, and Community Development. Our wireframe software only allowed us to include three columns in the table below, but in the actual web app, each category will have a column.

import React, { Component } from 'react';
import Candidate from '../Candidate/Candidate';
import { connect } from 'react-redux';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, LabelSeries, DiscreteColorLegend } from 'react-vis';
import './Results.css'

class Results extends Component {

    // return function for sort
    compare = (a,b) => {
        let dif = a.difference - b.difference;
        return dif
    }
    

    render() {
        console.log('pastBudget:', this.props.reduxState.budget.pastBudget)
        console.log('userData:', this.props.reduxState.budget.userBudget.budget)
        
        const pastData = this.props.reduxState.budget.pastBudget
        const userStuff = this.props.reduxState.budget.userBudget.budget

        // const for bar graphs using react-vis
        const userData = [{ x: 'Law Enforc', y: Number(userStuff.lawEnforcement)}, { x: 'Parks/Rec', y: Number(userStuff.parksRec) }, { x: 'PublicWorks', y: Number(userStuff.publicWorks) }, { x: 'First Responders', y: Number(userStuff.firstResponders) }, { x: 'Community Dev', y: Number(userStuff.communityDev) }, { x: 'Administration', y: Number(userStuff.administration) }, { x: 'Education', y: Number(userStuff.education) }];

        const currentData = [{ x: 'Law Enforc', y: pastData[0].past_allocation }, { x: 'Parks/Rec', y: pastData[1].past_allocation }, { x: 'PublicWorks', y: pastData[2].past_allocation }, { x: 'First Responders', y: pastData[3].past_allocation }, { x: 'Community Dev', y: pastData[4].past_allocation }, { x: 'Administration', y: pastData[5].past_allocation }, { x: 'Education', y: pastData[6].past_allocation }];

        const labelData = userData.map((d, idx) => ({
            x: d.x,
            y: Math.max(userData[idx].y, currentData[idx].y)
        }));
        const BarSeries = VerticalBarSeries;
        console.log('USERBUDGET:', this.props.reduxState.budget.userBudget.budget)

        // ***** MATHS *****

        console.log('candidates', this.props.reduxState.candidates.allCandidates);
        const candidates = this.props.reduxState.candidates.allCandidates;

        // Finds the total difference between user info and candidate
        let diffID = [];
        for( let i=0; i<candidates.length; i++ ){
            let lawDiff = Math.abs( Number(userStuff.lawEnforcement) - candidates[i].budget[2] );
            let parksDiff = Math.abs( Number(userStuff.parksRec) - candidates[i].budget[1] );
            let publicDiff = Math.abs( Number(userStuff.publicWorks) - candidates[i].budget[5] );
            let firstDiff = Math.abs( Number(userStuff.firstResponders) - candidates[i].budget[4] );
            let commDiff = Math.abs( Number(userStuff.communityDev) - candidates[i].budget[7] );
            let adminDiff = Math.abs( Number(userStuff.administration) - candidates[i].budget[6] );
            let educDiff = Math.abs( Number(userStuff.education) - candidates[i].budget[3] );
            let totalDiff = Number( lawDiff + parksDiff + publicDiff + firstDiff + commDiff + adminDiff + educDiff );
            candidates[i].difference = totalDiff
            diffID.push({
                id: i,
                diff: totalDiff,
                tok: candidates[i].difference
            })
        }
        console.log('diffID ARRAY: ',diffID)
        // sorts candidates by difference
        console.log('candidates w/ totalDiff', candidates)
        const sortedCand = candidates.sort(this.compare);
        console.log('sorted', sortedCand);

        this.props.dispatch({ type: 'SORT_CANDIDATES', payload: sortedCand });

        

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
                        {this.props.reduxState.candidates.sortCandidates.map(candidate => (<tr key={candidate.id}><Candidate diff={diffID} candidate={candidate} /></tr>))}
                    </tbody>
                </table>
                <div class="graph_just">
                    <XYPlot  xType="ordinal" width={700} height={700}>
                        <DiscreteColorLegend
                                orientation="horizontal"
                                items={[
                                    {
                                        title: ' Your Budget',
                                        color: '#12939A'
                                    },
                                    {
                                        title: ' Current Budget',
                                        color: '#79C7E3'
                                    }
                                ]}
                            />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={-15} />
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