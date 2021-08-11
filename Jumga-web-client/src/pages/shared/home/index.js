import React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './styles.js';
import { Button } from '@material-ui/core';

function Home(props) {
    const classes = useStyles();
	const handleAuth = (value) => {
		props.history.push({ pathname: `/auth`, state: value });
	};
	return (
		<div className="full-width">
			<header className={classes.header}>
				<div className={classes.headerContainer}>
					<div className={classes.headerContainerLeft}>
						start shopping right away on Jumga stores or create account if you would love to own a store
					</div>
					<div>
						
							<Button
								variant="outlined"
								size="large"
								className={classes.rootBtn}
								onClick={() => handleAuth('sign in')}
							>
								sign in
							</Button>
						
						<Button variant="contained" size="large" onClick={() => handleAuth('sign up')}>
							sign up
						</Button>
					</div>
				</div>
			</header>
		</div>
	);
}

export default withRouter(Home);