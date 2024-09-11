import { EventType } from "../constants/enums";

export const renderEventStatus = (event, translations) => {
  if (event.eventType !== EventType.ONSITE) {
    if (new Date(event.startTime) < new Date()) {
      if (new Date(event.endTime) < new Date()) {
        return translations.broadcastEnded;
      } else {
        return translations.broadcasting;
      }
    } else {
      return translations.online;
    }
  }
  return null;
};
