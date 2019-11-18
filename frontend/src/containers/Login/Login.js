import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, TextField, Button, withStyles, Typography, Link } from '@material-ui/core';

import { loginUser } from '../../actions/auth';
import { validateEmail } from '../../utilities/formValidation';

const mapDispatchToProps = dispatch => {
	return {
		loginUser: (email, password) => dispatch(loginUser(email, password)),
	}
}

const styles = theme => ({
	loginConatiner: {
		display: 'flex',
		alignItems: 'center',
		minHeight: window.innerHeight
	},
	textField: {
		display: 'flex',
		marginTop: theme.spacing(3)
	},
	formContainer: {
		[theme.breakpoints.up('sm')]: {
			border: '1px solid #dadce0',
			borderRadius: '6px'
		},
	},
	loginButton: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		width: '100%',
	},
	typography: {
		marginBottom: theme.spacing(2)
	},
	link: {
		cursor: 'pointer',
		fontWeight: 'bold'
	},
	errorContainer: {
		marginTop: theme.spacing(2)
	}
});

class Login extends React.Component {
	state = {
		email: '',
		password: ''
	};

	onChangeValue = e => {
		this.setState({ [e.target.id]: e.target.value, errors: null, invalidEmail: null})
	}

	onBlurEmail = () => {
		this.setState({invalidEmail: !validateEmail(this.state.email)})
	}

	onLogin = () => {
		if(!this.state.invalidEmail && this.state.email.length > 0 && this.state.password.length > 0 ) {
			this.props.loginUser(this.state.email, this.state.password);
		} else {
			this.setState({errors: 'Invalid Email or Password'})
		}
	};

	render () {
		const { classes } = this.props;
		return (
			<div className={classes.loginConatiner}>
				<Container maxWidth='xs' className={classes.formContainer}>
					<Typography color='error' variant='h6' className={classes.errorContainer}>{this.state.errors}</Typography>
					<TextField 
						value={this.state.email}
						onChange={this.onChangeValue}
						onBlur={this.onBlurEmail}
						error={this.state.invalidEmail ? true : false}
						id='email'
						label='E-mail'
						className={classes.textField}
						variant="outlined"
					/>
					<TextField
						value={this.state.password}
						onChange={this.onChangeValue}
						id='password'
						label='Password'
						type="password"
						className={classes.textField}
						variant="outlined"
					/>
					<Button
						onClick={this.onLogin}
						className={classes.loginButton}
						variant="contained"
						color="primary"
					>
						Login
					</Button>
					<Typography className={classes.typography}>
						Not Registered? &nbsp;
						<Link href='/register' color="primary" className={classes.link}>Create an Account</Link>
					</Typography>
				</Container>
			</div>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));