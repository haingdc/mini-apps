import React, { useContext, useEffect, useState } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';
import { Header, Loading } from '../components';

export function BrowseContainer({ slides }) {
  var [profile, setProfile] = useState({});
  var [loading, setLoading] = useState(true);
  var { firebase } = useContext(FirebaseContext);
  var user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);
  return profile.displayName ? (
    <>
      {loading ? (
        <Loading src={user.photoURL} />
      ) : (
        <Loading.ReleaseBody />
      )}
      <Header src="joker1">
        <p>Hello</p>
      </Header>
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}