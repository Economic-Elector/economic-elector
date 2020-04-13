import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const Home = (props) => (
    <div>
        <h3>Upcoming Elections</h3>
        
        
    </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({

});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);