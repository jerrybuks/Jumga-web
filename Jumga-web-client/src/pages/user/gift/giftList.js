import React, { Fragment, useEffect,useState } from 'react';
import { Card, Box, Button } from '@material-ui/core';
import { useStyles } from './styles';
import { withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import GiftListMenu from './giftListMenu';
import { FormTextField } from '../../../components/formTextField';
import GiftForm from './giftForm';
import GifterDetails from './gifterDetails';
import VistorGifts from '../../visitor/gifts';
import DoneIcon from '@material-ui/icons/Done';
import LinkIcon from '@material-ui/icons/Link';
import { formatLocaleCurrency } from 'country-currency-map/lib/formatCurrency';

function GiftList(props) {
	const event = props.events.find(({ id }) => id === props.match.params.eventId);
	const classes = useStyles();
	const [state, setstate] = useState('')

	useEffect(() => {
		setTimeout(() => setstate(''), 3000);
	}, [state])

	const handleLinkSharing = () => {
		if(navigator.clipboard) {
			 navigator.clipboard.writeText(window.location.href)
			setstate('copied!')
		}
	}
	return (
		<Fragment>
			{event ? (
				<div>
					<Box display="flex" mb={1} mx="1rem">
						<Button onClick={handleLinkSharing}>share link <LinkIcon /></Button>
						<Box color="red" alignSelf="center">{state}</Box>
					</Box>
					<Box py={2} mx="1rem">
						<FormTextField
							id="outlined-size-small"
							variant="outlined"
							size="small"
							type="text"
							placeholder="search gift by name"
						/>
					</Box>
					<div className={classes.cardConatiner}>
						{event.gifts.map((gift,index) => <GiftItem key={gift.giftName+index} gift={gift} eventStatus={event.status}
						 />)}
					</div>
					<GiftForm events={props.events} currency={props.currency}/>
				</div>
			) : (
				<VistorGifts eventId={props.match.params.eventId} />
			)}
		</Fragment>
	);
}

export default withRouter(GiftList);

const GiftItem = ({ gift, eventStatus }) => {
	// const {eventName, id, createdAt} = event;
	const [ open, setOpen ] = React.useState(false);
	const [ gifter, setGifterDet ] = React.useState({});

	const handleOpen = (gifterInfo) => {
		setOpen(true);
		setGifterDet(gifterInfo)
	};

	const handleClose = () => {
		setOpen(false);
	};
	const { giftName, currency, amountRemaining, amount, status, giftFrom } = gift;
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Card className={classes.giftCard} style={{ opacity: status === 'complete' ? 0.5 : 1 }}>
			<Box display="flex" justifyContent="space-between" width="100%">
				<Box className={classes.giftName} mb={1}>
					{giftName}
				</Box>
				
				<Box display="flex" mb={1}>
					<Box color={theme.palette.common.ash} mx={1}>
						price:
					</Box>
					<Box component="span" fontWeight="bold">
						{formatLocaleCurrency(amount,currency)}
					</Box>
				</Box>
			</Box>

			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Box color={theme.palette.common.ash} mb={1}>
						gifted by:
					</Box>
					{giftFrom.map((gifterDet) => (
						<Box ml={2} key={gifterDet.name}>
							<Box my={0.5} className={classes.pointerCursor} onClick={() => handleOpen(gifterDet)}>
								{gifterDet.name}

							</Box>
							

							{/* <Box>amount : {amount_settled}</Box>
							<Box>email : {email}</Box> */}
						</Box>
					))}
				</Box>
				<Box>{status === 'pending' && eventStatus === "open" && <GiftListMenu />}</Box>
			</Box>

			<Box display="flex" justifyContent="space-between" my={1}>
				<Box>
						<Box color={theme.palette.common.ash}>Status: {status}{ status === "complete" && <DoneIcon style={{fill: "green"}}/>}</Box>
				</Box>
				<Box display="flex">
					<Box color={theme.palette.common.ash} mx={1}>
						Amount Left:
					</Box>

					<Box>
						{formatLocaleCurrency(amountRemaining, currency)}
					</Box>
				</Box>
			</Box>
			<GifterDetails isOpen={open} gifter={gifter} closeModal={handleClose} cur={currency}/>
		</Card>
	);
};
