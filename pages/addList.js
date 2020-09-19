import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import executeQuery from '../db';

const AddList = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imgUrl, setImg] = useState('');
  const [isVisible, setVisible] = useState(false);

  let camera = React.useRef(null);

  useEffect(() => {
    if (route.params) {
      const {username, password, img_url} = route.params;
      setUsername(username);
      setPassword(password);
      setImg(img_url);
    }
  }, [route.params]);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.1, base64: true};
      const data = await camera.takePictureAsync(options);
      setImg(data.uri);
    }
    setVisible(false);
  };

  return (
    <>
      <View
        style={{
          margin: 15,
        }}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Image source={{uri: imgUrl}} style={styles.cameraView} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Set Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (route.params) {
              executeQuery(
                'UPDATE users SET username = ?, password = ?, img_url = ? WHERE user_id = ?',
                [username, password, imgUrl, route.params.user_id],
              );
            } else {
              executeQuery(
                'INSERT INTO users (username, password, img_url) VALUES (?, ?, ?)',
                [username, password, imgUrl],
              );
            }
            navigation.navigate('HOMEPAGE');
            setUsername('');
            setPassword('');
            setImg('');
          }}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Overlay isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
        <>
          <RNCamera
            ref={(ref) => {
              camera = ref;
            }}
            style={styles.cameraView}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <TouchableOpacity onPress={() => takePicture()} style={styles.button}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </>
      </Overlay>
    </>
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
  buttonText: {color: 'white'},
  cameraView: {
    width: 150,
    height: 150,
    marginHorizontal: 100,
    marginVertical: 25,
  },
});

export default AddList;
