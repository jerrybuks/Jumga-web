import React from 'react'
import { useFlutterwave } from 'flutterwave-react-v3';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { selectCurrentUser, selectLoadUpdatedUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import SubAccountForm from '../../shared/dispatchRider/SubAccount';
import {getProductStoreStart} from "../../../redux/productStore/productStore.actions";
import { selectIsFetchingProductStore, selectStoreDetails } from "../../../redux/productStore/productStore.selector";
import { Fragment } from 'react';
import { getUserUpdateStart } from '../../../redux/user/user.actions';

function VerifyStore({user, getProductStoreStart, isLoading, productStoreDet,   getUserUpdateStart, loadUpdatedUser,}) {
    React.useEffect(() => {
        if (loadUpdatedUser) {
            console.log(loadUpdatedUser, user, 8888888888);
            getUserUpdateStart(user.id);
          }
        getProductStoreStart(user.id)
    }, [])
    const config = {
		public_key: process.env.REACT_APP_FW_PUBLIC_KEY,
		tx_ref: Date.now(),
		amount: 20,
		currency: "USD",
		redirect_url: '/confirmStorePayment',
		payment_options: 'account,card,banktransfer,mobilemoney,ussd',
		customer: {
			email: user.email,
			//   phonenumber: '09050386548',
			name: user.displayName
		},
		meta: { id: user.id, paymentType: "storeRegistration" },
		customizations: {
			title: 'Complete Store Setup',
			description: 'Gift the items selected'
			//   logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		}
	};
    const handleFlutterPayment = useFlutterwave(config);

    const handleClick = () => {
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                if (response.status === 'completed' || response.status === 'successful') {
                    //post details to fireabse
                    //direct to thank you page
                } else {
                    console.log('transaction failed');
                }
            },
            onClose: () => {
                console.log('I closed bro');
            }
        });
    }

    const bioInfo = {
        business_name: productStoreDet?.storeName,
        business_email: user?.email,
        business_contact: user?.displayName,
        business_mobile: productStoreDet?.phoneNo,
        business_contact_mobile:productStoreDet?.phoneNo,
      };

      const accountUser = {
        name: "storeOwner",
        userId: user?.id,
        storeId: productStoreDet?.id
      }
    console.log(bioInfo,accountUser,44444)
    return (
        <div>
             <h3>verfiyStore</h3>
            {isLoading ? <CircularProgress /> : <Fragment>
               
            <Box>To complete your store setup you will need to provide your Bank Account and also make a payment of <b>20 dolars</b>. for further enquirie/issues contact customersupport@jumga.com</Box>
            {!user.isSubAccount ?<SubAccountForm  countryAbbre={user.country} bioInfo={bioInfo} accountUser={accountUser}/>:
            <Button onClick={handleClick}>finish up</Button>}
                </Fragment>}

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    isLoading: selectIsFetchingProductStore,
    productStoreDet: selectStoreDetails,
    loadUpdatedUser: selectLoadUpdatedUser,
  });
  

const mapDispatchToProps = (dispatch) => ({
    getProductStoreStart: (userId) => dispatch(getProductStoreStart(userId)),
    getUserUpdateStart: (userId) => dispatch(getUserUpdateStart(userId)),
    // registerSubStoreStart: (credentials) => dispatch(registerSubStoreStart(credentials))
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(VerifyStore);