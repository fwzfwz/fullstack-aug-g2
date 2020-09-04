import { combineReducers } from 'redux';
import DepartementReducer from './departements';
import KaryawansReducer from './karyawans';
import LoggedReducer from './loggedUser';
import LoggedKaryawanReducer from './loggedKaryawan';

const AllReducer = combineReducers({
  departements: DepartementReducer,
  karyawans: KaryawansReducer,
  loggedUser: LoggedReducer,
  loggedKaryawan: LoggedKaryawanReducer,
});

export default AllReducer;
