import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Hero from './pages/Home/Sections/Hero';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AuthProvider from './provider/AuthProvider';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Task/Dashboard';
import CategoryView from './pages/Task/CategoryView';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute><Hero /></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/signup",
    element: <PublicRoute><Signup /></PublicRoute>,
  },
  {
    path: "/app",
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Navigate to="/app" replace />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "completed",
        element: <CategoryView categoryName="Completed" />,
      },
      {
        path: "personal",
        element: <CategoryView categoryName="Personal" />,
      },
      {
        path: "work",
        element: <CategoryView categoryName="Work" />,
      },
      {
        path: "diet",
        element: <CategoryView categoryName="Diet" />,
      },
      {
        path: "books",
        element: <CategoryView categoryName="List of Books" />,
      },
      {
        path: "roadtrip",
        element: <CategoryView categoryName="Road Trip List" />,
      },
      {
        path: "mobal",
        element: <CategoryView categoryName="Mobal Project" isGroup={true} />,
      },
      {
        path: "futur",
        element: <CategoryView categoryName="Futur Project" isGroup={true} />,
      },
    ]
  },
  // Redirect authenticated users from root to app
  {
    path: "*",
    element: <PrivateRoute><Navigate to="/app" replace /></PrivateRoute>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);