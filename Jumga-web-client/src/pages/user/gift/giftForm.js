import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { FormTextField, BootstrapInput } from '../../../components/formTextField';
import FloatingAddBtn from '../../../components/floatingAddBtn';
import FormContainer from '../../../components/formDialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getEventsStart, giftRegisterStart } from '../../../redux/event/event.actions';
import { selectIsRegistering } from '../../../redux/event/event.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import { currencyList, getCurrencySymbol } from '../../../utils/formatCurrency';
import events from '../events';
import { getCurrency } from 'country-currency-map';

function GiftForm(props) {
	const { giftRegisterStart, isSaving } = props;
	const formRef = React.useRef();
	const [ state, setstate ] = useState({ giftName: '', currency: props.currency, amount: 1, isExists: false });

	const handleChange = (e) => {
		setstate({ ...state, [e.target.name]: e.target.value, isExists: false });
	};

	const { giftName, currency, amount } = state;

	const submitForm = () => {
		const giftNameExists = checkGiftName(giftName);
		setstate({ ...state, isExists: giftNameExists });

		if (formRef.current.reportValidity() && !giftNameExists) {
			const giftPrice = parseFloat(amount);
			giftRegisterStart(props.match.params.eventId, {
				giftName,
				currency,
				amount: giftPrice,
				status: 'pending',
				amountRemaining: giftPrice,
				totalAmountGifted: 0,
				giftFrom: []
			});
			return true;
		}
	};

	const checkGiftName = (name) => {
		if (events.length !== 0) {
			const event = props.events.find(({ id }) => id === props.match.params.eventId);

			if (event.gifts.length !== 0) {
				return !!event.gifts.find(({ giftName }) => giftName.toLowerCase() === name.toLowerCase());
			}
		}
	};
	
	return (
		<div>
			<FormContainer
				btn={(onOpen) => <FloatingAddBtn handleClickOpen={onOpen} />}
				saveFunc={submitForm}
				isSaving={isSaving}
				title="Add Gift"
			>
				<Box py={2.5} margin="0 auto">
					<form autoComplete="off" ref={formRef}>
						<FormTextField
							id="outlined-size-small"
							variant="outlined"
							size="small"
							type="text"
							name="giftName"
							placeholder="input gift name"
							value={giftName}
							onChange={handleChange}
							required
						/>
						{state.isExists && (
							<Box my={2} color="red">
								a gift with this name already exists
							</Box>
						)}
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

const mapDispatchToProps = (dispatch) => ({
	getEventsStart: (userId) => dispatch(getEventsStart(userId)),
	giftRegisterStart: (eventId, gift) => dispatch(giftRegisterStart({ eventId, gift }))
});

const mapStateToProps = createStructuredSelector({
	isSaving: selectIsRegistering,
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(GiftForm);
