import React, { Component } from 'react';
import '../App/App.css';
import Election from '../Election/Election';
import { connect } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import '../Home/Home.css'

class ElectionList extends Component {
    render() {
        return (
            <div className="ElectionList">
                <List>
                    {this.props.electionList.map(election => (<ListItem key={election.id}><Election election={election} /></ListItem>))}
                </List>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(ElectionList);