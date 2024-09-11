//firebaseFuncs
// This file contains functions that interact with the Firebase database.

import { collection, getDocs } from "firebase/firestore";
import db from "../../src/firebaseConfig";

export const fetchEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchTags = async () => {
  const querySnapshot = await getDocs(collection(db, "tags"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchOrFilterEventsByTags = async (tagNames = []) => {
  let selectedTagIds = [];
  const allEvents = await fetchEvents();
  let filteredEvents = allEvents;

  // סינון לפי תגיות, אם נשלחו תגיות
  if (tagNames.length > 0) {
    const allTags = await fetchTags();
    selectedTagIds = allTags
      .filter((tag) => tagNames.includes(tag.title.english.toLowerCase())) // התאמה לפי שם התג באנגלית
      .map((tag) => tag.id);
    filteredEvents = allEvents.filter((event) => event.tags.some((tag) => selectedTagIds.includes(tag.id)));
  }

  // החזרת כל האירועים המסוננים
  return filteredEvents;
};

// // דוגמה לשימוש בפונקציה:
// const tagNames = ['Tables', 'Bible']; // שמות התגים לסינון
// fetchAndFilterEventsByTags(tagNames).then(result => {
//   console.log(`Number of events: ${result.eventCount}`);
//   console.log(`Lecturers: ${result.lecturerNames.join(", ")}`);
// });

// export const getEventCountFromDatabase = async () => {
//   const querySnapshot = await getDocs(collection(db, "events"));
//   return querySnapshot.size;
// };
