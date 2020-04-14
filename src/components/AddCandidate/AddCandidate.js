// The Add Candidate/Edit Candidate page will consist of a form for the admin to fill out in order to add a candidate to an election. The admin can input the name of the candidate. 
// Then, they will go through the budget distribution of the candidate, and input the candidate’s proposed budget for each category. 
// These categories will be hardcoded into the database, meaning that the categories will stay the same for every candidate and every election unless they are changed in the database. 
// On click of “Submit” button, the candidate will be added to the election, and will be displayed in the candidates table when the admin returns to the Admin Election View (4). 
// If the admin clicks the “cancel” button, the candidate will not be added and the admin will be returned to the Admin Election View (4). The Edit Candidate view will look the same as the Add Candidate view, 
// except the inputs will be filled with values for the admin to change. Changing the values and then pressing submit will save the changes made for the candidate.

import React, { Component } from 'react';

import { connect } from 'react-redux';
import './AddCandidate.css'


class AddCandidate extends Component {
  state = {
    name: '',
    email: '',
    incumbent: false,
    budget: {
      lawEnforcement: '',
      parksRec: '',
      publicWorks: '',
      firstResponders: '',
      communityDev: '',
      administration: '',
      education: ''
    }
  }
  handleAdd = () => {
    console.log("Add candidate", this.state);
    let newCandidate = this.state;
    this.props.dispatch({ type: 'ADD_CANDIDATE', payload: newCandidate })
  }

  handleCancel = () => {
    console.log("CANCELING");
  }

  //handles the change of name and email inputs
  handleChange = (event, typeOf) =>{
    this.setState({
      [typeOf]: event.target.value
    })
  }

  //handles change of budget inputs
  handleBudgetChange = (event, typeOf) => {
    this.setState({
      budget:{
        ...this.state.budget,
        [typeOf]: event.target.value
      }
    })
    console.log(this.state);

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
    return (
      <div class="def_style">
        <h2>Add Candidate</h2>

        <label>Name</label>
        <input placeholder="first and last name" onChange={(event) => this.handleChange(event, 'name')} />
        <br />

        <label>Email</label>
        <input placeholder="email" onChange={(event) => this.handleChange(event, 'email')} />
        <br />

        <label>Incumbent?</label>
        <input type="checkbox" value={this.state.incumbent} onChange={() => this.handleCheck()} />

        <h2>Candidate's Proposed Budget</h2>

        <label>Law Enforcement</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'lawEnforcement')} />
        <br />

        <label>Parks/Rec</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'parksRec')} />
        <br />

        <label>Public Works</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'publicWorks')} />
        <br />

        <label>First Responders</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'firstResponders')} />
        <br />

        <label>Community Development</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'communityDev')} />
        <br />

        <label>Administration</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'administration')} />
        <br />

        <label>Education</label>
        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'education')} />
        <br />

        <button onClick={this.handleAdd} >Add Candidate</button>
        <button onClick={this.handleCancel} >Cancel</button>

      </div>
    )
  }
}

export default connect()(AddCandidate);
