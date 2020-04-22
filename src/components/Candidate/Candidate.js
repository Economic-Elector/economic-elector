import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableCell } from '@material-ui/core';

// Item that displays things about the clicked on election
// item is the election past budget information from the pastElection reducer

class Candidate extends Component {

    totalDiff = () => {
        for( let i=0; i<this.props.diff.length; i++){
            if(this.props.candidate.difference === this.props.diff[i].diff){
                return this.props.diff[i].diff
            }
        }
    }

    render() {
        //turns number into currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        
        console.log('candidate:', this.props.candidate.budget[1]);
        console.log('item', this.props.item)
        const totalBudget = Number(this.props.candidate.budget[1] + this.props.candidate.budget[2] + this.props.candidate.budget[3] + this.props.candidate.budget[4] + this.props.candidate.budget[5] + this.props.candidate.budget[6] + this.props.candidate.budget[7])
            return(
            <>
                <TableCell>{this.props.candidate.name}</TableCell>
                <TableCell>{formatter.format(this.totalDiff())}</TableCell>
                <TableCell>{formatter.format(totalBudget)}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[1])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[2])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[3])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[4])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[5])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[6])}</TableCell>
                <TableCell>{formatter.format(this.props.candidate.budget[7])}</TableCell>
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Candidate);