import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reactStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Auth0Provider } from "@auth0/auth0-react";
// import dotenv from "dotenv";

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

const DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

console.log(DOMAIN, CLIENT_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
      </AlertProvider>
    </Provider>
  </Auth0Provider>
);
