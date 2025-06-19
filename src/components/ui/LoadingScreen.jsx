import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GiSoccerBall } from 'react-icons/gi';

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/90 z-[9999] backdrop-blur-sm"
        >
            <div className="flex flex-col items-center space-y-8">
                {/* Bouncing Soccer Ball */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 1.6,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    className="text-5xl text-amber-400"
                >
                    <GiSoccerBall />
                </motion.div>

                {/* Brand Text with Pulse Animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-4xl font-bold text-amber-400"
                >
                    MbingloFC
                </motion.div>

                {/* Loading Indicator */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <FaCircleNotch className="text-2xl text-amber-400" />
                        </motion.div>
                        <span className="text-lg text-white font-medium tracking-wider">
                            Loading Match Data...
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{
                            duration: 2.1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full max-w-xs"
                    />
                </div>
            </div>
        </motion.div>
    );
}