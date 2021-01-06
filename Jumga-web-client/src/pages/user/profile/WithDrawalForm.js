import React, { useRef, useState, useEffect } from 'react';
import { FormTextField, BootstrapInput } from '../../../components/formTextField';
import { MenuItem, InputLabel, Box, FormControl, Select, CircularProgress } from '@material-ui/core';
import { getCurrency } from 'country-currency-map';
import useFetch from '../../../custom-hooks/useFetch';
import FormContainer from '../../../components/formDialog';
import FinishTansfer from './FinishTransfer'
import { useStyles } from './styles';

export default function WithDrawalForm(props) {
	const { BtnComp, eventItems, currency, countryAbbre, userId } = props;
	const formRef = useRef();
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ state, setstate ] = useState({
		currency,
		bank_code: '',
		account_number: '',
		branches: [],
		destination_branch_code: '',
		loadingBranches: null
	});

	const res = useFetch(`https://us-central1-owambae-850eb.cloudfunctions.net/getBanksByCountry`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			countryAbbre
		})
	});

	const { result, isLoading } = res;

	useEffect(
		() => {
			if (state.bank_code && (countryAbbre === 'GH' || countryAbbre === 'UG' || countryAbbre === 'TZ')) {
				const bank = result?.data.find(({ code }) => code === state.bank_code);
				setstate({ ...state, loadingBranches: true });
				const options = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						bankCode: bank.id
					})
				};
				fetch(`https://us-central1-owambae-850eb.cloudfunctions.net/getBranchesByBank`, options)
					.then((resp) => resp.json())
					.then((result) => {
						setstate({
							...state,
							branches: result?.data,
							loadingBranches: false
						});
					})
					.catch((error) => {
						setstate({
							...state,
							error,
							loadingBranches: false
						});
					});
			}
		},
		 //eslint-disable-next-line
		[ state.bank_code ]
	);

	const eventsDet = { eventSum: 0, eventsName: '', eventIds : '' };

	if (eventItems.length > 0) {
		eventItems.forEach(({ eventName, eventSum, id }, index) => {
			if (index === eventItems.length - 1) {
				eventsDet.eventsName += `${eventName}`;
				eventsDet.eventIds += `${id}`
			} else {
				eventsDet.eventsName += `${eventName},`;
				eventsDet.eventIds += `${id},`
			}

			eventsDet.eventSum += parseFloat(eventSum);
		});
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setstate({ ...state, [name]: value });
	};

	const { account_number, bank_code, destination_branch_code, branches, loadingBranches } = state;

	const submitForm = () => {
		if (formRef.current.reportValidity()) {
			handleOpen()
			return true;
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
		<FormContainer
			btn={(onOpen) => <BtnComp handleClickOpen={onOpen} />}
			saveFunc={submitForm}
			saveVal="WithDraw"
			title="Payout"
		>
			<Box minHeight="300px" width="100%">
				{isLoading && countryAbbre ? (
					<Box display="flex" alignItems="center" justifyContent="center">
						<CircularProgress size={20} />
					</Box>
				) : (
					<Box py={2.5} margin="0 auto">
						<form autoComplete="off" ref={formRef}>
							<FormTextField
								id="outlined-size-small"
								variant="outlined"
								size="small"
								type="text"
								name="eventName"
								placeholder="input event name"
								// value={eventsDet.eventsName}
								defaultValue={eventsDet.eventsName}
								disabled
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
										required
									>
										<MenuItem value={currency} key={currency}>
											{getCurrency(currency).symbolFormat || currency}
										</MenuItem>
									</Select>
								</FormControl>
								<Box mt="24px" alignSelf="center">
									<FormTextField
										id="outlined-size-small"
										variant="outlined"
										size="small"
										type="number"
										name="amount"
										placeholder="amount"
										// value={eventsDet.eventSum}
										defaultValue={eventsDet.eventSum}
										InputProps={{ inputProps: { min: 1 } }}
										required
										disabled
									/>
								</Box>
							</Box>
							<Box my={1} display="flex">
								{result?.data ? (
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="demo-customized-select-label">Bank</InputLabel>
										<Select
											labelId="demo-customized-select-label"
											id="demo-customized-select"
											name="bank_code"
											value={bank_code}
											onChange={handleChange}
											input={<BootstrapInput />}
											className={classes.selectEmpty}
											required
										>
											{result?.data.map((bank) => (
												<MenuItem value={bank.code} key={bank.code}>
													{bank.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								) : (
									<Box mt="24px">
										<FormTextField
											id="outlined-size-small"
											variant="outlined"
											size="small"
											type="number"
											name="bank_code"
											placeholder="bank code -3 digit"
											value={bank_code}
											onChange={handleChange}
											InputProps={{ inputProps: { min: 1, minLength: 3, maxLength: 3 } }}
											required
										/>
									</Box>
								)}
								{(countryAbbre === 'GH' || countryAbbre === 'UG' || countryAbbre === 'TZ') && (
									<Box>
										<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel id="demo-customized-select-label">Branch</InputLabel>
											<Select
												labelId="demo-customized-select-label"
												id="demo-customized-select"
												name="destination_branch_code"
												value={destination_branch_code}
												onChange={handleChange}
												input={<BootstrapInput />}
												className={classes.selectEmpty}
												required
											>
												{loadingBranches ? (
													<div>pleaase wait... </div>
												) : (
													branches.map(({ branch_code, branch_name, id }) => (
														<MenuItem value={branch_code} key={id}>
															{branch_name}
														</MenuItem>
													))
												)}
											</Select>
										</FormControl>
									</Box>
								)}
							</Box>
							<Box mt="24px">
								<FormTextField
									id="outlined-size-small"
									variant="outlined"
									size="small"
									type="number"
									name="account_number"
									placeholder="account number"
									value={account_number}
									onChange={handleChange}
									InputProps={{ inputProps: { min: 1 } }}
									required
								/>
							</Box>
						</form>
					</Box>
				)}
			</Box>
		</FormContainer>
		{open && <FinishTansfer isOpen={open} formDet={state} closeModal={handleClose} eventsDetail={eventsDet} userId={userId} />}
		</div>
	);
}
