import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../pages/shared/home";
import Auth from "../pages/shared/auth";
import VerifyUser from "../pages/user/VerifyUser";
import Profile from "../pages/user/profile";
import NoMatch from "../pages/shared/NoMatch";
import AppContainer from "../components/appContainer";
import NotificationPage from "../pages/user/notificationPage";
import Products from "../pages/user/products";
import Help from "../pages/user/help";
// import Gift from '../pages/user/gift';
import StoreRegistration from "../pages/user/store";
import VerifyStore from "../pages/user/verifyStore";
import ConfirmStorePayment from "../pages/user/confirmStorePayment";
import { DispatchRider } from "../pages/shared/dispatchRider";

function UserAuthenticatedApp({ user }) {
  return (
    <div>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
            <Route
              exact
              path="/dispatchRider"
              component={DispatchRider}
            />
            {user.isVerified ? (
              !user.hasStore ? (
                <Fragment>
                  <Route exact path="/store" component={StoreRegistration} />
                  <Route
                    path="*"
                    render={() => <Redirect to={{ pathname: "/store" }} />}
                  />
                </Fragment>
              ) : !user.isStoreVerified ? (
                <Fragment>
                  <Route exact path="/store" component={StoreRegistration} />
                  <Route exact path="/verifyStore" component={VerifyStore} />
                  <Route
                    exact
                    path="/confirmStorePayment"
                    component={ConfirmStorePayment}
                  />
                  {/* <Route
                    path="*"
                    render={() => (
                      <Redirect to={{ pathname: "/confirmStorePayment" }} />
                    )}
                  /> */}
                </Fragment>
              ) : (
                <Fragment>
                  <Switch>
                    <Route
                      exact
                      path="/confirmStorePayment"
                      component={ConfirmStorePayment}
                    />
                    <Route exact path="/profile" component={Profile} />
                    <Route
                      exact
                      path="/notifications"
                      component={NotificationPage}
                    />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/help" component={Help} />
                    {/* <Route exact path="/events/:eventId" component={Gift} /> */}
                    <Route
                      render={() => <Redirect to={{ pathname: "/profile" }} />}
                    />
                  </Switch>
                </Fragment>
              )
            ) : (
              <Fragment>
                <Route exact path="/verifyUser" component={VerifyUser} />
                <Route
                  path="*"
                  render={() => <Redirect to={{ pathname: "/verifyUser" }} />}
                />
              </Fragment>
            )}
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AppContainer>
    </div>
  );
}

export default UserAuthenticatedApp;
