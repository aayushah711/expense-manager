import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../Redux/axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { changeSpinner, openSnackbar } from '../Redux/app/actions';
import { useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
    layout: {
        backgroundColor: 'red',
        height: '91vh',
        background: 'linear-gradient(to bottom right,#83cff3,#ebf8e1)',
        padding: '70px'
    },
    authPage: {
        margin: 'auto',
        width: '360px',
        height: '410px',
        background: 'white',
        padding: '60px 40px 40px'
    },
    header: {
        textAlign: 'left',
        fontSize: '20px',
        fontWeight: '500',
        color: '#424553',
        marginBottom: '20px'
    },
    formFields: {
        marginBottom: '10px',
        width: '100%',
        '& > *': {
            fontSize: '12px'
        }
    },
    radio: {
        fontSize: '12px',
        '& > *': {
            fontSize: '12px'
        }
    },
    button: {
        marginTop: '20px'
    }
});

const Register = (props) => {
    window.document.title = 'Register';
    const classes = useStyles(props);

    // const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const [ error, setError ] = useState(true);

    const [ data, setData ] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(changeSpinner(true));
        const { email, password,name } = data;
        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/users/register',
                data: {
                    email,
                    password,
                    name
                }
            });
            console.log('res', res);
            dispatch(
                openSnackbar({
                    message: res.data.message,
                    severity: 'success'
                })
            );
            setError(false);
            dispatch(changeSpinner(false));
        } catch (err) {
            console.log('err', err);
            dispatch(
                openSnackbar({
                    message: err.response.data.message,
                    severity: 'error'
                })
            );
            setError(true);
            dispatch(changeSpinner(false));
        }
    };
    const { email, password,name } = data;

    if (!error) {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        );
    } else {
        return (
            <div>
                <Box className={classes.layout}>
                    <Box className={classes.authPage}>
                        <FormControl fullWidth={true}>
                            <Box className={classes.header}>Register as new user</Box>
                            <Box>
                                <TextField
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    className={classes.formFields}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: 12
                                        },
                                        width: '100%'
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: 12
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className={classes.formFields}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: 12
                                        }
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: 12
                                        }
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    className={classes.formFields}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: 12
                                        },
                                        width: '100%'
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: 12
                                        }
                                    }}
                                />
                            </Box>
                           
                            <Button
                                className={classes.button}
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </div>
        );
    }
};

export default Register;
