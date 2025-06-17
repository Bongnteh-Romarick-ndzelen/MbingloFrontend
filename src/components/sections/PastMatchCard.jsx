import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaFutbol } from 'react-icons/fa';
import { GiSoccerBall, GiWhistle } from 'react-icons/gi';

export default function PastMatchCard({ match, index }) {
    const { home_team, away_team, result, date, location, competition } = match;

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        }),
        hover: {
            y: -8,
            boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)"
        }
    };

    const resultVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="relative bg-gradient-to-br from-green-900 to-green-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full border-2 border-green-700 hover:border-green-400 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 border-[12px] border-green-800/20 rounded-xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-transparent opacity-30 group-hover:opacity-70 transition-opacity" />
            
            {/* Animated background elements */}
            <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-700 rounded-full opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute -top-5 -left-5 w-20 h-20 bg-green-600 rounded-full opacity-10"
                animate={{
                    x: [-10, 0, -10],
                    y: [-10, 0, -10]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Match content */}
            <div className="relative z-10 w-full space-y-4">
                {/* Competition */}
                {competition && (
                    <motion.div 
                        className="flex items-center justify-center gap-2 text-green-300 text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FaTrophy className="text-yellow-400" />
                        <span>{competition}</span>
                    </motion.div>
                )}

                {/* Teams */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-4"
                >
                    <div className="flex-1 text-right">
                        <p className="text-lg font-bold text-white truncate">{home_team}</p>
                    </div>
                    
                    <div className="flex flex-col items-center mx-2">
                        <GiSoccerBall className="text-xl text-green-300" />
                        <span className="text-xs text-gray-400 mt-1">vs</span>
                    </div>
                    
                    <div className="flex-1 text-left">
                        <p className="text-lg font-bold text-white truncate">{away_team}</p>
                    </div>
                </motion.div>
                
                {/* Result */}
                <motion.div
                    variants={resultVariants}
                    className={`py-2 px-4 rounded-lg border-2 ${
                        result.includes('W') ? 'border-green-400 bg-green-900/30' : 
                        result.includes('L') ? 'border-red-400 bg-red-900/30' : 
                        'border-yellow-400 bg-yellow-900/30'
                    } inline-block`}
                >
                    <p className={`text-2xl font-black flex items-center justify-center gap-2 ${
                        result.includes('W') ? 'text-green-300' : 
                        result.includes('L') ? 'text-red-300' : 
                        'text-yellow-300'
                    }`}>
                        <FaFutbol className="text-lg" />
                        {result}
                    </p>
                </motion.div>

                {/* Match details */}
                <motion.div 
                    className="grid grid-cols-2 gap-3 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-green-800/40 p-3 rounded-lg border border-green-700/50 hover:border-green-400 transition-colors">
                        <div className="flex items-center justify-center gap-2 text-green-300 mb-1">
                            <FaCalendarAlt />
                            <span className="font-semibold text-sm">Date</span>
                        </div>
                        <p className="text-white font-medium">{date}</p>
                    </div>
                    
                    <div className="bg-green-800/40 p-3 rounded-lg border border-green-700/50 hover:border-green-400 transition-colors">
                        <div className="flex items-center justify-center gap-2 text-green-300 mb-1">
                            <FaMapMarkerAlt />
                            <span className="font-semibold text-sm">Venue</span>
                        </div>
                        <p className="text-white font-medium truncate">{location}</p>
                    </div>
                </motion.div>

                {/* Referee (example additional field) */}
                {match.referee && (
                    <motion.div
                        className="flex items-center justify-center gap-2 text-xs text-green-400 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <GiWhistle />
                        <span>Ref: {match.referee}</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}