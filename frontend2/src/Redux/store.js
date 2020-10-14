import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
});

const thunk = (store) => (next) => (action) => {
    typeof action === 'function' ? action(store.dispatch) : next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
