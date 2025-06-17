import React from 'react';
import { motion } from 'framer-motion';
import PastMatchCard from '../../components/sections/PastMatchCard';

export default function PastMatches() {
    const matches = [
        {
            id: 1,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: 'W 2-1',
            date: 'May 5, 2025',
            location: 'Mbinglo FC Stadium',
            competition: 'Premier League',
            referee: 'J. Smith'
        },
        {
            id: 2,
            home_team: 'Mbinglo FC',
            away_team: 'United FC',
            result: 'D 1-1',
            date: 'May 6, 2025',
            location: 'City Rival Stadium',
            competition: 'Premier League',
            referee: 'A. Johnson'
        },
        {
            id: 3,
            home_team: 'Mbinglo FC',
            away_team: 'Strikers United',
            result: 'W 3-0',
            date: 'May 7, 2025',
            location: 'Stadium Conabo',
            competition: 'National Cup',
            referee: 'M. Williams'
        },
        {
            id: 4,
            home_team: 'Mbinglo FC',
            away_team: 'FC Thunder',
            result: 'D 2-2',
            date: 'May 8, 2025',
            location: 'City Rival Stadium',
            competition: 'Premier League',
            referee: 'T. Brown'
        },
        {
            id: 5,
            home_team: 'Mbinglo FC',
            away_team: 'Eagle FC',
            result: 'W 4-1',
            date: 'May 9, 2025',
            location: 'Stadium Real',
            competition: 'Champions League',
            referee: 'R. Davis'
        },
        {
            id: 6,
            home_team: 'Mbinglo FC',
            away_team: 'Titans SC',
            result: 'W 3-2',
            date: 'May 10, 2025',
            location: 'City Rival Stadium',
            competition: 'Premier League',
            referee: 'K. Wilson'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12 px-4 sm:px-6 text-white flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="w-full max-w-7xl">
                {/* Animated decorative element */}
                <motion.div 
                    className="w-20 h-1 bg-gradient-to-r from-green-500 to-transparent mb-2 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                    variants={titleVariants}
                >
                    Past Matches
                </motion.h2>

                {/* Grid with subtle pattern overlay */}
                <div className="relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10 rounded-xl pointer-events-none" />
                    
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {matches.map((match, index) => (
                            <PastMatchCard 
                                key={match.id} 
                                match={match} 
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* View more button */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                            View Full Match Archive
                        </span>
                        <svg 
                            className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
}