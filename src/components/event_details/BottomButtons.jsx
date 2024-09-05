import React, { useContext, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useLanguage } from "../../contexts/LanguageContext";

const BottomButtons = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const { translations, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  if (!event) {
    return <div>Event not found</div>;
  }

  const createGoogleCalendarEventUrl = () => {
    const startTime = new Date(event.startTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endTime = new Date(event.endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const details = encodeURIComponent(event.description.hebrew);
    const location = encodeURIComponent(`${event.address.street.hebrew} ${event.address.number}, ${event.address.city.hebrew}`);
    const title = encodeURIComponent(event.title.hebrew);

    return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  const handleAddToGoogleCalendar = () => {
    const url = createGoogleCalendarEventUrl();
    window.open(url, "_blank");
  };

  const handleOpen = () => {
    setOpen(true);
    navigator.clipboard.writeText(window.location.href); // Copy the event URL to clipboard
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = (platformUrl) => {
    window.open(platformUrl, "_blank");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignSelf: "stretch" }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        startIcon={<ShareOutlinedIcon style={{ fontSize: "14px" }} />}
        sx={{ gap: 1, fontSize: "13px" }}
      >
        {translations.shareEvent}
      </Button>
      <Dialog dir={lang === "hebrew" ? "rtl" : "ltr"} open={open} onClose={handleClose}>
        <DialogTitle>{translations.share}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton onClick={() => handleShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}>
              <FacebookIcon />
            </IconButton>
            <IconButton onClick={() => handleShare(`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`)}>
              <InstagramIcon />
            </IconButton>
            <IconButton onClick={() => handleShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)}>
              <TwitterIcon />
            </IconButton>
            <IconButton onClick={() => handleShare(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`)}>
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {translations.close}
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        onClick={handleAddToGoogleCalendar}
        startIcon={<ViewListIcon style={{ fontSize: "18px" }} />}
        sx={{ gap: 1, fontSize: "13px" }}
      >
        {translations.addToCalendar}
      </Button>
    </Box>
  );
};

export default BottomButtons;
