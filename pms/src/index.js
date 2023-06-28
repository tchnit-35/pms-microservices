import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import LandingPage from './pages/LandingPage';
import Signup from './pages/auth_pages/Signup'
import Login from './pages/auth_pages/Login';
import CreateWorkspace from './pages/auth_pages/CreateWorkspace';
import Confirm from './pages/auth_pages/Confirm';
import Project from './pages/Project_pages/Project';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/CreateWorkspace",
    element: <CreateWorkspace />,
  },
  {
    path: "/Confirm",
    element: <Confirm />,
  },
  {
    path: "/Project",
    element: <Project />,
  },
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
