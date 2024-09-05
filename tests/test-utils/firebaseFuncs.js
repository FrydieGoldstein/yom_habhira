import { collection, getDocs } from "firebase/firestore";
import db from "../../src/firebaseConfig";

export const getEventCountFromDatabase = async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.size;
};
