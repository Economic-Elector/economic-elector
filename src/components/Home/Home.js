// User Home page with election list, Not protected
// The home page will offer a list of all elections that any admin has added. Users can choose and click an election then be brought to the Budget Page (2) for that election. 
// If the user doesn’t know which elections they can participate in, they can click the “Which elections can I vote in?” link, and be brought to https://myballotmn.sos.state.mn.us/ to learn about their local elections.
import { connect } from 'react-redux';
import React, {Component} from 'react';
import ElectionList from '../ElectionList/ElectionList';
import axios from 'axios';
import './Home.css'


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class Home extends Component {
    state = {
        elections:[]
    }

    componentDidMount = () =>{
        this.getElections();
    }

    //get all elections and then put them in the state
    //once in the state, the elections will be mapped onto the DOM
    getElections = () =>{
        axios({
            method: 'GET',
            url: '/api/elections/all'
        }).then((response) => {
            console.log('all elections', response.data)
            this.setState({
                elections: response.data
            })
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    goAdminPage = () => {
        this.props.history.push('/adminHome')
    }

    render() {
        return(
            <div>
                <div>
                <a href="https://myballotmn.sos.state.mn.us/">Which elections can I vote in?</a>
                <h3>Upcoming Elections</h3>
                <ElectionList electionList={this.state.elections}/>
                
                 </div>
           
                <button className="float_right" onClick={this.goAdminPage}>ADMIN</button>

            </div>
        )
    }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (reduxState) => ({
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);

