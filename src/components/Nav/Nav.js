import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';

import Home from '../Home/Home';
import Budget from '../Budget/Budget';
import Results from '../Results/Results';
import AdminLogin from '../AdminLogin/AdminLogin';
import LoginPage from '../LoginPage/LoginPage';
import LogOutButton from '../LogOutButton/LogOutButton';
import AdminHome from '../AdminHome/AdminHome';
import AdminElection from '../AdminNewElection/AdminNewElection';
import AddCandidate from '../AddCandidate/AddCandidate';
import NewElection from '../NewElection/NewElection';
import RegisterPage from '../RegisterPage/RegisterPage';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Prime Solo Project</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/info">
            Info Page
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
      <Link to="/AdminHome">
        <h2 className="nav-link">Admin Home</h2>
      </Link>
      <Link to="/AdminElection">
        <h2 className="nav-link">Admin Election</h2>
      </Link>
      <Link to="/AdminNewElection">
        <h2 className="nav-link">Admin New Election</h2>
      </Link>
      <Link to="/Budget">
        <h2 className="nav-link">Budget</h2>
      </Link>
      <Link to="/AddCandidate">
        <h2 className="nav-link">Add Candidate</h2>
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
