import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './Context/UserContext';
import { OtherContextProvider } from './Context/OtherContext';
import { UnitContextProvider } from "./Context/UnitContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  typography: {
    fontFamily: 'Pathway Extreme',
    h1: {
      fontFamily: 'Pathway Extreme',
      fontSize: '2rem',
      fontWeight: 'bolder',
      margin: '1rem'
    },
    span: {
      fontFamily: 'Pathway Extreme',
      fontSize:'14px',
    },
  },
  palette: {
    secondary: {
      main: "rgba(0, 0, 0, 0.6)"
    }
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UnitContextProvider>
        <OtherContextProvider>
          <UserContextProvider>
            <Router>
              <App />
            </Router>
          </UserContextProvider>
        </OtherContextProvider>
      </UnitContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


