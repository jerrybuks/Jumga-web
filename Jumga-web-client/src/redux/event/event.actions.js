import EventActionTypes from './event.types';

export const getEventsStart = (userId) => ({
  type: EventActionTypes.GET_EVENTS_START,
  payload: userId
});

export const  getEventsSuccess = (events) => ({
  type: EventActionTypes.GET_EVENTS_SUCCESS,
  payload: events
});

export const  getEventsFailure = error => ({
  type: EventActionTypes.GET_EVENTS_FAILURE,
  payload: error
});

export const getNotificationsStart = (userId) => ({
  type: EventActionTypes.GET_NOTIFICATIONS_START,
  payload: userId
});

export const  getNotificationsSuccess = (notifications) => ({
  type: EventActionTypes.GET_NOTIFICATIONS_SUCCESS,
  payload: notifications
});

export const  getNotificationsFailure = error => ({
  type: EventActionTypes.GET_NOTIFICATIONS_FAILURE,
  payload: error
});

export const  clearNotificationsStart = notification  => ({
  type: EventActionTypes.CLEAR_NOTIFICATIONS_START,
  payload: notification
});

export const  clearNotificationsSuccess = notifications  => ({
  type: EventActionTypes.CLEAR_NOTIFICATIONS_SUCCESS,
  payload: notifications
});

export const  clearNotificationsFailure = error  => ({
  type: EventActionTypes.CLEAR_NOTIFICATIONS_FAILURE,
  payload: error
});

export const eventRegisterStart = (eventCredentials) => ({
  type: EventActionTypes.EVENT_REGISTER_START,
  payload: eventCredentials
});

export const eventRegisterSuccess = (event) => ({
  type: EventActionTypes.EVENT_REGISTER_SUCCESS,
  payload: event
});

export const eventRegisterFailure = error => ({
  type: EventActionTypes.EVENT_REGISTER_FAILURE,
  payload: error
});

export const giftRegisterStart = (giftDetails) => ({
  type: EventActionTypes.GIFT_REGISTER_START,
  payload: giftDetails
});

export const giftRegisterSuccess = (event) => ({
  type: EventActionTypes.GIFT_REGISTER_SUCCESS,
  payload: event
});

export const giftRegisterFailure = error => ({
  type: EventActionTypes.GIFT_REGISTER_FAILURE,
  payload: error
});

export const payoutStart = (benefitiaryCredentials) => ({
  type: EventActionTypes.PAYOUT_START,
  payload: benefitiaryCredentials
});

export const payoutSuccess = (payout) => ({
  type: EventActionTypes.PAYOUT_SUCCESS,
  payload: payout
});

export const payoutFailure = error => ({
  type: EventActionTypes.PAYOUT_FAILURE,
  payload: error
});