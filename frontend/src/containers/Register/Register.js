import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, TextField, Button, withStyles, Typography, Link } from '@material-ui/core';

import { registerUser } from '../../actions/auth';

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (obj) => dispatch(registerUser(obj)),
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
	}
});

class Register extends React.Component {
	state = {
		email: '',
		password: ''
	};

	onChangeValue = e => {
		this.setState({ [e.target.id]: e.target.value})
	}

	onLogin = () => {
		this.props.loginUser({email: this.state.email, password: this.state.password});
	};

	render () {
		const {classes} = this.props;
		return (
			<div className={classes.loginConatiner}>
				<Container maxWidth='xs' className={classes.formContainer}>
					<TextField 
						value={this.state.email}
						onChange={this.onChangeValue}
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
						value={this.state.password}
						onChange={this.onChangeValue}
						id='password'
						label='Confirm Password'
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