import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectIsFetchingUser, selectIsLoggingIn } from '../../../redux/user/user.selectors';
import { googleSignInStart, emailSignInStart, signUpStart } from '../../../redux/user/user.actions';
import AuthForm from '../../../components/auth-form';
import WithSpinner from '../../../components/with-spinner/withSpinner';
import { useStyles } from './styles.js';

const AuthPage = (props) => {
	const classes = useStyles();
	const { history, currentUser } = props;
	if (currentUser) {
	  currentUser.isVerified ? (currentUser.currency ? 	history.push('/profile') : history.push('/country')) : 	history.push('/verifyUser');
	}
	return (
		<div className={classes.signContainer}>
			<AuthForm {...props} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isLoading: selectIsFetchingUser,
	isLoggingIn: selectIsLoggingIn
});

const AuthPageContainer = compose(connect(mapStateToProps, mapDispatchToProps), WithSpinner)(AuthPage);

export default AuthPageContainer;
