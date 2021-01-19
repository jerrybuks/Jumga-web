import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../pages/shared/home";
import Auth from "../pages/shared/auth";
import AppContainer from "../components/appContainer";
import ForgotPassword from "../pages/shared/auth/ForgotPassword";
import Products from "../pages/visitor/products";
import Appreciation from "../pages/visitor/appreciation";
import { DispatchRider } from "../pages/shared/dispatchRider";

export default function UnAuthenticatedApp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/appreciation"
            component={(props) => (
              <AppContainer>
                <Appreciation {...props} />
              </AppContainer>
            )}
          />
          <Route
            exact
            path="/products/:productId"
            component={(props) => (
              <AppContainer>
                <Products {...props} />
              </AppContainer>
            )}
          />
          <Route
            exact
            path="/auth"
            component={(props) => (
              <AppContainer>
                <Auth {...props} />
              </AppContainer>
            )}
          />
		  <Route
            exact
            path="/dispatchRider"
            component={(props) => (
              <AppContainer>
                <DispatchRider {...props} />
              </AppContainer>
            )}
          />
          <Route
            exact
            path="/forgotPassword"
            component={(props) => (
              <AppContainer>
                <ForgotPassword {...props} />
              </AppContainer>
            )}
          />
          <Route render={() => <Redirect to={{ pathname: "/auth" }} />} />
        </Switch>
      </Router>
    </div>
  );
}
