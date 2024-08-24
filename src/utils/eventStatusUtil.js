import { EventType } from "../constants/enums";

export const renderEventStatus = (event) => {
  if (event.eventType !== EventType.ONSITE) {
    if (new Date(event.startTime) < new Date()) {
      if (new Date(event.endTime) < new Date()) {
        return "הסתיים השידור";
      } else {
        return "משודר כעת";
      }
    } else {
      return "אונליין";
    }
  }
  return null;
};
