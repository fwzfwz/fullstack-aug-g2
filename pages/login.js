import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const inputIcon = <Icon name="vcard-o" size={20} />;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={inputIcon}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Password"
        leftIcon={inputIcon}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="LOGIN"
        buttonStyle={styles.buttonStyle}
        onPress={() => {
          if (username === 'ADMIN' && password === 'ADMIN') {
            navigation.navigate('Home');
          } else {
            alert('ADMIN && ADMIN');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 200,
  },
  container: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
