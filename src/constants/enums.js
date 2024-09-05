import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import { Tag } from "@mui/icons-material";

export const SocialMediaIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  myspace: GroupsIcon,
  twitter: XIcon,
  website: LanguageIcon,
};

export const EventType = {
  REMOTE: "remote",
  ONSITE: "onsite",
  HYBRID: "hybrid",
};

export const FilterType = {
  TOPICS: "tags",
  TIME: "times",
  LOCATION: "location",
  LANGUAGE: "languages",
};

// export const Language = ["hebrew", "english"];

// export const Language = {
//   hebrew: "עברית",
//   english: "אנגלית",
// };

// export const Cities = {
//   TELAVIV: "תל אביב",
//   JERUSALEM: "ירושלים",
//   RAMATGAN: "רמת גן",
//   AFULA: "עפולה",
//   EILAT: "אילת",
//   GEDERA: "גדרה",
//   KIRYATSHEMONA: "קרית שמונה",
//   HERZLIYA: "הרצליה",
//   HANATON: "קיבוץ חנתון",
// };

// export const Countries = {
//   USA: 'ארה"ב',
//   THAILAND: "תאילנד",
//   ENGLAND: "אנגליה",
//   FRANCE: "צרפת",
//   CANADA: "קנדה",
// };

export const TimeSlot = {
  fridayMorning: "7:00 - 13:00",
  fridayNoon: "13:00 - 16:00",
  fridayEvening: "16:00 - 20:00",
  saturdayMorning: "7:00 - 13:00",
  saturdayNoon: "13:00 - 16:00",
  saturdayEvening: "16:00 - 20:00",
};
