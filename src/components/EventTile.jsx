import React, { useContext } from "react";
import useFormattedDate from "../hooks/useFormattedDate";
import { EventType } from "../constants/enums";
import { Card, CardContent, Box, Typography, Grid, CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";

const EventTile = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const navigate = useNavigate();
  const theme = useTheme();

  // useEffect(() => {
  //   console.log("Event Context:", events);
  //   console.log("Event ID:", eventId);
  //   console.log("Found Event:", event);
  // }, [events, eventId, event]);

  // Always call the hook
  const { formattedDate: startFormattedDate, formattedTime: startFormattedTime } = useFormattedDate(event ? event.startTime : null);

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

  const renderEventStatus = () => {
    if (event.eventType !== "onsite") {
      if (new Date(event.startTime) < new Date()) {
        if (new Date(event.endTime) < new Date()) {
          return "הסתיים השידור";
        } else {
          return "משודר כעת";
        }
      } else {
        return "אונליין";
      }
    }
    return null;
  };

  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <Card dir="rtl" sx={{ borderRadius: "8px" }}>
      <CardActionArea onClick={handleCardClick}>
        <Grid container direction="row" height={200} spacing={2}>
          <Grid item xs={2} height={180} margin={"auto"}>
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${event.imageUrl || defaultImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                marginRight: 1,
                borderRadius: "8px",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>
          <Grid item xs={10} height={200} margin={"auto"}>
            <CardContent sx={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
              <Typography variant="h4">{event.lecturer.name.hebrew}</Typography>
              <Typography variant="h6">{event.title.hebrew}</Typography>
              <Typography variant="body2" color="text.secondary">
                {event.eventType !== EventType.REMOTE && (
                  <span>
                    {event.address.street.hebrew} {event.address.number}, {event.address.city.hebrew}
                  </span>
                )}
              </Typography>
              <Typography variant="h6">
                {startFormattedDate} · {startFormattedTime}
              </Typography>
              <Grid item alignSelf="flex-end">
                {renderEventStatus() && <Typography style={{ position: "absolute", top: 10, left: 10 }}>{renderEventStatus()}</Typography>}
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default EventTile;
