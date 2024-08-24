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
