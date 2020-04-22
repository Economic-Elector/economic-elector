//On this page, the admin will enter in all the needed information to create a new election. This will include the election office, 
//location, and date that it is taking place. Additionally, the admin will be asked to enter in the budget distribution of the prior year. 
//This is so the users will be able to see what the budget distribution has been in the past, just as a reference. At the bottom of the 
//form, the admin can click the “Create Election” Button to finish creating the election, or press “Cancel” Button to cancel the process 
//and return to the Admin Home (2). Clicking “Create Election” will create the election, and then bring the admin to the 
//Admin Election View (4) for that specific election.
import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { FormControl, FormLabel, Input, Button } from '@material-ui/core';

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

            alert('Please make a selection for all Inputs');

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

    render = () => {
        return (
            <FormControl onSubmit={this.addNewElection} className="newElection">

                <h1>New Election</h1>

                <FormLabel>
                    <b>Election Office:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'office')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Location:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'location')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Date:</b>
                    <Input type='date' placeholder="date" value={this.state.value} onChange={(event) => this.handleNameChange(event, 'date')}></Input>
                </FormLabel>

                <br /><br />

                <h1>Prior Year's Budget Distribution</h1>

                <br></br>

                <FormLabel>
                    <b>Law Enforcement:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'lawEnforcement')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Parks/Rec:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'parksRec')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Public Works:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'publicWorks')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>First Responders:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'firstResponders')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Community Development:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'communityDev')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Administration:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'administration')}></Input>
                </FormLabel>

                <br /><br />

                <FormLabel>
                    <b>Education:</b>
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'education')}></Input>
                </FormLabel>

                <br /><br />

                <Input
                    className="create-election"
                    type="submit"
                    name="submit"
                    value="Create Election"
                />

                <br /><br />

                <Button className="center" type="reset"><b>Cancel</b></Button>

            </FormControl>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AdminNewElection);