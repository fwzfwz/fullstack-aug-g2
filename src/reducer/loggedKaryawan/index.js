const defaultConst = {
  nip: null,
  name: null,
  dateOfBirth: null,
  departement_id: null,
  motto: null,
};

const LoggedKaryawanReducer = (state = defaultConst, action) => {
  switch (action.type) {
    case 'LOGINKARYAWAN':
      return action.payload;
    case 'LOGOUTKARYAWAN':
      return defaultConst;
    default:
      return state;
  }
};

export default LoggedKaryawanReducer;
