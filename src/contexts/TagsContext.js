// TagsContext.js
import React, { createContext, useState, useEffect } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, 'tags'));
      const tagsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTags(tagsData);
      console.log(tagsData);
    };

    fetchTags();
  }, []);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};
