const setLogin = payload => {
  return {
    type: 'LOGIN',
    payload,
  };
};

const setLogout = () => {
  return { type: 'LOGOUT' };
};

export { setLogin, setLogout };