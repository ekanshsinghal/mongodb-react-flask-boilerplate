import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, IconButton, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { logoutAndRedirect } from '../../actions/auth';

const mapDispatchToProps = dispatch => {
	return {
		logoutAndRedirect: () => dispatch(logoutAndRedirect())
	}
}

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
});

class NavBar extends React.Component {

	onLogout = () => {
		this.props.logoutAndRedirect();
	}
	
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Photos
						</Typography>
						<div>
							<Button
								color="inherit"
								startIcon={<AccountCircle/>}
								onClick={this.onLogout}
							>
								Logout
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

NavBar.propTypes = {
	classes: PropTypes.object
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(NavBar));