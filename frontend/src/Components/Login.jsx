import React from 'react'
import { loginRequest } from '../Redux/actions'
import { connect } from 'react-redux'
import Style from "./index.module.css";
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = () => {
        const { loginRequest } = this.props
        const { email, password } = this.state
        let payload = {
            password :password,
            username:email,
        }
        loginRequest(payload)
    }
    render() {
        const { email, password } = this.state
        if (this.props.isAuth) {
            return <Redirect to="/dashboard"/>
        }
        return (
            <div className={Style.login_div}>
                <h1>Login</h1>
                <div><input style={{width:"500px",height:"30px",background:"#1FF897"}} name="email" value={email} placeholder="enter email" onChange={this.handleChange} /></div>
                <div><input style={{width:"500px",height:"30px",background:"#1FF897"}}  name="password" value={password} placeholder="enter password" onChange={this.handleChange} /></div>
                <div><button style={{width:"350px",height:"40px",background:"#2DD8D1"}} onClick={this.handleLogin}>Login</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       isAuth : state.isAuth
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginRequest : payload => dispatch(loginRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)