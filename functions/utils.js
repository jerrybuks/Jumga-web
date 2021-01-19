const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Flutterwave = require("flutterwave-node-v3");

const PUBLIC_KEY = functions.config().service.fw_public_key;
const SECRET_KEY = functions.config().service.fw_secret_key;
const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);

// const PUBLIC_KEY = "FLWPUBK_TEST-518c8ab64b05b47762240a5f353bee1e-X";
// const SECRET_KEY = "FLWSECK_TEST-cf84f6c1d6e9121822fe8580751c3758-X";
// const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);

const checkHash = (hash) => {
  const secret_hash = functions.config().service.my_hash;
  if (!hash || hash !== secret_hash) {
    // discard the request,only a post with the right Flutterwave signature header gets our attention
    return 400;
  }
  return 200;
};

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

const updateUserProperty = async (id, userData, db) => {
  try {
    const docRef = await db.collection("users").doc(id);
    await docRef.update(userData);
  } catch (error) {
    console.log(error);
  }
  return;
};

// const formatGifts = (giftObj) => {
// 	const formmatedObj = {};
// 	for (const key in giftObj) {
// 		if (key !== 'eventId' && key !== 'giftType' && key !=='giftName') {
// 			const giftDetails = giftObj[key].split(':');
// 			const giftName = giftDetails.slice(0, giftDetails.length - 1).toString();
// 			const giftAmount = giftDetails[giftDetails.length - 1];
// 			formmatedObj[giftName] = giftAmount;
// 		}
// 	}
// 	return formmatedObj;
// };
const createSubAccount = async (payload) => {
  try {
    const response = await flw.Subaccount.create(payload);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getCollection = async (db) => {
  try {
    const snapshot = await db.collection('dispatchers').get()
    const dataColection = []
    await snapshot.docs.map(doc => dataColection.push({...doc.data(), id: doc.id}));
    return dataColection
  } catch (error) {
    console.log(error);
    return error;
  }
}
exports.updateUserProperty = updateUserProperty;
exports.checkHash = checkHash;
exports.verifyTransaction = verifyTransaction;
exports.createSubAccount = createSubAccount;
exports.getCollection = getCollection;
