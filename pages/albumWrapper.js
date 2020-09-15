import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumScreen from './album';
import Photos from './photos';

const Stack = createStackNavigator();

function AlbumWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ALBUMPAGE"
        component={AlbumScreen}
        options={{headerTitle: 'Album Page'}}
      />
      <Stack.Screen
        name="PHOTOPAGE"
        component={Photos}
        options={{headerTitle: 'Photo Page'}}
      />
    </Stack.Navigator>
  );
}
export default AlbumWrapper;
