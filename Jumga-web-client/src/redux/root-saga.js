import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { eventSagas } from './event/event.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(eventSagas)]);
}
