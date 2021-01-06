import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import EventActionTypes from './event.types';

import {
	getEventsSuccess,
	getEventsStart,
	getEventsFailure,
	getNotificationsSuccess,
	getNotificationsFailure,
	clearNotificationsSuccess,
	clearNotificationsFailure,
	eventRegisterSuccess,
	eventRegisterFailure,
	giftRegisterSuccess,
	giftRegisterFailure,
	payoutSuccess,
	payoutFailure
} from './event.actions';

import { db, createEventChannel, uploadFileChannel } from '../../firebase/firebase.utils';
import { firestore } from 'firebase';

export function* getEvents({ payload: userId }) {
	try {
		const eventsRef = yield db.collection('events').where('eventOwner', '==', userId).orderBy('createdAt');
		const channel = yield call(createEventChannel, eventsRef);

		while (true) { 
			
			const events = yield take(channel);
		
			yield put(getEventsSuccess(events));
		}
	} catch (error) {
		yield put(getEventsFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* getNotifications({ payload: userId }) {
	try {
		// const {payload} = yield take('REQUEST')

		const notificationRef = db.collection('notifications').where('userId', '==', userId);
		const channel = yield call(createEventChannel, notificationRef);
		while (true) {
			const notifications = yield take(channel);
			yield put(getNotificationsSuccess(notifications));
		}
	} catch (error) {
		yield put(getNotificationsFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* clearNotifications({ payload:  { id, readnotifications, unreadNotifications } } ) {
	try {
		const docRef = yield db.collection('notifications').doc(id);
		const newReadNotifications = [...readnotifications, ...unreadNotifications];
	
		yield docRef.update({
			readnotifications: newReadNotifications,
			unreadNotifications: []
		});
		yield put(clearNotificationsSuccess())
	} catch (error) {
		yield put(clearNotificationsFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* registerEvent({ payload }) {
	try {
		const { eventName, eventCoverImg, eventDesc, currency, userId } = payload;
		let imgUrlInStorage = "";
		if(eventCoverImg){
			 imgUrlInStorage = yield uploadImage(eventCoverImg);

		}
		const event = {
			eventName,
			eventOwner: userId,
			imgUrl: imgUrlInStorage,
			eventDesc,
			gifts: [],
			status: 'open',
			withdrawn: false,
			currency,
			createdAt: firestore.FieldValue.serverTimestamp()
		};
		 yield db.collection('events').add(event);
		// const doc = yield docRef.get();
		yield put(eventRegisterSuccess());
		yield getEvents({payload: userId})
	} catch (error) {
		yield put(eventRegisterFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* uploadImage(file){
	const channel = yield call(uploadFileChannel, file);
    while (true) {
        const { error, url } = yield take(channel);
        if (error) {
            console.log('channel err' + error);
            channel.close();
            return;
        }
        if (url) {
            console.log('[completed. Dowload URL]' + url);
            // yield put(actionType.fetchUploadedVideos());               
            return url;
        }
        // yield put(actionType.updateProgress(progress));
    }
}

export function* registerGift({ payload: { eventId: id, gift } }) {
	try {
		const docRef = yield db.collection('events').doc(id);
		yield docRef.update({
			gifts: firestore.FieldValue.arrayUnion(gift)
		});
		const doc = yield docRef.get();
		yield put(giftRegisterSuccess({ ...doc.data(), id: doc.id }));
	} catch (error) {
		yield put(giftRegisterFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* procceedWithPayout({ payload: { transferObj, userId } }) {
	try {
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ transferObj })
		};
		const response = yield fetch(`https://us-central1-owambae-850eb.cloudfunctions.net/handlePayOut`, options);
		const result = yield response.json();
		console.log(result);
		if (result.status === 'error') {
			throw result;
		}
		yield put(payoutSuccess());
		yield notify('Transaction Successfull');
		yield put(getEventsStart(userId));
	} catch (error) {
		yield put(payoutFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* onGetEventStart() {
	yield takeLatest(EventActionTypes.GET_EVENTS_START, getEvents);
}
export function* onGetNotificationsStart() {
	yield takeLatest(EventActionTypes.GET_NOTIFICATIONS_START, getNotifications);
}
export function* onClearNotificationsStart() {
	yield takeLatest(EventActionTypes.CLEAR_NOTIFICATIONS_START, clearNotifications);
}
export function* onEventRegisterStart() {
	yield takeLatest(EventActionTypes.EVENT_REGISTER_START, registerEvent);
}

export function* onGiftRegisterStart() {
	yield takeLatest(EventActionTypes.GIFT_REGISTER_START, registerGift);
}

export function* onPayoutStart() {
	yield takeLatest(EventActionTypes.PAYOUT_START, procceedWithPayout);
}

export function* eventSagas() {
	yield all([
		call(onEventRegisterStart),
		call(onGetEventStart),
		call(onGiftRegisterStart),
		call(onPayoutStart),
		call(onGetNotificationsStart),
		call(onClearNotificationsStart)
	]);
}
