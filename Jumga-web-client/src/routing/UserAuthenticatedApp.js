import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/shared/home';
import Auth from '../pages/shared/auth';
import VerifyUser from '../pages/user/VerifyUser';
import Profile from '../pages/user/profile';
import NoMatch from '../pages/shared/NoMatch';
import AppContainer from '../components/appContainer';
import NotificationPage from '../pages/user/notificationPage';
import Events from '../pages/user/events';
import Help from '../pages/user/help';
import Gift from '../pages/user/gift';
import StoreRegistration from '../pages/user/store';

function UserAuthenticatedApp({ user }) {
	return (
		<div>
			<AppContainer>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/auth" component={Auth} />
						{user.isVerified ? !user.hasStore ? (
							<Route exact path="/store" component={StoreRegistration} />
						) : (
							<Fragment>
								<Route exact path="/profile" component={Profile} />
								<Route exact path="/notifications" component={NotificationPage} />
								<Route exact path="/events" component={Events} />
								<Route exact path="/help" component={Help} />
								<Route exact path="/events/:eventId" component={Gift} />
							</Fragment>
						) : (
							<Route exact path="/verifyUser" component={VerifyUser} />
						)}
						<Route component={NoMatch} />
					</Switch>
				</Router>
			</AppContainer>
		</div>
	);
}

export default UserAuthenticatedApp;
