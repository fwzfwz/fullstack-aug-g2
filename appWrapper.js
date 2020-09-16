import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AllReducer from './redux/allReducer';

const store = createStore(AllReducer);
const persistor = persistStore(store);

function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;
