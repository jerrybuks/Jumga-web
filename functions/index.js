const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

const handleGifting = require('./handleGifting');
const { getBanks, getBankBranches, resolveAcct, resolveAcctTest, initTranser, recordPayoutToDb, checkTransfer } = require('./handleBankingRequests');
const { verifyTransaction, formatGifts, updateGiftDetails } = handleGifting



admin.initializeApp();
const db = admin.firestore();

exports.recordGifting = functions.https.onRequest(async (req, res) => {
	
	try {
		const request = JSON.parse(req.rawBody);
		const verifyRes = await verifyTransaction(request.id);

		if (verifyRes.data.meta) {
			const gifts = formatGifts(verifyRes.data.meta);
            await updateGiftDetails(verifyRes, gifts, db);
			res.send(200);
		} else {
			res.send(400);
		}
	} catch (err) {
		res.send(err);
	}
});


exports.getBanksByCountry = functions.https.onRequest( (req, res) => {
	cors(req, res, async () => {
		try {
			const request = JSON.parse(req.rawBody);
			const banks = await getBanks(request.countryAbbre);
			// const banks = await getBanks("NG");
	
			res.status(200).send(banks);
		} catch (err) {
			res.send(err);
		}
    })
});


exports.getBranchesByBank = functions.https.onRequest( (req, res) => {
	cors(req, res, async () => {
		try {
			const request = JSON.parse(req.rawBody);
			const banks = await getBankBranches(request.bankCode);
			// const banks = await getBankBranches(280);
	
			res.status(200).send(banks);
		} catch (err) {
			res.send(err);
		}
    })
});

exports.resolveAccountDetails = functions.https.onRequest( (req, res) => {
	cors(req, res, async () => {
		try {
			const request = JSON.parse(req.rawBody);
			let accountDetail;
			if(request.account_number.slice(0, 8) === "06900000"){
				accountDetail = await resolveAcctTest(request);
			} else {
				accountDetail = await resolveAcct(request);
			}
			
			res.status(200).send(accountDetail);
		} catch (err) {
			res.send(err);
		}
    })
});

exports.handlePayOut = functions.https.onRequest( (req, res) => {
	cors(req, res, async () => {
		try {
			const request = JSON.parse(req.rawBody);
			const isNotWithDrawn =  await checkTransfer(request.transferObj, db)

			if(isNotWithDrawn){
				const transferDetail = await initTranser(request.transferObj);

				if(transferDetail.status === "success"){
					const resp = await recordPayoutToDb(transferDetail.data, db)
					res.status(200).send(resp);
				} else {
					res.status(400).send(transferDetail);
				}
			} else {
				res.status(200).send({ status: "success", message: "Transfer already processed or contains an event alredy withdrawn"})
			}
			
			
			
		} catch (err) {
			res.send(err);
		}
    })
});