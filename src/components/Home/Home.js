// User Home page with election list, Not protected
// The home page will offer a list of all elections that any admin has added. Users can choose and click an election then be brought to the Budget Page (2) for that election. 
// If the user doesn’t know which elections they can participate in, they can click the “Which elections can I vote in?” link, and be brought to https://myballotmn.sos.state.mn.us/ to learn about their local elections.
import { connect } from 'react-redux';
import React, {Component} from 'react';
import ElectionList from '../ElectionList/ElectionList';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class Home extends Component {
    state = {
        elections:[
            {
                id: 1,
                title: 'Maple Plain Governor',
                date: '09/22/20'
            },
            {
                id: 2,
                title: 'Eden Prairie City Council',
                date: '09/23/20'
            }
        ]
    }
    componentDidMount = () =>{
        this.getElections();
    }
    getElections = () =>{
        console.log('Getting elections')
    }
    render() {
        return(
            <div>
                <a href="https://myballotmn.sos.state.mn.us/">Which elections can I vote in?</a>
                <h3>Upcoming Elections</h3>
                <ElectionList electionList={this.state.elections}/>
            </div>
        )
    }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
    reduxState: state
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);

