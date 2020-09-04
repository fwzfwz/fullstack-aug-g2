const defaultConst = {
  nip: null,
  username: null,
  password: null,
};

const LoggedReducer = (state = defaultConst, action) => {
  switch (action.type) {
    case 'LOGINUSER':
      return action.payload;
    case 'LOGOUTUSER':
      return defaultConst;
    default:
      return state;
  }
};

export default LoggedReducer;
