import React, { Component } from 'react';
import '../App/App.css';
import Election from '../Election/Election';
import { connect } from 'react-redux';

class ElectionList extends Component {
    render() {
        return (
            <div className="ElectionList">
                <ul>
                    {this.props.electionList.map(election => (<li key={election.id}><Election election={election} /></li>))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(ElectionList);