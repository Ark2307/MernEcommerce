import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reactStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  transitions: transitions.SCALE,
};

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "white",
      dark: "none",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AlertProvider>
  </Provider>
);
