import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDar1jaAoE8iRYsq_oz_grC0HaZKuwbKag',
  authDomain: 'hr-management-9ca98.firebaseapp.com',
  databaseURL: 'https://hr-management-9ca98.firebaseio.com',
  projectId: 'hr-management-9ca98',
  storageBucket: 'hr-management-9ca98.appspot.com',
  messagingSenderId: '611661964282',
  appId: '1:611661964282:web:3d82ac5bc14858aad77a43',
  measurementId: 'G-KHL531JPY9',
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();