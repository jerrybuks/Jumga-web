import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import ProductStoreActionTypes from './productStore.types';

import {
	getNotificationsSuccess,
	getNotificationsFailure,
	clearNotificationsSuccess,
	clearNotificationsFailure,
	giftRegisterSuccess,
	giftRegisterFailure,
	payoutSuccess,
	payoutFailure,

	productStoreRegisterSuccess,
	productStoreRegisterFailure,
	productRegisterSuccess,
	productRegisterFailure,
	getProductStoreSuccess,
	getProductStoreFailure,
	registerSubStoreSuccess,
	registerSubStoreFailure
} from './productStore.actions';

import { db, createProductStoreChannel, uploadFileChannel } from '../../firebase/firebase.utils';
import { firestore } from 'firebase';
import { updateUserStart } from '../user/user.actions';

export function* getProductStore({ payload: userId }) {
	try {
		console.log("getting product store",userId)
		const productStoreRef = yield db.collection('stores').where('storeOwner', '==', userId).orderBy('createdAt');
		console.log(productStoreRef)
		const channel = yield call(createProductStoreChannel, productStoreRef);

		while (true) { 
			
			const productStore = yield take(channel);
		
			yield put(getProductStoreSuccess(productStore));
		}
	} catch (error) {
		yield put(getProductStoreFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* getNotifications({ payload: userId }) {
	try {
		// const {payload} = yield take('REQUEST')

		const notificationRef = db.collection('notifications').where('userId', '==', userId);
		const channel = yield call(createProductStoreChannel, notificationRef);
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
			currency: otherStoreDet.currency,
			country: otherStoreDet.country
		}
		yield put(updateUserStart({ userId, userData }))
		yield put(productStoreRegisterSuccess());

	} catch (error) {
		yield put(productStoreRegisterFailure(error));
		yield notify(error.message, 'error');
	}
}

export function* registerProduct({ payload }) {
	try {
		const { productName, productCoverImg, productDesc, currency, amount, storeId} = payload;
		console.log(storeId,777777)
		let imgUrlInStorage = "";
		if(productCoverImg){
			 imgUrlInStorage = yield uploadImage(productCoverImg);

		}
		const product = {
			productName: productName.trim(),
			productImgUrl: imgUrlInStorage,
			productDesc,
			amount,
			currency
		};
		//  yield db.collection('events').add(event);
		// const doc = yield docRef.get();
		const docRef = yield db.collection('stores').doc(storeId);
		yield docRef.update({
			products: firestore.FieldValue.arrayUnion(product)
		});
		const doc = yield docRef.get();
		yield put(productRegisterSuccess({ ...doc.data(), id: doc.id }));
		// yield getEvents({payload: userId})
	} catch (error) {
		yield put(productRegisterFailure(error));
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

export function* registerSubAccount({payload}){
	try {
		console.log(payload)
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({subAcc : payload})
		};
		const response = yield fetch(`${process.env.REACT_APP_BASE_URL}/createSubAccount`, options);
		const result = yield response.json();
		console.log(result);
		if (result.status === 'error') {
			throw result;
		}
		yield put(registerSubStoreSuccess());
		yield notify('registration succcessful and subaccount created');
	} catch (error) {
		console.log(error)
		yield put(registerSubStoreFailure(error));
		yield notify(error.message, 'error');
	}
}

// export function* registerGift({ payload: { eventId: id, gift } }) {
// 	try {
// 		const docRef = yield db.collection('events').doc(id);
// 		yield docRef.update({
// 			gifts: firestore.FieldValue.arrayUnion(gift)
// 		});
// 		const doc = yield docRef.get();
// 		yield put(giftRegisterSuccess({ ...doc.data(), id: doc.id }));
// 	} catch (error) {
// 		yield put(giftRegisterFailure(error));
// 		yield notify(error.message, 'error');
// 	}
// }

// export function* procceedWithPayout({ payload: { transferObj, userId } }) {
// 	try {
// 		const options = {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ transferObj })
// 		};
// 		const response = yield fetch(`https://us-central1-owambae-850eb.cloudfunctions.net/handlePayOut`, options);
// 		const result = yield response.json();
// 		console.log(result);
// 		if (result.status === 'error') {
// 			throw result;
// 		}
// 		yield put(payoutSuccess());
// 		yield notify('Transaction Successfull');
// 		yield put(getEventsStart(userId));
// 	} catch (error) {
// 		yield put(payoutFailure(error));
// 		yield notify(error.message, 'error');
// 	}
// }

export function* onGetProductStoreStart() {
	yield takeLatest(ProductStoreActionTypes.GET_PRODUCTSTORE_START, getProductStore);
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

export function* onProductRegisterStart() {
	yield takeLatest(ProductStoreActionTypes.PRODUCT_REGISTER_START, registerProduct);
}

export function* onRegisterSubAccountStart() {
	yield takeLatest(ProductStoreActionTypes.REGISTER_SUBACC_START, registerSubAccount);
}


// export function* onGiftRegisterStart() {
// 	yield takeLatest(ProductStoreActionTypes.GIFT_REGISTER_START, registerGift);
// }

// export function* onPayoutStart() {
// 	yield takeLatest(ProductStoreActionTypes.PAYOUT_START, procceedWithPayout);
// }

export function* productStoreSagas() {
	yield all([
		call(onProductStoreRegisterStart),
		call(onGetProductStoreStart),
		call(onProductRegisterStart),
		// call(onGiftRegisterStart),
		// call(onPayoutStart),
		call(onRegisterSubAccountStart),
		call(onGetNotificationsStart),
		call(onClearNotificationsStart)
	]);
}
