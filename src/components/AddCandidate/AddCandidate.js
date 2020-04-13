// The Add Candidate/Edit Candidate page will consist of a form for the admin to fill out in order to add a candidate to an election. The admin can input the name of the candidate. 
// Then, they will go through the budget distribution of the candidate, and input the candidate’s proposed budget for each category. 
// These categories will be hardcoded into the database, meaning that the categories will stay the same for every candidate and every election unless they are changed in the database. 
// On click of “Submit” button, the candidate will be added to the election, and will be displayed in the candidates table when the admin returns to the Admin Election View (4). 
// If the admin clicks the “cancel” button, the candidate will not be added and the admin will be returned to the Admin Election View (4). The Edit Candidate view will look the same as the Add Candidate view, 
// except the inputs will be filled with values for the admin to change. Changing the values and then pressing submit will save the changes made for the candidate.

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './AddCandidate.css'


class AddCandidate extends Component {

    handleCreate = () => {
        console.log("Creating Election");
    }

    handleCancel = () => {
        console.log("CANCELING");
    }
  
    render() {
      return (
          <div class="def_style">
            <h2>New Election</h2>

            <label>Election Office</label>
            <input placeholder="Office"/>
            <br/>

            <label>Location</label>
            <input placeholder="Location"/>
            <br/>

            <label>Date</label>
            <input placeholder="Date"/>
            <br/>

            <h2>Prior Year's Budget Distribution</h2>

            <label>Law Enforcement</label>
            <input placeholder="$default"/>
            <br/>

            <label>Parks/Rec</label>
            <input placeholder="$default"/>
            <br/>

            <label>Public Works</label>
            <input placeholder="$default"/>
            <br/>

            <label>First Responders</label>
            <input placeholder="$default"/>
            <br/>

            <label>Community Development</label>
            <input placeholder="$default"/>
            <br/>

            <label>Administration</label>
            <input placeholder="$default"/>
            <br/>

            <label>Education</label>
            <input placeholder="$default"/>
            <br/>

            <button onClick={this.handleCreate} >Create Election</button>
            <button onClick={this.handleCancel} >Cancel</button>

          </div>
    )}
  }
  
  export default connect()(AddCandidate);
  