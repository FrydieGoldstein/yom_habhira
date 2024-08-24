import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F1E5B",
      light: "#F2DEDD",
      contrastText: "#FFDD13",
    },
    secondary: {
      main: "#7863D8",
    },
  },
  typography: {
    fontFamily: "Rubik",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
          fontSize: "11px",
          color: "#3F1E5B",
          backgroundColor: "#F2DEDD",
          borderRadius: "15px",
          padding: "2px 14px",
          minWidth: "2px",
          boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.1)",
          margin: "3px",
        },
        contained: {
          backgroundColor: "#FFDD13",
          "&:hover": {
            backgroundColor: "#FFCC00",
          },
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        outlined: {
          backgroundColor: "#FFF",
        },
      },
    },
    // MuiChip: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: "Roboto, sans-serif",
    //       fontSize: "11px",
    //       color: "#3F1E5B",
    //       backgroundColor: "#F2DEDD",
    //       borderRadius: "15px",
    //       minWidth: "auto",
    //       height: "auto",
    //       padding: "5px 2px",
    //       boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.1)",
    //       margin: "3px",
    //     },
    //   },
    // },
  },
});

export default theme;
