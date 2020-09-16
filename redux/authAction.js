function setLogin() {
  return {
    type: 'LOGIN',
  };
}

function setLogout() {
  return {
    type: 'LOGOUT',
  };
}

export {setLogin, setLogout};
