const initialState = {
  error: 'NO LOGIN',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return state;
  }
};

export default LoginReducer;
