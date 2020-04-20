// The Election View will display information for a specific election. The admin will be able to edit any of the information on this page. 
// They can click the edit button near the header, which will enable them to edit the name, location, and date of the election. The admin will also see a table with all the candidates for the election. 
// The table will include the name of the candidate, their total budget, and the amount of money going into each category. If the admin just created this election, the table will be empty. 
// They can add a candidate by pressing the “Add Candidate” button, taking them to the Add Candidate page (5). To the right of each row in the table, there will be an “edit” button. 
// Clicking this button will take the admin to the Edit Candidate page (6), where they can edit any of the information for the specific candidate they clicked on. 
// Lastly, the admin will see a “remove” button, that removes the candidate from the table, and the election.

import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class AdminElection extends Component {
    state = {
        totalBudget: 0,
      
    }

    componentDidMount() {
        // this.getLastElection();
        this.getCandidateList();   
    }

    // call to sagas to GET last election using the RETURNING id from the POST on AdminNewElection page
    // use returning ID from redux: electionId
    // to get NameOfElection, Location, Date, from elections DB table then display these 3 items on DOM in h1,h2,h2
    // getLastElection = () => {
    //     this.props.dispatch({
    //         type: 'FETCH_ELECTION',
    //         payload: this.props.reduxState.elections.electionId
    //     });
    // }

    // call to sagas to GET candidate List for election ID from "candidates" table and add to redux
    // create function to provide sum of candidate budget 
    // call to sagas to GET Candidates budget catagories from the "budget_allocation"  table and add to redux
    // display all these things on DOM in table
    // important - need to discuss DB budget catagories with team member that created component AddCandidate
    getCandidateList = () => {
        this.props.reduxState.elections.electionId &&
        this.props.dispatch({
            type: 'FETCH_CANDIDATE_LIST',
            payload: this.props.reduxState.elections.electionId
        });
    }

    sumOfBudget = () => {
       
    }

    // bring user to add Add Candidate/Edit Candidate page
    // probably need to pass with it the election ID
    addCandidate = () => {
        this.props.history.push('/addCandidate')
    }

    // bring user to add Add Candidate/Edit Candidate page
    // probably need to pass with it the election ID
    editCandidate = () => {
        this.props.history.push('/editCandidate');
    }

    // removeCandidate deletes candidate from this election
    // call to sagas to make DELETE call to "candidates" table
    // must send with it the election ID
    removeCandidate = (event, id) => {
        console.log('in AdminElection page, removeCandidate');
        console.log('candidate id', id);
        let obj = {
            candidate: id,
            electionId: this.props.reduxState.elections.election.id
        }
        this.props.dispatch({
            type: 'DELETE_CANDIDATE_FROM_LIST',
            payload: obj
        });
    }

    //everything in h1,h2,h2 will come from "elections" DB table
    //everything in the table body will come from "candidates" and "budget_allocation" DB tables
    render = () => {
        return (
            <div className="newElection">
                {/* <ul>
                    <li>
                        {JSON.stringify(this.props.reduxState.elections.election.id)}
                        {JSON.stringify(this.props.reduxState.elections.electionId)}
                    </li>
                </ul>
                <h3>JUST PUTTING THIS HERE TO CELEBRATE</h3>
                <h3>{JSON.stringify(this.props.reduxState.candidates.elections)}</h3> */}
                <h1>{this.props.reduxState.elections.election.name}</h1>
                <h3>{this.props.reduxState.elections.election.location}</h3>
                <h3>{this.props.reduxState.elections.election.date}</h3>
                <button onClick={this.editCandidate}>Edit</button>
                <br></br><br></br>
                <button onClick={this.addCandidate}>Add Candidate</button>
                <br></br><br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Total Budget</th>
                            <th>Parks and Rec</th>
                            <th>Law Enforcement</th>
                            <th>Education</th>
                            <th>First Responders</th>
                            <th>Public Works</th>
                            <th>Admin</th>
                            <th>Community Dev</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.candidates.allCandidates.map(election => (<tr><td>{election.name}</td>
                            <td>{election.totalBudget}</td><td>{election.budget[64]}</td><td>{election.budget[65]}</td>
                            <td>{election.budget[66]}</td><td>{election.budget[67]}</td><td>{election.budget[68]}</td>
                            <td>{election.budget[69]}</td><td>{election.budget[70]}</td>
                            <button onClick={this.editCandidate}>Edit</button>
                            <button onClick={(event) => this.removeCandidate(event, election.id)}>Remove</button></tr>))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AdminElection);



