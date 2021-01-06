import React, { Fragment } from 'react';
import useFetchFirebaseDoc from '../../custom-hooks/useFetchFirebaseDoc';
import { db } from '../../firebase/firebase.utils';
import { Card, Box, Button } from '@material-ui/core';
import { useStyles } from './styles';
import { useTheme } from '@material-ui/core/styles';
import CustomCheckbox from '../../components/custom-checkBox';
import GiftPurchaseForm from './GiftPurchaseForm';
import { formatLocaleCurrency } from 'country-currency-map/lib/formatCurrency';

export default function VisitorGifts(props) {
	const val = props.match ? props.match.params.eventId : props.eventId;
	const docRef = db.collection('events').doc(val);
	const [ state ] = useFetchFirebaseDoc(docRef);

	return (
		<div>
			{state.loading ? (
				'loading'
			) : state.data ? (
				<GiftItemsContainer event={state.data} />
			) : (
				'event page not found'
			)}
		</div>
	);
}

const GiftItemsContainer = ({ event }) => {
	const classes = useStyles();
	const [ selected, setSelected ] = React.useState([]);

	const handleSelect = (addItem) => {
		if (selected.find((item) => item.giftName === addItem.giftName)) {
			setSelected((selected) => [ ...selected.filter((item) => item.giftName !== addItem.giftName) ]);
		} else {
			setSelected((selected) => [ ...selected, addItem ]);
		}
	};
	const GiftItemsBtn = ({ handleClickOpen }) => {
		return (
			<Box display="flex" justifyContent="flex-end" m="1rem">
				<Button color="primary" variant="contained" disabled={!selected.length} onClick={handleClickOpen}>
					Gift item(s)
				</Button>
			</Box>
		);
	};

	const SendCustomGift = ({ handleClickOpen }) => {
		return (
			<Box textAlign="left" m="1rem">
				<Button color="primary" variant="contained" onClick={handleClickOpen} className={classes.customGiftBtn}>
					Send Custom Gift
				</Button>
			</Box>
		);
	};
	console.log(event,5555)
	return (
		<div className={classes.cardConatiner}>
			{event?.imgUrl && <Box><img src={event?.imgUrl} alt="event cover" className={classes.coverImg} /></Box>}
			<Box>{event?.eventDesc}</Box>
		
				<Fragment>
					<GiftPurchaseForm
						BtnComp={GiftItemsBtn}
						items={selected}
						cantEditName={true}
						cantEditAmount={true}
						currency={event.currency}
					/>
					{event.gifts.length > 0 &&event.gifts.map(
						(gift) =>
							gift.status !== 'complete' && (
								<GiftItem gift={gift} key={gift.giftName} selectItem={handleSelect} />
							)
					)}
					<GiftPurchaseForm BtnComp={SendCustomGift} items={selected} giftType="custom" currency={event.currency} />
				</Fragment>
		</div>
	);
};

const GiftItem = ({ gift, selectItem }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [ checked, setChecked ] = React.useState(false);
	const { giftName, currency, amount, status, totalAmountGifted, amountRemaining } = gift;

	const handleChange = (event) => {
		setChecked(event.target.checked);
		selectItem(gift);
	};

	const ContributeBtn = ({ handleClickOpen }) => (
		<Button color="primary" onClick={handleClickOpen}>
			contribute
		</Button>
	);
	return (
		<Card className={classes.giftCard}>
			<Box display="flex" justifyContent="space-between" width="100%">
				<Box className={classes.giftName} mb={1}>
					{giftName}
				</Box>
				<Box display="flex" mb={1}>
					<CustomCheckbox
						checked={checked}
						onChange={handleChange}
						color="default"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
				</Box>
			</Box>

			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Box display="flex" mb={1} className={status === 'incomplete' && classes.crossText}>
						<Box color={theme.palette.common.ash} mr={1} >
							price:
						</Box>
						{formatLocaleCurrency(amount,currency)}
					</Box>
					{status === 'incomplete' && (
						<Box display="flex" mb={1}>
							<Box color={theme.palette.common.ash} mr={1}>
							  Contributed:
							</Box>
							{formatLocaleCurrency(totalAmountGifted,currency)}
						</Box>
					)}
					{status === 'incomplete' && (
						<Box display="flex" mb={1}>
							<Box color={theme.palette.common.ash} mr={1}>
								Remaining:
							</Box>
							{formatLocaleCurrency(amountRemaining,currency)}
						</Box>
					)}
				</Box>

				<div className={classes.btn}>
					<GiftPurchaseForm BtnComp={ContributeBtn} items={[ gift ]} cantEditName={true} currency={currency}/>
				</div>
			</Box>
		</Card>
	);
};
