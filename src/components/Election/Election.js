import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';

class Election extends Component {
    state = {}

    handleClick = (a) => {
        console.log(a.props.election.id)
        let election_id = a.props.election.id
        this.a(election_id);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.reduxState.budget.pastBudget !== prevProps.reduxState.budget.pastBudget) {
            this.props.history.push(`/Budget/${this.state.id}`);
        }
    }

    a = (id) => {

        this.props.dispatch({
            type: 'FETCH_BUDGET',
            payload: id
        })

        this.props.dispatch({
            type: 'SET_ELECTION',
            payload: this.props.election
        })

        // this.props.dispatch({
        //   type: 'CURRENT_ELECTION',
        //   payload: this.props.election
        // })

        this.setState({
            id: id
        })

    }

    render = () => {
        let election = this.props.election;
        return (
            <div onClick={() => this.handleClick(this)} className="center_just">
                
                <List>
                <b> {election.name}</b>
                <br />
                <b>{election.location}</b>
                <br />
               {election.date}
                <hr className="ruler" />
                    
                </List>
               
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(Election));