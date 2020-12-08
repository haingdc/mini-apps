import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useContent(target) {
  var [content, setContent] = useState([]);
  var { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then(snapshot => {
        var allContent = snapshot.docs.map(contentObj => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        setContent(allContent);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  return { [target] : content };
}