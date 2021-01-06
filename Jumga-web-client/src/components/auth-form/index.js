import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {  Box, CircularProgress, Button, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GoogleButton from '../googleButton';
import { ValidationTextField, useStyles } from './styles';
// import { PrimaryButton } from '../cutomButtons/buttons';
import AuthFormFooter from './authFormFooter';

export default function AuthForm({ location, emailSignInStart, googleSignInStart, signUpStart, isLoggingIn }) {
	const classes = useStyles();
	const [ action, setAction ] = useState(location.state);
	const [ state, setState ] = useState({ name: '', email: '', password: '', showPassword: false });

	const formRef = React.useRef();

	const handleClick = (value) => {
		setAction(value);
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const handleSignInAndUp = (e) => {
		if (formRef.current.reportValidity()) {
			const { name, email, password } = state;
			isSignUp ? signUpStart({ name, email, password }) : emailSignInStart(email, password);
		}
	};

	const { name, email, password, showPassword } = state;
	const isSignUp = action === 'sign up';

	return (
		<div className={`${classes.form} scroll-bar`}>
			<Box pt="1rem">
				<Box mb="2rem">
					<Typography variant="h5" className={classes.heading}>{action || 'sign in'}</Typography>
				</Box>
				<form className={classes.root} autoComplete="off" ref={formRef}>
					{isSignUp && (
						<div>
							<ValidationTextField
								className={classes.margin}
								name="name"
								label="name"
								value={name}
								onChange={handleChange}
								type="text"
								required
								variant="outlined"
							/>
						</div>
					)}
					<div>
						<ValidationTextField
							className={classes.margin}
							name="email"
							label="email"
							value={email}
							onChange={handleChange}
							type="email"
							required
							variant="outlined"
						/>
					</div>
					<div className={classes.passwordContainer}>
						<div className={classes.password}>
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								edge="end"
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</div>

						<ValidationTextField
							className={classes.margin}
							name="password"
							label="password"
							value={password}
							onChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							required
							variant="outlined"
						/>
					</div>
					{ !isSignUp && <Box><Link to='/forgotPassword'>forgot password?</Link></Box>}
					<Box display="block" mt="1.5rem">
						<Button
							id="signUp"
							variant="contained"
							size="large"
							color="primary"
							onClick={handleSignInAndUp}
							disabled={isLoggingIn}
							className={classes.btn}
						>
							{!isLoggingIn ? action || 'sign in' : <CircularProgress color="primary" size={15} />}{' '}
						</Button>
					</Box>
					<Box my="1rem">or</Box>
					<Box display="flex" justifyContent="center">
						<GoogleButton view={action || 'sign in'} onClick={googleSignInStart} />
					</Box>
					<AuthFormFooter {...{ isSignUp, handleClick, classes }} />
				</form>
			</Box>
		</div>
	);
}
