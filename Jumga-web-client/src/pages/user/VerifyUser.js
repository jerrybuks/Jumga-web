import React from 'react';
import { connect } from 'react-redux';
import { sendEmailVerifyStart } from '../../redux/user/user.actions';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectIsSendingEmail } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles((theme) => ({
	resendLink: {
		textDecoration: 'underline',
		cursor: 'pointer'
	}
}));

const VerifyUser = ({ sendEmailVerifyStart, isSending }) => {
	const classes = useStyles();
	return (
		<div>
			You have not verified your account, please kindly verify your account using the link sent to you. If you can
			find the initialverificatiaon link. then click here to
			<Box onClick={sendEmailVerifyStart} className={classes.resendLink}>
				resend email. {isSending && <CircularProgress color="inherit" size={15} />}
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isSending: selectIsSendingEmail
});

const mapDispatchToProps = (dispatch) => ({
	sendEmailVerifyStart: () => dispatch(sendEmailVerifyStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
