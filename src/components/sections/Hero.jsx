import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Blog from './Blog';
import Comment from './Comment';

// Import fonts (add these to your CSS or tailwind config)
import './fonts.css'; // Create this file if using CSS

export default function Hero() {
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [currentContent, setCurrentContent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Custom font classes
    const fontClasses = {
        heading: "font-heading tracking-tighter", // Bold condensed font
        body: "font-body leading-relaxed",        // Clean readable font
        accent: "font-accent tracking-widest"     // Stylish accent font
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin === 'true') {
            setIsFirstLogin(true);
            localStorage.setItem('firstLogin', 'false');
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800); // Slightly longer for dramatic entrance

        return () => clearTimeout(timer);
    }, []);

    const contentVariations = [
        {
            title: "Elevate Your Game With MbingloFC",
            subtitle: "Experience football like never before with our elite training programs and cutting-edge analytics.",
            button1: "View Matches",
            button2: "Join The Club",
            image: "/assets/Player-removebg-preview.png",
            bgGradient: "bg-gradient-to-br from-emerald-900 via-gray-900 to-black",
            accentColor: "text-emerald-400",
            borderColor: "border-emerald-400"
        },
        {
            title: "Exclusive Member Access",
            subtitle: "Unlock premium content, player stats, and behind-the-scenes footage with your membership.",
            button1: "Member Dashboard",
            button2: "Explore Benefits",
            image: "/assets/hero.jpeg",
            bgGradient: "bg-gradient-to-br from-gray-900 via-emerald-900 to-black",
            accentColor: "text-amber-400",
            borderColor: "border-amber-400"
        }
    ];

    useEffect(() => {
        if (isFirstLogin && !isLoading) {
            const interval = setInterval(() => {
                setCurrentContent(prev => (prev + 1) % contentVariations.length);
            }, 7000); // Longer interval for better UX
            return () => clearInterval(interval);
        }
    }, [isFirstLogin, isLoading]);

    // Loading animation
    if (isLoading) {
        return (
            <section className="relative bg-black min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                        type: "spring",
                        damping: 10,
                        stiffness: 100
                    }}
                    className="text-center"
                >
                    <motion.div 
                        className="w-24 h-24 border-4 border-emerald-400 border-t-transparent rounded-full mx-auto mb-6"
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                    />
                    <motion.p 
                        className={`text-2xl ${fontClasses.accent} text-emerald-400`}
                        animate={{
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        LOADING MBINGLO FC
                    </motion.p>
                </motion.div>
            </section>
        );
    }

    return (
        <>
            <section className={`relative ${contentVariations[currentContent].bgGradient} text-white min-h-screen flex items-center overflow-hidden`}>
                {/* Animated background elements */}
                <motion.div 
                    className="absolute inset-0 opacity-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 2 }}
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-30 mix-blend-overlay"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
                </motion.div>

                <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center relative z-10">
                    {/* Text content */}
                    <motion.div 
                        className="lg:w-1/2 lg:pr-12"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentContent} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.h1 
                                    className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${fontClasses.heading}`}
                                    initial={{ letterSpacing: "0.5em" }}
                                    animate={{ letterSpacing: "0.05em" }}
                                    transition={{ 
                                        duration: 1.2,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    {contentVariations[currentContent].title}
                                </motion.h1>
                                
                                <motion.p 
                                    className={`text-xl md:text-2xl mb-10 text-gray-300 ${fontClasses.body}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    {contentVariations[currentContent].subtitle}
                                </motion.p>
                                
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, staggerChildren: 0.1 }}
                                >
                                    <Link 
                                        to={currentContent === 0 ? "/matches/upcoming" : "/dashboard"} 
                                        className={`relative overflow-hidden ${contentVariations[currentContent].accentColor} bg-opacity-10 border ${contentVariations[currentContent].borderColor} px-8 py-4 rounded-lg font-medium transition-all duration-300 group`}
                                    >
                                        <span className="relative z-10">{contentVariations[currentContent].button1}</span>
                                        <motion.span 
                                            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </Link>
                                    <Link 
                                        to={currentContent === 0 ? "/about" : "/benefits"} 
                                        className={`relative overflow-hidden bg-black bg-opacity-40 border ${contentVariations[currentContent].borderColor} px-8 py-4 rounded-lg font-medium transition-all duration-300 group`}
                                    >
                                        <span className="relative z-10">{contentVariations[currentContent].button2}</span>
                                        <motion.span 
                                            className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Image content */}
                    <motion.div 
                        className="lg:w-1/2 relative mt-16 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentContent}
                                initial={{ opacity: 0, rotate: -5 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 5 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                {/* Main image container */}
                                <motion.div 
                                    className="relative w-full max-w-2xl mx-auto"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {/* Floating accent elements */}
                                    {currentContent === 0 && (
                                        <>
                                            <motion.div 
                                                className="absolute -bottom-8 -left-8 w-20 h-20 bg-emerald-500 rounded-full filter blur-xl opacity-30"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.5, 0.3]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                            <motion.div 
                                                className="absolute -top-12 -right-12 w-16 h-16 bg-amber-400 rounded-full filter blur-xl opacity-20"
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.2, 0.4, 0.2]
                                                }}
                                                transition={{
                                                    duration: 5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </>
                                    )}

                                    {/* Main image with parallax effect */}
                                    <motion.div 
                                        className="relative overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl"
                                        style={{ 
                                            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                                            perspective: '1000px'
                                        }}
                                    >
                                        <motion.img
                                            src={contentVariations[currentContent].image}
                                            alt="Football player"
                                            className="w-full h-auto object-cover"
                                            initial={{ y: 40, scale: 1.1 }}
                                            animate={{ y: 0, scale: 1 }}
                                            transition={{ 
                                                y: { 
                                                    duration: 1.2,
                                                    ease: [0.6, 0.01, -0.05, 0.9]
                                                },
                                                scale: { duration: 1.5 }
                                            }}
                                            whileHover={{ 
                                                scale: 1.05,
                                                transition: { duration: 0.5 }
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* Animated floating elements */}
                                {currentContent === 1 && (
                                    <>
                                        <motion.img
                                            src="/assets/hero.jpeg"
                                            alt="Football"
                                            className="absolute w-20 h-20 -top-10 right-1/4"
                                            initial={{ scale: 0, rotate: 0 }}
                                            animate={{ 
                                                scale: 1, 
                                                rotate: 360,
                                                x: [0, 30, 0],
                                                y: [0, -30, 0]
                                            }}
                                            transition={{ 
                                                duration: 8, 
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <motion.div
                                            className="absolute -bottom-16 left-1/4 w-24 h-24 bg-amber-400 rounded-full filter blur-xl opacity-20"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.2, 0.4, 0.2]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Scrolling indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{
                        y: [0, 10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
                        <motion.div 
                            className="w-1 h-2 bg-emerald-400 rounded-full mt-1"
                            animate={{
                                y: [0, 4, 0],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity
                            }}
                        />
                    </div>
                </motion.div>
            </section>

            <Blog />
            <Comment />
        </>
    );
}