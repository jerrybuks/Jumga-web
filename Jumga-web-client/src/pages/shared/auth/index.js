import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsFetchingUser,
  selectIsAuthenticating,
} from "../../../redux/user/user.selectors";
import {
  googleSignInStart,
  emailSignInStart,
  signUpStart,
} from "../../../redux/user/user.actions";
import AuthForm from "../../../components/auth-form";
import WithSpinner from "../../../components/with-spinner/withSpinner";
import { useStyles } from "./styles.js";

const AuthPage = (props) => {
  const classes = useStyles();
  const { history, currentUser } = props;
  const [settingUp, setSettingUp] = useState(true);
  console.log(currentUser, 888888);
  useEffect(() => {
    if (currentUser) {
      currentUser.isVerified
        ? currentUser.hasStore
          ? currentUser.isStoreVerified
            ? history.push("/profile")
            : history.push("/verifyStore")
          : history.push("/store")
        : history.push("/verifyUser");
    }
    setSettingUp(false);
  }, [currentUser, history]);

  return (
    <div className={classes.signContainer}>
      {settingUp ? <div>setting up...</div> : <AuthForm {...props} />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsFetchingUser,
  isAuthenticating: selectIsAuthenticating,
});

const AuthPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSpinner
)(AuthPage);

export default AuthPageContainer;
