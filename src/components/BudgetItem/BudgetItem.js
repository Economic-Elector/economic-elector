import React, { Component } from 'react';

import { connect } from 'react-redux';

// Item that displays things about the clicked on election
// item is the election past budget information from the pastElection reducer

class BudgetItem extends Component {

    render() {
        console.log('item', this.props.item)
        return (
            <div>
                {this.props.item.name}{this.props.item.past_allocation}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(BudgetItem);