import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';


import { checkUserSession } from './redux/user/user.actions';
import MountedAppConatianer from './MountedApp';
import Notification from "./components/notification";
import './App.css'

function App({ checkUserSession }) {
	useEffect(
		() => {
			checkUserSession();
		},
		[ checkUserSession ]
	);


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Notification />
			<MountedAppConatianer />
		</ThemeProvider>
	);
}

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(null,mapDispatchToProps)(App);
