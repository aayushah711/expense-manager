import reducer from './Reducer'
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);