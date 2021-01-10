const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Flutterwave = require('flutterwave-node-v3');

const PUBLIC_KEY = functions.config().service.fw_public_key;
const SECRET_KEY = functions.config().service.fw_secret_key;
const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);


const checkHash = (hash) => {
    const secret_hash = functions.config().service.my_hash;
    if(!hash || hash !== secret_hash) {
		// discard the request,only a post with the right Flutterwave signature header gets our attention 
		return 400;
    }
    return 200 ;
}

const verifyTransaction = async (tx_id) => {
	try {
		// custom 1589500
		//1589551
		const payload = { id: tx_id };
		const response = await flw.Transaction.verify(payload);
		// console.log(response);
		return response;
	} catch (error) {
		return error;
	}
};

const updateUserProperty = async (id,userData,db) => {
	try {
		const docRef = await db.collection('users').doc(id);
		await docRef.update(userData);
	} catch (error) {
		console.log(error)
	}
	return
}

const formatGifts = (giftObj) => {
	const formmatedObj = {};
	for (const key in giftObj) {
		if (key !== 'eventId' && key !== 'giftType' && key !=='giftName') {
			const giftDetails = giftObj[key].split(':');
			const giftName = giftDetails.slice(0, giftDetails.length - 1).toString();
			const giftAmount = giftDetails[giftDetails.length - 1];
			formmatedObj[giftName] = giftAmount;
		}
	}
	return formmatedObj;
};

const updateGiftDetails = async (verifactionRes,gifts,db) => {
    try {
        const { data: { meta, customer, id: transc_id } } = verifactionRes;
        const docRef = db.collection('events').doc(meta.eventId);
		

        await db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
			const dbGifts = doc.data().gifts;
			
			const notifications =  db.collection('notifications');
			const userId = doc.data().eventOwner;
			const notificationsQuery =  notifications.where('userId', '==', userId)
			let notificationsQuerySnapshot = await notificationsQuery.get();

			let newGiftDet = {};
            if (meta.giftType !== 'custom') {
                dbGifts.forEach((gift) => {
                    const { giftName } = gift;
                    //check if the gift exists in the gifts from the database,do the necessary logic and update it,
                    const isAlreadyRecorded = gift.giftFrom.find((elem) => elem.tx_id === transc_id);
                    if (gifts[giftName] && !isAlreadyRecorded) {
						const giftAmountSettled = parseFloat(gifts[giftName])
                        const sum = gift.totalAmountGifted + giftAmountSettled;
						gift.totalAmountGifted = sum;
						const rem = gift.amount - gift.totalAmountGifted;
						gift.amountRemaining = (rem >= 0) ? rem : 0
                        if (sum >= gift.amount) {
							gift.status = 'complete';
                        } else {
							gift.status = 'incomplete'
						}
						newGiftDet = {
                            name: customer.name,
                            phone_no: customer.phone_number,
                            email: customer.email,
                            amount_settled: giftAmountSettled,
                            tx_id: transc_id
                        }
                        gift.giftFrom.push(newGiftDet);
                    }
                });
                t.update(docRef, { gifts: dbGifts });
            } else {
				const newGift = extractNewGiftDetails(verifactionRes, gifts);
				 newGift.giftFrom.map((giftDetails) => newGiftDet = { ...giftDetails });
				 
                t.update(docRef, {
                    gifts: admin.firestore.FieldValue.arrayUnion(newGift)
                });
			}

			newGiftDet.eventName =  doc.data().eventName
			newGiftDet.eventId =  meta.eventId
			newGiftDet.currency =   doc.data().currency
			newGiftDet.giftName =   meta.giftName
		
			if(notificationsQuerySnapshot.empty){
				const newNotifyObj = { userId, readnotifications : [], unreadNotifications : [newGiftDet] }
				const newDocRef = db.collection('notifications').doc();
				t.set(newDocRef,newNotifyObj);
			} else {
				notificationsQuerySnapshot.forEach((doc) => {
					if (doc.exists) {
						t.update(doc.ref, { unreadNotifications: admin.firestore.FieldValue.arrayUnion(newGiftDet) });
					}
				});
				
			}
        }); 
        return 'gift has been recorded' 
    } catch (error) {
        return error;
    }

};

const extractNewGiftDetails = (verifactionRes, gifts) => {
	const { data: { customer, currency, amount_settled, id: transc_id } } = verifactionRes;
	let giftName;
	for (const key in gifts) {
		giftName = key;
	}
	const giftFrom = [];
	giftFrom.push({
		name: customer.name,
		phone_no: customer.phone_number,
		email: customer.email,
		amount_settled,
		tx_id: transc_id
	});
	return {
		amount: amount_settled,
		amountRemaining: 0,
		totalAmountGifted: amount_settled,
		status: 'complete',
		currency,
		giftName,
		giftFrom
	};
};

exports.updateUserProperty = updateUserProperty;
exports.checkHash = checkHash;
exports.verifyTransaction = verifyTransaction;
exports.formatGifts = formatGifts;
exports.updateGiftDetails = updateGiftDetails