//On this page, the admin will enter in all the needed information to create a new election. This will include the election office, 
//location, and date that it is taking place. Additionally, the admin will be asked to enter in the budget distribution of the prior year. 
//This is so the users will be able to see what the budget distribution has been in the past, just as a reference. At the bottom of the 
//form, the admin can click the “Create Election” button to finish creating the election, or press “Cancel” button to cancel the process 
//and return to the Admin Home (2). Clicking “Create Election” will create the election, and then bring the admin to the 
//Admin Election View (4) for that specific election.
import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { Button, Input, InputLabel } from '@material-ui/core';

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
                    Election Office:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'office')}></Input>
                </label>


                    <br /><br />


                <label>
                    Location:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'location')}></Input>
                </label>


                    <br /><br />


                <label>
                    Date:
                    <Input type='date' placeholder="date" value={this.state.value} onChange={(event) => this.handleNameChange(event, 'date')}></Input>
                </label>


                    <br /><br />

                    <h1>Prior Year's Budget Distribution</h1>


                <br />

                <label>
                    Law Enforcement:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'lawEnforcement')}></Input>
                </label>


                    <br /><br />

                <label>
                    Parks/Rec:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'parksRec')}></Input>
                </label>


                    <br /><br />


                <label>
                    Public Works:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'publicWorks')}></Input>
                </label>


                    <br /><br />

                <label>
                    First Responders:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'firstResponders')}></Input>
                </label>


                    <br /><br />

                <label>
                    Community Development:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'communityDev')}></Input>
                </label>


                    <br /><br />

                <label>
                    Administration:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'administration')}></Input>
                </label>


                    <br /><br />

                <label>
                    Education:
                    <Input value={this.state.value} onChange={(event) => this.handleNameChange(event, 'education')}></Input>
                </label>


                    <br /><br />

                    <input
                        className="create-election"
                        type="submit"
                        name="submit"
                        value="Create Election"
                    />

                    <br /><br />

                <Button className="center" type="reset"><b>Cancel</b></Button>


                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(AdminNewElection);