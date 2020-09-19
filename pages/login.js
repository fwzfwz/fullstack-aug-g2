import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setLogin} from '../redux/authAction';
import {connect} from 'react-redux';
import executeQuery from '../db';

const getUser = async (username, password) => {
  let users = await executeQuery(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username.toString(), password.toString()],
  );
  let rows = users.rows;
  return rows.item(0);
};

const Login = ({login}) => {
  const inputIcon = <Icon name="vcard-o" size={20} />;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username: user1"
        leftIcon={inputIcon}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Password: pw1"
        leftIcon={inputIcon}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="LOGIN"
        buttonStyle={styles.buttonStyle}
        onPress={() => {
          getUser(username, password).then((resp) => {
            if (resp) {
              login();
            } else {
              alert('User Not Found');
            }
          });
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

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(setLogin()),
  };
}

export default connect(null, mapDispatchToProps)(Login);
