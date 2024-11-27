//updateEvent.js

import { apiMakeRequest } from "../services/apiMakeRequest";

let baseUrl = "https://firestore.googleapis.com/v1/projects/yotzim-basalon-dev/databases/(default)/documents/events";

export const updateEvent = async (eventId, eventData) => {
  const url = `${baseUrl}/${eventId}`;
  return await apiMakeRequest(url, "PATCH", eventData);
};
