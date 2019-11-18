import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { history, store } from './configration/configureStore';
import { setAuthToken } from './utilities/token';
import { validateSavedToken } from './actions/auth';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

class App extends React.Component {

	state = store.getState();

	componentDidMount() {
		store.subscribe(() => this.setState(store.getState()));

		if(localStorage.jwtToken) {
			let token = localStorage.jwtToken;
			validateSavedToken(token);
			setAuthToken(token);
		} else {
			localStorage.removeItem("jwtToken");
		}
	}

	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/login' component={Login}/>
						<Route path='/register' component={Register}/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

App.propTypes = {
	loginUser: PropTypes.func,
	loginUserSuccess: PropTypes.func,
	validateSavedToken: PropTypes.func
}

export default App;