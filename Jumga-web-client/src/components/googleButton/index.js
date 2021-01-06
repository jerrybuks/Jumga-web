import React, { Fragment } from 'react';
import googleLogo from '../.././assets/Glogo.svg';

import { useStyles } from './style.js';

export default function GoogleButton({ view, onClick }) {
	const classes = useStyles();
	return (
		<Fragment>
			<div className={classes.root} onClick={onClick}>
				<div className={classes.logoWrapper}>
					<img className={classes.logo} src={googleLogo} alt="google logo" />
				</div>
				<p className={classes.btnText}>{view} with google</p>
			</div>
		</Fragment>
	);
}
