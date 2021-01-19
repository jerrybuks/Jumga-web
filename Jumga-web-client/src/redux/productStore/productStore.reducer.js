import ProductActionTypes from './productStore.types';

const INITIAL_STATE = {
	storeDetails : null,
	products: [],
	isRegistering: null,
	isFetchingProductStore: true,
	purchases: [],
	isGettingPurchases: null,
	isPayingout: null,
	error: null, 
	notifications: { unreadNotifications : [], readnotifications : [] },
	shouldLoadNotifications: true,
	isSubmitting: null,
};

const eventReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ProductActionTypes.GET_PRODUCTSTORE_SUCCESS:
			return {
				...state,
                isFetchingProductStore: false,
				storeDetails: action.payload[0],
				products: action.payload[0].products
			};
		case ProductActionTypes.GET_PRODUCTSTORE_FAILURE:
			return {
				...state,
                isFetchingProductStore: false,
                error: action.payload
			};
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
		case ProductActionTypes.PRODUCT_REGISTER_START:
		case ProductActionTypes.REGISTER_SUBACC_START:
			return {
				...state,
				isRegistering: true
			};


		case ProductActionTypes.PRODUCT_REGISTER_SUCCESS:
		case ProductActionTypes.REGISTER_SUBACC_SUCCESS:
			return {
				...state,
                isRegistering: false,
                // store: action.payload
			};
		case ProductActionTypes.PRODUCT_REGISTER_FAILURE:
		case ProductActionTypes.REGISTER_SUBACC_FAILURE:
			return {
				...state,
                isRegistering: false,
                error: action.payload
			};
		/**currenty here */	
		case ProductActionTypes.GET_PURCHASES_START:
			return {
				...state,
				isGettingPurchases: true
			}
		case ProductActionTypes.GET_PURCHASES_SUCCESS:
			console.log(action.payload,111111)
			return {
				...state,
				purchases: action.payload,
				isGettingPurchases: false
			}
		case ProductActionTypes.GET_PURCHASES_FAILURE:
			return {
				...state,
				error: action.payload,
				isGettingPurchases: false
			}

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
