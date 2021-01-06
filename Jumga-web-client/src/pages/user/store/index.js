import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { getCountry } from 'country-currency-map';
import { updateUserStart } from '../../../redux/user/user.actions';
import { selectCurrentUser, selectIsLoggingIn } from '../../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

function CountrySelector({ updateUserStart, user, isSaving, history }) {
	const options = countryList().getData();
	const [ state, setstate ] = useState({ options, value: null });

	const changeHandler = (value) => {
		setstate({ ...state, value });
	};

	useEffect(() => {
		if(user.currency) {
			history.push("/profile")
		}
		 //eslint-disable-next-line
	}, [ user.currency ])

	const handleSubmit = () => {
		const countryDet = getCountry(state.value.label);
		let currency = 'USD';
		if (countryDet) {
			currency = countryDet.currency;
		}

        updateUserStart({ country: state.value.label, currency }, user.id);
	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
			<Box width="25vw">
				<Box textAlign="left" my={2} fontWeight="bold" fontSize="1.2rem">
					please select country*
				</Box>
				<Box>
					<Select options={state.options} value={state.value} onChange={changeHandler} />
				</Box>
				<Box textAlign="end" my="1rem">
					<Button color="primary" variant="contained" onClick={handleSubmit} disabled={!state.value}>
						{!isSaving ? 'continue' : <CircularProgress color="inherit" size={15} />}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

const mapDispatchToProps = (dispatch) => ({
	updateUserStart: (userData, userId) => dispatch(updateUserStart({ userData, userId }))
});

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	isSaving: selectIsLoggingIn
});

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);
