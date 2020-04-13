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
        newElection: {
            office: '',
            location: '',
            date: '',
            lawEnforcement: '',
            parksRec: '',
            publicWorks: '',
            firstResponders: '',
            communityDev: '',
            administration: '',
            education: '',
        }
    }

    handleNameChange = (event, param) => {
        this.setState({
            newElection: {
                ...this.state.newElection,
                [param]: event.target.value,
            }
        });
    }

    addNewElection = event => {
        event.preventDefault();
        if (this.state.newElection.office === '' || this.state.newElection.location === '' || this.state.newElection.date === '' ||
            this.state.newElection.lawEnforcement === '' || this.state.newElection.parksRec === '' || 
            this.state.newElection.publicWorks === '' || this.state.newElection.firstResponders === '' || 
            this.state.newElection.communityDev === '' || this.state.newElection.administration === '' || 
            this.state.newElection.education === '') 
            {
            alert('Please make a selection for all inputs');
        } else {
            this.props.dispatch({ type: 'INPUT_NEW_ELECTION', payload: this.state.newElection })
            this.setState({
                newElection: this.state.newElection,
            });
            this.props.history.push('/adminElection');
        }
    }
    cancelElection = () => {
        console.log('in cancelElection');
        this.setState({
            newElection: {
                office: '',
                location: '',
                date: '',
                lawEnforcement: '',
                parksRec: '',
                publicWorks: '',
                firstResponders: '',
                communityDev: '',
                administration: '',
                education: '',
            }
        });
        // this.props.history.push('/');
    }

    render = () => {
        return (
            <div className="newElection">
                <h1>New Election</h1>
                    <label>
                        <b>Election Office:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'office')}></input>
                    </label>
                       <br></br><br></br>
                    <label>
                        <b>Location:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'location')}></input>
                    </label>
                      <br></br><br></br>
                    <label>
                        <b>Date:</b>
                    <input type='date' placeholder="date"  value={this.state.value} onChange={(event) => this.handleNameChange(event, 'date')}></input>
                    </label>
                     <br></br><br></br>
                    <h1>Prior Year's Budget Distribution</h1>
                    <br></br>
                    <label>
                        <b>Law Enforcement:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'lawEnforcement')}></input>
                    </label>
                     <br></br><br></br>
                    <label>
                        <b>Parks/Rec:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'parksRec')}></input>
                    </label>
                    <br></br><br></br>
                    <label>
                        <b>Public Works:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'publicWorks')}></input>
                    </label>
                      <br></br><br></br>
                    <label>
                        <b>First Responders:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'firstResponders')}></input>
                    </label>
                     <br></br><br></br>
                    <label>
                        <b>Community Development:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'communityDev')}></input>
                    </label>
                      <br></br><br></br>
                    <label>
                        <b>Administration:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'administration')}></input>
                    </label>
                     <br></br><br></br>
                    <label>
                        <b>Education:</b>
                    <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'education')}></input>
                    </label>
                     <br></br><br></br>
                    <button className="center" onClick={this.addNewElection}><b>Create Election</b></button>
                     <br></br><br></br>
                    <button className="center" onClick={this.cancelElection}><b>Cancel</b></button>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(AdminElection);