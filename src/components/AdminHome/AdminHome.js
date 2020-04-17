// On the admin home page, the admin will see all the elections they have created on the website. The admin can click on an election in the list, and then be brought to the Admin Election View (4). 
// They begin the process of creating a new election by clicking the “Add New Election” button. This button will take them to the Add New Election page (3). 
// Lastly, the admin can logout of their account by clicking the logout button in the header.

import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import axios from 'axios';
import AdminElectionListItem from './AdminElectionListItem'

import { connect } from 'react-redux';


class AdminHome extends Component {
    state = {
        elections: []
    }
    componentDidMount = () => {
        this.getElections();
    }

    //i just have the axios get request in here instead of in a saga
    //since we don't to save the data to a reducer. i think?
    getElections = () => {
        axios({
            method: 'GET',
            url: '/api/elections/all'
        }).then((response) => {
            console.log('all elections', response.data)
            this.setState({
                elections: response.data
            })
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }
    addNewElection = () => {
        this.props.history.push('/adminNewElection')
    }

    render() {
        return (
            <div class="def_style">
                <h2>Your Elections</h2>
                <button onClick={this.addNewElection}>Add New Election</button>
                <ul>
                    {this.state.elections.map((election) => {
                        return (
                            //need to fix this. it goes to the user's budget page when you click the election
                            <AdminElectionListItem election={election} />
                        )
                    })}
                </ul>



            </div>
        )
    }
}

export default connect()(AdminHome);