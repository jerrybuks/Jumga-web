const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

const utils = require('./utils');
const { getBanks, getBankBranches, resolveAcct, resolveAcctTest, initTranser, recordPayoutToDb, checkTransfer } = require('./handleBankingRequests');
const { checkHash, verifyTransaction, updateUserProperty, formatGifts, updateGiftDetails } = utils



admin.initializeApp();
const db = admin.firestore();

exports.recordPayments = functions.https.onRequest(async (req, res) => {
	//improve this function to check that webhhok secret something and reject it if its not confirmed to be from flutterwave
	//make sure you handle transaction verfifivation well, eject if transaction couldn't be verified
	//1. should handle diffrenet payments, whether is to setup account or buy a product
	//2. should handle different ytransaction status states, pending, failure and completed
  
	
	try {
		const checkHashRes = checkHash(req.headers["verif-hash"]);
		if(checkHashRes === 400) throw checkHashRes;
		const request = JSON.parse(req.rawBody);
		const verifyRes = await verifyTransaction(request.data.id);
		
		const {meta, currency, status, charged_amount} = verifyRes.data;
		if (meta) {
			if(meta.paymentType === "storeRegistration"){
				// record the payment, no need though since they all pay the same amount
				//so just update a status to show they've payed, update user isStoreVerified property
				functions.logger.log("data fromverification:", verifyRes.data);
				if(status === "successful" && currency === "USD" && charged_amount >= 20) {
					await updateUserProperty(meta.id,{isStoreVerified: true},db)
				}
			} else {
				// it means its going to be equal to purchase
				// update ingo to the db where it should be
				// const gifts = formatGifts(meta);
            	// await updateGiftDetails(verifyRes, gifts, db);
			}
		}
	} catch (err) {
		consle.log(err);
	}
	//have to return a 200 to let flutterwave know that I got thw webhook 
	res.send(200);
});


// exports.getBanksByCountry = functions.https.onRequest( (req, res) => {
// 	cors(req, res, async () => {
// 		try {
// 			const request = JSON.parse(req.rawBody);
// 			const banks = await getBanks(request.countryAbbre);
// 			// const banks = await getBanks("NG");
	
// 			res.status(200).send(banks);
// 		} catch (err) {
// 			res.send(err);
// 		}
//     })
// });


// exports.getBranchesByBank = functions.https.onRequest( (req, res) => {
// 	cors(req, res, async () => {
// 		try {
// 			const request = JSON.parse(req.rawBody);
// 			const banks = await getBankBranches(request.bankCode);
// 			// const banks = await getBankBranches(280);
	
// 			res.status(200).send(banks);
// 		} catch (err) {
// 			res.send(err);
// 		}
//     })
// });

// exports.resolveAccountDetails = functions.https.onRequest( (req, res) => {
// 	cors(req, res, async () => {
// 		try {
// 			const request = JSON.parse(req.rawBody);
// 			let accountDetail;
// 			if(request.account_number.slice(0, 8) === "06900000"){
// 				accountDetail = await resolveAcctTest(request);
// 			} else {
// 				accountDetail = await resolveAcct(request);
// 			}
			
// 			res.status(200).send(accountDetail);
// 		} catch (err) {
// 			res.send(err);
// 		}
//     })
// });

// exports.handlePayOut = functions.https.onRequest( (req, res) => {
// 	cors(req, res, async () => {
// 		try {
// 			const request = JSON.parse(req.rawBody);
// 			const isNotWithDrawn =  await checkTransfer(request.transferObj, db)

// 			if(isNotWithDrawn){
// 				const transferDetail = await initTranser(request.transferObj);

// 				if(transferDetail.status === "success"){
// 					const resp = await recordPayoutToDb(transferDetail.data, db)
// 					res.status(200).send(resp);
// 				} else {
// 					res.status(400).send(transferDetail);
// 				}
// 			} else {
// 				res.status(200).send({ status: "success", message: "Transfer already processed or contains an event alredy withdrawn"})
// 			}
			
			
			
// 		} catch (err) {
// 			res.send(err);
// 		}
//     })
// });