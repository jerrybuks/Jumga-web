import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {  Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { selectIsSendingEmail  } from '../../../redux/user/user.selectors';
import { sendPasswordResetStart  } from '../../../redux/user/user.actions';
import ForgotPasswordForm from '../../../components/auth-form/ForgotPasswordForm'

export const forgotPassword = ({sendPasswordResetStart,isLoading,history}) => {
    const goBack = () => {
       history.push('/auth')
    }
    return (
        <div>
             <Box textAlign="left" px="2rem">
                <ArrowBackIcon onClick={goBack} style={{ cursor: 'pointer' }}/>
            </Box>
            <ForgotPasswordForm {...{sendPasswordResetStart,isLoading}} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
	sendPasswordResetStart: (email) => dispatch(sendPasswordResetStart(email)),
});

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsSendingEmail,
});


export default connect(mapStateToProps, mapDispatchToProps)(forgotPassword)
