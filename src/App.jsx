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
import Gallery from "./pages/Gallery"
import { Toaster } from 'react-hot-toast';

function AppLayout() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
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
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>

      {/* Hide Footer only on /chats route */}
      {location.pathname !== "/chats" && <Footer />}
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
