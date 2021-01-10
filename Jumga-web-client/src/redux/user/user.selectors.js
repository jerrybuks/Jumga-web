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

export const selectIsAuthenticating = createSelector(
  [selectUser],
  user => user.isAuthenticating
);

export const selectIsUpdatingUser = createSelector(
  [selectUser],
  user => user.isUpdatingUser
);

export const selectIsSendingEmail = createSelector(
  [selectUser],
  user => user.isSendingEmail
);