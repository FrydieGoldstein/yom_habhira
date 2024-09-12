import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
import useFormattedDate from "../../hooks/useFormattedDate";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useLanguage } from "../../contexts/LanguageContext";

const TimeAndAddress = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const { lang } = useLanguage();

  const { formattedDate: startFormattedDate, formattedTime: startFormattedTime } = useFormattedDate(event.startTime);

  return (
    <Box display="flex" flexDirection="column" gap="9px">
      <Box display="flex" flexDirection="row" alignItems="center" gap="20px">
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <ScheduleIcon sx={{ fontSize: "22px", opacity: 0.7 }} />
          <Typography fontSize="16px">{startFormattedTime}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <CalendarTodayOutlinedIcon sx={{ fontSize: "18px", opacity: 0.7 }} />
          <Typography fontSize="16px"> {startFormattedDate}</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" gap="4px">
        <PlaceOutlinedIcon sx={{ fontSize: "24px", opacity: 0.6, marginRight: "-1.1px" }} />
        <Typography fontSize="16px">
          {event.address.street[lang]} {event.address.number}, {event.address.city[lang]}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeAndAddress;
