import React from 'react';
import useFormattedDate from '../hooks/useFormattedDate';
import { EventType } from '../constants/enums';
import { Card, CardContent, Box, Typography, Grid, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EventTile = ({ event }) => {

  const theme = useTheme();
  const { formattedDate: startFormattedDate, formattedTime: startFormattedTime } = useFormattedDate(event.startTime);
  // const { formattedDate: endFormattedDate, formattedTime: endFormattedTime } = useFormattedDate(event.endTime);

  const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Fbackground_lg.jpg?alt=media&token=0b9a652b-07cd-445a-87b6-ae736a084a37';

  const renderEventStatus = () => {
    if (event.eventType !== 'onsite') {
      if (new Date(event.endTime) < new Date()) {
        return 'הסתיים השידור';
      } else if (new Date(event.startTime) > new Date()) {
        return 'משודר כעת';
      } else {
        return 'אונליין';
      }
    }
    return null;
  };

  return (
    <Card dir="rtl" sx={{ borderRadius: '8px'
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <CardActionArea>
        <Grid container direction="row" height={200} spacing={2}>
          <Grid item xs={2} height={180} margin={'auto'}>
            <Box
              sx={{
                height: '100%',
                backgroundImage: `url(${event.imageUrl || defaultImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                marginRight: 1,
                borderRadius: '8px',
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
            </Grid>
          <Grid item xs={10} height={200} margin={'auto'}>
            <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                <Typography variant="h4">
                  {event.lecturer.name.hebrew}
                </Typography>
                <Typography variant="h6">
                  {event.title.hebrew}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.eventType !== EventType.REMOTE && ( <p>{event.address.street.hebrew} {event.address.number}, {event.address.city.hebrew}</p>)}
                </Typography>
                <Typography variant="h6">
                  {startFormattedDate} · {startFormattedTime}
                </Typography>
                <Grid item alignSelf="flex-end">
                  {renderEventStatus() &&
                  <Typography
                    style={{ position: 'absolute', top: 10, left: 10 }}
                    >
                    {renderEventStatus()}</Typography>}
                </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>);
};

export default EventTile;