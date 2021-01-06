import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const sendEmailVerifyStart = () => ({
  type: UserActionTypes.SEND_EMAIL_VERIFY_START,
});

export const sendEmailVerifySuccess = () => ({
  type: UserActionTypes.SEND_EMAIL_VERIFY_SUCCESS
});

export const sendEmailVerifyFailure = error => ({
  type: UserActionTypes.SEND_EMAIL_VERIFY_FAILURE,
  payload: error
});


export const sendPasswordResetStart = userEmail => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_START,
  payload: userEmail
});

export const sendPasswordResetSuccess = () => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_SUCCESS,
});

export const sendPasswordResetFailure = error => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_FAILURE,
  payload: error
});
export const updateUserStart = (userCredentials) => ({
  type: UserActionTypes.UPDATE_USER_START,
  payload: userCredentials
});

export const updateUserSuccess = (userData) => ({
  type: UserActionTypes.UPDATE_USER_SUCCESS,
  payload: userData
});

export const updateUserFailure = error => ({
  type: UserActionTypes.UPDATE_USER_FAILURE,
  payload: error
});