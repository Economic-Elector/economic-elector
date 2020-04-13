// On the admin home page, the admin will see all the elections they have created on the website. The admin can click on an election in the list, and then be brought to the Admin Election View (4). 
// They begin the process of creating a new election by clicking the “Add New Election” button. This button will take them to the Add New Election page (3). 
// Lastly, the admin can logout of their account by clicking the logout button in the header.

import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';


class AdminHome extends Component {

    handleAdd = () => {
        console.log("adding")
    }
  
    render() {
      return (
          <div class="def_style">
            <h2>Your Elections</h2>
            <button onClick={this.handleAdd}>Add New Election</button>

            // need to map through the elections

          </div>
    )}
  }
  
  export default connect()(AdminHome);