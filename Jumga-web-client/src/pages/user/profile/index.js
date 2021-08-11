import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { formatLocaleCurrency } from "country-currency-map";
import Navigation from "../../../components/navigation";
import MenuBar from "./MenuBar";
import {
  selectNotifications,
  selectIsFetchingProductStore,
  selectIsGettingPurchases,
  selectProducts,
  selectStoreDetails,
  selectPurchases
} from "../../../redux/productStore/productStore.selector";
import {
  getProductStoreStart,
  getPurchasesStart,
} from "../../../redux/productStore/productStore.actions";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Spinner from "../../../components/spinner/Spinner";
import { Box, Card } from "@material-ui/core";
import EmptyPurchase from "../../../components/EmptyPurchase";
import { formatLocaleCurrency } from "country-currency-map";
import { useStyles } from "./styles";


const Profile = (props) => {
  const {
    getProductStoreStart,
    user: { id: userId, displayName },
	isLoadingPurchases,
	purchases,
    getPurchasesStart,
    storeDet,
    products,
  } = props;
  const classes = useStyles();
  useEffect(
    () => {
      if (userId && products.length === 0) getProductStoreStart(userId);
      console.log(storeDet, 666666666);
      if (storeDet) getPurchasesStart(storeDet.id);
    },
    //eslint-disable-next-line
    [getProductStoreStart, getPurchasesStart, storeDet]
  );
console.log(purchases,999)
//   const { unreadNotifications } = notifications;
  return (
    <div>
      <Navigation path="profile">
        <MenuBar />
        <Box px="1rem" component="h2">
          Hello {displayName},
        </Box>
        {isLoadingPurchases ? (
          <Spinner />
        ) : purchases.length === 0 ? (
          <Box px="1rem">You have not made any sales </Box>
        ) : (
          <Box px="1rem">well done, you are making sales!</Box>
        )}
        <Box px="1rem" component="h3">
          Recent Sales
        </Box>
        {purchases.length === 0 ? <EmptyPurchase /> :
        <Card className={classes.profileCard}>
         {purchases
         .slice(0, 3)
         .map(
           ({
             meta,
             customer,
             amount_settled,
             currency,
             created_at,
             tx_ref,
           }) => (
             <Box key={tx_ref}>
               <Box py="5px">
                 <Box component="span" fontWeight="bold">
                   {customer.name}
                 </Box>
                 <Box component="span"> bought</Box>
                 <Box component="span" fontStyle="italic">
                   {" "}
                   "{meta.productName }"
                 </Box>
                 <Box component="span"> from you, at</Box>
                 <Box component="span" color="red">
                   {" "}
                   {formatLocaleCurrency(amount_settled, currency)}
                 </Box>
                 <Box component="span"> {`on ${ new Date(created_at).toISOString().split('T')[0].replace(/-/g, '/')}`}</Box>
               </Box>
             </Box>
           )
         )}
        </Card>}
        {/* <Card className={classes.profileCard}>
          {unreadNotifications.length > 0 ? (
            <Fragment>
              {
                unreadNotifications
                  .slice(0, 3)
                  .map(
                    ({
                      name,
                      giftName,
                      amount_settled,
                      currency,
                      eventName,
                      tx_id,
                    }) => (
                      <Box key={tx_id}>
                        <Box py="5px">
                          <Box component="span" fontWeight="bold">
                            {name}
                          </Box>
                          <Box component="span"> sent you</Box>
                          <Box component="span" fontStyle="italic">
                            {" "}
                            "{giftName}"
                          </Box>
                          <Box component="span"> sent you</Box>
                          <Box component="span" color="red">
                            {" "}
                            {formatLocaleCurrency(amount_settled, currency)}
                          </Box>
                          <Box component="span"> {`for your ${eventName}`}</Box>
                        </Box>
                      </Box>
                    )
                  )
                // <Link to="/notifications" ><Box color="red">view all</Box></Link>
              }
              <Link to="/notifications">
                <Box color="red">view all</Box>
              </Link>
            </Fragment>
          ) : (
            <Box>No Recent Gifters</Box>
          )}
        </Card> */}
      </Navigation>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getProductStoreStart: (userId) => dispatch(getProductStoreStart(userId)),
  getPurchasesStart: (storeId) => dispatch(getPurchasesStart(storeId)),
  // eventRegisterStart: (eventName, userId) => dispatch(eventRegisterStart({ eventName, userId }))
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  products: selectProducts,
  notifications: selectNotifications,
  isLoading: selectIsFetchingProductStore,
  isLoadingPurchases: selectIsGettingPurchases,
  storeDet: selectStoreDetails,
  purchases: selectPurchases
  // isAuthenticating: selectIsAuthenticating
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
