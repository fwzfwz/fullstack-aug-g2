import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import RNFS from 'react-native-fs';
import executeQuery from '../db';
import ImagePicker from 'react-native-image-picker';

const AddList = ({ navigation, route }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [imgUrl, setImg] = React.useState('');

  React.useEffect(() => {
    if (route.params) {
      const { username, password, img_url } = route.params;
      setUsername(username);
      setPassword(password);
      setImg(img_url);
    }
  }, [route.params]);

  const selectImage = async () => {
    await ImagePicker.showImagePicker(resp => {
      resp.didCancel
        ? false
        : RNFS.mkdir(
            `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNProject`
          ).then(() => {
            RNFS.copyFile(
              resp.path,
              `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNProject/${resp.fileName}`
            ).then(() =>
              setImg(
                `file://${RNFS.ExternalStorageDirectoryPath}/Pictures/RNProject/${resp.fileName}`
              )
            );
          });
    });
  };

  const saveData = () => {
    if (username === '' || password === '' || imgUrl === '') {
      alert('Please Fill All Input');
    } else {
      if (route.params) {
        executeQuery(
          'UPDATE users SET username = ?, password = ?, img_url = ? WHERE user_id = ?',
          [username, password, imgUrl, route.params.user_id]
        );
      } else {
        executeQuery(
          'INSERT INTO users (username, password, img_url) VALUES (?, ?, ?)',
          [username, password, imgUrl]
        );
      }
      navigation.navigate('HOMEPAGE');
      setUsername('');
      setPassword('');
      setImg('');
    }
  };

  return (
    <View
      style={{
        margin: 15,
      }}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={imgUrl === '' ? styles.button : false}
        onPress={selectImage}>
        {imgUrl === '' ? (
          <Text style={styles.buttonText}>Set Image</Text>
        ) : (
          <Image source={{ uri: imgUrl }} style={styles.imageView} />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 1000,
  },
  buttonText: { color: 'white' },
  imageView: {
    width: 300,
    height: 300,
    marginHorizontal: 40,
    marginVertical: 15,
  },
});

export default AddList;
