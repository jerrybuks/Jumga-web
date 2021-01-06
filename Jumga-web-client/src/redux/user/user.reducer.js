import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	error: null,
	isFetchingUser: true,
	isLoggingIn: null,
	isSendingEmail: null,
	// isUpdatingUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SIGN_IN_SUCCESS:
		case UserActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				isFetchingUser: false,
				isLoggingIn: false,
				error: null
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null
			};
		case UserActionTypes.EMAIL_SIGN_IN_START:
		case UserActionTypes.GOOGLE_SIGN_IN_START:
		case UserActionTypes.SIGN_UP_START:
		case UserActionTypes.UPDATE_USER_START:
			return {
				...state,
				isLoggingIn: true
			};
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
		case UserActionTypes.SIGN_UP_FAILURE:
		case UserActionTypes.UPDATE_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				isFetchingUser: false,
				isLoggingIn: false
			};
		case UserActionTypes.SEND_EMAIL_VERIFY_START:
		case UserActionTypes.SEND_PASSWORD_RESET_START:
			return {
				...state,
				isSendingEmail: true
			};
		case UserActionTypes.SEND_EMAIL_VERIFY_SUCCESS:
		case UserActionTypes.SEND_PASSWORD_RESET_SUCCESS:
			return {
				...state,
				isSendingEmail: false
			};
		case UserActionTypes.SEND_EMAIL_VERIFY_FAILURE:
		case UserActionTypes.SEND_PASSWORD_RESET_FAILURE:
			return {
				...state,
				isSendingEmail: false,
				error: action.payload
			};
		// case UserActionTypes.UPDATE_USER_START:
		// 	return {
		// 		...state,
		// 		isUpdatingUser: true
		// 	};
		// case UserActionTypes.UPDATE_USER_SUCCESS:
		// 	return {
		// 		...state,
		// 		isUpdatingUser: false,
		// 		currentUser: action.payload
		// 	};
		// case UserActionTypes.UPDATE_USER_FAILURE:
		// 	return {
		// 		...state,
		// 		isUpdatingUser: false,
		// 		error: action.payload
		// 	};
		default:
			return state;
	}
};

export default userReducer;
