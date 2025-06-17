import { FaTrophy, FaUsers, FaHistory, FaMapMarkerAlt, FaBullseye, FaFutbol, FaHeartbeat } from 'react-icons/fa';
import { GiSoccerBall, GiSoccerKick, GiSoccerField } from 'react-icons/gi';
import { IoMdPeople } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
    {
        id: 1,
        name: 'Fonban Roderick Waintumi',
        role: 'Founder and CEO',
        bio: 'Former professional player with 15 years coaching experience. Led teams to 3 championship titles.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 2,
        name: 'Fai Dinayen Godbless',
        role: 'Manager',
        bio: 'Specializes in player development and tactical analysis. UEFA Pro License holder.',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 3,
        name: 'Njoka Nestor',
        role: 'Head coach',
        bio: 'Former national team goalkeeper with expertise in modern keeping techniques.',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
        id: 4,
        name: 'Emma Wilson',
        role: 'Fitness Trainer',
        bio: 'Sports scientist specializing in football-specific conditioning and injury prevention.',
        image: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
        id: 5,
        name: 'David Lee',
        role: 'Technical Director',
        bio: 'Oversees youth development and playing philosophy implementation across all teams.',
        image: 'https://randomuser.me/api/portraits/men/19.jpg'
    },
    {
        id: 6,
        name: 'Lisa Chen',
        role: 'Head of Scouting',
        bio: 'Built one of the most respected scouting networks in the region with an eye for young talent.',
        image: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
];

