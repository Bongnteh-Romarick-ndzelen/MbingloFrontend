import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/90 z-[9999] backdrop-blur-sm"
        >
            <div className="flex flex-col items-center space-y-6">
                {/* Animated Logo/Brand Mark - You can replace this with your actual logo */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity
                    }}
                    className="text-5xl font-bold text-amber-400 mb-2"
                >
                    MbingloFC
                </motion.div>

                {/* Loading Indicator */}
                <div className="flex items-center space-x-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <FaCircleNotch className="text-3xl text-amber-400" />
                    </motion.div>
                    <span className="text-xl text-white font-medium tracking-wider">
                        Loading...
                    </span>
                </div>

                {/* Progress Bar (Optional) */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4 max-w-xs"
                />
            </div>
        </motion.div>
    );
}