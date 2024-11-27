//events.js
//Functions to fetch data from events

import { apiMakeRequest } from "../services/apiMakeRequest";

let baseUrl = "https://firestore.googleapis.com/v1/projects/yotzim-basalon-dev/databases/(default)/documents:runQuery";

export const readLecturersWithTalks = async () => {
  const body = {
    structuredQuery: {
      from: [{ collectionId: "events" }],
      where: {
        compositeFilter: {
          op: "AND",
          filters: [
            {
              fieldFilter: {
                field: { fieldPath: "lecturer.name.english" },
                op: "NOT_EQUAL",
                value: { stringValue: "" },
              },
            },
          ],
        },
      },
      select: {
        fields: [{ fieldPath: "lecturer.name.english" }, { fieldPath: "title.english" }],
      },
    },
  };

  return await apiMakeRequest(baseUrl, "POST", body);
};

export const getLecturersAndTalks = async () => {
  const response = await readLecturersWithTalks();

  const lecturersWithTalks = {};

  response.forEach((item) => {
    if (item.document) {
      const fields = item.document.fields;
      const lecturerName = fields?.lecturer?.mapValue?.fields?.name?.mapValue?.fields?.english?.stringValue;
      const eventTitle = fields?.title?.mapValue?.fields?.english?.stringValue;

      if (lecturerName && eventTitle) {
        if (!lecturersWithTalks[lecturerName]) {
          lecturersWithTalks[lecturerName] = [];
        }
        lecturersWithTalks[lecturerName].push(eventTitle);
      }
    }
  });

  return lecturersWithTalks;
};

// import { readEvents } from "../crud/readEvent";

// export const getLecturersAndTalks = async () => {
//   const response = await readEvents();

//   const events = response.documents;
//   if (!Array.isArray(events)) {
//     throw new Error("Expected 'documents' to be an array");
//   }

//   const lecturersWithTalks = {};

//   events.forEach((event) => {
//     const lecturerName = event.fields?.lecturer?.mapValue?.fields?.name?.mapValue?.fields?.english?.stringValue;
//     const eventTitle = event.fields?.title?.mapValue?.fields?.english?.stringValue;

//     if (lecturerName && eventTitle) {
//       if (!lecturersWithTalks[lecturerName]) {
//         lecturersWithTalks[lecturerName] = [];
//       }
//       lecturersWithTalks[lecturerName].push(eventTitle);
//     }
//   });

//   return lecturersWithTalks;
// };
