import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
import { SocialMediaIcons } from "../../constants/enums";

const NameAndTitle = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);

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
          sx={{ padding: 0.2 }}
        >
          <IconComponent fontSize="small" />
        </IconButton>
      );
    }
    return null;
  });

  return (
    <Box
      //  border={1}
      minHeight="30px"
      display="flex"
      flexDirection="row"
      maxHeight="120px"
    >
      <Box
        // border={1}
        // borderColor="blue"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1}
        maxWidth="90px"
      >
        <Box
          //   border={1}
          //   borderColor="green"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50px"
          height="50px"
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
          variant="h3"
          sx={{
            mt: "-0.25em", // מוריד את הטקסט קצת למעלה
            lineHeight: "normal", // ניתן לשחק עם ערך זה כדי ליישר לפי הגובה הרגיל
          }}
        >
          {event.lecturer.name.hebrew}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: "-0.1em", // מקטין את המרווח התחתון של הטקסט
            // lineHeight: "normal", // ניתן לשחק עם ערך זה כדי ליישר לפי הגובה הרגיל
          }}
        >
          {event.title.hebrew}
        </Typography>
      </Box>
    </Box>
  );
};

export default NameAndTitle;