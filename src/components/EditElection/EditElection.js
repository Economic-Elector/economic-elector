import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, InputLabel, Button } from '@material-ui/core';

class EditElection extends Component {
    state = {
        id: this.props.reduxState.elections.election.id,
        name: this.props.reduxState.elections.election.name,
        location: this.props.reduxState.elections.election.location,
        date: this.props.reduxState.elections.election.date,
        budgetArray: []
    }
    componentDidMount = () =>{
        this.setState({
            budgetArray: this.props.reduxState.budget.pastBudget
        })        
    }
    handleChange = (event, typeOf) =>{
        this.setState({
            [typeOf]: event.target.value
        })
        //console.log(this.state[typeOf]);
    }
    //handles change of budget Inputs
    handleBudgetChange = (event, id) => {
        //create a copy of the array in state
        const newBudgetArray = this.state.budgetArray.slice();
        //loop through it and match the category id with the id coming from the Input
        for (let i = 0; i < newBudgetArray.length; i++) {
            if (newBudgetArray[i].id === id){
                newBudgetArray[i].past_allocation = event.target.value
            }
        }
        //set the budgetArray in the state to the new array 
        //with the updated allocation
        this.setState({
            budgetArray: newBudgetArray
        })
    }
    submit = () =>{
        this.props.dispatch({type:'EDIT_ELECTION', payload: this.state});
        this.props.history.push('/adminElection');
    }
    cancel = () =>{
        this.props.history.push('/adminElection');
    }
    render = () => {
        let election = this.props.reduxState.elections.election;
        return (
            <div>
                <h2>{election.name}</h2>
                <br />
                <InputLabel>
                    <b>Election Office:</b>
                    <Input value={this.state.name} onChange={(event) => this.handleChange(event, 'name')}/>
                </InputLabel>
                <br/>
                <InputLabel>
                    <b>Location:</b>
                    <Input value={this.state.location} onChange={(event) => this.handleChange(event, 'location')}/>
                </InputLabel>
                <br />
                <InputLabel>
                    <b>Date:</b>
                    <Input type='date' value={this.state.date} onChange={(event) => this.handleChange(event, 'date')}/>
                </InputLabel>
                <br />

                <h2>Budget</h2>
                {this.state.budgetArray.map((budget) => {
                    return (<div>
                        <InputLabel>{budget.name}</InputLabel>
                        <Input value={budget.past_allocation} type='number'
                            onChange={(event) => this.handleBudgetChange(event, budget.id)} 
                        />
                        <br />
                    </div>)
                })}
                <Button onClick={this.submit}>Submit Changes</Button>
                <Button onClick={this.cancel}>Cancel</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(EditElection));