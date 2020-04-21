import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    //handles change of budget inputs
    handleBudgetChange = (event, id) => {
        const newBudgetArray = this.state.budgetArray.slice();
        for (let i = 0; i < newBudgetArray.length; i++) {
            if (newBudgetArray[i].id === id){
                newBudgetArray[i].past_allocation = event.target.value
            }
        }
        this.setState({
            budgetArray: newBudgetArray
        })
    }
    submit = () =>{
        this.props.dispatch({type:'EDIT_ELECTION', payload: this.state});
        this.props.history.push('/adminElection');
    }
    render = () => {
        let election = this.props.reduxState.elections.election;
        return (
            <div>
                <h2>{election.name}</h2>
                <br />
                <label>
                    <b>Election Office:</b>
                    <input value={this.state.name} onChange={(event) => this.handleChange(event, 'name')}/>
                </label>
                <br/>
                <label>
                    <b>Location:</b>
                    <input value={this.state.location} onChange={(event) => this.handleChange(event, 'location')}/>
                </label>
                <br />
                <label>
                    <b>Date:</b>
                    <input type='date' value={this.state.date} onChange={(event) => this.handleChange(event, 'date')}/>
                </label>
                <br />

                <h2>Budget</h2>
                {this.state.budgetArray.map((budget) => {
                    return (<div>
                        <label>{budget.name}</label>
                        <input value={budget.past_allocation} type='number'
                            onChange={(event) => this.handleBudgetChange(event, budget.id)} 
                        />
                        <br />
                    </div>)
                })}
                <button onClick={this.submit}>Submit Changes</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(EditElection));