import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaTrophy, FaTicketAlt } from 'react-icons/fa';
import { GiSoccerBall, GiSoccerKick } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Animation variants
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

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-20 pb-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-600 rounded-full opacity-10 blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500 rounded-full opacity-5 blur-lg"></div>

            {/* Soccer ball pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20c0-7.4-3.8-14-10-18-6.2 4-10 10.6-10 18s3.8 14 10 18c6.2-4 10-10.6 10-18z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E')"
            }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Main Footer Content */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Club Info */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <Link to="/" className="flex items-center gap-3 group">
                            <GiSoccerBall className="text-3xl text-green-500 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-3xl font-bold text-white">
                                <span className="text-green-400">Mbinglo</span>FC
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Founded in 1985, Mbinglo FC is more than a club - it's a community. Join us in our journey to football excellence.
                        </p>
                        <div className="flex gap-5">
                            {[
                                { icon: <FaFacebook size={20} />, color: 'hover:text-blue-500' },
                                { icon: <FaTwitter size={20} />, color: 'hover:text-blue-400' },
                                { icon: <FaInstagram size={20} />, color: 'hover:text-pink-500' },
                                { icon: <FaYoutube size={20} />, color: 'hover:text-red-500' }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className={`text-gray-400 ${social.color} transition-colors duration-300`}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <GiSoccerKick className="text-green-400" />
                            Navigate
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Fixtures & Results", path: "/matches" },
                                { name: "First Team", path: "/team" },
                                { name: "Latest News", path: "/news" },
                                { name: "Matchday Tickets", path: "/tickets" },
                                { name: "Club Shop", path: "/shop" }
                            ].map((link, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaMapMarkerAlt className="text-green-400" />
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { icon: <FaMapMarkerAlt />, text: "Mbinglo Stadium, 123 Football Avenue, Cityville, 10001" },
                                { icon: <FaPhone />, text: "+1 (234) 567-8900" },
                                { icon: <FaEnvelope />, text: "info@mbinglofc.com" },
                                { icon: <FaClock />, text: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM" }
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1 flex-shrink-0">{item.icon}</span>
                                    <span className="text-gray-400">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaEnvelope className="text-green-400" />
                            Newsletter
                        </h3>
                        <p className="text-gray-400">
                            Subscribe for exclusive updates, ticket pre-sales, and club news.
                        </p>
                        <form className="space-y-4">
                            <motion.input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
                                required
                                whileFocus={{
                                    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.5)",
                                    backgroundColor: "rgba(31, 41, 55, 0.8)"
                                }}
                            />
                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaEnvelope />
                                Subscribe Now
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="border-t border-gray-800 my-10"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                ></motion.div>

                {/* Bottom Footer */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} Mbinglo Football Club. All rights reserved.
                        </p>
                        <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                        <p className="text-gray-500 text-sm">
                            Registered in England No. 12345678
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {[
                            { name: "Privacy Policy", path: "/privacy" },
                            { name: "Terms of Use", path: "/terms" },
                            { name: "Cookie Policy", path: "/cookies" },
                            { name: "Careers", path: "/careers" }
                        ].map((link, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={link.path}
                                    className="text-gray-500 hover:text-green-400 text-sm transition-colors duration-300"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Club Badge at bottom
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gray-800 p-4 rounded-full border border-gray-700 shadow-lg">
                        <GiSoccerBall className="text-3xl text-green-400" />
                    </div>
                </motion.div> */}
            </div>
        </footer>
    );
}