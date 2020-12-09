import React, { useContext } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';

export function BrowseContainer({ slides }) {
  var { firebase } = useContext(FirebaseContext);
  console.log(firebase.auth())
  var user = firebase.auth().currentUser || {};
  return <SelectProfileContainer user={user} />
}