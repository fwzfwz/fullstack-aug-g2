import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import Wrapper from './pages/wrapper';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import executeQuery from './db';

const Stack = createStackNavigator();

const checkFirstRun = async () => {
  const isFirstRun = await AsyncStorage.getItem('isFirstRun');
  return isFirstRun;
};

const App = ({ auth }) => {
  React.useEffect(() => {
    checkFirstRun().then(ret => {
      console.log(ret);
      if (ret == 'true') {
        executeQuery('DROP TABLE IF EXISTS users');
        executeQuery(
          'CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, img_url TEXT NOT NULL)'
        );
        executeQuery(
          'INSERT INTO users (username, password, img_url) VALUES (?, ?, ?)',
          [
            'user1',
            'pw1',
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          ]
        );
      } else {
        AsyncStorage.setItem('isFirstRun', 'false');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.isLoggedIn ? (
          <Stack.Screen
            name="Wrapper"
            component={Wrapper}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
