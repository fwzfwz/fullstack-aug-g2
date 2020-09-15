import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {setLogout} from '../redux/authAction';
import {connect} from 'react-redux';

const Home = ({navigation, route, logout}) => {
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
            backgroundColor: 'red',
            padding: 10,
            alignItems: 'center',
          }}
          onPress={() => logout()}>
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {entries.map((l) => (
          <ListItem key={l.id} bottomDivider onPress={() => console.log(l)}>
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

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(setLogout()),
  };
}

export default connect(null, mapDispatchToProps)(Home);
