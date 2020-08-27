export const checkAccount = (nip, password) => {
  let user = JSON.parse(localStorage.getItem('karyawans')).filter(
    item => item.nip == nip
  )[0];
  if (user != undefined && user.password == password) {
    let loggedUser = {
      nip: user.nip,
      name: user.name,
      password: user.password,
      role: user.role,
    };
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    return true;
  } else {
    return false;
  }
};
