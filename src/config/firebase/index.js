import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbuNm7RRRZ97oUKyv5lknxo1FWXGQUOC8',
  authDomain: 'fullstack-aug-g2.firebaseapp.com',
  databaseURL: 'https://fullstack-aug-g2.firebaseio.com',
  projectId: 'fullstack-aug-g2',
  storageBucket: 'fullstack-aug-g2.appspot.com',
  messagingSenderId: '74948017096',
  appId: '1:74948017096:web:01c9367f87cc21e4825efd',
  measurementId: 'G-PBXQBTMM3L',
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
