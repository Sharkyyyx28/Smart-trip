import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import CreateTrip from './components/create-trip/index.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components/custom/header.tsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './components/view-trip/[tripId]/index.tsx';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-trip", element: <CreateTrip /> },
  { path: "/view-trip/:tripId", element: <ViewTrip /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID!} >
    <Header />
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)


