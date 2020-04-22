// The budget page will contain a user Input form to enter personal budget preferences. It will also display the current budget alongside the user Inputed budget. 
// The user can Input any number they want into a budget Input. But, they will have the current budget to reference so that they can come up with realistic numbers. 
// This data will be displayed in a bar chart showing the budget breakdown. Once the user has clicked the “Find My Candidate” Button, they will be brought to the Results View (3).


import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Budget.css'
import BudgetItem from '../BudgetItem/BudgetItem';
import { Input, Button, InputLabel } from '@material-ui/core';

class Budget extends Component {

    state = {
        budget: {
            lawEnforcement: '',
            parksRec: '',
            publicWorks: '',
            firstResponders: '',
            communityDev: '',
            administration: '',
            education: '',
            total: ''
        },

    }

    componentDidMount = () => {
        console.log('page mount');
        console.log('props', this.props)
        console.log('current election', this.props.reduxState.budget.pastBudget)
    }

    componentDidUpdate = (prevProps) => {
        if ((this.props.reduxState.budget.results !== prevProps.reduxState.budget.results)) {
            this.props.history.push(`/Results`);
        }
    }

    handleBack = () => {
        console.log("going back....way back", this.props.history);
        this.props.history.push('/home');
    }

    handleBudgetChange = (event, typeOf) => {
        let tempTotal = parseFloat(parseFloat(this.state.budget.lawEnforcement) + parseFloat(this.state.budget.parksRec) + parseFloat(this.state.budget.publicWorks) + parseFloat(this.state.budget.firstResponders) + parseFloat(this.state.budget.communityDev) + parseFloat(this.state.budget.administration) + parseFloat(this.state.budget.education));
        this.setState({
            budget: {
                ...this.state.budget,
                [typeOf]: event.target.value,
                total: tempTotal
            }
        })
    }

    findCandidate = () => {
        console.log('STATE IN BUDGET:', this.state.budget)
        let userBudget = this.state;
        this.props.dispatch({ type: 'FIND_CANDIDATE', payload: this.props.reduxState.elections.election.id });
        this.props.dispatch({ type: 'SET_USER_BUDGET', payload: userBudget });
        this.props.dispatch({ type: 'FETCH_CANDIDATES', payload: this.props.reduxState.elections.election.id });
        console.log("Finding Candidate Comparing to...", this.props.reduxState);
    }



    // once server and db is setup needs to be dynamic
    render() {

        return (
            <div className="center_just">

                <Button onClick={this.handleBack}>Back to Elections</Button>

                <h3>{this.props.reduxState.elections.election.name}</h3>

                <h3>{this.props.reduxState.elections.election.location}</h3>

                <h3>{this.props.reduxState.elections.election.date}</h3>

                <div className='budgetForm'>

                    <h4>Create Your Budget Preferences</h4> <br />

                    <div class="center_just">

                        <InputLabel> Law Enforcement:
                            <Input onChange={(event) => this.handleBudgetChange(event, 'lawEnforcement')} />
                        </InputLabel>

                        <br />

                        <InputLabel> Parks and Recreation:
                            <Input onChange={(event) => this.handleBudgetChange(event, 'parksRec')} />
                        </InputLabel>

                        <br />

                        <InputLabel> Public Works:
                            <Input onChange={(event) => this.handleBudgetChange(event, 'publicWorks')} />
                        </InputLabel>

                        <br />

                        <InputLabel> First Responders:
                            <Input onChange={(event) => this.handleBudgetChange(event, 'firstResponders')} />
                        </InputLabel>

                        <br />

                        <InputLabel> Community Development: 
                            <Input onChange={(event) => this.handleBudgetChange(event, 'communityDev')} />
                        </InputLabel>

                        <br />

                        <InputLabel> Administration: 
                            <Input onChange={(event) => this.handleBudgetChange(event, 'administration')} />
                        </InputLabel>

                        <br />

                        <InputLabel> Education: 
                            <Input onChange={(event) => this.handleBudgetChange(event, 'education')} />
                        </InputLabel>

                    </div>

                    <div class="left_just">
                        <h4><center>Current Budget</center></h4>
                        {this.props.reduxState.budget.pastBudget.map((item) => (<p><BudgetItem item={item} /></p>))}
                    </div>

                </div>

                <Button onClick={this.findCandidate}>Find My Candidate</Button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Budget);