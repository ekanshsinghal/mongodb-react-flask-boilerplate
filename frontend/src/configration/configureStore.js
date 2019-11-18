import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

export const history = createBrowserHistory()

const initialState = {};
const middleware = [thunk, routerMiddleware(history), createLogger({collapsed: true})];

export const store = createStore(
	rootReducer(history),
	initialState,
	compose(
		applyMiddleware(...middleware), 
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose
	)
);