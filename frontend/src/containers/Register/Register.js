import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, TextField, Button, withStyles, Typography, Link } from '@material-ui/core';

import { registerUser } from '../../actions/auth';
import { validateEmail } from '../../utilities/formValidation';

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (obj) => dispatch(registerUser(obj)),
	}
}

const styles = theme => ({
	registerConatiner: {
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
	registerButton: {
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

class Register extends React.Component {
	state = {
		email: '',
		password: '',
		password2: ''
	};

	onChangeValue = e => {
		this.setState({ [e.target.id]: e.target.value, errors: null, invalidEmail: null})
	}

	onBlurEmail = () => {
		this.setState({invalidEmail: !validateEmail(this.state.email)})
	}

	onRegister = () => {
		if(!this.state.invalidEmail && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.password2) {
			this.props.registerUser({email: this.state.email, password: this.state.password});
		} else {
			this.setState({errors: 'Invalid Email or Password'})
		}
	};

	render () {
		const {classes} = this.props;
		return (
			<div className={classes.registerConatiner}>
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
					<TextField
						value={this.state.password2}
						onChange={this.onChangeValue}
						id='password2'
						label='Confirm Password'
						type="password"
						className={classes.textField}
						variant="outlined"
					/>
					<Button
						onClick={this.onRegister}
						className={classes.registerButton}
						variant="contained"
						color="primary"
					>
						Register
					</Button>
					<Typography className={classes.typography}>
						Already have an account? &nbsp;
						<Link href='/login' color="primary" className={classes.link}>Login Here</Link>
					</Typography>
				</Container>
			</div>
		)
	}
}

Register.propTypes = {
	classes: PropTypes.object
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Register));