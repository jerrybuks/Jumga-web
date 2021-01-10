import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import ProductStoreActionTypes from './productStore.types';

import {
	getEventsSuccess,
	getEventsStart,
	getEventsFailure,
	getNotificationsSuccess,
	getNotificationsFailure,
	clearNotificationsSuccess,
	clearNotificationsFailure,
	giftRegisterSuccess,
	giftRegisterFailure,
	payoutSuccess,
	payoutFailure,

	productStoreRegisterSuccess,
	productStoreRegisterFailure
} from './productStore.actions';

import { db, createEventChannel, uploadFileChannel } from '../../firebase/firebase.utils';
import { firestore } from 'firebase';
import { updateUserStart } from '../user/user.actions';

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

/** currently here */
export function* registerProductStore({ payload }) {
	console.log(payload,9999)
	try {
		const { storeData : {storeCoverImg, ...otherStoreDet},  userId } = payload;
		let imgUrlInStorage = "";
		if(storeCoverImg){
			 imgUrlInStorage = yield uploadImage(storeCoverImg);

		}
		const storeDet = {
			...otherStoreDet,
			storeOwner: userId,
			storeImgUrl: imgUrlInStorage,
			products: [],
			createdAt: firestore.FieldValue.serverTimestamp()
		};
		 yield db.collection('stores').add(storeDet);
		// const doc = yield docRef.get();
		const userData = {
			hasStore: true,
		}
		yield put(updateUserStart({ userId, userData }))
		yield put(productStoreRegisterSuccess());

	} catch (error) {
		yield put(productStoreRegisterFailure(error));
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

export function* onGetProductStoreStart() {
	yield takeLatest(ProductStoreActionTypes.GET_PRODUCTSTORE_START, getEvents);
}
export function* onGetNotificationsStart() {
	yield takeLatest(ProductStoreActionTypes.GET_NOTIFICATIONS_START, getNotifications);
}
export function* onClearNotificationsStart() {
	yield takeLatest(ProductStoreActionTypes.CLEAR_NOTIFICATIONS_START, clearNotifications);
}
export function* onProductStoreRegisterStart() {
	yield takeLatest(ProductStoreActionTypes.PRODUCTSTORE_REGISTER_START, registerProductStore);
}

// export function* onGiftRegisterStart() {
// 	yield takeLatest(ProductStoreActionTypes.GIFT_REGISTER_START, registerGift);
// }

export function* onPayoutStart() {
	yield takeLatest(ProductStoreActionTypes.PAYOUT_START, procceedWithPayout);
}

export function* productStoreSagas() {
	yield all([
		call(onProductStoreRegisterStart),
		call(onGetProductStoreStart),
		// call(onGiftRegisterStart),
		call(onPayoutStart),
		call(onGetNotificationsStart),
		call(onClearNotificationsStart)
	]);
}
