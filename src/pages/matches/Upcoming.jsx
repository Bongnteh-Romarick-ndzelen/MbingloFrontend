import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatchCard from '../../components/sections/MatchCard';
import PastMatches from './PastMatches';

export default function UpcomingMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                // Simulate API call with realistic delay
                await new Promise(resolve => setTimeout(resolve, 1200));

                // Enhanced mock data with more details
                const mockMatches = [
                    {
                        id: 1,
                        date: 'June 15, 2023',
                        time: '15:00',
                        homeTeam: 'Mbinglo FC',
                        awayTeam: 'City Rivals',
                        venue: 'Mbinglo Stadium',
                        competition: 'Premier League',
                        competitionLogo: 'https://via.placeholder.com/40',
                        isHomeGame: true,
                        ticketAvailable: true
                    },
                    {
                        id: 2,
                        date: 'June 22, 2023',
                        time: '19:45',
                        homeTeam: 'United FC',
                        awayTeam: 'Mbinglo FC',
                        venue: 'United Arena',
                        competition: 'Premier League',
                        competitionLogo: 'https://via.placeholder.com/40',
                        isHomeGame: false,
                        ticketAvailable: false
                    },
                    {
                        id: 3,
                        date: 'June 30, 2023',
                        time: '20:00',
                        homeTeam: 'Mbinglo FC',
                        awayTeam: 'Athletic Club',
                        venue: 'Mbinglo Stadium',
                        competition: 'Cup Quarterfinals',
                        competitionLogo: 'https://via.placeholder.com/40',
                        isHomeGame: true,
                        ticketAvailable: true
                    }
                ];

                setMatches(mockMatches);
            } catch (err) {
                setError('Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    // Live background image from Unsplash (football stadium)
    const liveBackground = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Live background with parallax effect */}
            <motion.div 
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url(${liveBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/90" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.section
                    className="relative h-[70vh] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1
                            className="text-5xl md:text-6xl font-extrabold mb-6"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                Mbinglo FC Match Center
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Stay updated with all upcoming and recent matches of our beloved club
                        </motion.p>
                        
                        <motion.div
                            className="flex justify-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.button
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'upcoming' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                                onClick={() => setActiveTab('upcoming')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Upcoming Matches
                            </motion.button>
                            <motion.button
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'past' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                                onClick={() => setActiveTab('past')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Past Matches
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <AnimatePresence mode="wait">
                        {activeTab === 'upcoming' ? (
                            <motion.div
                                key="upcoming"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold mb-12 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
                                        Upcoming Matches
                                    </span>
                                </motion.h2>

                                {loading ? (
                                    <motion.div
                                        className="text-center py-16"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="inline-flex items-center justify-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
                                            />
                                        </div>
                                        <motion.p
                                            className="mt-6 text-gray-300 text-lg"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            Loading upcoming fixtures...
                                        </motion.p>
                                    </motion.div>
                                ) : error ? (
                                    <motion.div
                                        className="bg-red-900/50 border border-red-700 text-red-200 px-6 py-4 rounded-xl max-w-md mx-auto text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <p>{error}</p>
                                        <button
                                            className="mt-3 px-4 py-2 bg-red-700/50 rounded-lg hover:bg-red-700 transition-colors"
                                            onClick={() => window.location.reload()}
                                        >
                                            Retry
                                        </button>
                                    </motion.div>
                                ) : matches.length === 0 ? (
                                    <motion.div
                                        className="text-center py-16"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="text-6xl mb-4">⚽</div>
                                        <p className="text-xl text-gray-400">No upcoming matches scheduled</p>
                                        <p className="text-gray-500 mt-2">Check back later for updates</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {matches.map((match, index) => (
                                            <MatchCard 
                                                key={match.id} 
                                                match={match} 
                                                index={index}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="past"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <PastMatches />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}