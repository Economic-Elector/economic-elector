
import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import DeleteButton from '../DeleteButton/DeleteButton';

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
    render (){
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

