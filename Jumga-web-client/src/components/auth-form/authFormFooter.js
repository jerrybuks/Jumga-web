import React from 'react';
import {  Box, Link, Typography } from '@material-ui/core';

export default function AuthFormFooter ({ isSignUp, handleClick, classes }){
	return (
		<Box mt="2rem">
			{!isSignUp ? (
				<Typography variant="subtitle1">
					Dont have an account?{' '}
					<Link variant="body2" onClick={() => handleClick('sign up')} className={classes.pointerCursor}>
						sign up
					</Link>
				</Typography>
			) : (
				<Typography>
					Already have an account?{' '}
					<Link variant="body2" onClick={() => handleClick('sign in')} className={classes.pointerCursor}>
						sign in
					</Link>
				</Typography>
			)}
		</Box>
	);
};
