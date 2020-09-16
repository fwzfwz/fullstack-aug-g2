const def = {
  isLoggedIn: false,
};

function LoggedReducer(state = def, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default LoggedReducer;
