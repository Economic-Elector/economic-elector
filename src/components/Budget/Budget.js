// The budget page will contain a user input form to enter personal budget preferences. It will also display the current budget alongside the user inputed budget. 
// The user can input any number they want into a budget input. But, they will have the current budget to reference so that they can come up with realistic numbers. 
// This data will be displayed in a bar chart showing the budget breakdown. Once the user has clicked the “Find My Candidate” button, they will be brought to the Results View (3).


import React, {Component} from 'react';

import {connect} from 'react-redux';
import './Budget.css'


class Budget extends Component {

    handleBack = () => {
        console.log("going back....way back");
    }

  // once server and db is setup needs to be dynamic
    render() {
      return (
          <div>
            
            <button class="left_just" onclick={this.handleBack}>Back to Elections</button>

            
            <h1 class="center_just">City of Pawnee / Parks Director</h1>
            <div>
                <h3><u>Create Your Budget Preferences</u></h3> <h3 class="right_just"><u>Current Budget</u></h3>   
            </div>

            <div class="center_just">

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
            </div>

            <button class="center_just" >Find My Candidate</button>

          </div>
    )}
  }
  
  export default connect()(Budget);