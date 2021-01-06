import React, { useEffect, Fragment } from 'react';
import Navigation from '../../../components/navigation';
import { selectEvents, selectIsFetchingEvents, selectIsRegistering } from '../../../redux/event/event.selector';
import { getEventsStart, eventRegisterStart } from '../../../redux/event/event.actions';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import GiftList from './giftList';
import { connect } from 'react-redux';

function Gift(props) {
	const { getEventsStart, user: { id: userId, currency }, isLoading, events } = props;
	useEffect(() => {
		let isCancelled = false;
		if (events.length === 0 && !isCancelled) {
			getEventsStart(userId);
		}
		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<Navigation path="events">
				{isLoading ? (
					'loading'
				) : (
					<Fragment>
						<GiftList events={events} currency={currency}/>
					</Fragment>
				)}
			</Navigation>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	getEventsStart: (userId) => dispatch(getEventsStart(userId)),
	eventRegisterStart: (eventName, userId) => dispatch(eventRegisterStart({ eventName, userId }))
});

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	events: selectEvents,
	isLoading: selectIsFetchingEvents,
	isSaving: selectIsRegistering
});

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
