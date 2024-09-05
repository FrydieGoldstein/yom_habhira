import { EventType } from "../constants/enums";

export const renderEventStatus = (event, translations) => {
  if (event.eventType !== EventType.ONSITE) {
    if (new Date(event.startTime) < new Date()) {
      if (new Date(event.endTime) < new Date()) {
        return translations.BroadcastEnded;
      } else {
        return translations.Broadcasting;
      }
    } else {
      return translations.Online;
    }
  }
  return null;
};
