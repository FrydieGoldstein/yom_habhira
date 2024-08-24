import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import { Box, Typography, Grid, AppBar, Toolbar, IconButton } from "@mui/material";
import YouTubePlayer from "../components/event_details/YouTubePlayer.jsx";
import NameAndTitle from "../components/event_details/NameAndTitle";
import { SocialMediaIcons } from "../constants/enums";
import TimeAndAddress from "../components/event_details/TimeAndAddress";
import { renderEventStatus } from "../utils/eventStatusUtil";
import { grey } from "@mui/material/colors";
import Tags from "../components/event_details/Tags";
import BottomButtons from "../components/event_details/BottomButtons";
import GBFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/gb-flag.png";
import ILFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/il-flag.png";

const EventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === id);
  const language = "en";

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

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
          <IconComponent style={{ fontSize: "11px" }} />
        </IconButton>
      );
    }
    return null;
  });

  return (
    <Box dir="rtl" display="flex" justifyContent="center" style={{ padding: "20px" }}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <IconButton aria-label="logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Ftitle_app.png?alt=media&token=56ccf286-4be4-4891-b91e-1a2c536ff64e"
                alt="logo"
                style={{ height: 50 }}
              />
            </IconButton>

            <Box display="flex" justifyContent="end" width="150px">
              {/* לבדוק את העניין עם הרוחב אם להוסיף גם ללוגו */}
              <IconButton onClick={() => {}} aria-label="language-toggle">
                <img src={language === "en" ? GBFlag : ILFlag} alt="language flag" style={{ height: 20, width: 25 }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" sx={{ marginTop: "80px" }} width="70%">
        <Box>
          <Typography fontSize="18px" fontWeight="500" marginBottom="10px" marginRight="5px">
            {event.lecturer.name.hebrew} - {event.title.hebrew}
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="stretch" gap="30px" justifyContent="flex-start" mb="10px">
          <Box borderRadius="25px" overflow="hidden" sx={{ height: "280px" }} border="1px solid black">
            {event.eventType !== "onsite" ? (
              <YouTubePlayer videoId={event.youtubeId} />
            ) : (
              <img src={event.imageUrl || defaultImageUrl} alt="Event" style={{ maxWidth: "498px", maxHeight: "280px" }} />
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            padding="20px"
            // height="280px"
            sx={{ borderRadius: "25px", border: "1px solid", overflow: "hidden" }}
          >
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="40%">
              {renderEventStatus(event) && (
                <Typography alignSelf="center" sx={{ fontSize: "13px", color: grey[700] }}>
                  {renderEventStatus(event)}
                </Typography>
              )}
              <TimeAndAddress eventId={event.id} />
            </Box>
            <BottomButtons eventId={event.id} />
          </Box>
        </Box>
        {/* <NameAndTitle eventId={event.id} /> */}
        <Box display="flex" justifyContent="start" alignItems="center" gap="6px" mb="15px">
          <Box
            //   border={1}
            //   borderColor="green"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="40px"
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
          <Box display="flex" flexDirection="column">
            <Typography fontSize="13px">{event.lecturer.name.hebrew}</Typography>
            <Box display="flex" gap="3px">
              <Typography fontSize="13px"> עקבו אחריי </Typography>
              {socialMediaIcons}
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            textOverflow: "ellipsis",
            fontSize: "11px",
            color: grey[500],
            mr: "5px",
            mb: "15px",
          }}
        >
          {event.description.hebrew}
        </Typography>
        <Tags eventId={event.id} />
      </Box>
    </Box>
  );
};

export default EventDetails;

// import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { EventContext } from "../contexts/EventContext";
// import { Box, Typography, Grid } from "@mui/material";
// import YouTubePlayer from "../components/event_details/YouTubePlayer.jsx";
// import NameAndTitle from "../components/event_details/NameAndTitle";
// import TimeAndAddress from "../components/event_details/TimeAndAddress";
// import Tags from "../components/event_details/Tags";
// import BottomButtons from "../components/event_details/BottomButtons";

// const EventDetails = () => {
//   const { id } = useParams();
//   const { events } = useContext(EventContext);
//   const event = events.find((e) => e.id === id);

//   if (!event) {
//     return <div>Event not found</div>;
//   }

//   const defaultImageUrl =
//     "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

//   return (
//     <Box dir="rtl" sx={{ padding: 2 }}>
//       <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
//         <Grid item xs={12} md={8}>
//           {event.eventType !== "onsite" ? (
//             <YouTubePlayer videoId={event.youtubeId} />
//           ) : (
//             <img src={event.imageUrl || defaultImageUrl} alt="Event" style={{ width: "100%", borderRadius: "8px" }} />
//           )}
//         </Grid>
//         <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//           <NameAndTitle eventId={event.id} />
//           <TimeAndAddress eventId={event.id} />
//           <Typography
//             variant="body1"
//             sx={{
//               display: "-webkit-box",
//               overflow: "hidden",
//               WebkitBoxOrient: "vertical",
//               WebkitLineClamp: 5,
//               textOverflow: "ellipsis",
//             }}
//           >
//             {event.description.hebrew}
//           </Typography>

//           <Tags eventId={event.id} />
//           <BottomButtons eventId={event.id} />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default EventDetails;
