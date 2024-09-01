import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../../../contexts/EventContext";
import { Box, Typography, Grid } from "@mui/material";
import YouTubePlayer from "../../../components/event_details/YouTubePlayer.jsx";
import NameAndTitle from "../../../components/event_details/NameAndTitle";
import TimeAndAddress from "../../../components/event_details/TimeAndAddress";
import Tags from "../../../components/event_details/Tags";
import BottomButtons from "../../../components/event_details/BottomButtons";

const EventDetailsViewMobile = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="20px" sx={{ padding: 2, marginTop: "40px" }}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" borderRadius="25px" overflow="hidden">
        {event.eventType !== "onsite" ? (
          <YouTubePlayer videoId={event.youtubeId} isMobile={true} />
        ) : (
          <img
            src={event.imageUrl || defaultImageUrl}
            alt="Event"
            style={{ width: "300px", maxHeight: "170px", objectFit: "cover", objectPosition: "top" }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap="40px" justifyContent="space-between" width="270px">
        <Box display="flex" flexDirection="column" gap="13px" justifyContent="space-between">
          <NameAndTitle eventId={event.id} />
          <TimeAndAddress eventId={event.id} />
        </Box>
        <Typography
          //   variant="body1"
          sx={{
            fontWeight: 200,
            color: "grey",
            // display: "-webkit-box",
            // overflow: "hidden",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: 5,
            // textOverflow: "ellipsis",
          }}
        >
          {event.description.hebrew}
        </Typography>

        <Tags eventId={event.id} />
        <BottomButtons eventId={event.id} />
      </Box>
    </Box>
  );
};

export default EventDetailsViewMobile;
