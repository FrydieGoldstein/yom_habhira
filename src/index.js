import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct ReactDOM
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { EventProvider } from './contexts/EventContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <EventProvider>
        <App />
      </EventProvider>
    </ThemeProvider>
  </React.StrictMode>
);