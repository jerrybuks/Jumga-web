import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { productStoreSagas } from './productStore/productStore.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(productStoreSagas)]);
}
