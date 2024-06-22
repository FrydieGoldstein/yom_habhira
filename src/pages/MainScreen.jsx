import React, { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventTile from '../components/EventTile';

const MainScreen = () => {
  const { events } = useContext(EventContext);

  return (
    <div>
      {events.map(event => (
        <EventTile key={event.id} event={event} />
      ))}
    </div>
  );
};

export default MainScreen;