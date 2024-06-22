import React from 'react';
import useFormattedDate from '../hooks/useFormattedDate';
import { EventType } from '../constants/enums';

const EventTile = ({ event }) => {

  const { formattedDate: startFormattedDate, formattedTime: startFormattedTime } = useFormattedDate(event.startTime);
  // const { formattedDate: endFormattedDate, formattedTime: endFormattedTime } = useFormattedDate(event.endTime);

  const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37';

  const renderEventStatus = () => {
    if (event.eventType !== 'onsite') {
      if (new Date(event.endTime) < new Date()) {
        return 'הסתיים השידור';
      } else if (new Date(event.startTime) > new Date()) {
        return 'משודר כעת';
      } else {
        return 'אונליין';
      }
    }
    return null;
  };

  return (
    <div
    // dir="rtl"
    >
      <img src={event.imageUrl || defaultImageUrl} alt={event.title.hebrew} />
      <h2>{event.lecturer.name.hebrew}</h2>
      {renderEventStatus() && <p>{renderEventStatus()}</p>}
      <h3>{event.title.hebrew}</h3>
      {event.eventType !== EventType.REMOTE && ( <p>{event.address.street.hebrew} {event.address.number}, {event.address.city.hebrew}</p>)}
      <p>{startFormattedDate} · {startFormattedTime}</p>
    </div>);
};

export default EventTile;