export default function About() {
    const [startCounting, setStartCounting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('history');

    // Simulate content loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Intersection Observer to trigger counting animation
    useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setStartCounting(true);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('achievements-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <motion.h2 
                        className="text-2xl font-bold text-emerald-400"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading MbingloFC History
                    </motion.h2>
                    <motion.p 
                        className="text-gray-400 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Discovering our legacy...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <section id="about" className="bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="min-h-screen">
                {/* Hero Section */}
                <motion.section
                className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                    backgroundPosition: 'center center'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                >
                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <motion.div 
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.h1
                    className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    >
                    <span className="bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
                        About Mbinglo FC
                    </span>
                    </motion.h1>
                    
                    <motion.p
                    className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    >
                    A legacy of excellence, community, and beautiful football since 1985.
                    </motion.p>
                    
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                    <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-bold shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Our Story
                    </motion.button>
                    <motion.button
                        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold shadow-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Meet The Team
                    </motion.button>
                    </motion.div>
                </motion.div>
                
                {/* Animated scroll indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="flex flex-col items-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    <span className="text-white text-sm mt-1">Scroll Down</span>
                    </div>
                </motion.div>
                </motion.section>

                {/* Content Navigation */}
                <motion.div 
                    className="sticky top-0 z-40 bg-gray-800 shadow-md"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <div className="container mx-auto px-4">
                        <div className="flex overflow-x-auto scrollbar-hide">
                            {[
                                { id: 'history', icon: <FaHistory />, label: 'History' },
                                { id: 'achievements', icon: <FaTrophy />, label: 'Achievements' },
                                { id: 'mission', icon: <FaBullseye />, label: 'Mission' },
                                { id: 'philosophy', icon: <GiSoccerBall />, label: 'Philosophy' },
                                { id: 'team', icon: <IoMdPeople />, label: 'Our Team' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                                        setActiveTab(tab.id);
                                    }}
                                    className={`flex items-center px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <span className="mr-2 text-lg">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* History Section */}
                <motion.section
                    id="history"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <motion.div
                                className="flex items-center gap-4 mb-12"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="text-emerald-400 text-3xl"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <FaHistory />
                                </motion.div>
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-white"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    Our <span className="text-emerald-400">History</span>
                                </motion.h2>
                            </motion.div>
                            
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    className="relative rounded-xl overflow-hidden shadow-2xl"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                                        alt="MbingloFC early days"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-xl font-bold text-white">The Early Days (1985-1995)</h3>
                                        <p className="text-gray-300">Our humble beginnings as a community club</p>
                                    </div>
                                </motion.div>
                                
                                <motion.div
                                    className="text-gray-300 space-y-6 text-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <p>
                                        Founded in 1985 by a group of football enthusiasts in the heart of the city,
                                        MbingloFC started as a small community club playing in local leagues.
                                    </p>
                                    <p>
                                        Our first major trophy came in 1998 when we won the Regional Cup,
                                        marking the beginning of our golden era. Since then, we've won
                                        numerous championships and produced players who went on to represent
                                        national teams.
                                    </p>
                                    <p>
                                        The 2010s saw our transformation into a professional outfit with
                                        state-of-the-art training facilities and youth academy that has
                                        become the envy of clubs across the region.
                                    </p>
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                className="mt-16 grid md:grid-cols-3 gap-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    { icon: <GiSoccerKick className="text-4xl" />, title: "First Trophy", year: "1998", description: "Regional Cup Champions" },
                                    { icon: <GiSoccerField className="text-4xl" />, title: "New Stadium", year: "2005", description: "25,000 capacity arena opened" },
                                    { icon: <FaFutbol className="text-4xl" />, title: "European Debut", year: "2012", description: "First appearance in UEFA competitions" }
                                ].map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-400 transition-all duration-300"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="text-emerald-400 mb-4">{milestone.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-1">{milestone.title}</h3>
                                        <p className="text-emerald-300 font-medium mb-2">{milestone.year}</p>
                                        <p className="text-gray-400">{milestone.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Achievements Section */}
                <motion.section
                    id="achievements"
                    className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
                >
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                Our <span className="text-emerald-400">Achievements</span>
                            </motion.h2>
                            <motion.p
                                className="text-lg text-gray-400 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Decades of excellence and memorable moments that define our legacy
                            </motion.p>
                        </motion.div>
                        
                        <div id="achievements-section" className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: <FaTrophy className="text-5xl" />, value: 15, suffix: "+ Trophies", description: "Including 5 league titles, 7 cups, and 3 super cups" },
                                { icon: <FaUsers className="text-5xl" />, value: 50, suffix: ",000+ Fans", description: "Our loyal supporters across the country and beyond" },
                                { icon: <FaMapMarkerAlt className="text-5xl" />, value: 25, suffix: ",000 Capacity", description: "Modern stadium with world-class facilities" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800 p-8 rounded-xl shadow-lg text-center border border-gray-700 hover:border-emerald-400 transition-all duration-300 group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="text-emerald-400 mb-6 group-hover:text-emerald-300 transition-colors duration-300 flex justify-center">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">
                                        {startCounting ? (
                                            <CountUp end={item.value} duration={2} suffix={item.suffix} />
                                        ) : `0${item.suffix}`}
                                    </h3>
                                    <p className="text-gray-400">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div
                            className="mt-16 grid md:grid-cols-2 gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Notable Honors</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "5× Premier League Champions (2001, 2005, 2010, 2015, 2020)",
                                            "7× National Cup Winners",
                                            "3× Super Cup Winners",
                                            "2× Continental Tournament Semi-Finalists",
                                            "Youth Academy Award of Excellence (2018)"
                                        ].map((honor, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-emerald-400 mr-2">✓</span>
                                                <span className="text-gray-300">{honor}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Player Achievements</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "12 Players in National Teams",
                                            "5 Players of the Year Awards",
                                            "3 Golden Boot Winners",
                                            "2 Young Player of the Year Awards",
                                            "1 Ballon d'Or Nominee"
                                        ].map((achievement, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-emerald-400 mr-2">✓</span>
                                                <span className="text-gray-300">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Mission Section */}
                <motion.section
                    id="mission"
                    className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <motion.div
                                className="flex items-center gap-4 mb-12"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="text-emerald-400 text-3xl"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <FaBullseye />
                                </motion.div>
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-white"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    Our <span className="text-emerald-400">Mission</span>
                                </motion.h2>
                            </motion.div>
                            
                            <motion.div
                                className="bg-gray-800 rounded-xl p-8 border border-gray-700"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                    At MbingloFC, our mission is to be more than just a football club - we aim to be a
                                    beacon of excellence, a pillar of our community, and a home for football
                                    enthusiasts at every level.
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    {[
                                        { icon: <FaFutbol className="text-3xl" />, title: "Developing Talent", description: "Creating pathways for young players to reach their full potential through our world-class academy system" },
                                        { icon: <GiSoccerBall className="text-3xl" />, title: "Winning With Style", description: "Playing attractive, attacking football that excites our fans and respects our traditions" },
                                        { icon: <IoMdPeople className="text-3xl" />, title: "Community Engagement", description: "Using football as a force for positive social change in our local community" },
                                        { icon: <FaHeartbeat className="text-3xl" />, title: "Sustainable Growth", description: "Building a club that thrives both on and off the pitch for generations to come" }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start gap-4"
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="text-emerald-400 mt-1">{item.icon}</div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-400">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Philosophy Section */}
                <motion.section
                    id="philosophy"
                    className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <motion.div
                                className="text-center mb-16"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                                    initial={{ y: 20 }}
                                    whileInView={{ y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    Our <span className="text-emerald-400">Philosophy</span>
                                </motion.h2>
                                <motion.p
                                    className="text-lg text-gray-400 max-w-2xl mx-auto"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    The principles that guide everything we do
                                </motion.p>
                            </motion.div>
                            
                            <motion.div
                                className="grid md:grid-cols-3 gap-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    { 
                                        title: "Excellence", 
                                        description: "Striving to be the best in everything we do, from youth development to first-team performance", 
                                        color: "from-emerald-400 to-green-500"
                                    },
                                    { 
                                        title: "Community", 
                                        description: "Being an integral part of our local community and representing our values with pride", 
                                        color: "from-blue-400 to-cyan-500"
                                    },
                                    { 
                                        title: "Development", 
                                        description: "Nurturing young talent and helping players reach their full potential on and off the pitch", 
                                        color: "from-purple-400 to-indigo-500"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className={`bg-gradient-to-br ${item.color} p-0.5 rounded-xl`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="bg-gray-900 h-full rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                            <p className="text-gray-300">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            
                            <motion.div
                                className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                viewport={{ once: true }}
                            >
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Our Playing Style</h3>
                                        <p className="text-gray-300 mb-6">
                                            MbingloFC is renowned for our attacking, possession-based football that
                                            emphasizes technical skill, creativity, and teamwork. Our style is built on:
                                        </p>
                                        <ul className="space-y-3">
                                            {[
                                                "High pressing and quick transitions",
                                                "Positional rotation and fluid formations",
                                                "Developing technically gifted players",
                                                "Adapting to modern tactical trends",
                                                "Maintaining our identity in all competitions"
                                            ].map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-emerald-400 mr-2">•</span>
                                                    <span className="text-gray-300">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative rounded-xl overflow-hidden h-64">
                                        <img 
                                            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                                            alt="MbingloFC playing style"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Our Team Section */}
                <motion.section
                    id="team"
                    className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                Meet Our <span className="text-emerald-400">Team</span>
                            </motion.h2>
                            <motion.p
                                className="text-lg text-gray-400 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                The dedicated professionals who make MbingloFC special
                            </motion.p>
                        </motion.div>
                        
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-400 transition-all duration-300"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-emerald-400 font-medium mb-4">{member.role}</p>
                                        <p className="text-gray-400">{member.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        
                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            viewport={{ once: true }}
                        >
                            <motion.button
                                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Full Technical Team
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    className="py-20 bg-gradient-to-r from-emerald-700 to-green-900"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-4 text-center">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Ready to Join the MbingloFC Family?
                        </motion.h2>
                        <motion.p
                            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Whether as a player, supporter, or partner, there are many ways to be part of our journey.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.button
                                className="px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Become a Member
                            </motion.button>
                            <motion.button
                                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </section>
    );
}