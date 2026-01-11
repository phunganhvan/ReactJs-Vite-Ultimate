import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import ProductPage from './pages/products.jsx';

import './styles/global.css';
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
 {
 path: "/",
 element: <App/>,
 },
 {
  path: "/login",
  element: <LoginPage/>,
 },
 {
  path: "/about",
  element: <div>About Page</div>,
 },
 {
  path: "/register",
  element: <RegisterPage/>,
 },
 {
  path: "/users",
  element: <UserPage/>,
 },
 {
  path: "/products",
  element: <ProductPage/>,
 }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
