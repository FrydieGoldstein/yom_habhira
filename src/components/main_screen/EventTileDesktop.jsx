import React, { useContext } from "react";
import useFormattedDate from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/hooks/useFormattedDate";
import { renderEventStatus } from "../../utils/eventStatusUtil";
import { Card, Divider, CardMedia, CardContent, Typography, Grid, CardActionArea, CardActions, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { EventContext } from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/contexts/EventContext";
import Tags from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/components/event_details/Tags";
import { grey } from "@mui/material/colors";

const EventTileDesktop = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const navigate = useNavigate();
  const theme = useTheme();

  const { formattedDate: startFormattedDate, formattedTime: startFormattedTime } = useFormattedDate(event ? event.startTime : null);

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37";

  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };
  return (
    <Card sx={{ borderRadius: "8px", border: "1px solid #3F1E5B", boxShadow: "none", height: "320px" }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{
            borderRadius: "8px",
            height: "170px",
            objectFit: "cover",
            objectPosition: "top",
          }}
          image={event.imageUrl || defaultImageUrl}
          title="lecturer"
        />
        <CardContent flex={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "70px" }}>
          <Box sx={{ height: "50px", marginTop: "0px" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>{event.lecturer.name.hebrew}</Typography>
              {renderEventStatus(event) && <Typography sx={{ fontSize: "11px", color: grey[700] }}>{renderEventStatus(event)}</Typography>}
            </Box>
            <Typography sx={{ fontSize: "9px", fontWeight: "400" }}>
              {startFormattedDate} · {startFormattedTime}
            </Typography>
          </Box>
          <Box sx={{ height: "40px" }}>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                textOverflow: "ellipsis",
                fontSize: "11px",
                color: grey[400],
              }}
            >
              {event.description.hebrew}
            </Typography>
          </Box>
        </CardContent>
        <Divider variant="middle" sx={{ borderColor: "black", opacity: 0.5 }} />
      </CardActionArea>
      <CardActions
        sx={{
          height: "30px",
        }}
      >
        <Tags eventId={event.id} />
      </CardActions>
    </Card>
  );
};

export default EventTileDesktop;
