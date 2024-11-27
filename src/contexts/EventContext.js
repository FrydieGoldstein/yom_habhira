import React, { createContext, useState, useEffect } from "react";
import db from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventData = [];
      querySnapshot.forEach((doc) => {
        eventData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventData);
      console.log(eventData);
    };

    fetchEvents();
  }, []);

  return <EventContext.Provider value={{ events, setEvents }}>{children}</EventContext.Provider>;
};

// import React, { createContext, useState, useEffect } from "react";
// import { makeRequest } from "../services/api";

// export const EventContext = createContext();

// export const EventProvider = ({ children }) => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await makeRequest("https://firestore.googleapis.com/v1/projects/yotzim-basalon-dev/databases/(default)/documents/events", "GET");
//         const eventData = data.documents.map((doc) => ({
//           id: doc.name.split("/").pop(),
//           ...doc.fields,
//         }));
//         setEvents(eventData);
//         console.log(eventData);
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return <EventContext.Provider value={{ events, setEvents }}>{children}</EventContext.Provider>;
// };
