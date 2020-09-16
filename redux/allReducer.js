import {combineReducers} from 'redux';
import LoggedReducer from './reducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const AllReducer = combineReducers({
  auth: persistReducer(
    {key: 'auth', storage: AsyncStorage},
    LoggedReducer,
  ),
});
export default AllReducer;
