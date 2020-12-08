import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase'

export default function useAuthListener() {
  var [user, setUser] = useState(JSON.parse(localStorage.getItem('authUsers')));
  var { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    var listener = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(undefined);
      }
    });

    return function cleanUp() {
      return listener();
    }
  }, []);

  return { user };
}