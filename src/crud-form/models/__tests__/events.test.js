import { getLecturersAndTalks } from "../events";

test("should fetch lecturers and their talks with a focused query", async () => {
  try {
    const lecturersWithTalks = await getLecturersAndTalks();
    console.log("Lecturers with their talks (focused query):", lecturersWithTalks);
  } catch (error) {
    console.error("Test failed with error:", error);
  }
});

// import { readEvents } from "../../crud/readEvent";

// test("should fetch lecturers and their talks", async () => {
//   try {
//     const events = await readEvents();
//     console.log("Events fetched from API:", events);

//     const lecturersWithTalks = await getLecturersAndTalks();
//     console.log("Lecturers with their talks:", lecturersWithTalks);
//   } catch (error) {
//     console.error("Test failed with error:", error);
//   }
// });
