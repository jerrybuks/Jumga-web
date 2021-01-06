import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/EventOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import { Box, AppBar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { selectNotifications, selectLoadNotifications } from '../../redux/event/event.selector';
import { getNotificationsStart } from '../../redux/event/event.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

export const useStyles = makeStyles((theme) => ({
	root: {
		width: 'inherit',
		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px'
	},
	iconStyle: {
		color: `rgba(0, 0, 0, 0.50)`
	},
	notification: {
		backgroundColor: 'red',
		borderRadius: '50%',
		width: 20,
		height: 20,
		top: 8,
		position: 'absolute',
		color:"#fff"
	}
}));

function Navigation(props) {
	const classes = useStyles();
	const { getNotificationsStart, notifications, loadNotifications, user: { id } } = props;
	useEffect(() => {
		console.log('notification dey run oooh');
		if (loadNotifications) {
			getNotificationsStart(id);
		}
		// return () => {
		// 	cleanup
		// }
		// eslint-disable-next-line 
	}, []);
	console.log(notifications, 'here is the notifications oooooh 000000000');
	const handleChange = (event, newValue) => {
		
		props.history.push(`/${newValue}`);
	};
	let unreadNotifications;
	if(notifications){
		 unreadNotifications = notifications.unreadNotifications;
	}
	

	const NotificationCount =  React.forwardRef((props,ref) => {
		return (
			<Box {...props} position="relative" ref={ref}>
				{props.children}
				{unreadNotifications &&
					(unreadNotifications.length > 0 && (
						<Box className={classes.notification}> {unreadNotifications.length} </Box>
					))}
			</Box>
		);
	});
	return (
		<Fragment>
			<AppBar position="sticky">
				<BottomNavigation value={props.path} onChange={handleChange} className={classes.root}>
					<BottomNavigationAction
						label="Profile"
						value="profile"
						className={classes.iconStyle}
						icon={<PersonOutlineOutlinedIcon />}
					/>
					<BottomNavigationAction
						label="Notification"
						value="notifications"
						className={classes.iconStyle}
						icon={<NotificationsIcon />}
						component={NotificationCount}
					/>
					<BottomNavigationAction
						label="Events"
						value="events"
						className={classes.iconStyle}
						icon={<EventIcon />}
					/>
					<BottomNavigationAction
						label="Help"
						value="help"
						className={classes.iconStyle}
						icon={<ContactSupportOutlinedIcon />}
					/>
				</BottomNavigation>
			</AppBar>

			<Box m="5px" textAlign="left">
				{props.children}
			</Box>
		</Fragment>
	);
}

const mapDispatchToProps = (dispatch) => ({
	getNotificationsStart: (userId) => dispatch(getNotificationsStart(userId)),
});

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	loadNotifications: selectLoadNotifications,
	notifications: selectNotifications
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Navigation);
