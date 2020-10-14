import { OPEN_SNACKBAR, CLOSE_SNACKBAR, CHANGE_SPINNER } from './actionTypes';

export const openSnackbar = (payload) => ({
    type: OPEN_SNACKBAR,
    payload
});

export const closeSnackbar = (payload) => ({
    type: CLOSE_SNACKBAR,
    payload
});

export const changeSpinner = (payload) => ({
    type: CHANGE_SPINNER,
    payload
});
