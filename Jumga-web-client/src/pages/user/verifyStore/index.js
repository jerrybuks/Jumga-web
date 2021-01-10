import React from 'react'
import { useFlutterwave } from 'flutterwave-react-v3';
import { Button, Box } from '@material-ui/core';
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

function VerifyStore({user}) {
    const config = {
		public_key: 'FLWPUBK_TEST-c29bc38b5d010536568483abecf059bf-X',
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
    return (
        <div>
            <h3>verfiyStore</h3>
            <Box>To complete your store setup you will need to make a payment of <b>20 dolars</b> + a small service charge from flutterwave. for further enquirie/issues contact customersupport@jumga.com</Box>
            <Button onClick={handleClick}>finish up</Button>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
  });
  
  export default connect(mapStateToProps, null)(VerifyStore);