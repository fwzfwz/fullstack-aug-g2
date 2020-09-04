const setLogin = payload => {
  return {
    type: 'LOGINUSER',
    payload,
  };
};

const setLogout = () => {
  return {
    type: 'LOGOUTUSER',
  };
};

export { setLogin, setLogout };
