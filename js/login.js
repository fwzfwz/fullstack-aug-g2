import { filterJsonArray } from './arrayutil.js';
import { getItemFromStorage, setItemToStorage } from './istorage.js';

let hrdList = filterJsonArray(getItemFromStorage('karyawan'), 'HR Departement');

export const checkAccount = (nip, password) => {
  let hrd = filterJsonArray(hrdList, nip)[0];
  if (hrd != undefined && hrd.password == password) {
    let loggedUser = {
      nip: hrd.nip,
      name: hrd.name,
      password: hrd.password,
    };
    setItemToStorage('loggedUser', loggedUser);
    return true;
  } else {
    return false;
  }
};
