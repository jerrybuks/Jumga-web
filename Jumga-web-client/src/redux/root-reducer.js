import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import productStoreReducer from "./productStore/productStore.reducer";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart']
// };

const rootReducer = combineReducers({
      user: userReducer,
      productStore: productStoreReducer
});

export default rootReducer;
