import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

const db = SQLite.openDatabase(
  {
    name: 'SQLite',
    createFromLocation: '~SQLite.db',
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
        },
      );
    });
  });

// executeQuery('CREATE TABLE IF NOT EXISTS users (username, password)', []);
// executeQuery('INSERT INTO dbo.users (username, password) VALUES (?, ?)', [
//   'user1'.toString(),
//   'pw1'.toString(),
// ]);

export default executeQuery;
