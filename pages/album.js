import React, {useMemo} from 'react';
import {FlatList, TouchableOpacity, Text, RefreshControl} from 'react-native';
import axios from 'axios';

function Item({item, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PHOTOPAGE', item)}
      style={{
        padding: 10,
      }}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
}

function AlbumScreen({navigation}) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const memoizedList = useMemo(() => renderItems, [data]);

  React.useEffect(() => {
    axios
      .get(
        `http://jsonplaceholder.typicode.com/albums?_start=${
          currentPage * 30 - 29
        }&_limit=30`,
      )
      .then((resp) => setData((data) => [...data, ...resp.data]))
      .catch((err) => console.error(err))
      .then(() => setLoading(false));
  }, [currentPage]);

  function loadMore() {
    setCurrentPage(currentPage + 1 * 30 - 29);
  }

  function renderItems({item}) {
    return <Item item={item} navigation={navigation} />;
  }

  return (
    <>
      {isLoading ? (
        <Text>ODADING</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={memoizedList}
          keyExtractor={(item) =>
            (Math.random().toString() + item.id).toString()
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setLoading(true);
                setCurrentPage(1);
                setLoading(false);
              }}
            />
          }
        />
      )}
    </>
  );
}

export default AlbumScreen;
