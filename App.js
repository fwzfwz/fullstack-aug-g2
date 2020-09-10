import React, {useState} from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
} from 'react-native';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const spinValue = new Animated.Value(0);
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });
  // Animated.loop(
  //   Animated.timing(spinValue, {
  //     toValue: 1,
  //     duration: 3000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }),
  // ).start();
  return (
    <View style={styles.container}>
      {/* <Animated.Image
        style={{
          width: 100,
          height: 100,
          margin: 20,
          transform: [{rotate: spin}],
        }}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png',
        }}
      /> */}
      <Image
        style={styles.imageStyle}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png',
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={(e) => setUsername(e)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => alert(username)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    margin: 20,
    width: 100,
    height: 100,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '40%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 40,
    // marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default App;
