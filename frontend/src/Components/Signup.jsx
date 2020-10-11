import React from "react";
import { registerRequest } from "../Redux/actions";
import { connect } from "react-redux";
import Style from "./index.module.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        email: "",
        password: "",
        username: "",
        mobile: "",
        description: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRegister = () => {
    let payload = {
      ...this.state
    }
    this.props.registerRequest(payload);
  };
  render() {
    const { name,
    email,
    password,
    username,
    mobile,
    description, } = this.state;
    return (
      <div className={Style.reg_form_div}>
        <h1>Create Account</h1>
        <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="name"
            value={name}
            placeholder="Name"
            onChange={this.handleChange}
          />
          <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="username"
            value={username}
            placeholder="User Name"
            onChange={this.handleChange}
          />
          <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="mobile"
            value={mobile}
            placeholder="Mobile"
            onChange={this.handleChange}
          />
          <input
            style={{width:"500px",height:"30px",background:"#1FF897"}}
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
          />
          <button style={{width:"350px",height:"40px",background:"#2DD8D1"}} onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (payload) => dispatch(registerRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);