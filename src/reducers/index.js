import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const AllReducer = combineReducers({
  loggedUser: persistReducer({ key: 'loggedUser', storage }, AuthReducer),
});

export default AllReducer;
