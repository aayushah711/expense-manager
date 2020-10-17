import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../Redux/auth/actions';
import { useSelector, useDispatch } from 'react-redux';

function Navbar(props) {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    return isAuth ? (
        <React.Fragment>
            <div id={Styles.nav}>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/ledger">Ledger</Link>
                    </li>
                    <li>
                        <Link to="" onClick={() => dispatch(logoutUser())}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <div id={Styles.nav}>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
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
