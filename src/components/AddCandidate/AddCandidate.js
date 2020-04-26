// The Add Candidate/Edit Candidate page will consist of a form for the admin to fill out in order to add a candidate to an election. The admin can input the name of the candidate. 
// Then, they will go through the budget distribution of the candidate, and input the candidate’s proposed budget for each category. 
// These categories will be hardcoded into the database, meaning that the categories will stay the same for every candidate and every election unless they are changed in the database. 
// On click of “Submit” button, the candidate will be added to the election, and will be displayed in the candidates table when the admin returns to the Admin Election View (4). 
// If the admin clicks the “cancel” button, the candidate will not be added and the admin will be returned to the Admin Election View (4). The Edit Candidate view will look the same as the Add Candidate view, 
// except the inputs will be filled with values for the admin to change. Changing the values and then pressing submit will save the changes made for the candidate.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddCandidate.css';
import { Input, Button } from '@material-ui/core';

class AddCandidate extends Component {
    state = {
        name: '',
        email: '',
        incumbent: false,
        categories: this.props.reduxState.budget.pastBudget,
        budget: {

        }
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_BUDGET',
            payload: this.props.reduxState.elections.election.id
        })
    }
    handleAdd = () => {
        console.log("Add candidate", this.state);
        let newCandidate = {
                                name: this.state.name,
                                email: this.state.email,
                                incumbent: this.state.incumbent,
                                budget: this.state.budget,
                                election_id: this.props.reduxState.elections.election.id
        }
        this.props.dispatch({ type: 'ADD_CANDIDATE', payload: newCandidate })
       
        this.props.history.push('/adminElection')
    }

    handleCancel = () => {
        console.log("CANCELING");
    }

    //handles the change of name and email inputs
    handleChange = (event, typeOf) => {
        this.setState({
            [typeOf]: event.target.value
        })
    }

    handleBack = () => {
        this.props.history.push('/adminElection');
    }

    //handles change of budget inputs
    handleBudgetChange = (event, id, typeOf) => {
        this.setState({
            budget: {
                ...this.state.budget,
                [typeOf]: {
                            ...this.state.budget[typeOf],
                            id: id,
                            amount: event.target.value
                }
            }       
        })

    }

    //handles change of incumbetn checkbox
    handleCheck = () => {
        // console.log(event.target.value);
        this.setState({
            incumbent: !this.state.incumbent
        })
        console.log(this.state.incumbent);

    }

    render() {
        let name = this.props.reduxState.elections.election.name;
        let location = this.props.reduxState.elections.election.location;
        return (
            <div class="standard_container">
                <button className="left_just" onClick={this.handleBack}>Back to {name} election</button>
                <h1>{name}</h1>
                <h3>{location}</h3>
                <br />
                <h2>Add Candidate</h2>

                <label>Name: 
                <Input placeholder="first and last name" onChange={(event) => this.handleChange(event, 'name')} />
                </label>

                <br />

                <label>Email: 
                <Input placeholder="email" onChange={(event) => this.handleChange(event, 'email')} />
                </label>
                <br />

                <label>Incumbent?
                <Input type="checkbox" value={this.state.incumbent} onChange={() => this.handleCheck()} />
                </label>

                <h2>Candidate's Proposed Budget</h2>

                {this.state.categories.map((category) => {
                    return(<div>
                        <label>{category.name}
                        <Input placeholder={category.name} type='number' onChange={(event) => this.handleBudgetChange(event, category.id, category.name)} />
                        </label>
                        <br />
                    </div>)
                })}
                <br></br>
                <Button variant="outlined" color="primary" onClick={this.handleAdd} >Add Candidate</Button><br></br><br></br>
                <Button variant="outlined" color="secondary" onClick={this.handleCancel} >Cancel</Button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AddCandidate);