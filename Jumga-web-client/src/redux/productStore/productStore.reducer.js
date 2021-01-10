import ProductActionTypes from './productStore.types';

const INITIAL_STATE = {
	storeDetails : {},
	isRegistering: null,

	events: [],
	isFetchingEvents: true,
	isPayingout: null,
	error: null, 
	notifications: { unreadNotifications : [], readnotifications : [] },
	shouldLoadNotifications: true
};

const eventReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case ProductActionTypes.GET_PRODUCTSTORE_START:
			return {
				...state,
				isFetchingEvents: true
			};
		case ProductActionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
                isFetchingEvents: false,
                events: action.payload
			};
		case ProductActionTypes.GET_EVENTS_FAILURE:
			return {
				...state,
                isFetchingEvents: false,
                error: action.payload
			};
		/**currenty here */	
		case ProductActionTypes.PRODUCTSTORE_REGISTER_START:
			return {
				...state,
				isRegistering: true
			};


		case ProductActionTypes.PRODUCTSTORE_REGISTER_SUCCESS:
			return {
				...state,
                isRegistering: false,
                // store: action.payload
			};
		case ProductActionTypes.PRODUCTSTORE_REGISTER_FAILURE:
			return {
				...state,
                isRegistering: false,
                error: action.payload
			};
		/**currenty here */	

		case ProductActionTypes.GIFT_REGISTER_SUCCESS:
			return {
				...state,
				isRegistering: false,
				events: [...state.events.filter(({id}) => id !== action.payload.id), action.payload]
			}
		case ProductActionTypes.PAYOUT_START:
			return {
				...state,
				isPayingout: true
			}
		case ProductActionTypes.PAYOUT_SUCCESS:
		case ProductActionTypes.PAYOUT_FAILURE:
			return {
				...state,
				isPayingout: false
			}
		case ProductActionTypes.GET_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				notifications: { id: action.payload[0].id, unreadNotifications : action.payload[0].unreadNotifications, readnotifications : action.payload[0].readnotifications},
				shouldLoadNotifications: false
			}
		case ProductActionTypes.GET_NOTIFICATIONS_FAILURE:
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
