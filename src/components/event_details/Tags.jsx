import React, { useContext } from "react";
import { Box, Chip, Button } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
// import { useTheme } from "@mui/material";

const Tags = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  // const theme = useTheme();

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      {event.tags.map((tag, index) => (
        // <Chip
        //   key={index}
        //   label={tag.title.hebrew}
        //   // sx={{ marginLeft: 1 }}
        // />
        <Button key={index} onClick={() => console.log("clicked")}>
          {tag.title.hebrew}
        </Button>
      ))}
    </div>
  );
};

export default Tags;
