import React from 'react';
import {FlatList, RefreshControl, Text, Image, View} from 'react-native';
import {Avatar, ListItem, Overlay} from 'react-native-elements';
import axios from 'axios';

function Photos({navigation, route}) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [isVisible, setVisible] = React.useState(false);
  const [imageUrl, setImage] = React.useState('');

  let memoizedList = React.useMemo(() => renderItem, [data]);

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos/?albumId=${route.params.id}`,
        )
        .then((resp) => setData(resp.data))
        .catch((err) => console.error(err))
        .then(setLoading(false));
    }
  }, [isLoading]);

  function Item({item}) {
    return (
      <ListItem
        onPress={() => {
          setVisible(true);
          setImage(item.url);
        }}>
        <Avatar source={{uri: item.thumbnailUrl}} />
        <Text>{item.title}</Text>
      </ListItem>
    );
  }

  function renderItem({item}) {
    return <Item item={item} />;
  }

  return isLoading ? (
    <Text>ODADING</Text>
  ) : (
    <>
      <FlatList
        data={data}
        renderItem={memoizedList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => setLoading(true)}
          />
        }
        keyExtractor={(item) => item.id.toString()}
      />
      <Overlay isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
        <View>
          <Image style={{width: 300, height: 300}} source={{uri: imageUrl}} />
        </View>
      </Overlay>
    </>
  );
}

export default Photos;
