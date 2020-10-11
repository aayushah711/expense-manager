import React from "react";
import { Link } from "react-router-dom";
import Styles from "./index.module.css";
import { connect } from "react-redux";
import { logoutUser } from "../Redux/actions";

function NavBar(props) {
  return props.isAuth ? (
    <>
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
    </>
  ) : (
    <>
      <div id={Styles.nav}>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);