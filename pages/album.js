import React from 'react';
import {FlatList, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

function AlbumScreen() {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [albumId, setAlbumId] = React.useState('');
  const [filteredData, setFilteredData] = React.useState('');

  const [pageItem, setPageItem] = React.useState(10);

  const [pages, setPages] = React.useState([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    const startIndex = currentPage * pageItem - pageItem;
    if (!albumId) {
      fetch(
        `http://jsonplaceholder.typicode.com/albums?_start=${startIndex}&_limit=${pageItem}`,
      )
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else if (albumId) {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=${startIndex}&_limit=${pageItem}`,
      )
        .then((res) => res.json())
        .then((json) => setFilteredData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [currentPage, pageItem, albumId]);

  function Item({item, onPress, isActive}) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginVertical: 10,
          marginHorizontal: 15,
          backgroundColor: isActive ? '#007BFF' : 'white',
        }}>
        <Text style={{color: isActive ? 'white' : '#007BFF'}}>{item}</Text>
      </TouchableOpacity>
    );
  }

  function handleChangePage(item) {
    setCurrentPage(item);
    setPages((pages) =>
      pages.map((page) => {
        if (currentPage < item) {
          return page + (item - currentPage);
        } else if (currentPage > item || currentPage === item) {
          return page - 1;
        }
      }),
    );
  }

  return (
    <>
      {isLoading ? (
        <Text>ODADING</Text>
      ) : filteredData ? (
        <ScrollView>
          {filteredData.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.thumbnailUrl}} />
              <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
          <FlatList
            horizontal={true}
            data={pages}
            renderItem={({item}) => (
              <Item
                item={item}
                onPress={() => handleChangePage(item)}
                isActive={item === currentPage ? true : false}
              />
            )}
            keyExtractor={(item) => 'page' + item}
          />
        </ScrollView>
      ) : (
        <ScrollView>
          {data.map((item) => (
            <ListItem
              key={item.id}
              onPress={() => {
                setLoading(true);
                setAlbumId(item.id);
              }}
              bottomDivider
              horizontal>
              <Text>{item.title}</Text>
            </ListItem>
          ))}
          <FlatList
            horizontal={true}
            data={pages}
            renderItem={({item}) => (
              <Item
                item={item}
                onPress={() => handleChangePage(item)}
                isActive={item === currentPage ? true : false}
              />
            )}
            keyExtractor={(item) => 'page' + item}
            keyExtractor={(item) => 'page' + item}
          />
        </ScrollView>
      )}
    </>
  );
}

export default AlbumScreen;
