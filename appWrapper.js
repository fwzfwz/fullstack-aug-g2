import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import LoggedReducer from './redux/reducers';
import App from './App';

const store = createStore(LoggedReducer);

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
