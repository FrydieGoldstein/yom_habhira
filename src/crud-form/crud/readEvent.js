//readEvents.js

import { apiMakeRequest } from "../services/apiMakeRequest";

let baseUrl = "https://firestore.googleapis.com/v1/projects/yotzim-basalon-dev/databases/(default)/documents/events";

export const readEvents = async () => {
  return await apiMakeRequest(baseUrl, "GET", null);
};
