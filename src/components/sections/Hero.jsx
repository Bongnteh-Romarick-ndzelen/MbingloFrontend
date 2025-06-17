import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { useEffect, useState } from 'react';
import Blog from './Blog';
import Comment from './Comment';

export default function Hero() {
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [currentContent, setCurrentContent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin === 'true') {
            setIsFirstLogin(true);
            localStorage.setItem('firstLogin', 'false');
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const contentVariations = [
        {
            title: "Welcome to MbingloFC",
            subtitle: "The home of passionate football. Follow our journey, watch matches, and support the team.",
            button1: "Upcoming Matches",
            button2: "Learn More",
            image: "/assets/Player-removebg-preview.png" // from public/
        },
        {
            title: "Welcome to the Team!",
            subtitle: "As a new member, enjoy exclusive access to player stats, behind-the-scenes content, and special offers.",
            button1: "View Dashboard",
            button2: "Explore Benefits",
            image: "/assets/player-celebrating.png"
        }
    ];

    useEffect(() => {
        if (isFirstLogin && !isLoading) {
            const interval = setInterval(() => {
                setCurrentContent(prev => (prev + 1) % contentVariations.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isFirstLogin, isLoading]);

    if (isLoading) {
        return (
            <section className="relative bg-gradient-to-br from-green-900 via-black to-black text-white min-h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-green-400">Loading MbingloFC...</p>
                </motion.div>
            </section>
        );
    }

    return (
        <>
            <section className="relative bg-gradient-to-br from-green-900 via-black to-black text-white min-h-[80vh] flex items-center overflow-hidden">
                <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center relative z-10">
                    <motion.div className="lg:w-1/2" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={currentContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" variants={fadeIn('right', 'tween', 0.2, 1)}>
                                    {contentVariations[currentContent].title.split(' ').map((word, i) => (
                                        <motion.span key={i} className="inline-block mr-2" whileHover={{ scale: 1.05 }}>{word}</motion.span>
                                    ))}
                                </motion.h1>
                                <motion.p className="text-lg md:text-xl mb-8 text-gray-300" variants={fadeIn('right', 'tween', 0.4, 1)}>
                                    {contentVariations[currentContent].subtitle}
                                </motion.p>
                                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn('up', 'tween', 0.6, 1)}>
                                    <Link 
                                        to={currentContent === 0 ? "/matches/upcoming" : "/dashboard"} 
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium transition-all duration-300 hover:scale-105"
                                    >
                                        {contentVariations[currentContent].button1}
                                    </Link>
                                    <Link 
                                        to={currentContent === 0 ? "/about" : "/benefits"} 
                                        className="border-2 border-green-400 hover:bg-green-600 hover:text-white px-6 py-3 rounded font-medium transition-all duration-300 hover:scale-105 text-green-300"
                                    >
                                        {contentVariations[currentContent].button2}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <motion.div className="lg:w-1/2 relative mt-12 lg:mt-0" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        <AnimatePresence mode='wait'>
                            <motion.div key={currentContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <motion.div className="relative w-full max-w-lg mx-auto" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                                    <div className="absolute inset-0 bg-green-900 rounded-2xl transform -rotate-3 -skew-x-6 shadow-2xl"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-black rounded-2xl transform rotate-1 skew-x-3 shadow-lg"></div>
                                    <motion.div className="relative overflow-hidden rounded-xl border-4 border-white shadow-xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                        <motion.img
                                            src={contentVariations[currentContent].image}
                                            alt="Football player"
                                            className="w-full h-auto object-cover"
                                            initial={{ y: 20 }}
                                            animate={{ y: 0, scale: [1, 1.02, 1] }}
                                            transition={{ y: { duration: 0.5 }, scale: { duration: 5, repeat: Infinity, repeatType: 'reverse' } }}
                                        />
                                    </motion.div>
                                    {currentContent === 0 && (
                                        <>
                                            <motion.div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-600 rounded-full shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
                                            <motion.div className="absolute -top-6 -right-6 w-12 h-12 bg-green-800 rounded-full shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                                        </>
                                    )}
                                </motion.div>
                                {currentContent === 1 && (
                                    <motion.img
                                        src="/assets/Player-removebg-preview.png"
                                        alt="Football"
                                        className="absolute w-16 h-16 -top-8 right-1/4"
                                        initial={{ scale: 0 }}
                                        animate={{ 
                                            scale: 1, 
                                            rotate: 360, 
                                            x: [0, 20, 0],
                                            y: [0, -20, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
            <Blog />
            <Comment />
        </>
    );
}
