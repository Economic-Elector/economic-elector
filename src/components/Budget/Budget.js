// The budget page will contain a user input form to enter personal budget preferences. It will also display the current budget alongside the user inputed budget. 
// The user can input any number they want into a budget input. But, they will have the current budget to reference so that they can come up with realistic numbers. 
// This data will be displayed in a bar chart showing the budget breakdown. Once the user has clicked the “Find My Candidate” button, they will be brought to the Results View (3).


import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Budget.css'
import BudgetItem from '../BudgetItem/BudgetItem';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, LabelSeries } from 'react-vis';

class Budget extends Component {

    state = {
        budget: {
            lawEnforcement: '',
            parksRec: '',
            publicWorks: '',
            firstResponders: '',
            communityDev: '',
            administration: '',
            education: '',
            total: ''
        }
    }

    componentDidMount = () => {
        console.log('page mount');
        console.log('props', this.props)
        console.log('current election', this.props.reduxState.budget.pastBudget)
    }

    componentDidUpdate = (prevProps) => {
        if ((this.props.reduxState.budget.results !== prevProps.reduxState.budget.results)) {
            this.props.history.push(`/Results`);
        }
    }

    handleBack = () => {
      console.log("going back....way back");
      this.props.history.push('/home');
  }

    handleBudgetChange = (event, typeOf) => {
        this.setState({
            budget: {
                ...this.state.budget,
                [typeOf]: event.target.value
            }
        })
        let tempTotal = parseFloat(parseFloat(this.state.budget.lawEnforcement) + parseFloat(this.state.budget.parksRec) + parseFloat(this.state.budget.publicWorks) + parseFloat(this.state.budget.firstResponders) + parseFloat(this.state.budget.communityDev) + parseFloat(this.state.budget.administration) + parseFloat(this.state.budget.education));
        this.setState({
            budget: {
                ...this.state.budget,
                total: tempTotal
            }
        })
        console.log(this.state);
    }

    findCandidate = () => {
        console.log('STATE IN BUDGET:', this.state.budget)
        let userBudget = this.state;
        this.props.dispatch({ type: 'FIND_CANDIDATE', payload: userBudget });
        this.props.dispatch({ type: 'SET_USER_BUDGET', payload: userBudget });
        console.log("Finding Candidate Comparing to...", this.props.reduxState);
    }



    // once server and db is setup needs to be dynamic
    render() {

        // const for bar graphs using react-vis
        const userData = [{ x: 'Law Enforc', y: this.state.budget.lawEnforcement }, { x: 'Parks/Rec', y: 12000 }, { x: 'PublicWorks', y: 50000 }, { x: 'First Responders', y: 50000 }, { x: 'Community Dev', y: 50000 }, { x: 'Administration', y: 50000 }, { x: 'Education', y: 50000 }];

        const currentData = [{ x: 'Law Enforc', y: 12000 }, { x: 'Parks/Rec', y: 14000 }, { x: 'PublicWorks', y: 52000 }, { x: 'First Responders', y: 52000 }, { x: 'Community Dev', y: 51000 }, { x: 'Administration', y: 54000 }, { x: 'Education', y: 51000 }];

        const labelData = userData.map((d, idx) => ({
            x: d.x,
            y: Math.max(userData[idx].y, currentData[idx].y)
        }));
        const BarSeries = VerticalBarSeries;



        return (
            <div className="center_just">

                <button class="left_just" onclick={this.handleBack}>Back to Elections</button>
                <div className='budgetForm'>

                    <h3><u>Create Your Budget Preferences</u></h3>


                    <div class="center_just">

                        <label>Law Enforcement</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'lawEnforcement')} />
                        <br />


                        <label>Parks/Rec</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'parksRec')} />
                        <br />

                        <label>Public Works</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'publicWorks')} />
                        <br />

                        <label>First Responders</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'firstResponders')} />
                        <br />

                        <label>Community Development</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'communityDev')} />
                        <br />

                        <label>Administration</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'administration')} />
                        <br />


                        <label>Education</label>
                        <input placeholder="$default" onChange={(event) => this.handleBudgetChange(event, 'education')} />
                        <br />

                    </div>
                    <div class="left_just">
                        <h3><u>Current Budget</u></h3>
                        {this.props.reduxState.budget.pastBudget.map((item) => (<p><BudgetItem item={item} /></p>))}
                    </div>
                </div>

                <button class="center_just" onClick={this.findCandidate}>Find My Candidate</button>

                <div class="graph_just">
                    <XYPlot xType="ordinal" width={1000} height={500} xDistance={700}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <BarSeries data={userData} />
                        <BarSeries data={currentData} />
                        <LabelSeries data={labelData} />
                    </XYPlot>
                </div>



            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Budget);