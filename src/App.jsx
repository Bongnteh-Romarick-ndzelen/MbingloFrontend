import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import About from "./pages/About";
import UpcomingMatches from "./pages/matches/Upcoming";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProfilePage from "./pages/profile/ProfilePage";
import Settings from "./pages/profile/Settings";
import Chat from "./pages/Chat";
import { Toaster } from 'react-hot-toast';
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

// Define valid routes for the application
// This will be used to determine if the current route is valid or not
// If the route is not in this list, it will be considered a 404 page
// and the Navbar and Footer will not be displayed.
// This is useful for handling 404 pages and ensuring the layout is consistent.
// You can add more routes to this list as your application grows.
const validRoutes = [
  '/',
  '/about',
  '/matches/upcoming',
  '/contact',
  '/auth/login',
  '/auth/signup',
  '/profile',
  '/profile/settings',
  '/chats',
  '/gallery'
];

function AppLayout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidRoute, setIsValidRoute] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check if current route is valid
  useEffect(() => {
    const isRouteValid = validRoutes.some(route =>
      location.pathname === route || location.pathname.startsWith(route + '/')
    );
    setIsValidRoute(isRouteValid);
  }, [location.pathname]);

  return (
    <>
      {/* Hide Navbar on 404 pages */}
      {isValidRoute && <Navbar />}

      {isLoading && <LoadingScreen />}
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/matches/upcoming" element={<UpcomingMatches />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hide Footer on invalid routes (404) and /chats */}
      {isValidRoute && location.pathname !== "/chats" && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}