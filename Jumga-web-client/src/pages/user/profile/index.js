import React from 'react';
import { connect } from 'react-redux';
// import { formatLocaleCurrency } from 'country-currency-map';
import Navigation from '../../../components/navigation';
import MenuBar from './MenuBar';
// import Wallet from './Wallet';
// import { selectEvents, selectNotifications, selectIsFetchingEvents } from '../../../redux/productStore/productStore.selector';
// import { getEventsStart, eventRegisterStart } from '../../../redux/productStore/productStore.actions';
// import { selectCurrentUser } from '../../../redux/user/user.selectors';
// import { createStructuredSelector } from 'reselect';
// import Spinner from '../../../components/spinner/Spinner';
// import { Box, Card } from '@material-ui/core';
// import { useStyles } from './styles';
// import { Link } from 'react-router-dom';


const Profile = (props) => {
	// const { getEventsStart, user: { id: userId, country, displayName }, events, isLoading, notifications } = props
    // const classes = useStyles();
	// useEffect(
	// 	() => {
	// 		if (userId && events.length === 0) getEventsStart(userId);
	// 	},
	// 	//eslint-disable-next-line
	// 	[ events ]
	// );

	// const { unreadNotifications } = notifications;
	return (
		<div>
			<Navigation path="profile">
				<MenuBar />
				{/* <Box px="1rem" component="h2">
					Hello,
				</Box>
				{isLoading ? <Spinner /> : <Wallet {...{ events, country, displayName, userId }} />}
                <Box px="1rem" component="h3">
						Recent Gifters
					</Box>
				<Card className={classes.profileCard}>
					{unreadNotifications.length > 0 ?
					
					<Fragment>
						{unreadNotifications
							.slice(0, 3)
							.map(({ name, giftName, amount_settled, currency, eventName, tx_id }) => (
								<Box key={tx_id}>
									<Box py="5px">
										<Box component="span" fontWeight="bold">
											{name}
										</Box>
										<Box component="span"> sent you</Box>
										<Box component="span" fontStyle="italic">
											{' '}
											"{giftName}"
										</Box>
										<Box component="span"> sent you</Box>
										<Box component="span" color="red"> {formatLocaleCurrency(amount_settled,currency)}</Box>
										<Box component="span"> {`for your ${eventName}`}</Box>
									</Box>
								</Box>
							))
							// <Link to="/notifications" ><Box color="red">view all</Box></Link>
							}
							<Link to="/notifications" ><Box color="red">view all</Box></Link>
					</Fragment>
						
							: <Box>
								No  Recent Gifters
							</Box> }
							
				</Card> */}
				Profile
			</Navigation>
		</div>
	);
};

// const mapDispatchToProps = (dispatch) => ({
// 	getEventsStart: (userId) => dispatch(getEventsStart(userId)),
// 	eventRegisterStart: (eventName, userId) => dispatch(eventRegisterStart({ eventName, userId }))
// });

// const mapStateToProps = createStructuredSelector({
// 	user: selectCurrentUser,
// 	events: selectEvents,
// 	notifications: selectNotifications,
// 	isLoading: selectIsFetchingEvents
// 	// isAuthenticating: selectIsAuthenticating
// });

export default connect(null, null)(Profile);
