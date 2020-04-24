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
        budgetArray: [],
        addCategoryToggle: false,
        newCategory: {
            name: '',
            amount: ''
        }
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
    handleBack = () => {
        this.props.history.push('/adminElection');
    }
    addCategoryToggle = () => {
        this.setState({
            addCategoryToggle: !this.state.addCategoryToggle
        })
    }

    handleNewCategoryChange = (event, typeOf) => {
        this.setState({
            newCategory:{
                ...this.state.newCategory,
                [typeOf]: event.target.value
            }
        })
        console.log(this.state.newCategoryName);

    }

    addCategory = () => {
        console.log(this.state.newCategoryName);
        this.props.dispatch({
            type: 'ADD_NEW_CATEGORY',
            payload: this.state.newCategory
        })
        console.log(this.state);

    }
    render = () => {
        let election = this.props.reduxState.elections.election;
        let name = this.props.reduxState.elections.election.name;
        let location = this.props.reduxState.elections.election.location;
        
        let addCategory;
        if (this.state.addCategoryToggle) {
            addCategory = (
                <div>
                    <label>
                        <b>Category Name:</b>
                        <input onChange={(event) => this.handleNewCategoryChange(event, 'name')}></input>
                    </label>
                    <label>
                        <b>Amount of Budget:</b>
                        <input onChange={(event) => this.handleNewCategoryChange(event, 'amount')}></input>
                    </label>
                    <button type='button' onClick={this.addCategory}>Add</button>
                    <button onClick={this.addCategoryToggle}>Cancel</button>
                </div>
            );
        } else {
            addCategory = (
                <button onClick={this.addCategoryToggle}>Add Category</button>
            );
        }
        return (
            <div className="newElection">
                <button className="left_just" onClick={this.handleBack}>Back to {name} election</button>
                <h1>{name}</h1>
                <h3>{location}</h3>
                <br />

                <h2>Edit Election</h2>
          
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

                <h2>Edit Budget</h2>
                {this.state.budgetArray.map((budget) => {
                    return (<div>
                        <InputLabel>{budget.name}</InputLabel>
                        <Input value={budget.past_allocation} type='number'
                            onChange={(event) => this.handleBudgetChange(event, budget.id)} 
                        />
                        <br />
                    </div>)
                })}
                <br/>
                {addCategory}
                <br/>
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