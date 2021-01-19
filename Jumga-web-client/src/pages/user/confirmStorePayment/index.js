import React, { useEffect } from "react";
import {
  selectCurrentUser,
  selectLoadUpdatedUser,
} from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { getUserUpdateStart} from "../../../redux/user/user.actions";
import { useHistory } from "react-router-dom";

export const ConfirmStorePayment = ({
  isFetching,
  getUserUpdateStart,
  loadUpdatedUser,
  user,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (loadUpdatedUser) {
      console.log(loadUpdatedUser, user, 8888888888);
      getUserUpdateStart(user.id);
    }
    if (user.isStoreVerified) {
      history.push("/profile");
    }
  }, [loadUpdatedUser, getUserUpdateStart, history, user]);

  return (
    <div>
      {/* {isFetching ? (
        "checking payment status..."
      ) : ( */}
      <div>
        please wait a few seconds we are verifying payment...., if payment is
        not verified after a minute pls contact admin at profkiti@gmail.com
        {/* Couldn't find proof of successful payment, please contact
          customersupport@jumga.com, if you've successfully made payment, else,
          click <Link to="/verifyStore">here</Link> to make payment and finsih setting up store */}
      </div>
      {/* )} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUserUpdateStart: (userId) => dispatch(getUserUpdateStart(userId)),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  loadUpdatedUser: selectLoadUpdatedUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmStorePayment);
