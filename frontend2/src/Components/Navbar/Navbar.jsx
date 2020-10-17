import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../Redux/auth/actions';

function Navbar(props) {
    return props.isAuth ? (
        <React.Fragment>
            <div id={Styles.nav}>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/ledger">Ledger</Link>
                    </li>
                    <li>
                        <button onClick={() => props.logoutUser()}>Log Out</button>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <div id={Styles.nav}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/ledger">Ledger</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth
    };
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
