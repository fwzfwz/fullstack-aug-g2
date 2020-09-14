import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login';
import Home from './pages/home';
import AddList from './pages/addList';
import AlbumScreen from './pages/album';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Input Page" component={AddList} />
        <Stack.Screen name="Album List" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
