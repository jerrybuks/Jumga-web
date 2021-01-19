const Flutterwave = require('flutterwave-node-v3');
const fetch = require('node-fetch');

const PUBLIC_KEY = 'FLWPUBK_TEST-518c8ab64b05b47762240a5f353bee1e-X';
const SECRET_KEY = 'FLWSECK_TEST-cf84f6c1d6e9121822fe8580751c3758-X';
const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY  );

const getBanks = async (countryAbbre) => {

    try {
        const payload = {
            
            "country": countryAbbre //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
            
        }
        const response = await flw.Bank.country(payload)
        return response;
    } catch (error) {
        console.log(error)
        return error
    }
}

const getBankBranches = async (bankCode) => {
    try {
        const payload = {
            
            "id": bankCode //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
            
        }
        const response = await flw.Bank.branches(payload)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        return error
    }

}


const initTranser = async (payload) => {
    try {
        const response = await flw.Transfer.initiate(payload)        

        return response;
    } catch (error) {
        console.log(error)
        return error
    }

}

const recordPayoutToDb = async (data,db) => {
    const eventIds = data.meta.eventIds.split(',')
    try {
        const batch = db.batch()

        eventIds.forEach((eventId) => {
            const eventRef = db.collection('events').doc(eventId);
            batch.update(eventRef,{ status: "close", withdrawn: true })
          });

    
        //add transfer details to transfer collection
        const transferRef = db.collection('transfers').doc();
        batch.set(transferRef, data);

        await batch.commit()
        return data

    } catch (error) {
        console.error("Error adding document: ", error);
        return error
    }
      
}


exports.getBanks = getBanks;
exports.getBankBranches = getBankBranches;
exports.initTranser = initTranser;
exports.recordPayoutToDb = recordPayoutToDb;