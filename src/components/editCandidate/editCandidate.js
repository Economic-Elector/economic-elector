import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditCandidate extends Component {

    componentDidMount = () => {
       this.findCandidate();
    }

    state = {
        name: '',
        email: '',
        incumbent: false,
        categories: this.props.reduxState.budget.pastBudget,
        budget: {

        }
    }
    findCandidate = () =>{
        let candidates = this.props.reduxState.candidates.allCandidates
        for(let i = 0; i<candidates.length; i++){
            if (candidates[i].id === this.props.location.candidateId) {
                this.setState ({
                    ... this.state,
                    name: candidates[i].name,
                    email: candidates[i].email,
                    incumbent: candidates[i].incumbent,
                    budget: candidates[i].budget
                })
            }
        }
    }
    handleAdd = () => {
        console.log("Edit candidate", this.state);
        let newCandidate = {
            name: this.state.name,
            email: this.state.email,
            incumbent: this.state.incumbent,
            budget: this.state.budget,
            id: this.props.location.candidateId
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
                [id]: {
                    ...this.state.budget[id],
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
                <input value={this.state.name} placeholder="First and Last Name" onChange={(event) => this.handleChange(event, 'name')} />
                <br />

                <label>Email</label>
                <input value={this.state.email} placeholder="Email" onChange={(event) => this.handleChange(event, 'email')} />
                <br />

                <label>Incumbent?</label>
                <input type="checkbox" value={this.state.incumbent} onChange={() => this.handleCheck()} />

                <h2>Candidate's Proposed Budget</h2>

                {this.state.categories.map((category) => {
                    return (<div>
                        <label>{category.name}</label>
                        <input placeholder={category.name}  value={this.state.budget[category.id]} type='number' onChange={(event) => this.handleBudgetChange(event, category.id, category.name)} />
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