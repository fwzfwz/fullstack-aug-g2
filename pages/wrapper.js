import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeWrapper from './homeWrapper';
import AlbumWrapper from './albumWrapper';

const Tab = createBottomTabNavigator();

function Wrapper() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeWrapper}
        options={{
          title: 'Home',
          tabBarIcon: () => <Icon name="home-outline" size={30} />,
        }}
      />
      <Tab.Screen
        name="Album List"
        component={AlbumWrapper}
        options={{
          title: 'Albums',
          tabBarIcon: () => <Icon name="albums-outline" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Wrapper;
