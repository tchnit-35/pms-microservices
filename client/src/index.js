import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useEffect,useState } from 'react';

import LandingPage from './pages/LandingPage';
import Signup from './pages/auth_pages/Signup'
import Login from './pages/auth_pages/Login';
import CreateProject from './pages/auth_pages/CreateProject';
import Confirm from './pages/auth_pages/Confirm';
import Project from './pages/Project_pages/Project';
import LoginAfterRegister from './pages/auth_pages/LoginAfterRegister';
import HomePage from './pages/Home_page/HomePage';
import Settings from './pages/Settings_pages/Settings';

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
    path: "/CreateProject",
    element: <CreateProject />,
  },
  {
    path: "/Confirm",
    element: <Confirm />,
  },
  {
    path: "/Project/:projectId",
    element: <Project />,
  },
  {
    path: "/LoginAfterRegister",
    element: <LoginAfterRegister />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){const [token, setToken] = useState(localStorage.getItem('token'));
useEffect(() => {
  const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
  if (tokenExpirationTime && Date.now() > tokenExpirationTime) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationTime');
    setToken(null);
  }
}, []);
}

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
