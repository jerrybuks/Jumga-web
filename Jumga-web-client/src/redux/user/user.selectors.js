import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectIsFetchingUser = createSelector(
  [selectUser],
  user => user.isFetchingUser
);

export const selectIsLoggingIn = createSelector(
  [selectUser],
  user => user.isLoggingIn
);

export const selectIsUpdatingUser = createSelector(
  [selectUser],
  user => user.isUpdatingUser
);

export const selectIsSendingEmail = createSelector(
  [selectUser],
  user => user.isSendingEmail
);