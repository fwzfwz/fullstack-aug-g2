import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './home';
import AddList from './addList';
import {Text} from 'react-native';

const Drawer = createDrawerNavigator();

function Dummy() {
  return <Text>Dummy Text</Text>;
}

function HomeWrapper() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HOMEPAGE"
        component={Home}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name="INPUTPAGE"
        component={Dummy}
        options={{drawerLabel: 'Dummy'}}
      />
    </Drawer.Navigator>
  );
}

export default HomeWrapper;
