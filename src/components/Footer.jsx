import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black shadow-sm border-b border-green-500 text-gray-300 pt-16 pb-8"><hr className='mb-8' />
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Club Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-white">
                                <span className="text-green-400">Mbinglo</span>FC
                            </span>
                        </Link>
                        <p className="text-gray-400">
                            The home of passionate football since 1985. Join us in our journey to greatness.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/matches/upcoming" className="text-gray-400 hover:text-green-400 transition-colors">Fixtures</Link></li>
                            <li><Link to="/team" className="text-gray-400 hover:text-green-400 transition-colors">Team</Link></li>
                            <li><Link to="/news" className="text-gray-400 hover:text-green-400 transition-colors">News</Link></li>
                            <li><Link to="/gallery" className="text-gray-400 hover:text-green-400 transition-colors">Gallery</Link></li>
                            <li><Link to="/merchandise" className="text-gray-400 hover:text-green-400 transition-colors">Shop</Link></li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-white">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">Mbinglo Stadium, 123 Football Ave, Cityville</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-green-400" />
                                <span className="text-gray-400">+1 (234) 567-8900</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-green-400" />
                                <span className="text-gray-400">info@mbinglofc.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaClock className="text-green-400" />
                                <span className="text-gray-400">Mon-Fri: 9AM - 5PM</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-white">Newsletter</h3>
                        <p className="text-gray-400">
                            Subscribe to get latest news and updates about MbingloFC
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mb-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-sm mb-4 md:mb-0"
                    >
                        &copy; {currentYear} MbingloFC. All rights reserved.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex gap-6"
                    >
                        <Link to="/privacy" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/contact" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
                            Contact
                        </Link>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}