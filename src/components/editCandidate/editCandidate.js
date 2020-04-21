import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditCandidate extends Component {

    state = {
        name: '',
        email: '',
        incumbent: false,
        categories: this.props.reduxState.budget.pastBudget,
        budget: {

        }
    }

    handleAdd = () => {
        console.log("Edit candidate", this.state);
        let newCandidate = {
            name: this.state.name,
            email: this.state.email,
            incumbent: this.state.incumbent,
            budget: this.state.budget,
            election_id: this.props.reduxState.elections.election.id
        }
        
        this.props.dispatch({ type: 'EDIT_CANDIDATE', payload: newCandidate })

        this.props.history.push('/adminElection')
    }

    //handles the change of name and email inputs
    handleChange = (event, typeOf) => {
        this.setState({
            [typeOf]: event.target.value
        })
    }

    //handles change of budget inputs
    handleBudgetChange = (event, id, typeOf) => {
        this.setState({
            budget: {
                ...this.state.budget,
                [typeOf]: {
                    ...this.state.budget[typeOf],
                    id: id,
                    amount: event.target.value
                }
            }
        })
        console.log(this.state);

    }

    handleCheck = () => {
        this.setState({
            incumbent: !this.state.incumbent
        })
        console.log(this.state.incumbent);

    }

    render() {
        return (
            <div class="def_style">
                <h2>Edit Candidate</h2>

                <label>Name</label>
                <input placeholder="First and Last Name" onChange={(event) => this.handleChange(event, 'name')} />
                <br />

                <label>Email</label>
                <input placeholder="Email" onChange={(event) => this.handleChange(event, 'email')} />
                <br />

                <label>Incumbent?</label>
                <input type="checkbox" value={this.state.incumbent} onChange={() => this.handleCheck()} />

                <h2>Candidate's Proposed Budget</h2>

                {this.state.categories.map((category) => {
                    return (<div>
                        <label>{category.name}</label>
                        <input placeholder={category.name} type='number' onChange={(event) => this.handleBudgetChange(event, category.id, category.name)} />
                        <br />
                    </div>)
                })}

                <button onClick={this.handleAdd} >Edit Candidate</button>
                <button onClick={this.handleCancel} >Cancel</button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(EditCandidate);