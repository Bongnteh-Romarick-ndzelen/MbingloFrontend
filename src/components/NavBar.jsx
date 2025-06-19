import { Link, useNavigate } from 'react-router-dom';
import {
    FaBars, FaTimes, FaUser, FaCaretDown,
    FaSignOutAlt, FaCog, FaUserCircle, FaRegComment
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { logoutUser } from '../api/authService';
import { GiSoccerBall } from 'react-icons/gi';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = true; // Replace with actual auth logic

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
        navigate('/auth/login');
    };

    return (
        <nav className={`fixed left-0 w-full z-50 text-white shadow-md transition-all duration-300 ${scrolled ? 'py-2 bg-gray-900/95 backdrop-blur-sm' : 'py-3 bg-gray-900'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <GiSoccerBall className="text-3xl text-green-500 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-3xl font-bold text-white">
                        <span className="text-green-400">Mbinglo</span>FC
                    </span>
                </Link>

                {/* Desktop Nav */}
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8 font-medium">
                    {['Home', 'About', 'Matches', 'Contact'].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item === 'Home' ? '/' : item === 'Matches' ? '/matches/upcoming' : `/${item.toLowerCase()}`}
                            className="hover:text-amber-300 transition-colors duration-200 relative group"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        to="/chats"
                        className="flex items-center gap-1 hover:text-amber-300 transition-colors duration-200 relative group"
                    >
                        <FaRegComment className="text-lg" /> Chats
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    {isLoggedIn ? (
                        <div className="relative">
                            <motion.button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-1 hover:text-amber-300 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center overflow-hidden">
                                    <FaUserCircle className="text-xl text-gray-900" />
                                </div>
                                <FaCaretDown className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-3 hover:bg-gray-700 flex items-center gap-2">
                                            <FaUser className="text-amber-300" /> Profile
                                        </Link>
                                        <Link to="/profile/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-3 hover:bg-gray-700 flex items-center gap-2">
                                            <FaCog className="text-amber-300" /> Settings
                                        </Link>
                                        <div onClick={() => { setIsProfileOpen(false); handleLogout(); }} className="block px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                                            <FaSignOutAlt className="text-amber-300" /> Logout
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/auth/login"
                                className="bg-gradient-to-br from-amber-400 to-amber-600 text-gray-900 px-5 py-2 rounded-md hover:from-amber-300 hover:to-amber-500 flex items-center gap-2 font-semibold"
                            >
                                <FaUser /> Login
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className="md:hidden text-2xl hover:text-amber-300 transition-colors duration-200 z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/70 z-40 md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                className="fixed top-0 left-0 h-screen w-3/4 max-w-sm bg-gray-900/95 backdrop-blur-sm z-50 shadow-2xl md:hidden flex flex-col pt-20 px-6 border-r border-gray-800 overflow-y-auto"
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                <div className="flex-1 space-y-6 overflow-y-auto pb-10">
                                    <Link to="/" onClick={() => setIsOpen(false)} className="block text-xl hover:text-amber-300 py-2">Home</Link>
                                    <Link to="/about" onClick={() => setIsOpen(false)} className="block text-xl hover:text-amber-300 py-2">About</Link>
                                    <Link to="/matches/upcoming" onClick={() => setIsOpen(false)} className="block text-xl hover:text-amber-300 py-2">Matches</Link>
                                    <Link to="/chats" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xl hover:text-amber-300 py-2">
                                        <FaRegComment /> Chats
                                    </Link>
                                    <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-xl hover:text-amber-300 py-2">Contact</Link>

                                    <div className="pt-6 border-t border-gray-800 mt-6">
                                        {isLoggedIn ? (
                                            <>
                                                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xl hover:text-amber-300 py-3">
                                                    <FaUser /> Profile
                                                </Link>
                                                <Link to="/profile/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xl hover:text-amber-300 py-3">
                                                    <FaCog /> Settings
                                                </Link>
                                                <div onClick={() => { setIsOpen(false); handleLogout(); }} className="flex items-center gap-3 text-xl hover:text-amber-300 py-3 cursor-pointer">
                                                    <FaSignOutAlt /> Logout
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/auth/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xl hover:text-amber-300 py-3">
                                                    <FaUser /> Login
                                                </Link>
                                                <Link to="/auth/signup" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xl hover:text-amber-300 py-3">
                                                    <FaUser /> Sign Up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="py-6 text-center text-gray-500 text-sm">
                                    © {new Date().getFullYear()} MbingloFC
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
