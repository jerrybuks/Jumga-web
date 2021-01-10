import { createSelector } from 'reselect';

const selectEventsState = state => state.productStore;

export const selectEvents = createSelector(
  [selectEventsState],
  eventsState => eventsState.events
);

export const selectIsFetchingEvents = createSelector(
  [selectEventsState],
  eventsState => eventsState.isFetchingEvents
);

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


const selectProductStore = state => state.productStore;
export const selectIsRegistering = createSelector(
  [selectProductStore],
  productStore => productStore.isRegistering
);