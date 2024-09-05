import React, { useContext } from "react";
import { Card, CardContent, Box, Typography, CardMedia, CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../../contexts/EventContext";
import useFormattedDate from "../../../hooks/useFormattedDate";
import { renderEventStatus } from "../../../utils/eventStatusUtil";
import { useLanguage } from "../../../contexts/LanguageContext";

const EventTileMobile = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const navigate = useNavigate();
  const theme = useTheme();
  const { translations, lang } = useLanguage();

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
    <Card sx={{ borderRadius: "12px", backgroundColor: "primary.light", paddingRight: "5px" }}>
      <CardActionArea onClick={handleCardClick}>
        <Box display="flex" alignItems="center" height="95px">
          <CardMedia display="flex">
            <Box
              sx={{
                height: "82px",
                width: "82px",
                backgroundImage: `url(${event.imageUrl || defaultImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                borderRadius: "12px",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </CardMedia>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", height: "82px", marginBottom: "-10px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>{event.lecturer.name[lang]}</Typography>
                <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>{event.title[lang]}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 300, fontSize: "12px", whiteSpace: "nowrap" }}>{renderEventStatus(event, translations)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 400, fontSize: "11px" }}>
                {startFormattedTime} · {startFormattedDate}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default EventTileMobile;
