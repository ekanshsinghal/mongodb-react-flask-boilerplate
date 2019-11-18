import axios from 'axios';

export const setAuthToken = token => {
	if (token) {
		// Apply authorization token to every request if logged in
		axios.defaults.headers.common["Content-type"] = 'application/json';
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		// Delete auth header
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const is_token_valid = token => {
	axios.post('/api/is_token_valid', {token: token})
	.then(res => {
		return res.data.token_is_valid;
	})
	.catch(err => console.log(err));
};