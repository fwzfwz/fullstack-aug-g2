import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login';
import Wrapper from './pages/wrapper';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

const App = ({auth}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.isLoggedIn ? (
          <Stack.Screen
            name="Wrapper"
            component={Wrapper}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
