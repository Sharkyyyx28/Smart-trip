import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import CreateTrip from './components/create-trip/index.tsx';
import Login from './auth/login.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components/custom/header.tsx';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/create-trip", element: <CreateTrip /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
  </StrictMode>,
)


