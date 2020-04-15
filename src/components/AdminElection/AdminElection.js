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
      
    }

    componentDidUpdate() {
        this.getLastElection();
        this.getCandidateList();
        
    }

    // call to sagas to GET last election using the RETURNING id from the last POST
    getLastElection = () => {
        this.props.dispatch({
            type: 'FETCH_LAST_ELECTION',
            payload: this.props.reduxState
        });
    }

    // call to sagas to GET candidate List for this election ID
    getCandidateList = () => {
        this.props.dispatch({
            type: 'FETCH_CANDIDATE_LIST',
            payload: this.props.reduxState
        });
    }

    // bring user to add Candidate page 
    addCandidate = () => {
        console.log('in AdminElection page, addCandidate');
        // this.props.history.push('/')
    }

    // bring user to edit page to edit candidte info
    editCandidate = () => {
        console.log('in AdminElection page, editCandidate');
        // this.props.history.push('/')
    }

    // removeCandidate deletes candidate from this election
    removeCandidate = () => {
        console.log('in AdminElection page, removeCandidate');
        // this.props.history.push("/")
    }

    render = () => {
        return (
            <div className="newElection">
                <h1>Name of last election</h1>
                <h2>City, State</h2>
                <h2>Date</h2>
                <button>Edit</button>
                <br></br><br></br>
                <button onClick={this.addCandidate}>Add Candidate</button>
                <br></br><br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Total Budget</th>
                            <th>Law Enforcement</th>
                            <th>Parks and Rec</th>
                            <th>Public Works</th>
                            <th>First Responders</th>
                            <th>Community Dev</th>
                            <th>Admin</th>
                            <th>Education</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.props.reduxState.map(election => (<tr><td>{election.name}</td>
                            <td>{election.totBudg}</td><td></td><td></td><td></td><td></td><td></td><td></td>
                            <button onClick={this.editCandidate}>Edit</button>
                            <button onClick={this.removeCandidate}>Remove</button></tr>))} */}
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



