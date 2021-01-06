import React, { useState, useEffect } from 'react';
import FormContainer from '../../components/formDialog';
import { Box } from '@material-ui/core';
import { FormTextField, BootstrapInput } from '../../components/formTextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFlutterwave } from 'flutterwave-react-v3';
import { withRouter } from 'react-router-dom';
import { getCurrency } from 'country-currency-map';

function GiftPurchaseForm(props) {
	const { BtnComp, items, cantEditName, cantEditAmount, giftType, match : {params} } = props
	const formRef = React.useRef();
	const [ state, setstate ] = useState({
		giftName: '',
		name: '',
		currency: props.currency,
		amount: 1,
		email: '',
		giftPairs: []
	});
	console.log(state,"33333333333333")
	const config = {
		public_key: 'FLWPUBK_TEST-518c8ab64b05b47762240a5f353bee1e-X',
		tx_ref: Date.now(),
		amount: state.amount,
		currency: state.currency,
		redirect_url: '/appreciation',
		payment_options: 'account,card,banktransfer,mobilemoney,ussd',
		customer: {
			email: state.email,
			//   phonenumber: '09050386548',
			name: state.name
		},
		meta: { ...state.giftPairs, eventId: params.eventId, giftType, giftName: state.giftName },
		customizations: {
			title: 'Gift Items(s)',
			description: 'Gift the items selected'
			//   logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		}
	};
	const handleFlutterPayment = useFlutterwave(config);
	useEffect(
		() => {
			let itemSum = 0;
			let itemsName = '';
			const giftPairs = [];
			if (items.length > 0) {
				items.forEach(({ giftName, amountRemaining }, index) => {
					if (index === items.length - 1) {
						itemsName += `${giftName}`;
					} else {
						itemsName += `${giftName}, `;
					}

					itemSum += parseFloat(amountRemaining);
					giftPairs.push(`${giftName}:${amountRemaining}`);
				});
			}

			console.log(giftPairs, '===============');
			setstate((state) => ({ ...state, giftName: itemsName, amount: itemSum, giftPairs }));
		},
		[ items ]
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setstate({ ...state, [name]: value, isExists: false });
		if (!cantEditAmount) {
			console.log(state);
			let customGift = "";
			if(!cantEditName) customGift = "custom-"
			setstate((state) => ({
				...state,
				[name]: value,
				isExists: false,
				giftPairs: [ `${customGift}${state.giftName}:${state.amount}` ]
			}));
		}
		// else {
		// 	setstate({ ...state, [name]: value, isExists: false });
		// }
	};

	const submitForm = () => {
		console.log(state, config, '***********');

		if (formRef.current.reportValidity()) {
			handleFlutterPayment({
				callback: (response) => {
					console.log(response);
					//verify transaction
					//if verification is successful, post details to firebase
					//else throw error
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
			return true;
		}
	};

	const { giftName, currency, amount, name, email } = state;
	return (
		<div>
			<FormContainer
				btn={(onOpen) => <BtnComp handleClickOpen={onOpen} />}
				saveFunc={submitForm}
				title="Gift Items(s)"
				// isSaving={isSaving}
			>
				<Box py={2.5} margin="0 auto">
					<form autoComplete="off" ref={formRef}>
						<Box my={1} mb="24px">
							<FormTextField
								id="outlined-size-small"
								variant="outlined"
								size="small"
								type="text"
								name="name"
								placeholder="input your full name"
								value={name}
								onChange={handleChange}
								required
							/>
						</Box>
						<Box my={1} mb="24px">
							<FormTextField
								id="outlined-size-small"
								variant="outlined"
								size="small"
								type="email"
								name="email"
								placeholder="input your email address"
								value={email}
								onChange={handleChange}
								required
							/>
						</Box>
						<FormTextField
							id="outlined-size-small"
							variant="outlined"
							size="small"
							type="text"
							name="giftName"
							placeholder="input gift name"
							value={giftName}
							onChange={handleChange}
							disabled={cantEditName}
							required
						/>
						<Box my={1} display="flex">
						<FormControl>
								<InputLabel id="demo-customized-select-label">currency</InputLabel>
								<Select
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									name="currency"
									value={currency}
									onChange={handleChange}
									input={<BootstrapInput />}
								>
								
									<MenuItem value={currency} key={currency}>
										{getCurrency(state.currency).symbolFormat || currency}
									</MenuItem>
								</Select>
							</FormControl>
							<Box mt="24px">
								<FormTextField
									id="outlined-size-small"
									variant="outlined"
									size="small"
									type="number"
									name="amount"
									placeholder="amount"
									value={amount}
									onChange={handleChange}
									disabled={cantEditAmount}
									InputProps={{ inputProps: { min: 1 } }}
									required
								/>
							</Box>
						</Box>
					</form>
				</Box>
			</FormContainer>
		</div>
	);
}

export default withRouter(GiftPurchaseForm)