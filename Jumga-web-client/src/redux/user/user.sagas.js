import { takeLatest, put, all, call } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import UserActionTypes from './user.types';
import { db } from '../../firebase/firebase.utils';

import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
	signUpSuccess,
	signUpFailure,
	sendEmailVerifySuccess,
	sendEmailVerifyFailure,
	sendPasswordResetSuccess,
	sendPasswordResetFailure,
	updateUserFailure
} from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const isAdmin = yield userAuth.getIdTokenResult().then(({ claims }) => claims.admin || false);
		const userSnapshot = yield userRef.get();
		yield put(
			signInSuccess({ id: userSnapshot.id, ...userSnapshot.data(), isVerified: userAuth.emailVerified, isAdmin })
		);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) {
			yield put(signInFailure('user not authenticated'));
			return;
		}
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* signUp({ payload: { email, password, name: displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
		yield sendVerificationEmail();
	} catch (error) {
		yield put(signUpFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* sendVerificationEmail() {
	try {
		yield auth.currentUser.sendEmailVerification();
		yield put(sendEmailVerifySuccess());
		yield notify('A verification link has been sent to your email', 'default');
	} catch (error) {
		yield put(sendEmailVerifyFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* sendPasswordResetEmail({ payload: emailAddress }) {
	try {
		yield auth.sendPasswordResetEmail(emailAddress);
		yield put(sendPasswordResetSuccess());
		yield notify('A password reset link has been sent to your email', 'default');
	} catch (error) {
		yield put(sendPasswordResetFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* updateUserDetail({ payload: { userId, userData } }) {
	try {
		const docRef = yield db.collection('users').doc(userId);
		yield docRef.update(userData);
		// const doc = yield docRef.get();
		yield isUserAuthenticated();
	} catch (error) {
		yield put(updateUserFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSendVerifyEmailStart() {
	yield takeLatest(UserActionTypes.SEND_EMAIL_VERIFY_START, sendVerificationEmail);
}

export function* onSendPasswordResetStart() {
	yield takeLatest(UserActionTypes.SEND_PASSWORD_RESET_START, sendPasswordResetEmail);
}

export function* onUpdateUserStart() {
	yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUserDetail);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSendVerifyEmailStart),
		call(onSendPasswordResetStart),
		call(onUpdateUserStart)
	]);
}
