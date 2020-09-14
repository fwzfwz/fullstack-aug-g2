import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';

const AddList = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [imgUrl, setUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    if (route.params?.data) {
      const {name, imgUrl, subtitle} = route.params.data;
      setName(name);
      setUrl(imgUrl);
      setSubtitle(subtitle);
    }
  }, []);

  return (
    <View
      style={{
        margin: 15,
      }}>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Image URL"
        value={imgUrl}
        onChangeText={(text) => setUrl(text)}
      />
      <Input
        placeholder="Subtitle"
        value={subtitle}
        onChangeText={(text) => setSubtitle(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          margin: 20,
          alignItems: 'center',
          borderRadius: 1000,
        }}
        onPress={() => {
          if (route.params?.data) {
            let data = route.params.data;
            data.name = name;
            data.imgUrl = imgUrl;
            data.subtitle = subtitle;
            navigation.navigate('Home', {
              data,
              isAdd: false,
            });
          } else {
            let data = {};
            data.name = name;
            data.imgUrl = imgUrl;
            data.subtitle = subtitle;
            navigation.navigate('Home', {
              data,
              isAdd: true,
            });
          }
        }}>
        <Text style={{color: 'white'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddList;
