import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { seedDatabase } from '../seed';
// we need to somehow seed the database

// we need a config here

var config = {
  apiKey: "AIzaSyCpzY1ubmRg5T32DDFDzmM63zqWyiRmVd4",
  authDomain: "netflix-8b1de.firebaseapp.com",
  projectId: "netflix-8b1de",
  storageBucket: "netflix-8b1de.appspot.com",
  messagingSenderId: "1099027447810",
  appId: "1:1099027447810:web:07dfcf1ab4d52ba028a71b"
};

var firebase = Firebase.initializeApp(config);
// seedDatabase(firebase);

export { firebase };