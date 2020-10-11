import {REGISTER_USERS_REQUEST, REGISTER_USERS_SUCCESS, REGISTER_USERS_FAILURE,LOGIN_USERS_REQUEST, LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE,LOGOUT_USER} from './actionTypes'
import { v4 as uuid } from "uuid"
import axios from "axios"
export const registerUserRequest = () => ({
    type: REGISTER_USERS_REQUEST,
})

export const registerUserSuccess = (payload) => ({
    type: REGISTER_USERS_SUCCESS,
    payload
})

export const registerUserFailure = (payload) => ({
    type: REGISTER_USERS_FAILURE,
    payload
})

export const registerRequest = payload => dispatch => {
    dispatch(registerUserRequest())
    console.log(payload)
    return axios.post("https://mod-living-db.herokuapp.com/user", {
        id: uuid(), ...payload
    })
        .then(res => dispatch(registerUserSuccess(res.data)))
        .catch(err => dispatch(registerUserFailure(err)))
}



export const loginUserRequest = () => ({
    type: LOGIN_USERS_REQUEST,
})

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USERS_SUCCESS,
    payload
})

export const loginUserFailure = (payload) => ({
    type: LOGIN_USERS_FAILURE,
    payload
})

export const loginRequest = payload => dispatch => {
    dispatch(loginUserRequest())
    return axios.post(`https://mod-living-db.herokuapp.com/user?email=${payload.username}`)
        .then(res => {
            if (res.data.password === payload.password) {
                dispatch(loginUserSuccess(res.data))
            }
            else {
                dispatch(loginUserFailure())
            }
        }).catch(err => dispatch(loginUserFailure(err)))
}


export const logoutUser = () => ({
    type: LOGOUT_USER
})