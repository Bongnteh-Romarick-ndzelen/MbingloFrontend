import { Link, useNavigate } from 'react-router-dom';
import {
    FaBars, FaTimes, FaUser, FaCaretDown,
    FaSignOutAlt, FaCog, FaUserCircle, FaRegComment
} from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { logoutUser } from '../api/authService';
import logo from '../assets/logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = true; // Replace with actual authentication check logic

    const handleLogout = async () => {
        try {
            await logoutUser(); // backend logout route
        } catch (err) {
            console.error('Logout error:', err);
        }

        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
        navigate('/auth/login');
    };

    return (
        <nav className="left-0 w-full z-50 bg-black text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                    <img className="h-10 w-auto" src={'/assets/logo.png'} alt="Logo" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 font-semibold">
                    <Link to="/" className="hover:text-white/80 transition">Home</Link>
                    <Link to="/about" className="hover:text-white/80 transition">About</Link>
                    <Link to="/matches/upcoming" className="hover:text-white/80 transition">Matches</Link>
                    <Link to="/chats" className="flex items-center gap-1 hover:text-white/80 transition">
                        <FaRegComment className="text-lg" />
                        Chats
                    </Link>
                    <Link to="/contact" className="hover:text-white/80 transition">Contact</Link>

                    {/* Profile or Login */}
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-1 hover:text-white/80 transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaUserCircle className="text-xl text-white" />
                                </div>
                                <FaCaretDown />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-green-200 text-green-900 rounded-lg shadow-lg z-50 overflow-hidden">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-green-100"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <FaUser className="inline mr-2" /> Profile
                                    </Link>
                                    <Link
                                        to="/profile/settings"
                                        className="block px-4 py-2 hover:bg-green-100"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <FaCog className="inline mr-2" /> Settings
                                    </Link>
                                    <div
                                        className="block px-4 py-2 hover:bg-green-100 cursor-pointer"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            handleLogout();
                                        }}
                                    >
                                        <FaSignOutAlt className="inline mr-2" /> Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="bg-white/20 px-4 py-2 rounded-md hover:bg-white/30 transition"
                        >
                            <FaUser className="inline mr-1" /> Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-2xl hover:text-white/80 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black text-white px-4 py-4 space-y-2 font-bold">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-white/80">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-white/80">About</Link>
                    <Link to="/matches/upcoming" onClick={() => setIsOpen(false)} className="block hover:text-white/80">Matches</Link>
                    <Link to="/chats" onClick={() => setIsOpen(false)} className="flex items-center gap-1 hover:text-white/80">
                        <FaRegComment /> Chats
                    </Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-white/80">Contact</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="block hover:text-white/80">
                                <FaUser className="inline mr-2" /> Profile
                            </Link>
                            <Link to="/profile/settings" onClick={() => setIsOpen(false)} className="block hover:text-white/80">
                                <FaCog className="inline mr-2" /> Settings
                            </Link>
                            <div
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="block w-full text-left hover:text-white/80 cursor-pointer"
                            >
                                <FaSignOutAlt className="inline mr-2" /> Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" onClick={() => setIsOpen(false)} className="block hover:text-white/80">
                                <FaUser className="inline mr-2" /> Login
                            </Link>
                            <Link to="/auth/signup" onClick={() => setIsOpen(false)} className="block hover:text-white/80">
                                <FaUser className="inline mr-2" /> Signup
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

