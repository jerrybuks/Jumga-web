import EventActionTypes from './event.types';

const INITIAL_STATE = {
	events: [],
	isFetchingEvents: true,
	isRegistering: null,
	isPayingout: null,
	error: null, 
	notifications: { unreadNotifications : [], readnotifications : [] },
	shouldLoadNotifications: true
};

const eventReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case EventActionTypes.GET_EVENTS_START:
			return {
				...state,
				isFetchingEvents: true
			};
		case EventActionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
                isFetchingEvents: false,
                events: action.payload
			};
		case EventActionTypes.GET_EVENTS_FAILURE:
			return {
				...state,
                isFetchingEvents: false,
                error: action.payload
			};
		case EventActionTypes.EVENT_REGISTER_START:
		case EventActionTypes.GIFT_REGISTER_START:
			return {
				...state,
				isRegistering: true
			};
		case EventActionTypes.EVENT_REGISTER_SUCCESS:
			return {
				...state,
                isRegistering: false,
                // events: [...state.events, action.payload]
			};
		case EventActionTypes.EVENT_REGISTER_FAILURE:
		case EventActionTypes.GIFT_REGISTER_FAILURE:
			return {
				...state,
                isRegistering: false,
                error: action.payload
			};
		case EventActionTypes.GIFT_REGISTER_SUCCESS:
			return {
				...state,
				isRegistering: false,
				events: [...state.events.filter(({id}) => id !== action.payload.id), action.payload]
			}
		case EventActionTypes.PAYOUT_START:
			return {
				...state,
				isPayingout: true
			}
		case EventActionTypes.PAYOUT_SUCCESS:
		case EventActionTypes.PAYOUT_FAILURE:
			return {
				...state,
				isPayingout: false
			}
		case EventActionTypes.GET_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				notifications: { id: action.payload[0].id, unreadNotifications : action.payload[0].unreadNotifications, readnotifications : action.payload[0].readnotifications},
				shouldLoadNotifications: false
			}
		case EventActionTypes.GET_NOTIFICATIONS_FAILURE:
			return {
				...state,
				error: action.payload,
				shouldLoadNotifications: false
			}
		default:
			return state;
	}
};

export default eventReducer;
