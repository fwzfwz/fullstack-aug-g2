import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

const Home = ({navigation, route}) => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: 'Amy Farha',
      imgUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      id: 2,
      name: 'Chris Jackson',
      imgUrl:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ]);

  useEffect(() => {
    if (route.params) {
      if (route.params.isAdd) {
        addImage(route.params?.data);
      } else {
        editImage(route.params.data.id, route.params.data);
      }
    }
    console.log(route.params?.data);
    console.log(route.params?.isAdd);
    console.log(entries);
  }, [route.params?.data]);

  const addImage = (data) => {
    let oldEntry = entries;
    oldEntry.push({
      id: Math.floor(Math.random() * 100) + 1,
      name: data.name,
      imgUrl: data.imgUrl,
      subtitle: data.subtitle,
    });
    setEntries(oldEntry);
  };

  const editImage = (imageId, data) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === imageId) {
          entry = data;
          return entry;
        } else {
          return entry;
        }
      }),
    );
  };

  const removeImage = (imageId) => {
    setEntries(entries.filter((entry) => entry.id !== imageId));
  };

  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <View>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 1000,
            backgroundColor: '#007bff',
            padding: 10,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Album List')}>
          <Text style={{color: 'white'}}>Go To Album Page -></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 1000,
            backgroundColor: '#007bff',
            padding: 10,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Input Page')}>
          <Text style={{color: 'white'}}>Add New +</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {entries.map((l) => (
          <ListItem
            key={l.id}
            bottomDivider
            onPress={() => {
              navigation.navigate('Input Page', {data: l});
            }}>
            <Avatar source={{uri: l.imgUrl}} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={() => removeImage(l.id)}>
              <Icon name="delete" size={30} color="red" />
            </TouchableOpacity>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
