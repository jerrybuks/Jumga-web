import React, { Suspense } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from "redux";
import { selectCurrentUser, selectIsFetchingUser } from './redux/user/user.selectors';

import Spinner from './components/spinner/Spinner';
import WithSpinner from './components/with-spinner/withSpinner';

const AdminAuthenticatedApp = React.lazy(() => import('./routing/AdminAuthenticatedApp'))
const UserAuthenticatedApp = React.lazy(() => import('./routing/UserAuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('./routing/UnAuthenticatedApp'))


export function MountedApp({ currentUser }) {

	return (
		<>
            <Suspense fallback={<Spinner />}>
                {currentUser ? currentUser.isAdmin ? (
                    <AdminAuthenticatedApp />
                ) : (
                    <UserAuthenticatedApp user={currentUser} />
                ) : (
                    <UnAuthenticatedApp />
                )}
            </Suspense>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isLoading: selectIsFetchingUser
});

const MountedAppConatianer = compose(
	connect(mapStateToProps),
	WithSpinner
  )(MountedApp);

export default MountedAppConatianer;
