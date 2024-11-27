//createEvent.js

import { apiMakeRequest } from "../services/apiMakeRequest";

const baseUrl = "https://firestore.googleapis.com/v1/projects/yotzim-basalon-dev/databases/(default)/documents/events";

export const createEvent = async (eventData) => {
  return await apiMakeRequest(baseUrl, "POST", eventData);
};
