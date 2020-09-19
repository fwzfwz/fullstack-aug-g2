import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {setLogout} from '../redux/authAction';
import {connect} from 'react-redux';
import executeQuery from '../db';
import {useIsFocused} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const Home = ({navigation, route, logout}) => {
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getUsers();
    }
  }, [isFocused]);

  const getUsers = async () => {
    let temp = [];
    await executeQuery('SELECT * FROM users').then((resp) => {
      for (let i = 0; i < resp.rows.length; i++) {
        temp.push(resp.rows.item(i));
      }
    });
    await setUsers(temp);
    setLoading(false);
  };

  const removeUser = async (user_id) => {
    await executeQuery('DELETE FROM users WHERE user_id = ?', [
      user_id,
    ]).then(() => getUsers());
  };

  const Item = ({item, navigation}) => (
    <ListItem
      onLongPress={() =>
        Alert.alert('Delete', 'Delete User ?', [
          {text: 'Cancel', onPress: () => console.info('cancer')},
          {text: 'Delete', onPress: () => removeUser(item.user_id)},
        ])
      }
      onPress={() => navigation.navigate('INPUTPAGE', item)}>
      <Avatar source={{uri: item.img_url}} />
      <ListItem.Title>{item.username}</ListItem.Title>
    </ListItem>
  );

  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;

  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <View>
        <TouchableOpacity style={styles.buttonLogout} onPress={() => logout()}>
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => navigation.navigate('INPUTPAGE')}>
          <Text style={{color: 'white'}}>Add Item +</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={users}
          keyExtractor={(item) => item.user_id.toString()}
        />
      )}
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(setLogout()),
  };
}

const styles = StyleSheet.create({
  buttonAdd: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 1000,
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
  },
  buttonLogout: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 1000,
    backgroundColor: '#DC3545',
    padding: 10,
    alignItems: 'center',
  },
});

export default connect(null, mapDispatchToProps)(Home);
