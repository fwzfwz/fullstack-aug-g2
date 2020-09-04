const setLoginKaryawan = payload => {
  return {
    type: 'LOGINKARYAWAN',
    payload,
  };
};

const setLogoutKaryawan = () => {
  return {
    type: 'LOGOUTKARYAWAN',
  };
};

export { setLoginKaryawan, setLogoutKaryawan };
