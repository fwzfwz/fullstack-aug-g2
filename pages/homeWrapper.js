import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Assets, createStackNavigator} from '@react-navigation/stack';
import Home from './home';
import AddList from './addList';
import {Text} from 'react-native';

const Stack = createStackNavigator();

function HomeWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOMEPAGE"
        component={Home}
        options={{headerTitle: 'Home Page'}}
      />
      <Stack.Screen
        name="INPUTPAGE"
        component={AddList}
        options={{headerTitle: "Input Page"}}
      />
    </Stack.Navigator>
  );
}

export default HomeWrapper;
