import { createSelector } from 'reselect';


const selectProductStore = state => state.productStore;
// export const selectProductStoreDet = createSelector(
//   [selectProductStore],
//   productStore => productStore.storeDetails
// );

export const selectStoreDetails = createSelector(
  [selectProductStore],
  productStore => productStore.storeDetails
);

export const selectProducts = createSelector(
  [selectProductStore],
  productStore => productStore.products
);

export const selectIsRegistering = createSelector(
  [selectProductStore],
  productStore => productStore.isRegistering
);

export const selectIsFetchingProductStore = createSelector(
  [selectProductStore],
  productStore => productStore.isFetchingProductStore
);

export const selectIsGettingPurchases = createSelector(
  [selectProductStore],
  productStore => productStore.IsGettingPurchases
);

export const selectPurchases = createSelector(
  [selectProductStore],
  productStore => productStore.purchases
);

// old
const selectEventsState = state => state.productStore;

// export const selectIsRegistering = createSelector(
//   [selectEventsState],
//   eventsState => eventsState.isRegistering
// );

export const selectIsPayingout = createSelector(
  [selectEventsState],
  eventsState => eventsState.isPayingout
);

export const selectNotifications = createSelector(
  [selectEventsState],
  eventsState => eventsState.notifications
);

export const selectLoadNotifications = createSelector(
  [selectEventsState],
  eventsState => eventsState.shouldLoadNotifications
);
