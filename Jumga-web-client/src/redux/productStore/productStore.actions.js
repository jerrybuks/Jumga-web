import ProductStoreActionTypes from './productStore.types';

export const productStoreRegisterStart = (storeCredentials) => ({
  type: ProductStoreActionTypes.PRODUCTSTORE_REGISTER_START,
  payload: storeCredentials
});

export const productStoreRegisterSuccess = (productStore) => ({
  type: ProductStoreActionTypes.PRODUCTSTORE_REGISTER_SUCCESS,
  payload: productStore
});

export const productStoreRegisterFailure = error => ({
  type: ProductStoreActionTypes.PRODUCTSTORE_REGISTER_FAILURE,
  payload: error
});

export const productRegisterStart = (productCredentials) => ({
  type: ProductStoreActionTypes.PRODUCT_REGISTER_START,
  payload: productCredentials
});

export const productRegisterSuccess = (event) => ({
  type: ProductStoreActionTypes.PRODUCT_REGISTER_SUCCESS,
  payload: event
});

export const productRegisterFailure = error => ({
  type: ProductStoreActionTypes.PRODUCT_REGISTER_FAILURE,
  payload: error
});

export const getProductStoreStart = (userId) => ({
  type: ProductStoreActionTypes.GET_PRODUCTSTORE_START,
  payload: userId
});

export const  getProductStoreSuccess = (storeDet) => ({
  type: ProductStoreActionTypes.GET_PRODUCTSTORE_SUCCESS,
  payload: storeDet
});

export const  getProductStoreFailure = error => ({
  type: ProductStoreActionTypes.GET_PRODUCTSTORE_FAILURE,
  payload: error
});

export const registerSubStoreStart = (data) => ({
  type: ProductStoreActionTypes.REGISTER_SUBACC_START,
  payload: data
});

export const  registerSubStoreSuccess = (data) => ({
  type: ProductStoreActionTypes.REGISTER_SUBACC_SUCCESS,
  payload: data
});

export const  registerSubStoreFailure = error => ({
  type: ProductStoreActionTypes.REGISTER_SUBACC_FAILURE,
  payload: error
});

//abstract

export const getNotificationsStart = (userId) => ({
  type: ProductStoreActionTypes.GET_NOTIFICATIONS_START,
  payload: userId
});

export const  getNotificationsSuccess = (notifications) => ({
  type: ProductStoreActionTypes.GET_NOTIFICATIONS_SUCCESS,
  payload: notifications
});

export const  getNotificationsFailure = error => ({
  type: ProductStoreActionTypes.GET_NOTIFICATIONS_FAILURE,
  payload: error
});

export const  clearNotificationsStart = notification  => ({
  type: ProductStoreActionTypes.CLEAR_NOTIFICATIONS_START,
  payload: notification
});

export const  clearNotificationsSuccess = notifications  => ({
  type: ProductStoreActionTypes.CLEAR_NOTIFICATIONS_SUCCESS,
  payload: notifications
});

export const  clearNotificationsFailure = error  => ({
  type: ProductStoreActionTypes.CLEAR_NOTIFICATIONS_FAILURE,
  payload: error
});

// remove later
export const giftRegisterStart = (giftDetails) => ({
  type: ProductStoreActionTypes.GIFT_REGISTER_START,
  payload: giftDetails
});

export const giftRegisterSuccess = (event) => ({
  type: ProductStoreActionTypes.GIFT_REGISTER_SUCCESS,
  payload: event
});

export const giftRegisterFailure = error => ({
  type: ProductStoreActionTypes.GIFT_REGISTER_FAILURE,
  payload: error
});

export const payoutStart = (benefitiaryCredentials) => ({
  type: ProductStoreActionTypes.PAYOUT_START,
  payload: benefitiaryCredentials
});

export const payoutSuccess = (payout) => ({
  type: ProductStoreActionTypes.PAYOUT_SUCCESS,
  payload: payout
});

export const payoutFailure = error => ({
  type: ProductStoreActionTypes.PAYOUT_FAILURE,
  payload: error
});