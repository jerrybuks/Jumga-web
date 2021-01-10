import React, { useEffect } from "react";
import {
  selectCurrentUser,
  selectIsFetchingUser,
} from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { checkUserSession } from "../../../redux/user/user.actions";
import { Link, useHistory } from "react-router-dom";

export const ConfirmStorePayment = ({isFetching, user}) => {
const history = useHistory();
console.log(user,55555)
  useEffect(() => {
    checkUserSession();
    if (user.isStoreVerified) {
     history.push("/profile")
    }
  }, [history,user]);

  return (
    <div>
      {isFetching ? (
        "checking payment status..."
      ) : (
        <div>
          Couldn't find proof of successful payment, please contact
          customersupport@jumga.com, if you've successfully made payment, else,
          click <Link to="/verifyStore">here</Link> to make payment and finsih setting up store
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isFetching: selectIsFetchingUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmStorePayment);
