//On this page, the admin will enter in all the needed information to create a new election. This will include the election office, 
//location, and date that it is taking place. Additionally, the admin will be asked to enter in the budget distribution of the prior year. 
//This is so the users will be able to see what the budget distribution has been in the past, just as a reference. At the bottom of the 
//form, the admin can click the “Create Election” button to finish creating the election, or press “Cancel” button to cancel the process 
//and return to the Admin Home (2). Clicking “Create Election” will create the election, and then bring the admin to the 
//Admin Election View (4) for that specific election.
import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class AdminNewElection extends Component {

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

        if (this.state.newElection.office === '' ||
            this.state.newElection.location === '' ||
            this.state.newElection.date === '' ||
            this.state.newElection.lawEnforcement === '' ||
            this.state.newElection.parksRec === '' ||
            this.state.newElection.publicWorks === '' ||
            this.state.newElection.firstResponders === '' ||
            this.state.newElection.communityDev === '' ||
            this.state.newElection.administration === '' ||
            this.state.newElection.education === '') {

            alert('Please make a selection for all inputs');

        } else {

            this.props.dispatch ({
                type: 'INPUT_NEW_ELECTION',
                payload: this.state.newElection
            });

            this.setState ({
                newElection: this.state.newElection
            });

        }

        this.setState ({
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
                education: ''
            }
        });

        this.props.history.push('/adminElection');
    }
    handleBack = () => {
        this.props.history.push('/adminHome');
    }

    render = () => {
        return (
            <div className="newElection">
                <button className="left_just" onClick={this.handleBack}>Back to elections</button>
                <form onSubmit={this.addNewElection} className="newElection">

                    <h1>New Election</h1>

                    <label>
                        <b>Election Office:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'office')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Location:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'location')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Date:</b>
                        <input type='date' placeholder="date" value={this.state.value} onChange={(event) => this.handleNameChange(event, 'date')}></input>
                    </label>

                    <br /><br />

                    <h1>Prior Year's Budget Distribution</h1>

                    <br></br>

                    <label>
                        <b>Law Enforcement:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'lawEnforcement')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Parks/Rec:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'parksRec')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Public Works:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'publicWorks')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>First Responders:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'firstResponders')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Community Development:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'communityDev')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Administration:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'administration')}></input>
                    </label>

                    <br /><br />

                    <label>
                        <b>Education:</b>
                        <input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'education')}></input>
                    </label>

                    <br /><br />

                    <input
                        className="create-election"
                        type="submit"
                        name="submit"
                        value="Create Election"
                    />

                    <br /><br />

                    <button className="center" type="reset"><b>Cancel</b></button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AdminNewElection);