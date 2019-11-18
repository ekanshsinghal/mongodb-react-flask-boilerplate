import { history } from '../configration/configureStore';

import {
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGOUT_USER,
	REGISTER_USER_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
} from '../configration/constants';

import { get_token, create_user, validate_token } from '../utilities/http_functions';

export const validateSavedToken = token => dispatch => {
	dispatch(loginUserRequest);
	return validate_token(token).then(response => {
		if (response.data.token_is_valid) {
			dispatch(loginUserSuccess(token));
			localStorage.setItem("jwtToken", token);
		} else {
			dispatch(loginUserFailure({
				response: {
					data: {
						status: 403,
						statusText: 'Invalid token'
					}
				}
			}));
		}
	}).catch(error => {
		dispatch(loginUserFailure(error));
	});
}

export const loginUserSuccess = token => {
	localStorage.setItem('jwtToken', token);
	return {
		type: LOGIN_USER_SUCCESS,
		payload: { token }
	};
}


export const loginUserFailure = error => {
	localStorage.removeItem('token');
	return {
		type: LOGIN_USER_FAILURE,
		payload: {
			status: error.status,
			statusText: error.statusText,
		},
	};
}

export const loginUserRequest = () => {
	return {
		type: LOGIN_USER_REQUEST,
	};
}

export const logout = () => {
	localStorage.removeItem('jwtToken');
	return {
		type: LOGOUT_USER,
	};
}

export const logoutAndRedirect = () => {
	return (dispatch) => {
		dispatch(logout());
		history.push('/');
	};
}

export const redirectToRoute = route => {
	return () => {
		history.push(route);
	};
}

export const loginUser = (email, password) => dispatch => {
	dispatch(loginUserRequest());
	return get_token(email, password)
		.then(response => {
			try {
				dispatch(loginUserSuccess(response.data.token));
				history.push('/home');
				localStorage.setItem("jwtToken", response.data.token);
			} catch (e) {
				alert(e);
				dispatch(loginUserFailure({
					response: {
						data: {
							status: 403,
							statusText: 'Invalid token'
						}
					}
				}));
			}
		})
		.catch(error => {
			dispatch(loginUserFailure(error));
		});
}


export const registerUserRequest = () => {
	return {
		type: REGISTER_USER_REQUEST,
	};
}

export const registerUserSuccess = token => {
	localStorage.setItem('token', token);
	return {
		type: REGISTER_USER_SUCCESS,
		payload: {
			token,
		},
	};
}

export const registerUserFailure = error => {
	localStorage.removeItem('token');
	return {
		type: REGISTER_USER_FAILURE,
		payload: {
			status: error.status,
			statusText: error.statusText,
		},
	};
}

export const registerUser = (email, password) => dispatch => {
	dispatch(registerUserRequest());
	return create_user(email, password)
		.then(response => {
			try {
				dispatch(registerUserSuccess(response.data.token));
				history.push('/home');
			} catch (e) {
				dispatch(registerUserFailure({
					response: {
						data: {
							status: 403,
							statusText: 'Invalid token'
						}
					}
				}));
			}
		})
		.catch(error => {
			dispatch(registerUserFailure(error));
		});
}
