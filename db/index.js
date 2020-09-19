import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

const db = SQLite.openDatabase(
  {
    name: 'SQLite',
  },
  () => console.log('con opened'),
  (error) => {
    console.log(error);
  },
);

const executeQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
          console.error(error);
        },
      );
    });
  });

// executeQuery('DROP TABLE IF EXISTS users');
// executeQuery(
//   'CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, img_url TEXT NOT NULL)',
// );
// executeQuery(
//   'INSERT INTO users (username, password, img_url) VALUES (?, ?, ?)',
//   [
//     'user1',
//     'pw1',
//     'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//   ],
// );

export default executeQuery;
