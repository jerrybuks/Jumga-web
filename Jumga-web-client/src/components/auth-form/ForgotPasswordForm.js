import React, { useState } from 'react';
import {  Box, CircularProgress, Button } from '@material-ui/core';
import { ValidationTextField, useStyles } from './styles';

export default function ForgotPasswordForm({ sendPasswordResetStart, isLoading }) {
	const classes = useStyles();
	const [ email, setEmail ] = useState('');

	const formRef = React.useRef();

	const handleChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSignInAndUp = (e) => {
		if (formRef.current.reportValidity()) {
			sendPasswordResetStart(email)
		}
	};

	return (
		<div className={classes.form}>
			<Box pt="2rem">
				<Box fontWeight="bold" >
					we will send you a mail to reset password
				</Box>
				<form className={classes.root} autoComplete="off" ref={formRef}>
					<div>
						<ValidationTextField
							className={classes.margin}
							name="email"
							label="Email"
							value={email}
							onChange={handleChange}
							type="email"
							required
							variant="outlined"
						/>
					</div>
					<Box display="block" mt="1.5rem">
						<Button
							id="signUp"
							variant="contained"
							size="large"
							color="primary"
							onClick={handleSignInAndUp}
							disabled={isLoading}
							className={classes.btn}
						>
							{!isLoading ? 'send link' : <CircularProgress color="primary" size={15} />}{' '}
						</Button>
					</Box>
				</form>
			</Box>
		</div>
	);
}
