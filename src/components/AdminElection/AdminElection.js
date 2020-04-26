// The Election View will display information for a specific election. The admin will be able to edit any of the information on this page. 
// They can click the edit button near the header, which will enable them to edit the name, location, and date of the election. The admin will also see a table with all the candidates for the election. 
// The table will include the name of the candidate, their total budget, and the amount of money going into each category. If the admin just created this election, the table will be empty. 
// They can add a candidate by pressing the “Add Candidate” button, taking them to the Add Candidate page (5). To the right of each row in the table, there will be an “edit” button. 
// Clicking this button will take the admin to the Edit Candidate page (6), where they can edit any of the information for the specific candidate they clicked on. 
// Lastly, the admin will see a “remove” button, that removes the candidate from the table, and the election.

import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';

class AdminElection extends Component {

    // bring user to add Add Candidate/Edit Candidate page
    // probably need to pass with it the election ID
    addCandidate = () => {
        this.props.history.push('/addCandidate')
    }

    // bring user to editCandidate page
    // probably need to pass with it the election ID
    editCandidate = (event, id) => {
        console.log('editCandidate id:', id);
        
        this.props.history.push({
            pathname: '/editCandidate',
            candidateId: id
        });
    }

    // removeCandidate deletes candidate from this election
    // call to sagas to make DELETE call to "candidates" table
    // must send with it the election ID
    removeCandidate = (event, id) => {
        let obj = {
            candidate: id,
            electionId: this.props.reduxState.elections.election.id
        }
        this.props.dispatch({
            type: 'DELETE_CANDIDATE_FROM_LIST',
            payload: obj
        });
        
    }

    editElection = () =>{
        this.props.history.push('/editElection');
    }

    handleBack = () => {
        this.props.history.push('/adminHome');
    }

    requestBudget = (candidate) =>{
        console.log('request');
        this.props.dispatch({ type: 'SEND_BUDGET_REQUEST', payload: { candidate: candidate, election: this.props.reduxState.elections.election, categories: this.props.reduxState.budget.pastBudget}})
    }
    //everything in h1,h2,h2 will come from "elections" DB table
    //everything in the table body will come from "candidates" and "budget_allocation" DB tables
    render = () => {
        let categories = this.props.reduxState.budget.pastBudget;
        let candidates = this.props.reduxState.candidates.allCandidates;
        return (
            <div className="standard_container" style={{ width: '80%' }}>
                <Button onClick={this.handleBack}>Back to elections</Button>
                {/* <h3>{JSON.stringify(this.props.reduxState.candidates.elections)}</h3> */} 
                <h1>{this.props.reduxState.elections.election.name}</h1>
                <h3>{this.props.reduxState.elections.election.location}</h3>
                <h3>{this.props.reduxState.elections.election.date}</h3>
                <Button onClick={this.editElection}>Edit Election</Button>

                <br />
          
                <br></br><br></br>
                <Button onClick={this.addCandidate}>Add Candidate</Button>
                <br></br><br></br>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            {categories &&
                                categories.map((category) => {
                                    return (
                                        <TableCell>{category.name}</TableCell>
                                    )
                                })
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidates.map(candidate => (
                            <TableRow>
                                <TableCell variant="head" >{candidate.name}</TableCell>
                                {categories.map((category) => {
                                    return (
                                        <TableCell variant="head" >{candidate.budget[category.id]}</TableCell>
                                    )
                                })}
                                <Button onClick={()=>this.requestBudget(candidate)}>Request Budget</Button>
                                <Button onClick={(event) => this.editCandidate(event, candidate.id)}>Edit</Button>
                                <Button onClick={(event) => this.removeCandidate(event, candidate.id)}>Remove</Button>
                            </TableRow>))}
                    </TableBody>
                </Table>
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AdminElection);