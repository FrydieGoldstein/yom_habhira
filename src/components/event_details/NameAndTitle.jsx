import React, { useContext } from "react";
import { Box, Typography, IconButton, responsiveFontSizes } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
import { SocialMediaIcons } from "../../constants/enums";
import { useLanguage } from "../../contexts/LanguageContext";

const NameAndTitle = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const { lang } = useLanguage();

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

  if (!event) {
    return <div>Event not found</div>;
  }

  const socialMediaIcons = Object.keys(event.lecturer.socialMediaLinks || {}).map((key) => {
    const IconComponent = SocialMediaIcons[key.toLowerCase()];
    if (IconComponent) {
      return (
        <IconButton
          key={key}
          component="a"
          href={event.lecturer.socialMediaLinks[key]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 0.2 }}
        >
          <IconComponent style={{ fontSize: "16px" }} />
        </IconButton>
      );
    }
    return null;
  });

  return (
    <Box minHeight="30px" display="flex" flexDirection="row" gap="10px" maxHeight="120px" width="100%">
      <Box
        // border={1}
        // borderColor="blue"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        // flexGrow={1}
        maxWidth="90px"
      >
        <Box
          //   border={1}
          //   borderColor="green"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="40x"
          height="40px"
          sx={{
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src={event.imageUrl || defaultImageUrl}
            alt="Lecturer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          // border={1} borderColor="yellow"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          {socialMediaIcons}
        </Box>
      </Box>
      <Box
        //   border={1} borderColor="red"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flexGrow={1}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "22px",
            // mt: "-0.25em", // מוריד את הטקסט קצת למעלה
            // lineHeight: "normal", // ניתן לשחק עם ערך זה כדי ליישר לפי הגובה הרגיל
          }}
        >
          {event.lecturer.name[lang]}
        </Typography>
        <Typography
          sx={{
            fontWeight: "450",
            fontSize: "16px",
            // mb: "-0.3em", // מקטין את המרווח התחתון של הטקסט
            // lineHeight: "normal", // ניתן לשחק עם ערך זה כדי ליישר לפי הגובה הרגיל
          }}
        >
          {event.title[lang]}
        </Typography>
      </Box>
    </Box>
  );
};

export default NameAndTitle;
