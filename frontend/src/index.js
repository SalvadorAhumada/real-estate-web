import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login />
  },
  {
    path: "/",
    element:  <Navigate to="/login" />,
  },
  {
    path:"/test",
    element: <div>This is a test</div>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


