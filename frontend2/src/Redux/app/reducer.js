import { OPEN_SNACKBAR, CLOSE_SNACKBAR, CHANGE_SPINNER } from './actionTypes';

const initState = {
    open: false,
    message: false,
    severity: 'success',
    isLoading: false
};

const appReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case OPEN_SNACKBAR:
            return {
                ...state,
                open: true,
                message: payload.message,
                severity: payload.severity
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                open: false,
                message: false
            };

        case CHANGE_SPINNER:
            const isLoading = payload;
            return {
                ...state,
                isLoading: isLoading
            };

        default:
            return state;
    }
};

export default appReducer;
