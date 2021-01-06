import React, { useState, useEffect } from 'react';
import { useStyles } from './styles';
import { Card, Box, Button } from '@material-ui/core';
import { formatLocaleCurrency } from 'country-currency-map';
import { withRouter } from 'react-router-dom';
import CustomCheckbox from '../../../components/custom-checkBox';
import WithDrawalForm from './WithDrawalForm';
import { getCountry } from 'country-currency-map/lib/getCountry';

function Wallet({ events, country, displayName, userId }) {
	const classes = useStyles();
	const [ selected, setSelected ] = useState([]);
	const [ allChecked, setAllChecked ] = useState(false);
	console.log(events,"666666666666666666")
	console.log(selected);
	useEffect(
		() => {
			let count = 0;
			events.forEach((event) => {
				if (!event.withdrawn) count++;
			});

			if (count === selected.length) {
				setAllChecked(true);
			} else {
				setAllChecked(false);
			}
		},
		 //eslint-disable-next-line
		[ selected]
	);

	const unWithDrawnEvents = [];
	let totalWalletSum = 0;
	let currency = 'USD';

	events.forEach((event) => {
		if (!event.withdrawn) {
			const eventSum = event.gifts.reduce(
				(accumulator, currentValue) => accumulator + currentValue.totalAmountGifted,
				0
			);
			unWithDrawnEvents.push({ ...event, eventSum });
			totalWalletSum += eventSum;
			currency = event.currency;
		}
	});

	const handleSelect = (addItem) => {
		const isAlreadySelected = selected.find((item) => item.eventName === addItem.eventName);
		if (isAlreadySelected) {
			setSelected((selected) => [ ...selected.filter((item) => item.eventName !== addItem.eventName) ]);
		} else {
			setSelected((selected) => [ ...selected, addItem ]);
		}
	};

	const handleTotalCheckboxChange = (e) => {
		setAllChecked(e.target.checked);
		if (e.target.checked) {
			setSelected([ ...unWithDrawnEvents ]);
		} else {
			setSelected([]);
		}
	};

	let countryDetails = getCountry(country);

	const WithDrawBtn = ({ handleClickOpen }) => {
		return (
			<Button variant="outlined" color="primary" onClick={handleClickOpen} size="small" disabled={!selected.length}>
				withDraw
			</Button>
		);
	};

	return (
		<div>
			<Card className={classes.profileCard}>
				<Box>
					<Box display="flex" justifyContent="space-between" mb={0.5}>
						<Box>
							<CustomCheckbox
								checked={allChecked}
								onChange={handleTotalCheckboxChange}
								color="default"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
							Total:
						</Box>
						<Box fontWeight="bold">{formatLocaleCurrency(totalWalletSum, currency)}</Box>
					</Box>
					<Box>
							{unWithDrawnEvents.map((elem) => (
								<UnWithDrawnEvents
									key={elem.eventName}
									allChecked={allChecked}
									event={elem}
									selectItem={handleSelect}
									selectedItems={selected}
									numOfUnWidthDrawnEvents={unWithDrawnEvents.length}
								/>
							))}
						</Box>
					<Box display="flex" justifyContent="flex-end" alignItems="flex-end">
						<Box>
							<WithDrawalForm
								eventItems={selected}
								countryAbbre={countryDetails ? countryDetails.abbreviation : null}
								fullName={displayName}
								BtnComp={WithDrawBtn}
								currency={currency}
								userId={userId}
							/>
						</Box>
					</Box>
				</Box>
				<Box />
			</Card>
		</div>
	);
}

export default withRouter(Wallet);

const UnWithDrawnEvents = ({ event: eventItem, allChecked, selectedItems, selectItem, numOfUnWidthDrawnEvents }) => {
	const [ checked, setChecked ] = useState(false);

	useEffect(
		() => {
			if (selectedItems.length === 0 || numOfUnWidthDrawnEvents === selectedItems.length) {
				setChecked(allChecked);
			}
		},
		 //eslint-disable-next-line
		[ allChecked ]
	);

	const handleChange = (e) => {
		setChecked(e.target.checked);
		selectItem(eventItem);
	};

	return (
		<Box key={eventItem.eventName}>
			<span>
				<CustomCheckbox
					checked={checked}
					onChange={handleChange}
					color="default"
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
			</span>

			<Box component="span" color="red" py={0.8}>
				{eventItem.eventName} -{' '}
				<Box component="span" color="black">
					{formatLocaleCurrency(eventItem.eventSum, eventItem.currency)}
				</Box>
			</Box>
		</Box>
	);
};
