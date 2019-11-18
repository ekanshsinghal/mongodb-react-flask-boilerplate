import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { history, store } from './configration/configureStore';
import { setAuthToken } from './utilities/token';
import { validateSavedToken } from './actions/auth';
import NavBar from './components/NavBar/NavBar';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Home from './containers/Home/Home';

const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

class App extends React.Component {

	state = store.getState();

	componentDidMount() {
		store.subscribe(() => this.setState(store.getState()));

		if(localStorage.jwtToken) {
			let token = localStorage.jwtToken;
			store.dispatch(validateSavedToken(token));
			setAuthToken(token);
		} else {
			localStorage.removeItem("jwtToken");
		}
	}

	render() {
		const {classes} = this.props;

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					{ this.state.auth.isAuthenticated ?
						<div>
							<Route component={NavBar}/>
							<div className={classes.root}>
								<Switch>
									<Redirect exact from='/' to='/home'/>
									<Redirect from='/login' to='/home'/>
									<Route path='/home' component={Home}/>
								</Switch>
							</div>
						</div> : <Switch>
							<Route path='/login' component={Login}/>
							<Route path='/register' component={Register}/>
							<Redirect to='/login'/>
						</Switch>
					}
				</ConnectedRouter>
			</Provider>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object,
	loginUser: PropTypes.func,
	loginUserSuccess: PropTypes.func,
	validateSavedToken: PropTypes.func
}

export default withStyles(styles)(App);