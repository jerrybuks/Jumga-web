import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, CircularProgress, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { payoutStart } from '../../../redux/event/event.actions';
import { selectIsPayingout } from '../../../redux/event/event.selector';
import { createStructuredSelector } from 'reselect';
import { formatLocaleCurrency } from 'country-currency-map/lib/formatCurrency';
import useFetch from '../../../custom-hooks/useFetch';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		width: '22rem',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

function FinishTransfer({ isOpen, formDet, eventsDetail, userId, closeModal, payoutStart, isPayingout }) {
	const classes = useStyles();
	console.log(formDet, eventsDetail);
	const { account_number, bank_code, currency, destination_branch_code } = formDet;
	const { eventSum, eventsName, eventIds } = eventsDetail;
	console.log(account_number, bank_code, '00000000000');
	const res = useFetch(`https://us-central1-owambae-850eb.cloudfunctions.net/resolveAccountDetails`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			account_number,
			account_bank: bank_code
		})
	});
	const { result, isLoading } = res;

	const actualAmount = eventSum - (0.03 * eventSum);

	const handleTransfer = () => {
		const transferObj = {
			account_number,
			account_bank: bank_code,
			currency,
			amount: actualAmount,
			beneficiary_name: result?.data?.account_name,
			destination_branch_code,
            narration: `${eventsName} withdrawal`,
            reference: "transfer-"+Date.now(),
            meta: {
                eventsName,
                eventIds,
                userId
            }
        };
		payoutStart(transferObj,userId)
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isOpen}
				onClose={closeModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={isOpen}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">Transfer Details</h2>
						{isLoading ? (
							<Box display="flex" justifyContent="center">
								<CircularProgress />
							</Box>
						) : !result?.data ? (
							<Box>{result?.message}</Box>
						) : (
							<div>
								<Box mb={1}>
									<Box fontWeight="bold" display="inline-block">
										Account Name :
									</Box>{' '}
									{result?.data?.account_name}
								</Box>
								<Box mb={1}>
									<Box fontWeight="bold" display="inline-block">
										Account Number :
									</Box>{' '}
									{result?.data?.account_number}
								</Box>
								<Box mb={1}>
									<Box fontWeight="bold" display="inline-block">
										Amount from Event(s) :{' '}
									</Box>
									{formatLocaleCurrency(eventSum, currency)}
								</Box>
								<Box mb={1}>
									<Box fontWeight="bold" display="inline-block">
										Amount you will receive (3% service fee) :
									</Box>
									{formatLocaleCurrency(actualAmount, currency)}
								</Box>
								<Box display="flex" justifyContent="flex-end">
									<Button
										variant="outlined"
										color="primary"
										onClick={handleTransfer}
										size="small"
										disabled={eventSum < 2000}
									>
										{isPayingout ? <CircularProgress color="inherit" size={15} />: "proceed"}
									</Button>
								</Box>
							</div>
						)}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	payoutStart: (transferObj, userId) => dispatch(payoutStart({ transferObj, userId }))
});

const mapStateToProps = createStructuredSelector({
	isPayingout: selectIsPayingout,
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishTransfer);