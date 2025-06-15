import { FaTrophy, FaUsers, FaHistory, FaMapMarkerAlt, FaBullseye } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
    const [startCounting, setStartCounting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate content loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 second loading delay

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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold text-green-400">Loading MbingloFC History</h2>
                    <p className="text-gray-400 mt-2">Discovering our legacy...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <section id="about" className="bg-gray-900">
            <div className="min-h-screen">
                {/* Hero Section */}
                {/* Hero Section */}
                <section
                    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: "url('/src/assets/hero.jpeg')" // Replace with your actual image path
                    }}
                >

                    {/* Content */}
                    <div className="relative z-10 text-center px-4 bg-emerald-400 p-4 rounded-2xl">
                        <h1 className="text-5xl font-extrabold text-green-950 mb-4 drop-shadow-lg p-4 rounded-2xl">
                            About Mbinglo FC
                        </h1>
                        <p className='text-lg text-green-950 max-w-2xl mx-auto drop-shadow-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus consectetur unde veritatis explicabo delectus odit qui iusto? Ratione eligendi quia magnam, nesciunt alias, ea repellat ducimus tenetur cum ullam esse eos corporis corrupti odio accusantium hic ex, sint reprehenderit at eaque a veritatis quo dolor porro. Magni quo nisi repudiandae!</p>
                    </div>
                </section>

                {/* History Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="py-16 bg-sky-950"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <motion.h2
                                className="text-3xl font-bold mb-8 flex items-center gap-3 text-green-400"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <FaHistory className="text-green-400" /> Our History
                            </motion.h2>
                            <motion.div
                                className="text-gray-300 space-y-4 text-lg"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <p>
                                    Founded in 1985 by a group of football enthusiasts in the heart of the city,
                                    MbingloFC started as a small community club playing in local leagues.
                                    Through years of hard work and determination, we rose through the ranks
                                    to become one of the most respected football clubs in the region.
                                </p>
                                <p>
                                    Our first major trophy came in 1998 when we won the Regional Cup,
                                    marking the beginning of our golden era. Since then, we've won
                                    numerous championships and produced players who went on to represent
                                    national teams.
                                </p>
                                <p>
                                    Today, MbingloFC stands as a symbol of sporting excellence and
                                    community spirit, with a state-of-the-art academy nurturing the
                                    next generation of football talent.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Achievements Section */}
                <motion.section
                    id="achievements-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="py-16 bg-gray-900"
                >
                    <div className="container mx-auto px-4">
                        <motion.h2
                            className="text-3xl font-bold mb-12 text-center text-green-400"
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Club Achievements
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                className="bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-5xl text-green-400 mb-4 flex justify-center">
                                    <FaTrophy />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    {startCounting ? (
                                        <CountUp end={15} duration={2} suffix="+ Trophies" />
                                    ) : "0+ Trophies"}
                                </h3>
                                <p className="text-gray-400">
                                    Including 5 league titles, 7 cups, and 3 super cups
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-5xl text-green-400 mb-4 flex justify-center">
                                    <FaUsers />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    {startCounting ? (
                                        <CountUp end={50} duration={2} suffix=",000+ Fans" />
                                    ) : "0,000+ Fans"}
                                </h3>
                                <p className="text-gray-400">
                                    Our loyal supporters across the country and beyond
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-5xl text-green-400 mb-4 flex justify-center">
                                    <FaMapMarkerAlt />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    {startCounting ? (
                                        <CountUp end={25} duration={2} suffix=",000 Capacity" />
                                    ) : "0,000 Capacity"}
                                </h3>
                                <p className="text-gray-400">
                                    Modern stadium with world-class facilities
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Mission Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="py-16 bg-sky-950"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <motion.h2
                                className="text-3xl font-bold mb-8 flex items-center gap-3 text-green-400"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <FaBullseye className="text-green-400" /> Our Mission
                            </motion.h2>
                            <motion.div
                                className="text-gray-300 space-y-4 text-lg"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <p>
                                    At MbingloFC, our mission is to be more than just a football club - we aim to be a
                                    beacon of excellence, a pillar of our community, and a home for football
                                    enthusiasts at every level.
                                </p>
                                <p>
                                    We are committed to:
                                </p>
                                <ul className="space-y-3 list-disc pl-5">
                                    <li><strong className="text-green-400">Developing talent:</strong> Creating pathways for young players to reach their full potential</li>
                                    <li><strong className="text-green-400">Winning with style:</strong> Playing attractive, attacking football that excites our fans</li>
                                    <li><strong className="text-green-400">Community engagement:</strong> Using football as a force for positive social change</li>
                                    <li><strong className="text-green-400">Sustainable growth:</strong> Building a club that thrives both on and off the pitch for generations</li>
                                </ul>
                                <p>
                                    Every decision we make, from youth development to first-team signings, is guided
                                    by these fundamental principles that define who we are as a club.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Philosophy Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="py-16 bg-gray-900"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <motion.h2
                                className="text-3xl font-bold mb-8 text-green-400"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                Our Philosophy
                            </motion.h2>
                            <motion.div
                                className="text-gray-300 space-y-4 text-lg"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <p>
                                    At MbingloFC, we believe football is more than just a game - it's
                                    a way of life that brings people together, teaches valuable life
                                    lessons, and creates unforgettable memories.
                                </p>
                                <p>
                                    Our philosophy is built on three core principles:
                                </p>
                                <ul className="space-y-3 list-disc pl-5">
                                    <li><strong className="text-green-400">Excellence:</strong> Striving to be the best in everything we do</li>
                                    <li><strong className="text-green-400">Community:</strong> Being an integral part of our local community</li>
                                    <li><strong className="text-green-400">Development:</strong> Nurturing young talent and helping players reach their potential</li>
                                </ul>
                                <p>
                                    These values guide us on and off the pitch, ensuring MbingloFC
                                    remains a club we can all be proud of for generations to come.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </section>
    );
}