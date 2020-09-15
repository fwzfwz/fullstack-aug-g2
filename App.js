import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login';
import Wrapper from './pages/wrapper';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.isLoggedIn ? (
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

function mapStateToProps(state) {
  return {
    isLoggedIn: state,
  };
}

export default connect(mapStateToProps)(App);
